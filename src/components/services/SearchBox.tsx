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
        <div className="absolute left-4 pointer-events-none text-aqua/60">
          <Search size={18} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={t(lang, 'services.searchPlaceholder')}
          className="w-full pl-11 pr-10 py-3.5 bg-navy-900/90 backdrop-blur-xl rounded-full border border-aqua/30 text-white placeholder:text-mist/40 text-sm focus:outline-none focus:ring-2 focus:ring-aqua/40 focus:border-aqua shadow-luxury transition-all"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
            className="absolute right-3.5 p-1 rounded-full text-aqua/60 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
