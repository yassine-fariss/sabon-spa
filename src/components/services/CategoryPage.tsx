import React, { useEffect, useState } from 'react';
import type { Category, CategoryData } from '../../lib/data';
import { fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { CategoryIcon } from './CategoryIcon';
import { SubcategoryAccordion } from './SubcategoryAccordion';
import { ArrowLeft } from 'lucide-react';

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
      const yOffset = -140;
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
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-aqua hover:text-white bg-navy-900/80 hover:bg-navy-900 px-5 py-2.5 rounded-xl border border-aqua/25 shadow-glow-aqua transition-all active:scale-95"
        >
          <ArrowLeft size={14} className="text-aqua" />
          <span>{t(lang, 'cta.backToCategories')}</span>
        </button>

        <span className="text-xs text-mist/60 font-light">
          {t(lang, 'services.serviceCount', { n: category.count })}
        </span>
      </div>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-navy-900/80 backdrop-blur-xl border border-aqua/20 shadow-luxury">
        <div className="w-16 h-16 rounded-2xl bg-brand text-white flex items-center justify-center border border-aqua/40 shadow-glow-aqua flex-shrink-0">
          <CategoryIcon icon={category.icon} className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
            {name}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-mist/75 font-light leading-relaxed">
            {tagline}
          </p>
        </div>
      </div>

      {/* Sticky horizontal subcategory chips */}
      {category.subcategories.length > 1 && (
        <div className="sticky top-20 z-20 py-2.5 -mx-4 px-4 bg-navy-950/95 backdrop-blur-xl border-y border-aqua/15 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {category.subcategories.map((subcat) => {
              const subName = subcat.name[lang] || subcat.name.fr;
              const isActive = activeSubcatId === subcat.id;
              return (
                <button
                  key={subcat.id}
                  onClick={() => scrollToSubcat(subcat.id)}
                  className={`text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-brand text-white border border-aqua/40 shadow-glow-aqua'
                      : 'bg-navy-900/80 text-mist/75 hover:bg-navy-800 hover:text-white border border-aqua/20'
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
          <div className="w-8 h-8 border-2 border-aqua border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-mist/60 font-light">
            {lang === 'fr' ? 'Chargement des soins...' : 'Loading treatments...'}
          </p>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-rose-300 bg-rose-950/30 rounded-2xl border border-rose-800/40">
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={onBack}
            className="mt-4 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-semibold"
          >
            {t(lang, 'cta.backToCategories')}
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
