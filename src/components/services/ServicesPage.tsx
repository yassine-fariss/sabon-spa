import React, { useState, useEffect, useMemo } from 'react';
import type { Category, IndexData, SearchEntry } from '../../lib/data';
import { fetchIndex, fetchSearchIndex } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { stripAccents, formatPrice } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { CategoryGrid } from './CategoryGrid';
import { CategoryPage } from './CategoryPage';
import { SearchBox } from './SearchBox';
import { Reveal } from '../ui/Reveal';
import { Sparkles, MessageSquare } from 'lucide-react';

interface ServicesPageProps {
  lang: Lang;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ lang }) => {
  const [indexData, setIndexData] = useState<IndexData | null>(null);
  const [searchEntries, setSearchEntries] = useState<SearchEntry[] | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const el = document.getElementById('soins');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToGrid = () => {
    setActiveCategoryId(null);
  };

  const isSearching = Boolean(searchQuery.trim().length > 0);

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
    <section id="soins" className="py-28 sm:py-32 bg-gradient-to-b from-sand via-ivory to-sand/40 text-navy relative overflow-hidden transition-colors">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-champagne/20 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-sand/60 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {!activeCategory && (
          <Reveal variant="fade-up" duration={700}>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-medium">
                <Sparkles size={13} />
                <span>{lang === 'fr' ? 'Expériences & Bien-être' : 'Wellness & Sanctuary'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
                {lang === 'fr' ? (
                  <>
                    La Carte des <span className="italic text-brand">Soins</span>
                  </>
                ) : (
                  <>
                    Treatment <span className="italic text-brand">Menu</span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto">
                {t(lang, 'services.subtitle')}
              </p>

              {/* Search Box */}
              <div className="pt-4">
                <SearchBox
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onFocus={handleSearchFocus}
                  lang={lang}
                />
              </div>
            </div>
          </Reveal>
        )}

        {/* Search Results Mode */}
        {isSearching ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-xs sm:text-sm text-charcoal-muted px-2">
              <span>
                {filteredSearchResults.length === 0
                  ? t(lang, 'services.noResults')
                  : `${filteredSearchResults.length} soin(s) trouvé(s) pour "${searchQuery}"`}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand hover:underline font-medium"
              >
                {t(lang, 'cta.backToCategories')}
              </button>
            </div>

            {filteredSearchResults.length > 0 && (
              <div className="rounded-2xl border border-champagne/40 bg-white overflow-hidden divide-y divide-sand/60 shadow-sm">
                {filteredSearchResults.slice(0, searchResultLimit).map((item) => {
                  const bookingUrl = getWhatsAppUrl(
                    `${item.n}${item.p ? ` (${item.p} MAD)` : ''}`,
                    lang
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 sm:p-5 hover:bg-sand/20 transition-colors"
                    >
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-navy">
                          {item.n}
                        </h4>
                        <span className="text-xs text-charcoal-muted capitalize">
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
                          className="px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-medium rounded-lg bg-brand hover:bg-brand-600 text-white shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare size={13} />
                          <span>{t(lang, 'cta.book')}</span>
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
                  className="px-6 py-2.5 rounded-full bg-white border border-champagne/50 text-xs uppercase tracking-[0.14em] font-medium text-navy hover:text-brand shadow-xs hover:shadow-sm transition-all"
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
