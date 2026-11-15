import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, MapPin, Award } from 'lucide-react';
import { Language } from '../../types';
import { Reveal } from '../ui/Reveal';

interface WhySabonProps {
  lang: Language;
}

export const WhySabon: React.FC<WhySabonProps> = ({ lang }) => {
  const pillars = [
    {
      icon: <ShieldCheck size={22} className="text-brand" />,
      title: {
        fr: '100% Espaces Séparés',
        en: '100% Dedicated Separate Wings'
      },
      desc: {
        fr: 'Une intimité scrupuleusement respectée avec deux ailes distinctes et autonomes pour les femmes et pour les hommes (hammams, vestiaires et lounges dédiés).',
        en: 'Strictly preserved discretion with two independent, fully sequestered wings for ladies and gentlemen (dedicated hammams, suites, and lounges).'
      }
    },
    {
      icon: <Sparkles size={22} className="text-gold" />,
      title: {
        fr: 'Voûte Céleste & Briques de Sel',
        en: 'Illuminated Salt Vault & Starfield'
      },
      desc: {
        fr: 'Un décor spectaculaire taillé dans des blocs de sel minéral et illuminé de fibres optiques, créant un microclimat propice à la détente pulmonaire.',
        en: 'A restorative atmosphere lined with therapeutic mineral salt bricks and a starry ceiling, producing a therapeutic microclimate.'
      }
    },
    {
      icon: <HeartHandshake size={22} className="text-brand" />,
      title: {
        fr: 'Maîtres Praticiens Certifiés',
        en: 'Master Certified Bodyworkers'
      },
      desc: {
        fr: 'Des thérapeutes chevronnés et diplômés, experts du hammam royal marocain, du Kobido japonais et du Deep Tissue myofascial.',
        en: 'Experienced, certified bodyworkers seasoned in authentic Moroccan hammam rituals, Japanese Kobido lift, and myofascial deep tissue.'
      }
    },
    {
      icon: <MapPin size={22} className="text-gold" />,
      title: {
        fr: 'Emplacement Privilégié à Malabata',
        en: 'Prime Malabata Bay Location'
      },
      desc: {
        fr: 'Niché face à la baie de Tanger à la Résidence Iris, avec accès aisé et stationnement à proximité immédiate pour une arrivée sans stress.',
        en: 'Nestled facing Tangier Bay at Résidence Iris, offering effortless access and convenient nearby parking for a calm arrival.'
      }
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-ivory to-sand/40 text-navy relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-medium mb-3">
              <Award size={13} />
              <span>{lang === 'fr' ? 'La Confiance Sabon Spa' : 'Why Guests Choose Us'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Ce qui rend notre <span className="italic text-brand">Sanctuaire Unique</span>
                </>
              ) : (
                <>
                  What Sets Our <span className="italic text-brand">Sanctuary Apart</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
              {lang === 'fr'
                ? 'L’alliance rare d’un design contemporain primé, de la tradition marocaine millénaire et d’un respect absolu de l’intimité.'
                : 'The rare harmony of contemporary cinematic design, timeless Moroccan tradition, and uncompromised discretion.'}
            </p>
          </div>
        </Reveal>

        {/* 4 Pillars Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <Reveal
              key={idx}
              variant="pop-up"
              delay={idx * 110}
              duration={750}
            >
              <div
                className="h-full p-8 rounded-2xl bg-white border border-champagne/35 hover:border-brand/40 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-luxury group text-navy"
              >
                <div className="w-12 h-12 rounded-xl bg-sand/40 border border-champagne/35 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sand/70 transition duration-300 shadow-xs">
                  {p.icon}
                </div>
                <h3 className="text-lg font-serif text-navy font-medium mb-3 group-hover:text-brand transition duration-200">
                  {p.title[lang]}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                  {p.desc[lang]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
