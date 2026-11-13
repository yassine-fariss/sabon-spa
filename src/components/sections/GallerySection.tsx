import React, { useState } from 'react';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import { Language } from '../../types';
import { GALLERY_IMAGES } from '../../data/content';
import { Lightbox } from '../ui/Lightbox';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <section id="sanctuaire" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
              <Camera size={13} />
              <span>{lang === 'fr' ? 'Photographies Authentiques' : 'Authentic Spaces'}</span>
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
          </div>
          <p className="text-xs sm:text-sm text-mist/70 font-light max-w-md">
            {lang === 'fr'
              ? 'Chaque cliché dévoile la réalité de notre établissement à Tanger : voûtes de sel, lounges feutrés et cabines de soins privatisées.'
              : 'Every photograph captures the authentic reality of our Tangier haven: salt-brick vaults, intimate lounges, and private treatment suites.'}
          </p>
        </div>

        {/* Asymmetrical / Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((img, idx) => {
            // Give interesting spans for editorial feel
            const isWide = idx === 0 || idx === 3;
            return (
              <div
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`group relative overflow-hidden rounded-2xl border border-aqua/20 hover:border-aqua/50 bg-navy-900 cursor-pointer shadow-lg hover:shadow-glow-aqua transition-all duration-500 h-72 sm:h-80 ${
                  isWide ? 'sm:col-span-2' : ''
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title[lang]}
                  className="w-full h-full object-cover filter contrast-[1.04] group-hover:scale-108 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-60 transition" />

                {/* Hover overlay with zoom icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <Maximize2 size={16} />
                </div>

                {/* Caption at bottom */}
                <div className="absolute bottom-4 left-4 right-4 transition duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-aqua font-medium block">
                    {img.category[lang]}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif text-white mt-0.5">
                    {img.title[lang]}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox component */}
      <Lightbox
        images={GALLERY_IMAGES}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(idx) => setSelectedImageIndex(idx)}
        lang={lang}
      />
    </section>
  );
};
