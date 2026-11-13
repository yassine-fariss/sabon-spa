import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, MapPin, Award } from 'lucide-react';
import { Language } from '../../types';
import { SPA_IMAGES } from '../../data/spaImages';
import { Reveal } from '../ui/Reveal';

interface WhySabonProps {
  lang: Language;
}

export const WhySabon: React.FC<WhySabonProps> = ({ lang }) => {
  const pillars = [
    {
      icon: <ShieldCheck size={22} className="text-aqua" />,
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
        fr: 'Un décor sous-marin spectaculaire taillé dans des blocs de sel minéral et illuminé de fibres optiques, créant un microclimat propice à la détente pulmonaire.',
        en: 'A cinematic aquatic atmosphere lined with therapeutic mineral salt bricks and a starry ceiling, producing a restorative microclimate.'
      }
    },
    {
      icon: <HeartHandshake size={22} className="text-aqua" />,
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
    <section className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Subtle Photo Ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src={SPA_IMAGES.hammamPanorama}
          alt="Sabon Spa Panoramic Sanctuary"
          className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950" />
      </div>

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/2 -left-36 w-80 h-80 rounded-full bg-brand/10 filter blur-[120px] pointer-events-none animate-orb-float" />
      <div className="absolute bottom-10 -right-36 w-80 h-80 rounded-full bg-aqua/10 filter blur-[120px] pointer-events-none animate-orb-float" style={{ animationDelay: '-6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
              <Award size={13} />
              <span>{lang === 'fr' ? 'La Confiance Sabon Spa' : 'Why Guests Choose Us'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Ce qui rend notre <span className="italic text-aqua">Sanctuaire Unique</span>
                </>
              ) : (
                <>
                  What Sets Our <span className="italic text-aqua">Sanctuary Apart</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed">
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
              variant="fade-up"
              delay={idx * 110}
              duration={750}
            >
              <div
                className="h-full p-8 rounded-2xl bg-navy-900/70 backdrop-blur-sm border border-aqua/15 hover:border-aqua/45 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-glow-aqua group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-aqua/25 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-aqua/50 transition duration-300">
                  {p.icon}
                </div>
                <h3 className="text-lg font-serif text-white font-normal mb-3 group-hover:text-aqua transition duration-200">
                  {p.title[lang]}
                </h3>
                <p className="text-xs text-mist/70 leading-relaxed font-light">
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
