import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getAssetUrl } from '../../utils/assets';
import { useLang } from '../../hooks/useLang';

/* ─── i18n ────────────────────────────────────────────────────────────────── */
const copy = {
  fr: {
    label: 'DÉCOUVRIR SPA SABON',
    heading: "L'Art du Bien-Être",
    body: "Plongez dans l'univers sensoriel de Spa Sabon — où les traditions du hammam marocain\nse fondent avec les soins les plus raffinés pour éveiller corps et esprit.",
    play: 'Lancer le film',
    pause: 'Mettre en pause',
    fullscreen: 'Plein écran',
    loading: 'Chargement du film...',
    error: 'La vidéo n’a pas pu être chargée.',
    retry: 'Réessayer',
  },
  en: {
    label: 'DISCOVER SPA SABON',
    heading: 'The Art of Wellbeing',
    body: "Step into the sensory world of Spa Sabon — where authentic Moroccan hammam traditions\nblend with the most refined treatments to awaken body and mind.",
    play: 'Play film',
    pause: 'Pause',
    fullscreen: 'Full screen',
    loading: 'Loading film...',
    error: 'The video could not be loaded.',
    retry: 'Retry',
  },
} as const;

/* ─── Asset Constants ─────────────────────────────────────────────────────── */
const VIDEO_SRC = 'videos/brand-film.mp4';
const POSTER_WEBP = 'images/brand-film-poster.webp';
const POSTER_JPG = 'images/brand-film-poster.jpg';

function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ─── Minimal Luxury Play Icon ────────────────────────────────────────────── */
const PlayIcon: React.FC<{ size?: number }> = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <circle cx="36" cy="36" r="35" stroke="white" strokeWidth="1.5" strokeOpacity="0.75" />
    <circle
      cx="36"
      cy="36"
      r="35"
      stroke="#C9A16B"
      strokeWidth="1.5"
      strokeOpacity="0.8"
      strokeDasharray="220"
      strokeDashoffset="70"
      style={{ transformOrigin: '36px 36px', animation: 'spin 10s linear infinite' }}
    />
    <polygon points="30,24 52,36 30,48" fill="white" fillOpacity="0.95" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */
interface BrandFilmProps {
  lang?: 'fr' | 'en';
}

