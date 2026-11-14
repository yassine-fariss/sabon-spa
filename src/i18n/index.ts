import fr from './fr.json';
import en from './en.json';

export type Lang = 'fr' | 'en';

const catalogs: Record<Lang, any> = { fr, en };

export function t(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let obj: any = catalogs[lang] || catalogs.fr;
  for (const k of keys) {
    obj = obj?.[k];
    if (obj === undefined) break;
  }

  let text = obj !== undefined ? String(obj) : key;
  if (params) {
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }
  return text;
}
