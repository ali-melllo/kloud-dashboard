export const languageData = {
	en: {
		font: 'Inter',
		label: 'English',
	},
	fa: {
		font: 'Inter',
		label: 'فارسی',
	},
	ar: {
		font: 'Inter',
		label: 'عربی',
	},
} as const;

export type LanguagesType = keyof typeof languageData;
export const languages: LanguagesType[] = ['en', 'fa', 'ar'];
export const fallbackLng = languages[0];
export const defaultNS = 'common';
export const cookieName = 'locale';

export function getOptions(lng : string = fallbackLng, ns: string | string[] = defaultNS) {
	return {
		debug: false,
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}
