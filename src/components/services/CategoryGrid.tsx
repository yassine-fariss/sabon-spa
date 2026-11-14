import React from 'react';
import type { Category } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { CategoryIcon } from './CategoryIcon';

interface CategoryGridProps {
  categories: Category[];
  lang: Lang;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  lang,
  onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((cat) => {
        const name = cat.name[lang] || cat.name.fr;
        const tagline = cat.tagline[lang] || cat.tagline.fr;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group text-left relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-navy/10 hover:border-brand/40 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm">
                <CategoryIcon icon={cat.icon} className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold text-navy group-hover:text-brand transition-colors">
                  {name}
                </h3>
                <p className="mt-1 text-xs text-navy/70 line-clamp-2 leading-relaxed">
                  {tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-navy/5 flex items-center justify-between">
              <span className="text-xs font-medium text-navy/60">
                {t(lang, 'services.serviceCount', { n: cat.count })}
              </span>
              <span className="text-xs font-semibold text-brand flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{lang === 'fr' ? 'Découvrir' : 'Explore'}</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
