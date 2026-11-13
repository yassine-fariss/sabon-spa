import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../../types';

interface LightboxProps {
  images: {
    src: string;
    title: { fr: string; en: string };
    category: { fr: string; en: string };
  }[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  lang: Language;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  lang,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-xl p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-mist border border-aqua/30 transition z-50"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 sm:left-8 p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-mist border border-aqua/30 transition z-50 hover:scale-105 active:scale-95"
        aria-label="Image précédente"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.title[lang]}
          className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-aqua/20"
        />
        <div className="mt-4 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-aqua font-medium">
            {current.category[lang]}
          </span>
          <h4 className="text-lg sm:text-xl font-serif text-white mt-1">
            {current.title[lang]}
          </h4>
          <span className="text-xs text-mist/60 mt-1 block">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 sm:right-8 p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-mist border border-aqua/30 transition z-50 hover:scale-105 active:scale-95"
        aria-label="Image suivante"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
