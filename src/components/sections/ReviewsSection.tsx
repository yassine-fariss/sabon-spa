import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, ShieldCheck, MessageCircle, HeartHandshake } from 'lucide-react';
import { Language, ReviewItem } from '../../types';
import { REVIEWS } from '../../data/content';
import { Reveal } from '../ui/Reveal';

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
        threshold: 0.05,
        rootMargin: '0px 0px -15px 0px'
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
        transitionDelay: `${(index % 2) * 100}ms`
      }}
      className={`transform transition-all ${
        hasPopped
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-16 scale-[0.93]'
      }`}
    >
      <div
        className={`h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1.5 text-navy ${
          rev.highlight
            ? 'bg-white border-2 border-champagne shadow-md hover:shadow-luxury'
            : 'bg-white/95 hover:bg-white border border-champagne/35 hover:border-champagne shadow-sm hover:shadow-luxury'
        }`}
      >
        <div>
          {/* Top Bar: Review Index, Author, Meta & Google Badge */}
          <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-sand/70">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Avatar Initial Circle */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm shadow-xs flex-shrink-0 group-hover:scale-105 transition duration-300">
                  {rev.avatarInitials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-xs border border-champagne/30">
                  <span className="font-bold text-[10px] text-[#4285F4]">G</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-serif font-semibold text-navy tracking-wide truncate">
                    {rev.author}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-0.5">
                  {rev.isLocalGuide && (
                    <span className="text-gold font-medium flex-shrink-0">Local Guide •</span>
                  )}
                  <span className="truncate font-light">{rev.meta}</span>
                </div>
              </div>
            </div>

            {/* Counter pill (#01 / 10) */}
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-sand/60 border border-champagne/40 text-navy font-semibold">
                #{formattedIndex} / 10
              </span>
              <span className="text-[10px] text-charcoal-muted/70 mt-1 font-light">
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
                  className="drop-shadow-xs transform group-hover:scale-110 transition duration-300"
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              ))}
              <span className="text-xs font-semibold text-navy ml-2">5.0</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              <CheckCircle2 size={11} className="text-emerald-600" />
              <span>Avis Google Vérifié</span>
            </span>
          </div>

          {/* Quote Accent */}
          <Quote size={24} className="text-champagne/40 mb-2 transform -scale-x-100" />

          {/* Exact Verbatim Review Text */}
          <p className="text-sm sm:text-[14px] text-charcoal font-light leading-relaxed whitespace-pre-line italic">
            "{rev.text}"
          </p>
        </div>

        {/* Featured Tag for staff & manager appreciation */}
        {rev.highlight && (
          <div className="mt-6 pt-3.5 border-t border-champagne/40 flex items-center justify-between text-xs text-champagne-dark">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles size={12} className="animate-pulse text-gold" />
              <span>{lang === 'fr' ? 'Témoignage Coup de Cœur • Équipe Sabon' : 'Featured Highlight • Team Appreciation'}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-mono">5.0 ★</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="avis" className="py-28 bg-gradient-to-b from-ivory via-sand-light to-sand text-navy relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-champagne/40 text-brand text-xs uppercase tracking-[0.22em] font-medium mb-4 shadow-xs">
              <ShieldCheck size={14} className="text-brand" />
              <span>{lang === 'fr' ? '10 Avis Vérifiés • Google Maps Tanger' : '10 Verified Reviews • Google Maps Tangier'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-navy font-light tracking-tight leading-tight">
              {lang === 'fr' ? (
                <>
                  L’expérience vécue par <span className="italic font-normal text-brand">nos hôtes</span>
                </>
              ) : (
                <>
                  What Our Guests <span className="italic font-normal text-brand">Truly Experience</span>
                </>
              )}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto">
              {lang === 'fr'
                ? 'Faites défiler pour découvrir l’ensemble des 10 avis authentiques partagés par nos clients sur Google Maps. Chaque témoignage reflète l’art de l’accueil et l’excellence de notre sanctuaire.'
                : 'Scroll down to discover all 10 authentic reviews shared by our guests on Google Maps. Each experience reflects the genuine hospitality and excellence of our sanctuary.'}
            </p>

            {/* Google Summary Banner */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3.5 px-6 py-3 rounded-2xl bg-white border border-champagne/40 shadow-sm backdrop-blur-md">
              <div className="w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full bg-sand/60 text-navy shadow-xs">
                <span className="text-[#4285F4]">G</span>
              </div>

              <div className="flex items-center gap-1.5 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="drop-shadow-xs" />
                ))}
              </div>

              <span className="text-navy font-semibold text-base font-serif">5.0 / 5.0</span>
              <span className="text-champagne hidden sm:inline">•</span>
              <span className="text-xs text-charcoal-muted font-medium">
                {lang === 'fr' ? '10 avis 5 étoiles affichés au fil du défilement' : 'All 10 5-star reviews popping up on scroll'}
              </span>
            </div>
          </div>
        </Reveal>

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

        {/* Google Callout Link */}
        <div className="mt-16 text-center">
          <a
            href="https://maps.google.com/?q=Sabon+Spa+Tanger+Malabata"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-sand-light border border-champagne/50 text-navy text-xs uppercase tracking-[0.16em] font-medium shadow-sm hover:shadow transition transform hover:-translate-y-0.5 duration-200"
          >
            <MessageCircle size={15} className="text-brand" />
            <span>{lang === 'fr' ? 'Consulter tous les avis sur Google' : 'Read all reviews on Google'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
