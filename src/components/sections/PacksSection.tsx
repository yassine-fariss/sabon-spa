import React from 'react';
import { Sparkles, Check, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { PACKS } from '../../data/content';

interface PacksSectionProps {
  lang: Language;
  onSelectPack: (packId: string) => void;
}

export const PacksSection: React.FC<PacksSectionProps> = ({
  lang,
  onSelectPack
}) => {
  return (
    <section id="packs" className="py-28 bg-ivory text-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-semibold mb-3">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Rituels Combinés' : 'Curated Packages'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                Les Packs Sabon : <span className="italic text-brand">Immersion Complète</span>
              </>
            ) : (
              <>
                The Sabon Packs: <span className="italic text-brand">Complete Immersion</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy/70 font-light leading-relaxed">
            {lang === 'fr'
              ? 'Des parcours de 2 à 4 heures alliant hammam privé, gommages traditionnels, massages signatures et pauses gourmandes.'
              : 'Holistic journeys spanning 2 to 4 hours pairing private thermal hammams, artisanal scrubs, signature bodywork, and tea ceremonies.'}
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pack.popular
                  ? 'bg-navy text-white shadow-2xl border-2 border-aqua/40 lg:-translate-y-2'
                  : 'bg-white text-navy shadow-lg border border-navy/10 hover:shadow-xl'
              }`}
            >
              {/* Badge */}
              {pack.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-[0.18em] font-bold shadow-md">
                  {pack.badge[lang]}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`text-xs uppercase tracking-[0.2em] font-medium ${pack.popular ? 'text-aqua' : 'text-brand'}`}>
                    {pack.tier.toUpperCase()}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    pack.popular ? 'bg-navy-800 text-mist' : 'bg-mist text-navy/80'
                  }`}>
                    <Clock size={12} className={pack.popular ? 'text-aqua' : 'text-brand'} />
                    <span>{pack.duration}</span>
                  </div>
                </div>

                <h3 className={`text-2xl font-serif font-normal mb-2 ${pack.popular ? 'text-white' : 'text-navy'}`}>
                  {pack.title[lang]}
                </h3>

                <p className={`text-xs leading-relaxed mb-6 font-light ${pack.popular ? 'text-mist/75' : 'text-navy/70'}`}>
                  {pack.subtitle[lang]}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-current/10">
                  <span className="text-3xl sm:text-4xl font-serif font-light">
                    {pack.price}
                  </span>
                  <span className={`text-xs ml-2 ${pack.popular ? 'text-mist/60' : 'text-navy/60'}`}>
                    {lang === 'fr' ? '/ personne (TTC)' : '/ guest'}
                  </span>
                </div>

                {/* Inclusions */}
                <div className="space-y-3 mb-8">
                  <span className={`text-[11px] uppercase tracking-[0.16em] font-semibold block ${pack.popular ? 'text-aqua' : 'text-brand'}`}>
                    {lang === 'fr' ? 'Ce qui est inclus :' : 'Included in this ritual:'}
                  </span>
                  <ul className="space-y-2.5">
                    {pack.inclusions[lang].map((inc, i) => (
                      <li key={i} className="text-xs flex items-start gap-2.5 leading-relaxed">
                        <Check size={14} className={`shrink-0 mt-0.5 ${pack.popular ? 'text-aqua' : 'text-brand'}`} />
                        <span className={pack.popular ? 'text-mist/90' : 'text-navy/85'}>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectPack(pack.id)}
                className={`w-full py-3.5 px-6 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition flex items-center justify-center gap-2 ${
                  pack.popular
                    ? 'bg-brand hover:bg-brand-600 text-white shadow-glow-aqua'
                    : 'bg-navy hover:bg-navy-800 text-white shadow-md'
                }`}
              >
                <span>{lang === 'fr' ? 'Réserver ce pack' : 'Book this Pack'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
