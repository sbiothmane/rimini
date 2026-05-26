import type { Locale } from '../config/site';

type UiStrings = {
	nav: {
		home: string;
		collection: string;
		craft: string;
		about: string;
		contact: string;
	};
	cta: {
		whatsapp: string;
		whatsappProduct: string;
		call: string;
		viewCollection: string;
	};
	home: {
		eyebrow: string;
		title: string;
		subtitle: string;
		trust1: string;
		trust2: string;
		trust3: string;
		craftTeaser: string;
	};
	collection: {
		title: string;
		subtitle: string;
	};
	craft: {
		title: string;
		subtitle: string;
	};
	about: {
		title: string;
		body: string;
	};
	contact: {
		title: string;
		subtitle: string;
		hours: string;
		location: string;
	};
	product: {
		materials: string;
		care: string;
		provenance: string;
		orderWhatsApp: string;
	};
	footer: {
		tagline: string;
	};
};

const fr: UiStrings = {
	nav: {
		home: 'Accueil',
		collection: 'Collection',
		craft: 'Savoir-faire',
		about: 'L’atelier',
		contact: 'Contact',
	},
	cta: {
		whatsapp: 'Commander sur WhatsApp',
		whatsappProduct: 'Demander ce modèle sur WhatsApp',
		call: 'Appeler',
		viewCollection: 'Voir la collection',
	},
	home: {
		eyebrow: 'Chaussures artisanales · Maroc',
		title: 'Faites à la main, une paire à la fois',
		subtitle:
			'Chaussures cousues dans notre atelier. Matériaux choisis, finitions soignées, savoir-faire transmis de génération en génération.',
		trust1: 'Fabrication artisanale locale',
		trust2: 'Cuir et matériaux sélectionnés',
		trust3: 'Sur mesure sur demande',
		craftTeaser: 'Découvrir le geste',
	},
	collection: {
		title: 'Collection',
		subtitle: 'Modèles réalisés dans l’atelier. Chaque paire peut être adaptée à votre pointure.',
	},
	craft: {
		title: 'Savoir-faire',
		subtitle: 'De la découpe à la finition — les étapes qui donnent vie à chaque paire.',
	},
	about: {
		title: 'L’atelier',
		body: 'Un atelier familial où chaque chaussure est pensée pour durer. Nous accueillons les commandes sur mesure et les retouches.',
	},
	contact: {
		title: 'Contact',
		subtitle: 'Écrivez-nous sur WhatsApp pour commander, demander une pointure ou visiter l’atelier.',
		hours: 'Sur rendez-vous',
		location: 'Maroc',
	},
	product: {
		materials: 'Matériaux',
		care: 'Entretien',
		provenance: 'Savoir-faire',
		orderWhatsApp: 'Commander sur WhatsApp',
	},
	footer: {
		tagline: 'Chaussures artisanales faites main au Maroc.',
	},
};

const ar: UiStrings = {
	nav: {
		home: 'الرئيسية',
		collection: 'المجموعة',
		craft: 'الحرفة',
		about: 'الورشة',
		contact: 'اتصل بنا',
	},
	cta: {
		whatsapp: 'اطلب عبر واتساب',
		whatsappProduct: 'اطلب هذا الموديل عبر واتساب',
		call: 'اتصل',
		viewCollection: 'عرض المجموعة',
	},
	home: {
		eyebrow: 'أحذية حرفية · المغرب',
		title: 'صنع يدوي، زوجاً بزوج',
		subtitle:
			'أحذية مخيطة في ورشتنا. مواد مختارة، تشطيبات دقيقة، وخبرة موروثة عبر الأجيال.',
		trust1: 'صناعة حرفية محلية',
		trust2: 'جلد ومواد مختارة',
		trust3: 'حسب الطلب عند الطلب',
		craftTeaser: 'اكتشف الحرفة',
	},
	collection: {
		title: 'المجموعة',
		subtitle: 'موديلات من الورشة. يمكن تكييف كل زوج حسب مقاسك.',
	},
	craft: {
		title: 'الحرفة',
		subtitle: 'من القص إلى اللمسات الأخيرة — مراحل صنع كل زوج.',
	},
	about: {
		title: 'الورشة',
		body: 'ورشة عائلية حيث يُصمَّم كل حذاء ليدوم. نقبل الطلبات حسب المقاس والتعديلات.',
	},
	contact: {
		title: 'اتصل بنا',
		subtitle: 'راسلنا على واتساب للطلب، السؤال عن المقاس، أو زيارة الورشة.',
		hours: 'بموعد مسبق',
		location: 'المغرب',
	},
	product: {
		materials: 'المواد',
		care: 'العناية',
		provenance: 'الحرفة',
		orderWhatsApp: 'اطلب عبر واتساب',
	},
	footer: {
		tagline: 'أحذية حرفية مصنوعة يدوياً في المغرب.',
	},
};

const dictionaries: Record<Locale, UiStrings> = { fr, ar };

export function useTranslations(locale: Locale): UiStrings {
	return dictionaries[locale];
}
