import React, { useEffect, useState } from 'react';
import type { Category, CategoryData, Service } from '../../lib/data';
import { fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { CategoryIcon } from './CategoryIcon';
import { SubcategoryAccordion } from './SubcategoryAccordion';

interface CategoryPageProps {
  category: Category;
  lang: Lang;
  onBack: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  lang,
  onBack,
}) => {
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSubcatId, setActiveSubcatId] = useState<string | null>(
    category.subcategories[0]?.id || null
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCategory(category.id)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [category.id]);

  const scrollToSubcat = (subcatId: string) => {
    setActiveSubcatId(subcatId);
    const el = document.getElementById(`subcat-${subcatId}`);
    if (el) {
      const yOffset = -140; // account for sticky header & chips
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const name = category.name[lang] || category.name.fr;
  const tagline = category.tagline[lang] || category.tagline.fr;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top bar with Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-700 bg-white/80 hover:bg-white px-4 py-2 rounded-xl border border-navy/10 shadow-xs transition-all active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{t(lang, 'cta.backToCategories')}</span>
        </button>

        <span className="text-xs text-navy/50 font-medium">
          {t(lang, 'services.serviceCount', { n: category.count })}
        </span>
      </div>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-navy/10 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand text-white flex items-center justify-center shadow-luxury flex-shrink-0">
          <CategoryIcon icon={category.icon} className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy">
            {name}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-navy/70 leading-relaxed">
            {tagline}
          </p>
        </div>
      </div>

      {/* Sticky horizontal subcategory chips */}
      {category.subcategories.length > 1 && (
        <div className="sticky top-20 z-20 py-2 -mx-4 px-4 bg-mist/95 backdrop-blur-md border-y border-navy/5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {category.subcategories.map((subcat) => {
              const subName = subcat.name[lang] || subcat.name.fr;
              const isActive = activeSubcatId === subcat.id;
              return (
                <button
                  key={subcat.id}
                  onClick={() => scrollToSubcat(subcat.id)}
                  className={`text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-white/80 text-navy/75 hover:bg-white hover:text-navy border border-navy/10'
                  }`}
                >
                  {subName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content / Accordions */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-navy/60 font-medium">Chargement des soins...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-200">
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 rounded-xl bg-brand text-white text-xs font-semibold"
          >
            Retour
          </button>
        </div>
      ) : data ? (
        <div className="space-y-4">
          {category.subcategories.map((subcat, idx) => {
            const subcatServices = data.services.filter(
              (s) => s.subcategory === subcat.id
            );
            if (subcatServices.length === 0) return null;

            return (
              <SubcategoryAccordion
                key={subcat.id}
                subcategory={subcat}
                services={subcatServices}
                categoryId={category.id}
                lang={lang}
                defaultOpen={idx === 0}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
