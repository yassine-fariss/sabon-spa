import React from 'react';
import type { Category } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { CategoryIcon } from './CategoryIcon';
import { ChevronRight } from 'lucide-react';

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
            className="group text-left relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-navy-900/70 hover:bg-navy-900/95 backdrop-blur-xl border border-aqua/15 hover:border-aqua/45 shadow-luxury transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-aqua/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-aqua/20 flex items-center justify-center text-aqua group-hover:bg-brand group-hover:text-white group-hover:border-aqua/40 transition-all duration-300 shadow-glow-aqua">
                <CategoryIcon icon={cat.icon} className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-medium text-white group-hover:text-aqua transition-colors">
                  {name}
                </h3>
                <p className="mt-1 text-xs text-mist/70 line-clamp-2 leading-relaxed font-light">
                  {tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-aqua/10 flex items-center justify-between">
              <span className="text-xs font-light text-mist/60">
                {t(lang, 'services.serviceCount', { n: cat.count })}
              </span>
              <span className="text-xs uppercase tracking-[0.16em] font-medium text-aqua flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{lang === 'fr' ? 'Découvrir' : 'Explore'}</span>
                <ChevronRight size={14} className="text-aqua" />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
