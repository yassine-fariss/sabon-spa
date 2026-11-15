import React from 'react';
import { Waves, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { SPA_IMAGES } from '../../data/spaImages';
import { Reveal } from '../ui/Reveal';

interface ImmersiveBreakProps {
  lang: Language;
}

export const ImmersiveBreak: React.FC<ImmersiveBreakProps> = ({ lang }) => {
  return (
    <section className="relative py-36 sm:py-48 bg-navy-950 overflow-hidden text-center">
      {/* Top soft transition from light sand into immersive break */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/40 via-navy/80 to-transparent z-20 pointer-events-none" />

      {/* Background High-Res Photograph with slow breathing drift */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={SPA_IMAGES.bluePoolJacuzzi}
          alt="Sabon Spa Tangier Jacuzzi Sanctuary"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05] scale-105 animate-drift-x"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-navy/90" />
      </div>

      {/* Atmospheric Caustic & Starfield Overlay */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/20 via-navy/40 to-transparent pointer-events-none animate-caustic" />

      {/* Floating decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand/15 filter blur-[100px] pointer-events-none animate-orb-float" />

      {/* Narrative & Quote */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <Reveal variant="scale-up" duration={700}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-champagne/40 text-champagne mb-2 shadow-glow-aqua mx-auto animate-pulse-subtle">
            <Waves size={20} />
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={100} duration={600}>
          <p className="text-xs uppercase tracking-[0.3em] text-champagne font-medium">
            {lang === 'fr' ? 'La Signature Sensorielle' : 'The Sensory Signature'}
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={200} duration={800}>
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-light italic leading-tight text-glow-aqua max-w-3xl mx-auto">
            {lang === 'fr'
              ? '« Comme si vous étiez quelque part au fond de l’océan... Un silence précieux, une eau bienfaisante et le temps suspendu. »'
              : '“As if you were somewhere underneath the ocean... A rare stillness, therapeutic waters, and suspended time.”'}
          </blockquote>
        </Reveal>

        <Reveal variant="fade-up" delay={300} duration={600}>
          <div className="pt-3 flex items-center justify-center gap-2">
            <Sparkles size={13} className="text-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-mist/85 font-light">
              Sabon Spa Tanger
            </span>
          </div>
        </Reveal>
      </div>

      {/* Bottom soft transition from immersive break into warm ivory gallery */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory via-navy/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};
