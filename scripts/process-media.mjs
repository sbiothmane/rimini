#!/usr/bin/env node
/**
 * Import media from ~/Downloads, optimize for web, organize under src/assets/media/.
 * Usage: node scripts/process-media.mjs [--downloads /path/to/Downloads]
 */
import {
	readFileSync,
	mkdirSync,
	renameSync,
	existsSync,
	writeFileSync,
	readdirSync,
	unlinkSync,
} from 'node:fs';
import { join, basename } from 'node:path';
import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const downloadsDir = process.argv.includes('--downloads')
	? process.argv[process.argv.indexOf('--downloads') + 1]
	: join(homedir(), 'Downloads');

const root = join(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(join(import.meta.dirname, 'media-manifest.json'), 'utf8'));
const mediaRoot = join(root, 'src/assets/media');
const ingestRoot = join(root, 'src/assets/_ingest/originals');

const MAX_WIDTH = 2000;
const THUMB_WIDTH = 720;
const WEBP_QUALITY = 82;

function findDownloadSync(name) {
	const direct = join(downloadsDir, name);
	if (existsSync(direct)) return direct;
	const lower = name.toLowerCase();
	for (const f of readdirSync(downloadsDir)) {
		if (f.toLowerCase() === lower) return join(downloadsDir, f);
	}
	return null;
}

function heicToBuffer(inputPath) {
	mkdirSync(ingestRoot, { recursive: true });
	const tmp = join(ingestRoot, `.tmp-${basename(inputPath)}.jpg`);
	execFileSync('sips', ['-s', 'format', 'jpeg', inputPath, '--out', tmp], { stdio: 'pipe' });
	const buf = readFileSync(tmp);
	unlinkSync(tmp);
	return buf;
}

function archiveOriginal(inputPath) {
	mkdirSync(ingestRoot, { recursive: true });
	const destOriginal = join(ingestRoot, basename(inputPath));
	if (!existsSync(destOriginal)) {
		renameSync(inputPath, destOriginal);
	}
}

async function processImage(entry, inputPath) {
	const outDir = join(mediaRoot, entry.category);
	mkdirSync(outDir, { recursive: true });

	const ext = inputPath.toLowerCase();
	const buffer =
		ext.endsWith('.heic') || ext.endsWith('.heif') ? heicToBuffer(inputPath) : readFileSync(inputPath);

	const base = entry.slug;
	const pipeline = sharp(buffer).rotate().resize({
		width: MAX_WIDTH,
		height: MAX_WIDTH,
		fit: 'inside',
		withoutEnlargement: true,
	});

	await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(join(outDir, `${base}.webp`));
	await pipeline
		.clone()
		.resize({ width: THUMB_WIDTH, withoutEnlargement: true })
		.webp({ quality: 78 })
		.toFile(join(outDir, `${base}-thumb.webp`));

	const meta = await sharp(join(outDir, `${base}.webp`)).metadata();
	archiveOriginal(inputPath);

	return {
		slug: base,
		category: entry.category,
		width: meta.width,
		height: meta.height,
		src: `media/${entry.category}/${base}.webp`,
		thumb: `media/${entry.category}/${base}-thumb.webp`,
	};
}

async function processVideo(entry, inputPath) {
	const outDir = join(mediaRoot, entry.category);
	mkdirSync(outDir, { recursive: true });
	const base = entry.slug;
	const mp4Out = join(outDir, `${base}.mp4`);
	const posterPng = join(outDir, `${base}-poster.png`);
	const posterOut = join(outDir, `${base}-poster.webp`);

	execFileSync(
		'ffmpeg',
		[
			'-y',
			'-i',
			inputPath,
			'-c:v',
			'libx264',
			'-crf',
			'23',
			'-preset',
			'medium',
			'-c:a',
			'aac',
			'-b:a',
			'128k',
			'-movflags',
			'+faststart',
			mp4Out,
		],
		{ stdio: 'pipe' },
	);

	execFileSync('ffmpeg', ['-y', '-i', mp4Out, '-ss', '00:00:01', '-vframes', '1', posterPng], {
		stdio: 'pipe',
	});
	await sharp(posterPng).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(posterOut);
	unlinkSync(posterPng);

	archiveOriginal(inputPath);

	return {
		slug: base,
		category: entry.category,
		src: `media/${entry.category}/${base}.mp4`,
		poster: `media/${entry.category}/${base}-poster.webp`,
	};
}

const catalog = { images: [], videos: [], skipped: [] };

for (const entry of manifest.sources) {
	const inputPath = findDownloadSync(entry.file);
	if (!inputPath) {
		catalog.skipped.push({ file: entry.file, reason: 'not found in Downloads' });
		continue;
	}

	const isVideo = /\.(mov|mp4|m4v)$/i.test(entry.file);
	try {
		if (isVideo) {
			catalog.videos.push(await processVideo(entry, inputPath));
			console.log(`✓ video ${entry.slug}`);
		} else {
			const result = await processImage(entry, inputPath);
			catalog.images.push(result);
			console.log(`✓ image ${entry.category}/${entry.slug}`);
		}
	} catch (err) {
		catalog.skipped.push({ file: entry.file, reason: String(err) });
		console.error(`✗ ${entry.file}:`, err.message);
	}
}

writeFileSync(join(mediaRoot, 'catalog.json'), JSON.stringify(catalog, null, 2));
console.log(`\nImages: ${catalog.images.length}, Videos: ${catalog.videos.length}, Skipped: ${catalog.skipped.length}`);
