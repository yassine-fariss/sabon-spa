import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Sparkles, Grid, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';
import { REVIEWS } from '../../data/content';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per view: mobile: 1, tablet: 2, desktop: 3
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - itemsPerView);

  // Autoplay carousel every 6.5 seconds when not paused
  useEffect(() => {
    if (viewMode !== 'carousel' || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="avis" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient water glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-aqua/10 filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand/10 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/80 border border-aqua/30 text-aqua text-xs uppercase tracking-[0.22em] font-medium mb-4 shadow-glow-aqua">
            <ShieldCheck size={13} className="text-aqua" />
            <span>{lang === 'fr' ? 'Avis Clients Vérifiés • Google Reviews' : 'Verified Google Reviews • Tangier'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight leading-tight">
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

          <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Découvrez les témoignages authentiques laissés par nos visiteurs sur Google Maps suite à leur hammam, massage ou journée bien-être à Tanger.'
              : 'Discover authentic guest reviews shared on Google Maps following their hammam, massage, and wellness journeys at Sabon Spa in Tangier.'}
          </p>

          {/* Google Summary Rating Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-navy-900/70 border border-aqua/20 shadow-lg backdrop-blur-md">
            {/* Google Colorful "G" */}
            <div className="w-5 h-5 flex items-center justify-center font-bold text-xs rounded-full bg-white text-navy-950 shadow-sm">
              <span className="text-[#4285F4]">G</span>
            </div>

            <div className="flex items-center gap-1.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" className="drop-shadow-sm" />
              ))}
            </div>

            <span className="text-white font-semibold text-sm">5.0 / 5.0</span>
            <span className="text-mist/30 hidden sm:inline">•</span>
            <span className="text-xs text-mist/80 font-medium">
              {lang === 'fr' ? '100% d’avis 5 étoiles d’exception' : '100% 5-Star Verified Ratings'}
            </span>
          </div>

          {/* Mode Switcher (Carousel vs Grid) */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                viewMode === 'carousel'
                  ? 'bg-brand text-white border border-aqua/40 shadow-glow-aqua'
                  : 'bg-navy-900/60 text-mist/60 hover:text-white border border-aqua/10'
              }`}
            >
              <SlidersHorizontal size={12} />
              <span>{lang === 'fr' ? 'Vue Défilante' : 'Slider View'}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-brand text-white border border-aqua/40 shadow-glow-aqua'
                  : 'bg-navy-900/60 text-mist/60 hover:text-white border border-aqua/10'
              }`}
            >
              <Grid size={12} />
              <span>{lang === 'fr' ? 'Afficher les 10 avis' : 'View All 10'}</span>
            </button>
          </div>
        </div>

        {/* CAROUSEL VIEW */}
        {viewMode === 'carousel' && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Cards Slider Viewport */}
            <div className="overflow-hidden py-4 -mx-2 sm:-mx-3">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex-shrink-0 px-2 sm:px-3"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div
                      className={`h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                        rev.highlight
                          ? 'bg-gradient-to-b from-navy-900/90 via-navy-900/70 to-navy-950 border border-gold/40 shadow-glow-gold'
                          : 'bg-navy-900/50 hover:bg-navy-900/75 border border-aqua/20 hover:border-aqua/45 shadow-xl'
                      }`}
                    >
                      {/* Top Bar: Reviewer Info + Stars */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            {/* Avatar Badge */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-aqua flex items-center justify-center text-white font-semibold text-xs shadow-md border border-aqua/30 flex-shrink-0">
                              {rev.avatarInitials}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-serif font-semibold text-white tracking-wide truncate">
                                {rev.author}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[11px] text-mist/60 mt-0.5">
                                {rev.isLocalGuide && (
                                  <span className="text-gold font-medium">Local Guide •</span>
                                )}
                                <span className="truncate">{rev.meta}</span>
                              </div>
                            </div>
                          </div>

                          {/* Source & Verified Badge */}
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy-950/80 border border-aqua/25 text-[10px] text-aqua flex-shrink-0">
                            <CheckCircle2 size={10} className="text-aqua" />
                            <span>Google</span>
                          </div>
                        </div>

                        {/* Five Gold Stars & Date */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-aqua/10">
                          <div className="flex text-gold">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} fill="currentColor" className="drop-shadow-sm" />
                            ))}
                          </div>
                          <span className="text-[11px] text-mist/50 font-light">
                            {rev.date}
                          </span>
                        </div>

                        {/* Quote icon */}
                        <Quote size={20} className="text-aqua/30 mb-2" />

                        {/* Authentic Review Text */}
                        <p className="text-xs sm:text-[13px] text-mist/90 font-light leading-relaxed whitespace-pre-line italic">
                          "{rev.text}"
                        </p>
                      </div>

                      {/* Bottom Footer Accent */}
                      {rev.highlight && (
                        <div className="mt-5 pt-3 border-t border-gold/20 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-medium">
                          <Sparkles size={11} />
                          <span>{lang === 'fr' ? 'Témoignage Coup de Cœur' : 'Featured Highlight'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Avis précédent"
                  className="w-10 h-10 rounded-full bg-navy-900/80 hover:bg-brand border border-aqua/30 hover:border-aqua text-white flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Avis suivant"
                  className="w-10 h-10 rounded-full bg-navy-900/80 hover:bg-brand border border-aqua/30 hover:border-aqua text-white flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Aller au slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-6 bg-aqua shadow-glow-aqua'
                        : 'w-1.5 bg-mist/30 hover:bg-mist/60'
                    }`}
                  />
                ))}
              </div>

              {/* Review counter */}
              <div className="text-xs text-mist/50 font-light">
                {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, REVIEWS.length)} / {REVIEWS.length} {lang === 'fr' ? 'avis' : 'reviews'}
              </div>
            </div>
          </div>
        )}

        {/* FULL GRID VIEW (ALL 10 REVIEWS) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  rev.highlight
                    ? 'bg-gradient-to-b from-navy-900/90 via-navy-900/70 to-navy-950 border border-gold/40 shadow-glow-gold'
                    : 'bg-navy-900/50 hover:bg-navy-900/75 border border-aqua/20 hover:border-aqua/45 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-aqua flex items-center justify-center text-white font-semibold text-xs shadow-md border border-aqua/30 flex-shrink-0">
                        {rev.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-serif font-semibold text-white tracking-wide truncate">
                          {rev.author}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-mist/60 mt-0.5">
                          {rev.isLocalGuide && (
                            <span className="text-gold font-medium">Local Guide •</span>
                          )}
                          <span className="truncate">{rev.meta}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy-950/80 border border-aqua/25 text-[10px] text-aqua flex-shrink-0">
                      <CheckCircle2 size={10} className="text-aqua" />
                      <span>Google</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-aqua/10">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" className="drop-shadow-sm" />
                      ))}
                    </div>
                    <span className="text-[11px] text-mist/50 font-light">
                      {rev.date}
                    </span>
                  </div>

                  <Quote size={20} className="text-aqua/30 mb-2" />

                  <p className="text-xs sm:text-[13px] text-mist/90 font-light leading-relaxed whitespace-pre-line italic">
                    "{rev.text}"
                  </p>
                </div>

                {rev.highlight && (
                  <div className="mt-5 pt-3 border-t border-gold/20 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-medium">
                    <Sparkles size={11} />
                    <span>{lang === 'fr' ? 'Témoignage Coup de Cœur' : 'Featured Highlight'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
