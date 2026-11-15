import React from 'react';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';

export type FilterKey = 'women' | 'men' | 'kids' | 'pregnancy' | 'under1h';

interface FilterChipsProps {
  activeFilters: Set<FilterKey>;
  onToggleFilter: (key: FilterKey) => void;
  onClearFilters: () => void;
  lang: Lang;
}

const FILTER_ITEMS: { key: FilterKey; labelKey: string }[] = [
  { key: 'women', labelKey: 'filters.women' },
  { key: 'men', labelKey: 'filters.men' },
  { key: 'kids', labelKey: 'filters.kids' },
  { key: 'pregnancy', labelKey: 'filters.pregnancy' },
  { key: 'under1h', labelKey: 'filters.under1h' },
];

export const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilters,
  onToggleFilter,
  onClearFilters,
  lang,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-2">
      <span className="text-xs text-charcoal-muted font-medium mr-1 hidden sm:inline">
        {t(lang, 'services.filterTitle')}
      </span>

      {FILTER_ITEMS.map(({ key, labelKey }) => {
        const isActive = activeFilters.has(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggleFilter(key)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 font-medium flex items-center gap-1.5 ${
              isActive
                ? 'bg-brand text-white border-brand shadow-xs'
                : 'bg-white text-navy/80 border-champagne/40 hover:bg-sand/30 hover:border-brand/40'
            }`}
          >
            <span>{t(lang, labelKey)}</span>
            {isActive && (
              <span className="text-white/80 font-bold ml-0.5">×</span>
            )}
          </button>
        );
      })}

      {activeFilters.size > 0 && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs text-brand hover:underline font-medium px-2 py-1"
        >
          {t(lang, 'services.clearFilters')}
        </button>
      )}
    </div>
  );
};
