import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Camera, Maximize2, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { FULL_GALLERY, GalleryPhoto } from '../../data/spaImages';
import { Lightbox } from '../ui/Lightbox';
import { Reveal } from '../ui/Reveal';

interface GallerySectionProps {
  lang: Language;
}

// Single Gallery Photo Card with scroll-triggered pop-up spring animation
const AnimatedGalleryCard: React.FC<{
  img: GalleryPhoto;
  idx: number;
  lang: Language;
  onClick: () => void;
}> = ({ img, idx, lang, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasPopped, setHasPopped] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    setHasPopped(false);

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
  }, [img.src]);

  const isWide = img.wide && (idx % 5 === 0);
  const isTall = img.tall;
  const delayMs = (idx % 4) * 80;

  return (
    <div
      ref={cardRef}
      style={{
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)',
        transitionDelay: `${delayMs}ms`
      }}
      className={`transform transition-all ${
        hasPopped
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-16 scale-[0.93]'
      } ${
        isWide
          ? 'sm:col-span-2 h-72 sm:h-88'
          : isTall
          ? 'sm:row-span-2 h-88 sm:h-[450px]'
          : 'h-72 sm:h-80'
      }`}
    >
      <div
        onClick={onClick}
        className="group relative w-full h-full overflow-hidden rounded-2xl border border-champagne/40 hover:border-brand/50 bg-sand/30 cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
      >
        <img
          src={img.src}
          alt={img.title[lang]}
          loading="lazy"
          className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-106 transition duration-700 ease-out"
        />

        {/* Subtle Vignette Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-75 group-hover:opacity-50 transition duration-500" />

        {/* Top Floating Badge with Photo Index */}
        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-champagne/40 text-navy text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition duration-300">
          #{String(idx + 1).padStart(2, '0')}
        </div>

        {/* Hover overlay with zoom icon */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-champagne/40 text-navy hover:text-brand flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition duration-300 shadow-sm">
          <Maximize2 size={15} />
        </div>

        {/* Caption at bottom */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-light font-medium block">
            {img.category[lang]}
          </span>
          <h4 className="text-sm sm:text-base font-serif text-white font-normal mt-0.5 leading-snug">
            {img.title[lang]}
          </h4>
        </div>
      </div>
    </div>
  );
};

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    FULL_GALLERY.forEach(img => {
      cats.add(img.category[lang]);
    });
    return Array.from(cats);
  }, [lang]);

  // Filtered gallery
  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'all') return FULL_GALLERY;
    return FULL_GALLERY.filter(img => img.category[lang] === activeFilter);
  }, [activeFilter, lang]);

  return (
    <section id="sanctuaire" className="py-28 bg-gradient-to-b from-ivory via-white to-ivory text-navy relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal variant="fade-up" duration={700}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-medium mb-3">
                <Camera size={13} />
                <span>{lang === 'fr' ? 'Photographies Officielles' : 'Official Photography'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
                {lang === 'fr' ? (
                  <>
                    Visite Privée du <span className="italic text-brand">Sanctuaire</span>
                  </>
                ) : (
                  <>
                    Private Tour of <span className="italic text-brand">The Sanctuary</span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted font-light mt-3 leading-relaxed">
                {lang === 'fr'
                  ? 'Chaque cliché dévoile l\'atmosphère réelle de notre établissement face à la baie de Malabata : voûtes de sel, bassins azur, alcôves privées et lounges feutrés.'
                  : 'Every photograph captures the genuine atmosphere of our Malabata Bay sanctuary: illuminated salt vaults, azure pools, private treatment suites, and tranquil lounges.'}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition duration-300 ${
                  activeFilter === 'all'
                    ? 'bg-brand text-white shadow-sm font-semibold'
                    : 'bg-sand/40 text-navy/75 hover:text-navy hover:bg-sand/70 border border-champagne/40'
                }`}
              >
                {lang === 'fr' ? `Tous (${FULL_GALLERY.length})` : `All (${FULL_GALLERY.length})`}
              </button>
              {categories.map((cat) => {
                const count = FULL_GALLERY.filter(img => img.category[lang] === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition duration-300 ${
                      activeFilter === cat
                        ? 'bg-brand text-white shadow-sm font-semibold'
                        : 'bg-sand/40 text-navy/75 hover:text-navy hover:bg-sand/70 border border-champagne/40'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Editorial Masonry-style Grid with Scroll Pop-Up Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((img, idx) => (
            <AnimatedGalleryCard
              key={`${img.src}-${activeFilter}`}
              img={img}
              idx={idx}
              lang={lang}
              onClick={() => {
                const originalIndex = FULL_GALLERY.findIndex(p => p.src === img.src);
                setSelectedImageIndex(originalIndex >= 0 ? originalIndex : idx);
              }}
            />
          ))}
        </div>

        {/* Footer note & reassurance */}
        <div className="mt-12 text-center text-xs text-charcoal-muted font-light flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-gold" />
          <span>
            {lang === 'fr'
              ? 'Photos 100% réelles prises au sein de Sabon Spa Tanger — Résidence Iris, Baie de Malabata'
              : '100% genuine photos taken inside Sabon Spa Tangier — Résidence Iris, Malabata Bay'}
          </span>
        </div>
      </div>

      {/* Lightbox component */}
      <Lightbox
        images={FULL_GALLERY}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(idx) => setSelectedImageIndex(idx)}
        lang={lang}
      />
    </section>
  );
};
