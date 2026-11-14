import React, { useState } from 'react';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  lang: Lang;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onFocus,
  lang,
}) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-navy/40">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={t(lang, 'services.searchPlaceholder')}
          className="w-full pl-11 pr-10 py-3.5 bg-white/80 backdrop-blur-md rounded-full border border-navy/15 text-navy placeholder:text-navy/45 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand shadow-sm transition-all"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
            className="absolute right-3.5 p-1 rounded-full text-navy/40 hover:text-navy hover:bg-navy/5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
