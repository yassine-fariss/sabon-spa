import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, MapPin, Award, Check } from 'lucide-react';
import { Language } from '../../types';

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
        fr: 'Des thérapeutes chevronnés (Latifa, Anne, Jay, Sam...) experts du hammam royal marocain, du Kobido japonais et du Deep Tissue myofascial.',
        en: 'Experienced therapists (Latifa, Anne, Jay, Sam...) seasoned in authentic Moroccan hammam rituals, Japanese Kobido lift, and myofascial deep tissue.'
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
    <section className="py-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-navy-900/60 border border-aqua/15 hover:border-aqua/40 transition duration-300 hover:-translate-y-1 shadow-lg hover:shadow-glow-aqua"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-800 border border-aqua/25 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="text-lg font-serif text-white font-normal mb-3">
                {p.title[lang]}
              </h3>
              <p className="text-xs text-mist/70 leading-relaxed font-light">
                {p.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
