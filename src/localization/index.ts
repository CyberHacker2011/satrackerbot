import { Language } from '../types';
import { translations } from './translations';

export function t(key: string, lang: Language = 'uz', params?: Record<string, string>): string {
  let text = translations[lang][key] || translations['uz'][key] || key;
  
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{{${param}}}`, params[param]);
    });
  }
  
  return text;
}

export function getUserLanguage(userLang?: Language): Language {
  return userLang || 'uz';
}
