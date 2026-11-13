import React from 'react';
import { Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { SERVICES } from '../../data/content';

interface SignatureExperiencesProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
}

export const SignatureExperiences: React.FC<SignatureExperiencesProps> = ({
  lang,
  onSelectService
}) => {
  // Flagship signature rituals
  const signatures = SERVICES.slice(0, 4);

  return (
    <section id="rituels" className="relative py-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/10 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Expériences Emblématiques' : 'Signature Experiences'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                Les Grands Rituels du <span className="italic text-aqua">Sanctuaire</span>
              </>
            ) : (
              <>
                The Sanctuary’s <span className="italic text-aqua">Great Rituals</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed">
            {lang === 'fr'
              ? 'Une sélection de cérémonies thermales et corporelles pensées pour relâcher les tensions, purifier la peau et élever l’esprit.'
              : 'A curated selection of thermal and bodywork ceremonies designed to dissolve stress, purify skin, and restore inner harmony.'}
          </p>
        </div>

        {/* 4 Flagship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatures.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-navy-950/60 rounded-2xl border border-aqua/20 hover:border-aqua/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-glow-aqua"
            >
              {/* Arch Top Image Frame */}
              <div className="relative h-64 overflow-hidden bg-navy-900">
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-108 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                  <Clock size={12} className="text-aqua" />
                  <span>{service.duration}</span>
                </div>

                {service.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-navy-950 text-[10px] uppercase tracking-wider font-semibold shadow-sm">
                    {lang === 'fr' ? 'Signature' : 'Popular'}
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-aqua/90 font-medium">
                      {service.category === 'hammam' ? (lang === 'fr' ? 'Hammam & Corps' : 'Hammam & Body') :
                       service.category === 'massages' ? (lang === 'fr' ? 'Massage Signature' : 'Signature Massage') :
                       service.category === 'beauty' ? (lang === 'fr' ? 'Soin Visage' : 'Facial Care') :
                       (lang === 'fr' ? 'Hydrothérapie' : 'Hydrotherapy')}
                    </span>
                    <span className="text-sm font-semibold text-gold">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white font-normal group-hover:text-aqua transition mb-3">
                    {service.title[lang]}
                  </h3>

                  <p className="text-xs text-mist/70 leading-relaxed font-light line-clamp-3 mb-4">
                    {service.description[lang]}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-1.5 mb-6">
                    {service.features[lang].slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-[11px] text-mist/80 flex items-center gap-2">
                        <Check size={12} className="text-aqua shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Trigger */}
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-navy-900 group-hover:bg-brand text-mist group-hover:text-white border border-aqua/25 group-hover:border-transparent text-xs uppercase tracking-[0.16em] font-medium transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{lang === 'fr' ? 'Réserver ce soin' : 'Book Ritual'}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
