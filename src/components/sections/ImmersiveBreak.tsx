import React from 'react';
import { Waves, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { SPA_IMAGES } from '../../data/spaImages';

interface ImmersiveBreakProps {
  lang: Language;
}

export const ImmersiveBreak: React.FC<ImmersiveBreakProps> = ({ lang }) => {
  return (
    <section className="relative py-36 sm:py-48 bg-navy-950 overflow-hidden text-center">
      {/* Background High-Res Photograph of Jacuzzi / Pool */}
      <div className="absolute inset-0">
        <img
          src={SPA_IMAGES.bluePoolJacuzzi}
          alt="Sabon Spa Tangier Jacuzzi Sanctuary"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.08] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/60 to-navy-950" />
      </div>

      {/* Atmospheric Caustic & Starfield Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/25 via-navy-900/40 to-transparent pointer-events-none animate-caustic" />

      {/* Narrative & Quote */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-900/80 backdrop-blur-md border border-aqua/40 text-aqua mb-2 shadow-glow-aqua mx-auto">
          <Waves size={20} className="animate-pulse-subtle" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-aqua font-medium">
          {lang === 'fr' ? 'La Signature Sensorielle' : 'The Sensory Signature'}
        </p>

        <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-light italic leading-tight text-glow-aqua max-w-3xl mx-auto">
          {lang === 'fr'
            ? '« Comme si vous étiez quelque part au fond de l’océan... Un silence précieux, une eau bienfaisante et le temps suspendu. »'
            : '“As if you were somewhere underneath the ocean... A rare stillness, therapeutic waters, and suspended time.”'}
        </blockquote>

        <div className="pt-3 flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-gold" />
          <span className="text-xs tracking-[0.2em] uppercase text-mist/75 font-light">
            Sabon Spa Tanger • Le Sanctuaire Bleu
          </span>
        </div>
      </div>
    </section>
  );
};
