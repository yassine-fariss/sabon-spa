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
    <section id="soins" className="py-28 sm:py-32 bg-navy-950 text-white relative overflow-hidden">
      {/* Decorative subtle ambient lights matching the sanctuary vibe */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-brand/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-aqua/10 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {!activeCategory && (
          <Reveal variant="fade-up" duration={700}>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium">
                <Sparkles size={13} />
                <span>{lang === 'fr' ? 'Expériences & Bien-être' : 'Wellness & Sanctuary'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
                {lang === 'fr' ? (
                  <>
                    La Carte des <span className="italic text-aqua">Soins</span>
                  </>
                ) : (
                  <>
                    Treatment <span className="italic text-aqua">Menu</span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base text-mist/75 font-light leading-relaxed max-w-2xl mx-auto">
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
            <div className="flex items-center justify-between text-xs sm:text-sm text-mist/60 px-2">
              <span>
                {filteredSearchResults.length === 0
                  ? t(lang, 'services.noResults')
                  : `${filteredSearchResults.length} soin(s) trouvé(s) pour "${searchQuery}"`}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-aqua hover:underline font-medium"
              >
                {t(lang, 'cta.backToCategories')}
              </button>
            </div>

            {filteredSearchResults.length > 0 && (
              <div className="rounded-2xl border border-aqua/15 bg-navy-900/80 backdrop-blur-xl overflow-hidden divide-y divide-aqua/10 shadow-luxury">
                {filteredSearchResults.slice(0, searchResultLimit).map((item) => {
                  const bookingUrl = getWhatsAppUrl(
                    `${item.n}${item.p ? ` (${item.p} MAD)` : ''}`,
                    lang
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 sm:p-5 hover:bg-navy-800/40 transition-colors"
                    >
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-white">
                          {item.n}
                        </h4>
                        <span className="text-xs text-mist/50 capitalize">
                          {item.c.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.p && (
                          <span className="text-sm font-medium text-gold font-serif whitespace-nowrap">
                            {formatPrice(item.p)}
                          </span>
                        )}
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-medium rounded-lg bg-brand hover:bg-brand-600 border border-aqua/40 text-white shadow-glow-aqua transition-colors flex items-center gap-1.5"
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
                  className="px-6 py-2.5 rounded-full bg-navy-900/90 border border-aqua/30 text-xs uppercase tracking-[0.14em] font-medium text-white hover:text-aqua shadow-glow-aqua transition-all"
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
