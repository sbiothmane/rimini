# Media library

## Folder structure

```text
src/assets/media/
  catalog.json          # machine-readable index (generated)
  hero/                 # homepage & brand shots
  products/             # finished shoes (full + -thumb.webp)
  craft/                # making-of / artisan at work
  workshop/             # atelier environment
  videos/craft/         # MP4 + poster WebP

src/assets/_ingest/originals/   # archived HEIC/MOV from Downloads (gitignored)
```

## Import more files

1. AirDrop photos/videos to **Downloads**.
2. Add entries to [`scripts/media-manifest.json`](../scripts/media-manifest.json).
3. Run:

```bash
npm run media:import
```

This converts HEIC → WebP, resizes to max 2000px, creates thumbnails (720px), moves originals to `_ingest/originals/`, and updates `catalog.json`.

## Using images in content

In product markdown frontmatter:

```yaml
thumbnail: media/products/babouche-rimini-tan-blue.webp
gallery:
  - media/products/babouche-rimini-tan-blue.webp
  - media/products/babouche-tan-classic.webp
```

In Astro components, use `<MediaImage src={...} alt="..." />`.

## Excluded from import (not shoe assets)

- Passport photos (`IMG_2411`, `IMG_2416`)
- School homework screenshots (`IMG_045x` PNG)
- Unrelated generated images

## Video

`videos/craft/atelier-process-0252.mp4` — use HTML `<video>` with poster `atelier-process-0252-poster.webp`.
