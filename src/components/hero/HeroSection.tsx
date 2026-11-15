import React from 'react';
import { ChevronDown, Sparkles, Shield, Star, ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { getAssetUrl } from '../../utils/assets';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface HeroSectionProps {
  lang: Language;
}

const AVATARS = [
  'images/avatars/avatar-1.jpg',
  'images/avatars/avatar-2.jpg',
  'images/avatars/avatar-3.jpg',
  'images/avatars/avatar-4.jpg',
  'images/avatars/avatar-5.jpg',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
}) => {
  const satisfiedText = lang === 'fr' ? '2K+ clients satisfaits' : '2K+ Satisfied Customers';

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-navy-950 pt-36 sm:pt-40 pb-12">
      {/* Background Layer: Authentic Hammam Ambient Video & High-Res Photography Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={SPA_IMAGES.hammamStarlight}
          className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.05] scale-105"
          src={getAssetUrl('videos/hero-ambient.mp4')}
        />
        {/* Soft luxury vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
        {/* Subtle underwater caustic shimmer */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aqua/20 via-transparent to-transparent pointer-events-none animate-caustic" />
        {/* Bottom soft transition into warm ivory */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-ivory via-ivory/50 to-transparent opacity-90 pointer-events-none" />
      </div>

      {/* Main Hero Content Area - Minimalist Clean Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Trust Row: 5 Avatars + 4.9 Stars + 2K+ Clients Satisfaits (No background, clean & uncrowded) */}
          <div
            className="mb-6 sm:mb-8 inline-flex flex-wrap items-center gap-x-3 sm:gap-x-3.5 gap-y-2 select-none animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            {/* 1. Avatars: 5 overlapping round photos */}
            <div className="flex items-center -space-x-2.5 shrink-0" aria-hidden="true">
              {AVATARS.map((path, idx) => (
                <img
                  key={idx}
                  src={getAssetUrl(path)}
                  alt=""
                  className="w-7 h-7 min-[480px]:w-8 min-[480px]:h-8 rounded-full border-2 border-navy-900 object-cover shrink-0 shadow-md"
                  loading="eager"
                  width={32}
                  height={32}
                />
              ))}
            </div>

            {/* 2. Rating: 5 gold stars + 4.9 */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex items-center text-gold" aria-label="Note de 4.9 sur 5 étoiles">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 fill-current drop-shadow-xs"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-white text-xs sm:text-sm ml-0.5 drop-shadow-xs">
                4.9
              </span>
            </div>

            {/* Divider */}
            <span
              className="inline-block w-px h-3.5 bg-white/30 shrink-0"
              aria-hidden="true"
            />

            {/* 3. Customer Count + Smiley Emoji */}
            <div className="flex items-center gap-1.5 shrink-0 font-medium text-white/95 text-xs sm:text-sm tracking-wide drop-shadow-xs">
              <span>{satisfiedText}</span>
              <span role="img" aria-label="Visage souriant">😊</span>
            </div>
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
              className="px-7 py-4 rounded-full bg-navy-900/80 hover:bg-navy-800 border border-champagne/40 text-champagne-light hover:text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-sm hover:shadow-luxury text-center group"
            >
              <span>{lang === 'fr' ? 'Découvrir nos services' : 'Explore Our Services'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pb-2">
        <a
          href="#presentation"
          className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-mist/60 hover:text-champagne-light transition"
        >
          <span>{lang === 'fr' ? 'Découvrir' : 'Scroll to explore'}</span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};
