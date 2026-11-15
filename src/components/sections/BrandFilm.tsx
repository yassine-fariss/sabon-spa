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
  },
  en: {
    label: 'DISCOVER SPA SABON',
    heading: 'The Art of Wellbeing',
    body: "Step into the sensory world of Spa Sabon — where authentic Moroccan hammam traditions\nblend with the most refined treatments to awaken body and mind.",
    play: 'Play film',
    pause: 'Pause',
    fullscreen: 'Full screen',
  },
} as const;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const VIDEO_SRC = 'videos/brand-film.mp4';
// Use the first frame of the existing spa photos as poster fallback
const POSTER_SRC = 'spa/hammam-blue.jpg';

function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.2) {
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

/* ─── PlayButton SVG ─────────────────────────────────────────────────────── */
const PlayIcon: React.FC<{ size?: number }> = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <circle cx="36" cy="36" r="35" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="36" cy="36" r="35" stroke="white" strokeWidth="1.5" strokeOpacity="0.15"
      strokeDasharray="220" strokeDashoffset="0"
      style={{ transformOrigin: '36px 36px', animation: 'spin 8s linear infinite' }} />
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
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const sectionVisible = useIntersection(sectionRef, 0.1);

  /* Pause when section leaves viewport */
  useEffect(() => {
    if (!sectionVisible && playing && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [sectionVisible, playing]);

  const handlePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } catch {
      /* autoplay / policy guard — no-op */
    }
  }, []);

  const handleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  }, []);

  const videoSrc = getAssetUrl(VIDEO_SRC);
  const posterSrc = getAssetUrl(POSTER_SRC);

  /* Respect prefers-reduced-motion */
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll-reveal classes ── */
  const revealBase = 'transition-all duration-1000 ease-out';
  const labelReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced ? 'opacity-100' : 'opacity-0 translate-y-4';
  const headingReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced ? 'opacity-100' : 'opacity-0 translate-y-6';
  const bodyReveal = sectionVisible
    ? 'opacity-100 translate-y-0'
    : prefersReduced ? 'opacity-100' : 'opacity-0 translate-y-8';
  const videoReveal = sectionVisible
    ? 'opacity-100 scale-100'
    : prefersReduced ? 'opacity-100' : 'opacity-0 scale-95';

  return (
    <section
      ref={sectionRef}
      id="brand-film"
      aria-label="Film de marque Spa Sabon"
      className="relative bg-navy-950 overflow-hidden py-20 md:py-28 lg:py-36"
    >
      {/* ── Background texture ── */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(ellipse_at_30%_60%,_#63B9D1_0%,_transparent_60%),radial-gradient(ellipse_at_70%_30%,_#C9A16B_0%,_transparent_55%)]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── Editorial header ── */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          {/* Label */}
          <p
            className={`${revealBase} ${labelReveal} inline-block tracking-[0.25em] text-gold text-xs font-sans font-medium uppercase`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '80ms' }}
          >
            {t.label}
          </p>

          {/* Heading */}
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

          {/* Body */}
          <p
            className={`${revealBase} ${bodyReveal} max-w-xl mx-auto text-mist/70 text-sm sm:text-base font-sans leading-relaxed whitespace-pre-line`}
            style={{ transitionDelay: prefersReduced ? '0ms' : '340ms' }}
          >
            {t.body}
          </p>
        </div>

        {/* ── Cinematic video frame ── */}
        <div
          ref={wrapperRef}
          className={`${revealBase} ${videoReveal} relative w-full rounded-2xl overflow-hidden cursor-pointer group`}
          style={{
            aspectRatio: '16/9',
            transitionDelay: prefersReduced ? '0ms' : '500ms',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,161,107,0.12)',
          }}
          onClick={handlePlay}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label={playing ? t.pause : t.play}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlay(); } }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            preload="none"
            playsInline
            controls={playing}
            onLoadedData={() => setLoaded(true)}
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Film Spa Sabon — présentation de l'espace, des soins et de l'atmosphère"
          />

          {/* Poster overlay — hidden once video has loaded data or is playing */}
          {!loaded && (
            <div className="absolute inset-0 bg-navy-950" aria-hidden="true">
              <img
                src={posterSrc}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Dark overlay — visible when not playing */}
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(10,20,35,0.35) 0%, rgba(10,20,35,0.15) 50%, rgba(10,20,35,0.5) 100%)',
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Play / Pause button */}
          {!playing && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="transition-all duration-300"
                style={{
                  transform: hovered ? 'scale(1.12)' : 'scale(1)',
                  filter: hovered ? 'drop-shadow(0 0 24px rgba(201,161,107,0.5))' : 'none',
                }}
              >
                <PlayIcon size={72} />
              </div>
            </div>
          )}

          {/* Fullscreen button — only while playing, top-right corner */}
          {playing && (
            <button
              onClick={handleFullscreen}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label={t.fullscreen}
              title={t.fullscreen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          )}

          {/* Bottom edge vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,20,35,0.6), transparent)' }}
            aria-hidden="true"
          />
        </div>

        {/* ── Subtle caption ── */}
        <p
          className={`${revealBase} ${bodyReveal} mt-5 text-center text-mist/40 text-xs tracking-widest font-sans uppercase`}
          style={{ transitionDelay: prefersReduced ? '0ms' : '700ms' }}
          aria-hidden="true"
        >
          Spa Sabon — Tanger, Maroc
        </p>
      </div>

      {/* Spin keyframe for play button ring */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default BrandFilm;
