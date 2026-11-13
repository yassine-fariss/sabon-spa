import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, ShieldCheck, MessageCircle, HeartHandshake } from 'lucide-react';
import { Language, ReviewItem } from '../../types';
import { REVIEWS } from '../../data/content';

interface ReviewsSectionProps {
  lang: Language;
}

// Single Review Card with scroll-triggered pop-up animation
const AnimatedReviewCard: React.FC<{
  rev: ReviewItem;
  index: number;
  lang: Language;
}> = ({ rev, index, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasPopped, setHasPopped] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasPopped(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      style={{
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
        transitionDelay: `${(index % 2) * 120}ms`
      }}
      className={`transform transition-all ${
        hasPopped
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-16 scale-[0.91]'
      }`}
    >
      <div
        className={`h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1.5 ${
          rev.highlight
            ? 'bg-gradient-to-b from-navy-900/90 via-navy-900/75 to-navy-950 border-2 border-gold/40 shadow-glow-gold'
            : 'bg-navy-900/60 hover:bg-navy-900/85 border border-aqua/20 hover:border-aqua/50 shadow-xl'
        }`}
      >
        <div>
          {/* Top Bar: Review Index, Author, Meta & Google Badge */}
          <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-aqua/10">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Avatar Initial Circle */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand via-brand-600 to-aqua flex items-center justify-center text-white font-semibold text-sm shadow-md border border-aqua/30 flex-shrink-0 group-hover:scale-105 transition duration-300">
                  {rev.avatarInitials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="font-bold text-[10px] text-[#4285F4]">G</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-serif font-semibold text-white tracking-wide truncate">
                    {rev.author}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-mist/60 mt-0.5">
                  {rev.isLocalGuide && (
                    <span className="text-gold font-medium flex-shrink-0">Local Guide •</span>
                  )}
                  <span className="truncate">{rev.meta}</span>
                </div>
              </div>
            </div>

            {/* Counter pill (#01 / 10) */}
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-950/80 border border-aqua/25 text-aqua font-semibold">
                #{formattedIndex} / 10
              </span>
              <span className="text-[10px] text-mist/40 mt-1 font-light">
                {rev.date}
              </span>
            </div>
          </div>

          {/* Star Rating & Verified Pill */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                  className="drop-shadow-sm transform group-hover:scale-110 transition duration-300"
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              ))}
              <span className="text-xs font-semibold text-white ml-2">5.0</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              <CheckCircle2 size={11} className="text-emerald-400" />
              <span>Avis Google Vérifié</span>
            </span>
          </div>

          {/* Quote Accent */}
          <Quote size={24} className="text-aqua/30 mb-2 transform -scale-x-100" />

          {/* Exact Verbatim Review Text */}
          <p className="text-sm sm:text-[14px] text-mist/90 font-light leading-relaxed whitespace-pre-line italic">
            "{rev.text}"
          </p>
        </div>

        {/* Featured Tag for staff & manager appreciation */}
        {rev.highlight && (
          <div className="mt-6 pt-3.5 border-t border-gold/25 flex items-center justify-between text-xs text-gold">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles size={12} className="animate-pulse" />
              <span>{lang === 'fr' ? 'Témoignage Coup de Cœur • Équipe Sabon' : 'Featured Highlight • Team Appreciation'}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-mist/60 font-mono">5.0 ★</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="avis" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient water glow & caustics */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-aqua/10 filter blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand/10 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-aqua/30 text-aqua text-xs uppercase tracking-[0.22em] font-medium mb-4 shadow-glow-aqua">
            <ShieldCheck size={14} className="text-aqua" />
            <span>{lang === 'fr' ? '10 Avis Vérifiés • Google Maps Tanger' : '10 Verified Reviews • Google Maps Tangier'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-light tracking-tight leading-tight">
            {lang === 'fr' ? (
              <>
                L’expérience vécue par <span className="italic font-normal text-aqua">nos hôtes</span>
              </>
            ) : (
              <>
                What Our Guests <span className="italic font-normal text-aqua">Truly Experience</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-mist/80 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Faites défiler pour découvrir l’ensemble des 10 avis authentiques partagés par nos clients sur Google Maps. Chaque témoignage reflète l’art de l’accueil et l’excellence de notre sanctuaire.'
              : 'Scroll down to discover all 10 authentic reviews shared by our guests on Google Maps. Each experience reflects the genuine hospitality and excellence of our sanctuary.'}
          </p>

          {/* Google Summary Banner */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3.5 px-6 py-3 rounded-2xl bg-navy-900/80 border border-aqua/30 shadow-xl backdrop-blur-md">
            <div className="w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full bg-white text-navy-950 shadow-sm">
              <span className="text-[#4285F4]">G</span>
            </div>

            <div className="flex items-center gap-1.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />
              ))}
            </div>

            <span className="text-white font-semibold text-base font-serif">5.0 / 5.0</span>
            <span className="text-mist/30 hidden sm:inline">•</span>
            <span className="text-xs text-mist/90 font-medium">
              {lang === 'fr' ? '10 avis 5 étoiles affichés au fil du défilement' : 'All 10 5-star reviews popping up on scroll'}
            </span>
          </div>

          {/* Interactive Scroll Cue */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-aqua/70 font-light">
            <span className="w-2 h-2 rounded-full bg-aqua animate-ping" />
            <span>{lang === 'fr' ? 'Faites défiler vers le bas — chaque avis apparaît en pop-up' : 'Scroll down — each review pops up into view'}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ALL 10 REVIEWS STREAM (EACH SCROLL POPS UP A REVIEW)     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {REVIEWS.map((rev, index) => (
            <AnimatedReviewCard
              key={rev.id}
              rev={rev}
              index={index}
              lang={lang}
            />
          ))}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM COMPLETION & TRUST BANNER                          */}
        {/* ========================================================= */}
        <div className="mt-16 text-center pt-10 border-t border-aqua/15">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-aqua/80 font-medium mb-3">
            <CheckCircle2 size={14} className="text-aqua" />
            <span>{lang === 'fr' ? '10 avis sur 10 affichés • Source Google Maps Tanger' : '10 out of 10 reviews displayed • Source: Google Maps'}</span>
          </div>
          <p className="text-xs text-mist/60 font-light">
            {lang === 'fr'
              ? 'Toutes les citations sont authentiques et retranscrites mot pour mot selon les avis publics déposés par les clients.'
              : 'All quotes are authentic and transcribed verbatim from public reviews left by our clients.'}
          </p>
        </div>
      </div>
    </section>
  );
};
