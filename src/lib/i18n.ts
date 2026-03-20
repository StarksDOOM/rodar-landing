import en from '../locales/en.json';
import es from '../locales/es.json';

/**
 * Supported application languages.
 */
export type Language = 'es' | 'en';

/**
 * Combined translation dictionary for all supported languages.
 */
const translations = {
  en,
  es,
};

/**
 * Retrieves the translation dictionary for a specific language.
 * 
 * @param lang - The language code ('es' or 'en') to fetch translations for.
 * @returns The full translation object containing localized strings.
 */
export function getTranslations(lang: Language) {
  return translations[lang];
}

/**
 * Type definition for the translation structure, derived from the English locale.
 */
export type Translations = typeof en;
