import { useState, useCallback, useEffect } from 'react';
import type { Lang } from '../i18n';

export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('sabon_lang');
      if (stored === 'en' || stored === 'fr') return stored;
    } catch {
      // ignore
    }
    return 'fr';
  });

  const switchLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem('sabon_lang', next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    switchLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, switchLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, switchLang, toggleLang };
}
