import React, { useState } from 'react';
import type { Subcategory, Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { ServiceRow } from './ServiceRow';
import { PackCard } from './PackCard';

interface SubcategoryAccordionProps {
  subcategory: Subcategory;
  services: Service[];
  categoryId: string;
  lang: Lang;
  defaultOpen?: boolean;
}

export const SubcategoryAccordion: React.FC<SubcategoryAccordionProps> = ({
  subcategory,
  services,
  categoryId,
  lang,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const name = subcategory.name[lang] || subcategory.name.fr;
  const isPacksCategory = categoryId === 'packs';

  // Show 5 items by default, rest behind "See all (N)"
  const INITIAL_LIMIT = isPacksCategory ? 6 : 5;
  const displayedServices = showAll ? services : services.slice(0, INITIAL_LIMIT);
  const hasMore = services.length > INITIAL_LIMIT && !showAll;

  const accordionId = `accordion-${subcategory.id}`;

  return (
    <div
      id={`subcat-${subcategory.id}`}
      className="rounded-2xl border border-navy/10 bg-white/70 backdrop-blur-md shadow-xs overflow-hidden transition-all duration-300"
      style={{ contentVisibility: 'auto' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={accordionId}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-mist/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg sm:text-xl font-serif font-semibold text-navy">
            {name}
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-mist text-brand">
            {services.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-navy/40">
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div id={accordionId} className="border-t border-navy/10 animate-fade-in">
          {isPacksCategory ? (
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedServices.map((service) => (
                <PackCard key={service.id} pack={service} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-navy/5">
              {displayedServices.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  lang={lang}
                  isExpanded={expandedServiceId === service.id}
                  onToggleExpand={() =>
                    setExpandedServiceId((prev) => (prev === service.id ? null : service.id))
                  }
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="p-4 text-center border-t border-navy/5 bg-mist/10">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-xs sm:text-sm font-semibold text-brand hover:text-brand-700 hover:underline inline-flex items-center gap-1.5 py-1 px-3"
              >
                <span>{lang === 'fr' ? `Voir tous les ${services.length} soins` : `View all ${services.length} treatments`}</span>
                <span className="font-bold">↓</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
