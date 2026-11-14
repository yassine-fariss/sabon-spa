import React, { useState } from 'react';
import type { Subcategory, Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { ServiceRow } from './ServiceRow';
import { PackCard } from './PackCard';
import { ChevronDown } from 'lucide-react';

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

  const INITIAL_LIMIT = isPacksCategory ? 6 : 5;
  const displayedServices = showAll ? services : services.slice(0, INITIAL_LIMIT);
  const hasMore = services.length > INITIAL_LIMIT && !showAll;

  const accordionId = `accordion-${subcategory.id}`;

  return (
    <div
      id={`subcat-${subcategory.id}`}
      className="rounded-2xl border border-aqua/15 bg-navy-900/60 backdrop-blur-xl shadow-luxury overflow-hidden transition-all duration-300"
      style={{ contentVisibility: 'auto' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={accordionId}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-navy-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-aqua/40"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg sm:text-xl font-serif font-medium text-white">
            {name}
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-aqua/10 text-aqua border border-aqua/20">
            {services.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-aqua/60">
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-aqua' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div id={accordionId} className="border-t border-aqua/10 animate-fade-in">
          {isPacksCategory ? (
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedServices.map((service) => (
                <PackCard key={service.id} pack={service} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-aqua/10">
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
            <div className="p-4 text-center border-t border-aqua/10 bg-navy-950/40">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-xs sm:text-sm font-medium text-aqua hover:text-white hover:underline inline-flex items-center gap-1.5 py-1 px-3 transition-colors"
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