export const BrandFilm: React.FC<BrandFilmProps> = ({ lang = 'fr' }) => {
  const t = copy[lang] ?? copy.fr;
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const sectionVisible = useIntersection(sectionRef, 0.1);

  /* Auto-pause when user scrolls out of view */
  useEffect(() => {
    if (!sectionVisible && playing && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [sectionVisible, playing]);

  /* Handle initial play / resume / pause */
  const handlePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;

    if (hasError) {
      setHasError(false);
      v.load();
    }

    try {
      if (!hasStarted) {
        setHasStarted(true);
        setIsBuffering(true);
      }

      if (v.paused) {
        await v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.warn('Playback error or user gesture blocked:', err);
    }
  }, [hasStarted, hasError]);

  /* Fullscreen toggle */
  const handleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if ((v as unknown as { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
      (v as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
  }, []);

  const videoSrc = getAssetUrl(VIDEO_SRC);
  const posterWebp = getAssetUrl(POSTER_WEBP);
  const posterJpg = getAssetUrl(POSTER_JPG);

  /* Respect prefers-reduced-motion */
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Staggered scroll-reveal animation styles */
  const revealBase = 'transition-all duration-1000 ease-out';
  const labelReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced
    ? 'opacity-100'
    : 'opacity-0 translate-y-4';
  const headingReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced
    ? 'opacity-100'
    : 'opacity-0 translate-y-6';
  const bodyReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced
    ? 'opacity-100'
    : 'opacity-0 translate-y-8';
  const videoReveal = sectionVisible
    ? 'opacity-100 scale-100'
    : prefersReduced
    ? 'opacity-100'
    : 'opacity-0 scale-95';

  return (
    <section
      ref={sectionRef}
      id="brand-film"
      aria-label="Film de marque Spa Sabon"
      className="relative bg-navy-950 overflow-hidden py-20 md:py-28 lg:py-36"
    >
      {/* ── Background texture & ambient radial glow ── */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(ellipse_at_30%_60%,_#63B9D1_0%,_transparent_60%),radial-gradient(ellipse_at_70%_30%,_#C9A16B_0%,_transparent_55%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── Editorial Section Header ── */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          {/* Label */}
          <p
            className={`${revealBase} ${labelReveal} inline-block tracking-[0.25em] text-gold text-xs font-sans font-medium uppercase`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '80ms' }}
          >
            {t.label}
          </p>

          {/* Main Heading */}
          <h2
            className={`${revealBase} ${headingReveal} font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '200ms' }}
          >
            {t.heading}
          </h2>

          {/* Thin gold rule */}
          <div
            className={`${revealBase} ${labelReveal} flex items-center justify-center gap-4 mt-1`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '300ms' }}
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-gold/40" />
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span className="h-px w-12 bg-gold/40" />
          </div>

          {/* Refined description */}
          <p
            className={`${revealBase} ${bodyReveal} max-w-xl mx-auto text-mist/70 text-sm sm:text-base font-sans leading-relaxed whitespace-pre-line`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '340ms' }}
          >
            {t.body}
          </p>
        </div>

        {/* ── Cinematic 16:9 Video Frame ── */}
        <div
          ref={wrapperRef}
          className={`${revealBase} ${videoReveal} relative w-full rounded-2xl overflow-hidden cursor-pointer group bg-navy-900`}
          style={{
            aspectRatio: '16/9',
            transitionDelay: prefersReduced ? '0ms' : '500ms',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,161,107,0.15)',
          }}
          onClick={handlePlay}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label={playing ? t.pause : t.play}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePlay();
            }
          }}
        >
          {/* Native HTML5 Video Element: preload="none" ensures no data is downloaded until user plays */}
          <video
            ref={videoRef}
            src={hasStarted ? videoSrc : undefined}
            poster={posterWebp}
            preload="none"
            playsInline
            controls={playing}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setIsBuffering(false);
            }}
            onError={() => {
              setHasError(true);
              setIsBuffering(false);
              setPlaying(false);
            }}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Film de présentation officiel Sabon Spa"
          />

          {/* High-quality custom 16:9 Poster (rendered until playback starts) */}
          {!hasStarted && (
            <div className="absolute inset-0" aria-hidden="true">
              <picture>
                <source srcSet={posterWebp} type="image/webp" />
                <img
                  src={posterJpg}
                  alt="Sabon Spa & Hammam Sanctuaire"
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover select-none"
                />
              </picture>
            </div>
          )}

          {/* Subtle dark gradient overlay to ensure contrast for play button */}
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,20,35,0.3) 0%, rgba(10,20,35,0.1) 50%, rgba(10,20,35,0.45) 100%)',
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Centered Play Button (when not playing and not buffering) */}
          {!playing && !isBuffering && !hasError && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="transition-all duration-300"
                style={{
                  transform: hovered ? 'scale(1.12)' : 'scale(1)',
                  filter: hovered ? 'drop-shadow(0 0 28px rgba(201,161,107,0.6))' : 'none',
                }}
              >
                <PlayIcon size={76} />
              </div>
            </div>
          )}

          {/* Loading / Buffering Spinner (only appears once user has requested playback) */}
          {isBuffering && !hasError && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none transition-opacity duration-300"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
              <span className="mt-3 text-xs uppercase tracking-widest text-mist/80 font-sans font-medium">
                {t.loading}
              </span>
            </div>
          )}

          {/* Graceful Error State with Retry Button */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-950/90 p-6 text-center z-20">
              <p className="text-mist text-sm font-light mb-4">{t.error}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-wider font-medium shadow-md transition-all duration-200 active:scale-95"
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* Fullscreen Button — top-right shortcut during playback */}
          {playing && (
            <button
              onClick={handleFullscreen}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label={t.fullscreen}
              title={t.fullscreen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          )}

          {/* Subtle bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,20,35,0.5), transparent)' }}
            aria-hidden="true"
          />
        </div>

        {/* ── Sanctuary Signature Caption ── */}
        <p
          className={`${revealBase} ${bodyReveal} mt-5 text-center text-mist/40 text-xs tracking-widest font-sans uppercase`}
          style={{ transitionDelay: prefersReduced ? '0ms' : '700ms' }}
          aria-hidden="true"
        >
          Spa Sabon — Tanger, Maroc
        </p>
      </div>

      {/* Rotating animation for play button ring */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default BrandFilm;
