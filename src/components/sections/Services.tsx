import React, { useState } from 'react';
import { Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Language, ServiceItem } from '../../types';
import { SERVICES } from '../../data/content';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  lang,
  onSelectService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { fr: 'Tous les Soins', en: 'All Treatments' } },
    { id: 'hammam', label: { fr: 'Hammam & Corps', en: 'Hammam & Body' } },
    { id: 'massages', label: { fr: 'Massages Sabon', en: 'Sabon Massages' } },
    { id: 'beauty', label: { fr: 'Beauté & Visage', en: 'Beauty & Facial' } },
    { id: 'hydro', label: { fr: 'Hydrothérapie', en: 'Hydrotherapy' } },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="soins" className="py-28 bg-mist text-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-semibold mb-3">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Menu des Cérémonies' : 'Treatment Collection'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                L’Art du Soin & des <span className="italic text-brand">Rituels Sensoriels</span>
              </>
            ) : (
              <>
                The Art of Wellness & <span className="italic text-brand">Sensory Rituals</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy/70 font-light leading-relaxed">
            {lang === 'fr'
              ? 'Chaque soin est réalisé selon un protocole rigoureux, sublimé par des actifs d\'origine biologique et dispensé dans le calme d\'espaces privatisés.'
              : 'Each ritual is orchestrated with calibrated artistry, enriched by precious botanical extracts and performed within tranquil private treatment rooms.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition ${
                  activeCategory === cat.id
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-white/80 text-navy/70 hover:bg-white hover:text-navy border border-navy/10'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Services List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-navy/5">
                  <img
                    src={service.image}
                    alt={service.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy text-xs font-semibold shadow-sm flex items-center gap-1.5">
                    <Clock size={12} className="text-brand" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-navy/90 text-white text-xs font-semibold shadow-sm">
                    {service.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-navy font-normal mb-2 group-hover:text-brand transition">
                    {service.title[lang]}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed font-light mb-4 line-clamp-3">
                    {service.description[lang]}
                  </p>

                  <div className="border-t border-navy/5 pt-3 space-y-1.5 mb-2">
                    {service.features[lang].map((f, i) => (
                      <div key={i} className="text-[11px] text-navy/75 flex items-center gap-2">
                        <Check size={12} className="text-brand shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-mist hover:bg-brand text-navy hover:text-white border border-brand/20 hover:border-transparent text-xs uppercase tracking-[0.16em] font-medium transition flex items-center justify-center gap-2"
                >
                  <span>{lang === 'fr' ? 'Réserver ce soin' : 'Book Treatment'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
