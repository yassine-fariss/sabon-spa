import React from 'react';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { Search, X } from 'lucide-react';

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
        <div className="absolute left-4 pointer-events-none text-brand/60">
          <Search size={18} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={t(lang, 'services.searchPlaceholder')}
          className="w-full pl-11 pr-10 py-3.5 bg-white border border-champagne/45 text-navy placeholder:text-charcoal-muted/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-sm transition-all"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
            className="absolute right-3.5 p-1 rounded-full text-charcoal-muted hover:text-navy hover:bg-sand/40 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
