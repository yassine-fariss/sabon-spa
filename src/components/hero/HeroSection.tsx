import React, { useState, useRef } from 'react';
import { ChevronDown, Sparkles, Shield, Star, Layers, Rotate3d, X, Droplets, Compass } from 'lucide-react';
import { Language } from '../../types';
import { BlueSanctuary3D } from './BlueSanctuary3D';
import { getAssetUrl } from '../../utils/assets';

interface HeroSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenBooking,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'video'>('3d');
  const [isFocus3D, setIsFocus3D] = useState(false);
  const rippleTriggerRef = useRef<(() => void) | null>(null);

  const handleToggle3D = () => {
    if (viewMode !== '3d') {
      setViewMode('3d');
      setIsFocus3D(true);
    } else {
      // If already in 3D, toggle focus mode so clicking directly activates full interactive experience
      setIsFocus3D(!isFocus3D);
    }
    if (rippleTriggerRef.current) {
      rippleTriggerRef.current();
    }
  };

  const handleTriggerRipple = () => {
    if (rippleTriggerRef.current) {
      rippleTriggerRef.current();
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-navy-950 pt-28 pb-10">
      {/* Background Layer: 3D Sanctuary OR Authentic Video Reel */}
      <div className="absolute inset-0 z-0">
        {viewMode === '3d' ? (
          <>
            <BlueSanctuary3D
              isFocusMode={isFocus3D}
              onTriggerRipple={(fn) => {
                rippleTriggerRef.current = fn;
              }}
            />
            {/* Subtle underwater ambient gradient & grain - pointer-events-none so 3D receives drag */}
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              isFocus3D ? 'opacity-30' : 'opacity-100'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/50 to-transparent" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
              src={getAssetUrl('videos/hero-ambient.mp4')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/70" />
            <div className="absolute inset-0 bg-navy-950/30 backdrop-blur-[1px]" />
          </div>
        )}
      </div>

      {/* Top Controls: Mode Switcher Badge */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Focus Mode status when active */}
        {isFocus3D && viewMode === '3d' ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 backdrop-blur-md border border-aqua/40 text-[11px] text-aqua shadow-glow-aqua animate-fade-in">
            <Sparkles size={12} className="animate-pulse" />
            <span className="font-medium">
              {lang === 'fr' ? 'Mode 3D immersif actif • Glissez la souris ou touchez pour faire pivoter' : 'Interactive 3D Active • Drag to rotate 360°'}
            </span>
          </div>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Right: Switcher Badges */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-aqua/30 text-[11px] text-mist/80 shadow-lg">
          <button
            onClick={handleToggle3D}
            title={lang === 'fr' ? 'Cliquez pour explorer en 3D' : 'Click to explore in 3D'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition font-medium ${
              viewMode === '3d'
                ? 'bg-brand text-white shadow-glow-aqua'
                : 'text-mist/70 hover:text-white'
            }`}
          >
            <Sparkles size={12} className={isFocus3D ? 'animate-spin-slow text-aqua' : ''} />
            <span>3D Sanctuary {isFocus3D ? '(360°)' : ''}</span>
          </button>
          <button
            onClick={() => {
              setViewMode('video');
              setIsFocus3D(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition font-medium ${
              viewMode === 'video'
                ? 'bg-brand text-white shadow-glow-aqua'
                : 'text-mist/70 hover:text-white'
            }`}
          >
            <Layers size={12} />
            <span>{lang === 'fr' ? 'Vue Hammam' : 'Hammam View'}</span>
          </button>
        </div>
      </div>

      {/* Floating 3D Interaction Toolbar when in Focus Mode */}
      {isFocus3D && viewMode === '3d' && (
        <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-end gap-2 animate-fade-in">
          <button
            onClick={handleTriggerRipple}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-mist text-xs border border-aqua/30 transition hover:text-aqua"
            title={lang === 'fr' ? 'Créer une onde dans l’eau' : 'Trigger water ripple'}
          >
            <Droplets size={12} className="text-aqua" />
            <span>{lang === 'fr' ? 'Onde d’eau' : 'Ripple'}</span>
          </button>
          <button
            onClick={() => setIsFocus3D(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand/90 hover:bg-brand text-white text-xs border border-aqua/40 shadow-glow-aqua transition"
          >
            <X size={12} />
            <span>{lang === 'fr' ? 'Quitter 3D' : 'Exit 3D'}</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 transition-all duration-700 pointer-events-none ${
        isFocus3D ? 'opacity-20 pointer-events-none scale-95 translate-y-8' : 'opacity-100'
      }`}>
        <div className="max-w-2xl lg:max-w-3xl pointer-events-auto">
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

            <button
              onClick={() => {
                setViewMode('3d');
                setIsFocus3D(true);
                if (rippleTriggerRef.current) rippleTriggerRef.current();
              }}
              className="px-7 py-4 rounded-full bg-navy-900/80 hover:bg-navy-800 border border-aqua/35 text-aqua hover:text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition flex items-center justify-center gap-2 shadow-sm hover:shadow-glow-aqua"
            >
              <Sparkles size={14} className="text-aqua animate-pulse" />
              <span>{lang === 'fr' ? 'Explorer en 3D' : 'Explore in 3D'}</span>
            </button>

            <a
              href="#rituels"
              className="px-6 py-4 rounded-full bg-navy-900/50 hover:bg-navy-800/70 backdrop-blur-md border border-aqua/20 text-mist/80 hover:text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition text-center"
            >
              {lang === 'fr' ? 'Soins & Tarifs' : 'Treatments'}
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

      {/* Interactive 3D drag hint (Desktop right corner) */}
      {!isFocus3D && viewMode === '3d' && (
        <div className="hidden lg:flex items-center gap-2.5 absolute right-8 bottom-16 z-20 px-4 py-2 rounded-full bg-navy-950/70 backdrop-blur-md border border-aqua/30 text-[11px] text-aqua/90 shadow-glow-aqua animate-fade-in pointer-events-none select-none">
          <Rotate3d size={14} className="animate-spin-slow text-aqua" />
          <span>{lang === 'fr' ? 'Faites glisser la souris pour faire pivoter le sanctuaire 3D' : 'Drag with mouse to rotate 3D sanctuary'}</span>
        </div>
      )}

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
