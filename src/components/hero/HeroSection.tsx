import React from 'react';
import { ChevronDown, Sparkles, Shield, Star, ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { getAssetUrl } from '../../utils/assets';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
}) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-navy-950 pt-28 pb-10">
      {/* Background Layer: Authentic Hammam Ambient Video & High-Res Photography Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={SPA_IMAGES.hammamStarlight}
          className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.08] scale-105"
          src={getAssetUrl('videos/hero-ambient.mp4')}
        />
        {/* Cinematic dark luxury vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/40 to-transparent" />
        {/* Subtle underwater caustic shimmer */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/20 via-transparent to-transparent pointer-events-none animate-caustic" />
      </div>

      {/* Main Hero Content Area - Minimalist Clean Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-12">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 backdrop-blur-md border border-aqua/30 text-aqua text-xs uppercase tracking-[0.22em] font-medium mb-6 shadow-sm animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <Sparkles size={12} className="text-aqua" />
            <span>Tanger</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight text-glow-aqua animate-fade-in-up"
            style={{ animationDelay: '250ms' }}
          >
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
          <p
            className="mt-6 text-base sm:text-lg text-mist/85 font-light leading-relaxed max-w-xl animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            {lang === 'fr'
              ? 'Poussez les portes de notre sanctuaire bleu face à la baie de Tanger. Hammam royal sous voûte étoilée de briques de sel, massages d’exception et espaces 100% séparés hommes et femmes.'
              : 'Enter our deep blue sanctuary facing the historic bay of Tangier. Royal Moroccan hammam beneath illuminated salt-brick vaults, master bodywork, and strictly separate wings for women and men.'}
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '550ms' }}
          >
            <a
              href={getWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-brand hover:bg-brand-600 border border-aqua/40 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] shadow-glow-aqua hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare size={16} />
              <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
            </a>

            <a
              href="#soins"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('soins')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-full bg-navy-900/80 hover:bg-navy-800 border border-aqua/35 text-aqua hover:text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm hover:shadow-glow-aqua text-center group"
            >
              <span>{lang === 'fr' ? 'Découvrir nos services' : 'Explore Our Services'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition duration-200" />
            </a>
          </div>

          {/* Trust points strip */}
          <div
            className="mt-12 pt-8 border-t border-aqua/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-mist/80 animate-fade-in-up"
            style={{ animationDelay: '700ms' }}
          >
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
