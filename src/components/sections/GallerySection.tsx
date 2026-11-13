import React, { useState, useMemo } from 'react';
import { Camera, Maximize2, Sparkles, Filter } from 'lucide-react';
import { Language } from '../../types';
import { FULL_GALLERY, GalleryPhoto } from '../../data/spaImages';
import { Lightbox } from '../ui/Lightbox';

interface GallerySectionProps {
  lang: Language;
}

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
    <section id="sanctuaire" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-brand/10 filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-aqua/10 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
              <Camera size={13} />
              <span>{lang === 'fr' ? 'Photographies Officielles' : 'Official Photography'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Visite Privée du <span className="italic text-aqua">Sanctuaire</span>
                </>
              ) : (
                <>
                  Private Tour of <span className="italic text-aqua">The Sanctuary</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-mist/75 font-light mt-3 leading-relaxed">
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
                  ? 'bg-aqua text-navy-950 shadow-glow-aqua'
                  : 'bg-navy-900/80 text-mist/70 hover:text-white border border-aqua/15 hover:border-aqua/40'
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
                      ? 'bg-aqua text-navy-950 shadow-glow-aqua'
                      : 'bg-navy-900/80 text-mist/70 hover:text-white border border-aqua/15 hover:border-aqua/40'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((img, idx) => {
            const isWide = img.wide && (idx % 5 === 0);
            const isTall = img.tall;

            return (
              <div
                key={idx}
                onClick={() => {
                  const originalIndex = FULL_GALLERY.findIndex(p => p.src === img.src);
                  setSelectedImageIndex(originalIndex >= 0 ? originalIndex : idx);
                }}
                className={`group relative overflow-hidden rounded-2xl border border-aqua/15 hover:border-aqua/50 bg-navy-900 cursor-pointer shadow-lg hover:shadow-glow-aqua transition-all duration-500 ${
                  isWide
                    ? 'sm:col-span-2 h-72 sm:h-88'
                    : isTall
                    ? 'sm:row-span-2 h-88 sm:h-[450px]'
                    : 'h-72 sm:h-80'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-108 group-hover:brightness-105 transition duration-700 ease-out"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent opacity-85 group-hover:opacity-60 transition duration-500" />

                {/* Subtle Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aqua/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Hover overlay with zoom icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition duration-300">
                  <Maximize2 size={15} />
                </div>

                {/* Caption at bottom */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-aqua font-medium block">
                    {img.category[lang]}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif text-white font-normal mt-0.5 leading-snug">
                    {img.title[lang]}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note & reassurance */}
        <div className="mt-12 text-center text-xs text-mist/60 font-light flex items-center justify-center gap-2">
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
