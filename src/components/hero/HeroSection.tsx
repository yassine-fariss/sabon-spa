import React, { useState } from 'react';
import { ChevronDown, Sparkles, Shield, Star, Play, Pause, Layers } from 'lucide-react';
import { Language } from '../../types';
import { BlueSanctuary3D } from './BlueSanctuary3D';
import { BUSINESS_INFO } from '../../data/content';

interface HeroSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenBooking,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'video'>('3d');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-navy-950 pt-28 pb-10">
      {/* Background Layer: 3D Sanctuary OR Authentic Video Reel */}
      <div className="absolute inset-0 z-0">
        {viewMode === '3d' ? (
          <>
            <BlueSanctuary3D />
            {/* Subtle underwater ambient gradient & grain */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/50 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
              src="/videos/hero-ambient.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/70" />
            <div className="absolute inset-0 bg-navy-950/30 backdrop-blur-[1px]" />
          </div>
        )}
      </div>

      {/* Mode Switcher Badge (Top Right Sub-Nav) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-end">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-navy-900/70 backdrop-blur-md border border-aqua/25 text-[11px] text-mist/80 shadow-sm">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition font-medium ${
              viewMode === '3d'
                ? 'bg-brand text-white shadow-glow-aqua'
                : 'text-mist/60 hover:text-white'
            }`}
          >
            <Sparkles size={11} />
            <span>3D Sanctuary</span>
          </button>
          <button
            onClick={() => setViewMode('video')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition font-medium ${
              viewMode === 'video'
                ? 'bg-brand text-white shadow-glow-aqua'
                : 'text-mist/60 hover:text-white'
            }`}
          >
            <Layers size={11} />
            <span>{lang === 'fr' ? 'Vue Hammam' : 'Hammam View'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow / Location */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 backdrop-blur-md border border-aqua/30 text-aqua text-xs uppercase tracking-[0.22em] font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-aqua animate-pulse" />
            <span>Tanger • Baie de Malabata</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight text-glow-aqua">
            {lang === 'fr' ? (
              <>
                Sous la surface,<br />
                <span className="italic font-normal text-mist">le calme absolu.</span>
              </>
            ) : (
              <>
                Beneath the surface,<br />
                <span className="italic font-normal text-mist">absolute serenity.</span>
              </>
            )}
          </h1>

          {/* Subline / Narrative */}
          <p className="mt-6 text-base sm:text-lg text-mist/85 font-light leading-relaxed max-w-xl">
            {lang === 'fr'
              ? 'Poussez les portes de notre sanctuaire bleu face à la baie de Tanger. Hammam royal sous voûte étoilée de briques de sel, massages d’exception et espaces 100% séparés hommes et femmes.'
              : 'Enter our deep blue sanctuary facing the historic bay of Tangier. Royal Moroccan hammam beneath illuminated salt-brick vaults, master bodywork, and strictly separate wings for women and men.'}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full bg-brand hover:bg-brand-600 border border-aqua/40 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] shadow-glow-aqua hover:shadow-xl transition active:scale-[0.98] text-center"
            >
              {lang === 'fr' ? 'Réserver une expérience' : 'Book an Experience'}
            </button>

            <a
              href="#rituels"
              className="px-8 py-4 rounded-full bg-navy-900/60 hover:bg-navy-800/80 backdrop-blur-md border border-aqua/25 text-mist font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition text-center hover:border-aqua/50"
            >
              {lang === 'fr' ? 'Découvrir les soins' : 'Explore Treatments'}
            </a>
          </div>

          {/* Trust points strip */}
          <div className="mt-12 pt-8 border-t border-aqua/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-mist/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-aqua/15 border border-aqua/30 flex items-center justify-center text-aqua">
                <Shield size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">100% Séparé</span>
                <span className="text-[11px] text-mist/60">{lang === 'fr' ? 'Hommes & Femmes' : 'Men & Women'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                <Star size={14} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">5.0 ★ Vérifié</span>
                <span className="text-[11px] text-mist/60">Google & Tripadvisor</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand/30 border border-brand/50 flex items-center justify-center text-aqua">
                <Sparkles size={14} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">10h00 – 23h00</span>
                <span className="text-[11px] text-mist/60">{lang === 'fr' ? 'Ouvert 7 jours / 7' : 'Open 7 days a week'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pb-2">
        <a
          href="#presentation"
          className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-mist/50 hover:text-aqua transition"
        >
          <span>{lang === 'fr' ? 'Découvrir' : 'Scroll to explore'}</span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};
