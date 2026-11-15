import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import { Language, ReviewItem } from '../../types';
import { REVIEWS } from '../../data/content';
import { Reveal } from '../ui/Reveal';

interface ReviewsSectionProps {
  lang: Language;
}

// ─── Single Review Card ───────────────────────────────────────────────────────
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
      ([entry]) => { if (entry.isIntersecting) setHasPopped(true); },
      { threshold: 0.05, rootMargin: '0px 0px -15px 0px' }
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
        transitionDelay: `${(index % 2) * 100}ms`,
      }}
      className={`transform transition-all ${
        hasPopped ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.93]'
      }`}
    >
      {/* Card shell */}
      <div
        className={`h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden
          transition-all duration-500 hover:-translate-y-2 ${
            rev.highlight
              ? 'border border-gold/40 shadow-glow-gold'
              : 'border border-aqua/15 hover:border-aqua/35 shadow-glass-dark hover:shadow-glow-aqua'
          }`}
        style={{
          background: rev.highlight
            ? 'linear-gradient(135deg, #1a3454 0%, #182D46 60%, #142840 100%)'
            : 'linear-gradient(135deg, #142840 0%, #182D46 70%, #1a3050 100%)',
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
          style={{
            background:
              'linear-gradient(105deg, transparent 35%, rgba(99,185,209,0.08) 50%, transparent 65%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 2.4s linear infinite',
          }}
        />

        {/* Top-left aqua glow orb */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,185,209,0.13) 0%, transparent 70%)' }}
        />

        {/* Gold glow for highlighted card */}
        {rev.highlight && (
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,161,107,0.14) 0%, transparent 70%)' }}
          />
        )}

        {/* ── Card content ── */}
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-aqua/10">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm shadow-xs flex-shrink-0 group-hover:scale-105 transition duration-300">
                  {rev.avatarInitials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-navy flex items-center justify-center shadow-xs border border-aqua/20">
                  <span className="font-bold text-[10px] text-[#4285F4]">G</span>
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="text-base font-serif font-semibold text-mist tracking-wide truncate">
                  {rev.author}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-mist/50 mt-0.5">
                  {rev.isLocalGuide && (
                    <span className="text-gold font-medium flex-shrink-0">Local Guide •</span>
                  )}
                  <span className="truncate font-light">{rev.meta}</span>
                </div>
              </div>
            </div>

            {/* Counter pill */}
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy/60 border border-aqua/20 text-aqua font-semibold">
                #{formattedIndex} / 10
              </span>
              <span className="text-[10px] text-mist/40 mt-1 font-light">{rev.date}</span>
            </div>
          </div>

          {/* Stars & Verified pill */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                  className="drop-shadow-xs transform group-hover:scale-110 transition duration-300"
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              ))}
              <span className="text-xs font-semibold text-mist ml-2">5.0</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/40 font-medium">
              <CheckCircle2 size={11} className="text-emerald-400" />
              <span>Avis Google Vérifié</span>
            </span>
          </div>

          {/* Quote accent */}
          <Quote size={24} className="text-aqua/20 mb-2 transform -scale-x-100" />

          {/* Review text */}
          <p className="text-sm sm:text-[14px] text-mist/75 font-light leading-relaxed whitespace-pre-line italic">
            &ldquo;{rev.text}&rdquo;
          </p>
        </div>

        {/* Featured tag */}
        {rev.highlight && (
          <div className="relative z-10 mt-6 pt-3.5 border-t border-gold/20 flex items-center justify-between text-xs text-gold/70">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles size={12} className="animate-pulse text-gold" />
              <span>{lang === 'fr' ? 'Témoignage Coup de Cœur • Équipe Sabon' : 'Featured Highlight • Team Appreciation'}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-mist/30 font-mono">5.0 ★</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section
      id="avis"
      className="py-28 relative overflow-hidden transition-colors"
      style={{ background: 'linear-gradient(180deg, #0E1F33 0%, #182D46 40%, #142840 100%)' }}
    >
      {/* Background texture blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(99,185,209,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 35% at 80% 70%, rgba(201,161,107,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/70 border border-aqua/20 text-aqua text-xs uppercase tracking-[0.22em] font-medium mb-4 shadow-xs backdrop-blur-sm">
              <ShieldCheck size={14} className="text-aqua" />
              <span>{lang === 'fr' ? '10 Avis Vérifiés • Google Maps Tanger' : '10 Verified Reviews • Google Maps Tangier'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist font-light tracking-tight leading-tight">
              {lang === 'fr' ? (
                <>L&apos;expérience vécue par <span className="italic font-normal text-aqua">nos hôtes</span></>
              ) : (
                <>What Our Guests <span className="italic font-normal text-aqua">Truly Experience</span></>
              )}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-mist/50 font-light leading-relaxed max-w-2xl mx-auto">
              {lang === 'fr'
                ? "Faites défiler pour découvrir l'ensemble des 10 avis authentiques partagés par nos clients sur Google Maps. Chaque témoignage reflète l'art de l'accueil et l'excellence de notre sanctuaire."
                : 'Scroll down to discover all 10 authentic reviews shared by our guests on Google Maps. Each experience reflects the genuine hospitality and excellence of our sanctuary.'}
            </p>

            {/* Google Summary Banner */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3.5 px-6 py-3 rounded-2xl bg-navy/60 border border-aqua/15 shadow-glass-dark backdrop-blur-md">
              <div className="w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full bg-navy text-navy shadow-xs border border-aqua/20">
                <span className="text-[#4285F4]">G</span>
              </div>
              <div className="flex items-center gap-1.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="drop-shadow-xs" />
                ))}
              </div>
              <span className="text-mist font-semibold text-base font-serif">5.0 / 5.0</span>
              <span className="text-aqua/40 hidden sm:inline">•</span>
              <span className="text-xs text-mist/50 font-medium">
                {lang === 'fr' ? '10 avis 5 étoiles affichés au fil du défilement' : 'All 10 5-star reviews popping up on scroll'}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Reviews Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {REVIEWS.map((rev, index) => (
            <AnimatedReviewCard key={rev.id} rev={rev} index={index} lang={lang} />
          ))}
        </div>

        {/* Google CTA link */}
        <div className="mt-16 text-center">
          <a
            href="https://maps.google.com/?q=Sabon+Spa+Tanger+Malabata"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-navy/70 hover:bg-navy border border-aqua/20 hover:border-aqua/40 text-mist text-xs uppercase tracking-[0.16em] font-medium shadow-glass-dark hover:shadow-glow-aqua transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <MessageCircle size={15} className="text-aqua" />
            <span>{lang === 'fr' ? 'Consulter tous les avis sur Google' : 'Read all reviews on Google'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
