class Locale {
	locale: string | null = $state('en');
	setLocale(locale: string) {
		this.locale = locale;
		localStorage.setItem('locale', this.locale);
	}
}

export const userlocale = new Locale();

export const availableLanguages = new Map<string, string>([
	['en', 'English'],
	['zh', '中文繁體'],

	['zh-CN', '中文简体'],
	['ja', '日本語'],
	['de', 'Deutsch'],
	['fr', 'Français'],
	['es', 'Español'],
	['ko', '한국어'],
	['ru', 'Русский']
]);


async function loadTranslation(locale: string): Promise<Record<string, string>> {
	try {
		const translationModule = await import(`$lib/ui/locales/${locale}.json`);
		return translationModule.default || {};
	} catch {
		const fallbackModule = await import('$lib/ui/locales/en.json');
		return fallbackModule.default;
	}
}
export async function translation(key: Array<string>, locale: string): Promise<Map<string, string>> {
	const translations = await loadTranslation(locale);
	const keyMap = new Map<string, string>();

	for (const element of key) {
		keyMap.set(element, translations[element] || element);
	}

	return keyMap;
}

export function getLanguage(): string {
	let language = window.navigator.languages
		? window.navigator.languages[0]
		: window.navigator.language || window.navigator.userLanguage;
	if (language === 'zh-CN') {
		language = 'zh-CN';
	} else {
		language = language.substr(0, 2);
	}
	return language;
}

export function initLocale() {
	const systemLanguage = getLanguage();
	const initialLocale = localStorage.getItem('locale');
	if (initialLocale) {
		userlocale.locale = initialLocale;
	} else if (availableLanguages.has(systemLanguage)) {
		userlocale.setLocale(systemLanguage);
	} else if (!availableLanguages.has(systemLanguage)) {
		userlocale.setLocale('en');
	}
}