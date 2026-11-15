import React from 'react';
import type { Category } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { CategoryIcon } from './CategoryIcon';
import { Reveal } from '../ui/Reveal';
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
      {categories.map((cat, idx) => {
        const name = cat.name[lang] || cat.name.fr;
        const tagline = cat.tagline[lang] || cat.tagline.fr;

        return (
          <Reveal
            key={cat.id}
            variant="pop-up"
            delay={idx * 80}
            duration={700}
            className="h-full"
          >
            <button
              onClick={() => onSelectCategory(cat.id)}
              className="w-full h-full group text-left relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/90 hover:bg-white border border-champagne/35 hover:border-brand/45 shadow-sm hover:shadow-luxury transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sand/40 border border-champagne/35 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-300 shadow-xs">
                  <CategoryIcon icon={cat.icon} className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-serif font-medium text-navy group-hover:text-brand transition-colors">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal-muted line-clamp-2 leading-relaxed font-light">
                    {tagline}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sand/70 flex items-center justify-between">
                <span className="text-xs font-light text-charcoal-muted">
                  {t(lang, 'services.serviceCount', { n: cat.count })}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] font-medium text-brand flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'fr' ? 'Découvrir' : 'Explore'}</span>
                  <ChevronRight size={14} className="text-brand" />
                </span>
              </div>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
};
