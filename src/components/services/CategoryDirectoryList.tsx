import React from 'react';
import type { Lang } from '../../i18n';
import { MAIN_SERVICE_CATEGORIES, MainCategoryConfig } from '../../data/categoriesData';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface CategoryDirectoryListProps {
  lang: Lang;
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryDirectoryList: React.FC<CategoryDirectoryListProps> = ({
  lang,
  onSelectCategory,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto divide-y divide-champagne/35">
      {MAIN_SERVICE_CATEGORIES.map((category, idx) => {
        const name = category.name[lang];
        const desc = category.shortDesc[lang];
        const durationHint = category.durationHint[lang];
        const priceFrom = category.priceStartingMAD;

        return (
          <Reveal
            key={category.slug}
            variant="pop-up"
            delay={idx * 60}
            duration={650}
            className="w-full"
          >
            <button
              type="button"
              onClick={() => onSelectCategory(category.slug)}
              className="w-full group text-left py-6 sm:py-7 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-2xl hover:bg-white/80 active:bg-sand/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {/* Left Column: Rectangular Image Thumbnail + Title & Description */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0 flex-1">
                {/* Rectangular Image Thumbnail with rounded corners */}
                <div className="relative w-20 h-16 sm:w-28 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-sand/60 border border-champagne/40 shadow-xs">
                  <img
                    src={category.thumbnail}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Typography: Category Name + Useful Description */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-2xl font-serif font-medium text-navy group-hover:text-brand transition-colors duration-200 tracking-tight">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Right Column: Meta Pills + Circular Arrow Button */}
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pl-24 md:pl-0">
                {/* Duration Hint Pill */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand/50 border border-champagne/40 text-xs text-charcoal-muted font-medium whitespace-nowrap">
                  <Clock size={12} className="text-brand/70" />
                  <span>{durationHint}</span>
                </div>

                {/* Starting Price */}
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-light leading-none">
                    {lang === 'fr' ? 'À partir de' : 'From'}
                  </span>
                  <span className="text-base sm:text-xl font-serif font-semibold text-navy group-hover:text-brand transition-colors whitespace-nowrap">
                    {priceFrom} <span className="text-xs font-sans font-medium text-charcoal-muted">MAD</span>
                  </span>
                </div>

                {/* Circular Arrow Button (Moves slightly to the right on hover) */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-sand/60 group-hover:bg-brand text-navy group-hover:text-white border border-champagne/40 group-hover:border-transparent flex items-center justify-center shrink-0 shadow-xs transition-all duration-300"
                  aria-hidden="true"
                >
                  <ArrowRight
                    size={17}
                    className="transform group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </div>
              </div>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
};
