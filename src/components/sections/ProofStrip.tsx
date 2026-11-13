import React from 'react';
import { Star, ShieldCheck, MapPin, Sparkles, Award } from 'lucide-react';
import { Language } from '../../types';

interface ProofStripProps {
  lang: Language;
}

export const ProofStrip: React.FC<ProofStripProps> = ({ lang }) => {
  const proofs = [
    {
      icon: <Star size={18} className="text-gold" fill="currentColor" />,
      metric: '5.0 ★',
      label: { fr: 'Google & Tripadvisor', en: 'Google & Tripadvisor' },
      detail: { fr: 'Excellence certifiée par nos hôtes', en: 'Certified excellence by guests' }
    },
    {
      icon: <ShieldCheck size={18} className="text-aqua" />,
      metric: '100%',
      label: { fr: 'Espaces Séparés', en: 'Separate Spaces' },
      detail: { fr: 'Ailes dédiées femmes et hommes', en: 'Dedicated women & men wings' }
    },
    {
      icon: <Award size={18} className="text-gold" />,
      metric: 'Signature',
      label: { fr: 'Voûte en Briques de Sel', en: 'Salt-Brick Starry Vault' },
      detail: { fr: 'Atmosphère sous-marine unique', en: 'Unique underwater atmosphere' }
    },
    {
      icon: <MapPin size={18} className="text-aqua" />,
      metric: 'Malabata',
      label: { fr: 'Baie de Tanger', en: 'Bay of Tangier' },
      detail: { fr: 'Cadre d’exception avec parking', en: 'Prime seaside with easy parking' }
    }
  ];

  return (
    <div className="relative z-20 -mt-6 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-navy-900/90 backdrop-blur-xl border border-aqua/25 rounded-2xl p-6 sm:p-8 shadow-luxury grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {proofs.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="w-10 h-10 rounded-full bg-navy-800/80 border border-aqua/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-aqua/50 transition">
              {item.icon}
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
              {item.metric}
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-aqua font-medium mt-1">
              {item.label[lang]}
            </span>
            <span className="text-[11px] text-mist/60 mt-1 max-w-[180px]">
              {item.detail[lang]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
