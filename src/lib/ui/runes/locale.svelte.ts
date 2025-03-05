import { type Settings } from '$lib/wallet/common';

class Userlocale {
	locale: string | null = $state('en');
	setLocale(setlocale: string) {
		this.locale = setlocale;
		const saved = localStorage.getItem('settings');
		if (saved) {
			const settings = JSON.parse(saved) as Settings;
			const newSettings = { ...settings, locale: this.locale };
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
	}
}

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
export async function translation(
	key: Array<string>,
	locale: string
): Promise<Map<string, string>> {
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
	if (language === 'zh-CN' || language === 'zh-SG') {
		language = 'zh-CN';
	}
	if (language === 'zh-TW' || language === 'zh-HK') {
		language = 'zh';
	}
	return language;
}

export const userlocale = new Userlocale();
