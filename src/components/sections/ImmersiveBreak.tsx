import React from 'react';
import { Waves } from 'lucide-react';
import { Language } from '../../types';

interface ImmersiveBreakProps {
  lang: Language;
}

export const ImmersiveBreak: React.FC<ImmersiveBreakProps> = ({ lang }) => {
  return (
    <section className="relative py-32 sm:py-44 bg-navy-950 overflow-hidden text-center">
      {/* Background Subtle Caustic Shimmer */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/25 via-navy-900/60 to-navy-950 pointer-events-none animate-caustic" />
      <div className="absolute inset-0 zellige-pattern opacity-10 pointer-events-none" />

      {/* Atmospheric Starfield / Water Caustic Overlay */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-800/80 border border-aqua/30 text-aqua mb-2 shadow-glow-aqua mx-auto">
          <Waves size={20} className="animate-pulse-subtle" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-aqua/90 font-medium">
          {lang === 'fr' ? 'La Signature Sensorielle' : 'The Sensory Signature'}
        </p>

        <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-light italic leading-tight text-glow-aqua max-w-3xl mx-auto">
          {lang === 'fr'
            ? '« Comme si vous étiez quelque part au fond de l’océan... Un silence précieux, une eau bienfaisante et le temps suspendu. »'
            : '“As if you were somewhere underneath the ocean... A rare stillness, therapeutic waters, and suspended time.”'}
        </blockquote>

        <div className="pt-2">
          <span className="text-xs tracking-[0.2em] uppercase text-mist/60 font-light block">
            — Sabon Spa Tanger • Le Sanctuaire Bleu
          </span>
        </div>
      </div>
    </section>
  );
};
