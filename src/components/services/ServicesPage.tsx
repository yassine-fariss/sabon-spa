import React, { useState, useEffect, useMemo } from 'react';
import type { Category, IndexData, SearchEntry, Service } from '../../lib/data';
import { fetchIndex, fetchSearchIndex, fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { stripAccents, formatPrice } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { CategoryGrid } from './CategoryGrid';
import { CategoryPage } from './CategoryPage';
import { SearchBox } from './SearchBox';
import { FilterChips, FilterKey } from './FilterChips';

interface ServicesPageProps {
  lang: Lang;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ lang }) => {
  const [indexData, setIndexData] = useState<IndexData | null>(null);
  const [searchEntries, setSearchEntries] = useState<SearchEntry[] | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(new Set());
  const [searchResultLimit, setSearchResultLimit] = useState(30);

  // Load index data on mount
  useEffect(() => {
    fetchIndex()
      .then((data) => setIndexData(data))
      .catch((err) => console.error('Failed to load services index:', err));
  }, []);

  // Lazy load search index on input focus
  const handleSearchFocus = () => {
    if (!searchEntries) {
      fetchSearchIndex()
        .then((data) => setSearchEntries(data))
        .catch((err) => console.error('Failed to load search index:', err));
    }
  };

  const handleToggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters(new Set());
    setSearchQuery('');
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    // Scroll to section top
    const el = document.getElementById('soins');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToGrid = () => {
    setActiveCategoryId(null);
  };

  // Filtered search results
  const isFilteringOrSearching = Boolean(searchQuery.trim().length > 0);

  const filteredSearchResults = useMemo(() => {
    if (!searchEntries || !searchQuery.trim()) return [];

    const query = stripAccents(searchQuery.trim());
    return searchEntries.filter((entry) => {
      const name = stripAccents(entry.n);
      return name.includes(query);
    });
  }, [searchEntries, searchQuery]);

  const activeCategory = useMemo(() => {
    if (!indexData || !activeCategoryId) return null;
    return indexData.categories.find((c) => c.id === activeCategoryId) || null;
  }, [indexData, activeCategoryId]);

  return (
    <section id="soins" className="py-24 sm:py-32 bg-ivory/60 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {!activeCategory && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              {lang === 'fr' ? 'Expériences & Bien-être' : 'Wellness & Sanctuary'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy">
              {t(lang, 'services.title')}
            </h2>
            <p className="text-sm sm:text-base text-navy/70 leading-relaxed font-sans">
              {t(lang, 'services.subtitle')}
            </p>

            {/* Search Box */}
            <div className="pt-6">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                onFocus={handleSearchFocus}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* Search Results Mode */}
        {isFilteringOrSearching ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-xs sm:text-sm text-navy/60 px-2">
              <span>
                {filteredSearchResults.length === 0
                  ? t(lang, 'services.noResults')
                  : `${filteredSearchResults.length} résultat(s) pour "${searchQuery}"`}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand hover:underline font-semibold"
              >
                {t(lang, 'cta.backToCategories')}
              </button>
            </div>

            {filteredSearchResults.length > 0 && (
              <div className="rounded-2xl border border-navy/10 bg-white/80 backdrop-blur-md overflow-hidden divide-y divide-navy/5 shadow-sm">
                {filteredSearchResults.slice(0, searchResultLimit).map((item) => {
                  const bookingUrl = getWhatsAppUrl(
                    `${item.n}${item.p ? ` (${item.p} MAD)` : ''}`,
                    lang
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 sm:p-5 hover:bg-mist/30 transition-colors"
                    >
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-navy">
                          {item.n}
                        </h4>
                        <span className="text-xs text-navy/50 capitalize">
                          {item.c.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.p && (
                          <span className="text-sm font-semibold text-gold-dark font-serif whitespace-nowrap">
                            {formatPrice(item.p)}
                          </span>
                        )}
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand hover:bg-brand-600 text-white shadow-xs transition-colors"
                        >
                          {t(lang, 'cta.book')}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredSearchResults.length > searchResultLimit && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setSearchResultLimit((prev) => prev + 30)}
                  className="px-5 py-2.5 rounded-full bg-white border border-navy/15 text-xs font-semibold text-navy hover:text-brand shadow-xs transition-all"
                >
                  {t(lang, 'cta.seeMore')}
                </button>
              </div>
            )}
          </div>
        ) : activeCategory ? (
          /* Category Detail View */
          <CategoryPage
            category={activeCategory}
            lang={lang}
            onBack={handleBackToGrid}
          />
        ) : (
          /* Category Grid View */
          indexData && (
            <CategoryGrid
              categories={indexData.categories}
              lang={lang}
              onSelectCategory={handleSelectCategory}
            />
          )
        )}
      </div>
    </section>
  );
};
