import en from '../locales/en.json';
import es from '../locales/es.json';

export type Language = 'es' | 'en';

const translations = {
  en,
  es,
};

export function getTranslations(lang: Language) {
  return translations[lang];
}

export type Translations = typeof en;
