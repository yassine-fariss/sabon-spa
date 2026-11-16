import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Maximize2, Play, Pause } from 'lucide-react';
import { getAssetUrl } from '../../utils/assets';

/* ─── i18n ────────────────────────────────────────────────────────────────── */
const copy = {
  fr: {
    label: 'DÉCOUVRIR SPA SABON',
    heading: "L'Art du Bien-Être",
    body: "Plongez dans l'univers sensoriel de Spa Sabon — où les traditions du hammam marocain\nse fondent avec les soins les plus raffinés pour éveiller corps et esprit.",
    play: 'Lancer le film',
    pause: 'Mettre en pause',
    unmute: 'Activer le son',
    mute: 'Couper le son',
    fullscreen: 'Plein écran',
    loading: 'Chargement...',
    error: 'La vidéo n’a pas pu être chargée.',
    retry: 'Réessayer',
  },
  en: {
    label: 'DISCOVER SPA SABON',
    heading: 'The Art of Wellbeing',
    body: "Step into the sensory world of Spa Sabon — where authentic Moroccan hammam traditions\nblend with the most refined treatments to awaken body and mind.",
    play: 'Play film',
    pause: 'Pause',
    unmute: 'Unmute audio',
    mute: 'Mute audio',
    fullscreen: 'Full screen',
    loading: 'Loading...',
    error: 'The video could not be loaded.',
    retry: 'Retry',
  },
} as const;

/* ─── Asset Constants ─────────────────────────────────────────────────────── */
const VIDEO_SRC = 'videos/brand-film.mp4';
const POSTER_WEBP = 'images/brand-film-poster.webp';
const POSTER_JPG = 'images/brand-film-poster.jpg';

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

/* ─── Component ───────────────────────────────────────────────────────────── */
interface BrandFilmProps {
  lang?: 'fr' | 'en';
}

export const BrandFilm: React.FC<BrandFilmProps> = ({ lang = 'fr' }) => {
  const t = copy[lang] ?? copy.fr;
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const sectionVisible = useIntersection(sectionRef, 0.15);

  /* Autoplay when entering viewport; pause when scrolling out */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (sectionVisible) {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser blocks unmuted playback, force mute and retry
            v.muted = true;
            setIsMuted(true);
            v.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    } else {
      if (!v.paused) {
        v.pause();
        setIsPlaying(false);
      }
    }
  }, [sectionVisible]);

  /* Toggle Play / Pause */
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  /* Toggle Mute / Sound */
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  /* Fullscreen */
  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
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
          className={`${revealBase} ${videoReveal} relative w-full rounded-2xl overflow-hidden cursor-pointer group bg-navy-900 select-none`}
          style={{
            aspectRatio: '16/9',
            transitionDelay: prefersReduced ? '0ms' : '500ms',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,161,107,0.15)',
          }}
          onClick={() => togglePlay()}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          role="region"
          aria-label="Lecteur vidéo du film Sabon"
        >
          {/* Native HTML5 Video Element with Autoplay & Loop */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterWebp}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setHasError(true);
              setIsBuffering(false);
            }}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Film de présentation officiel Sabon Spa"
          />

          {/* Subtle dark gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,20,35,0.3) 0%, rgba(10,20,35,0.05) 50%, rgba(10,20,35,0.45) 100%)',
              opacity: isPlaying ? 0.35 : 0.7,
            }}
          />

          {/* Pause overlay icon when visitor has manually paused */}
          {!isPlaying && !isBuffering && !hasError && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/25 backdrop-blur-[1px] transition-opacity duration-300"
            >
              <div className="w-18 h-18 rounded-full bg-navy/80 border border-gold/40 text-gold flex items-center justify-center shadow-luxury transform group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="ml-1 text-gold" />
              </div>
            </div>
          )}

          {/* Loading / Buffering Spinner */}
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

          {/* Graceful Error State */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-950/90 p-6 text-center z-20">
              <p className="text-mist text-sm font-light mb-4">{t.error}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasError(false);
                  videoRef.current?.load();
                  videoRef.current?.play().catch(() => {});
                }}
                className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-wider font-medium shadow-md transition-all duration-200 active:scale-95"
              >
                {t.retry}
              </button>
            </div>
          )}

          {/* ── Luxury Floating Control Bar (Always visible on mobile or hover) ── */}
          <div
            className={`absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-85 sm:opacity-0 sm:group-hover:opacity-100'
            }`}
          >
            {/* Left: Play / Pause Button */}
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy/80 hover:bg-navy border border-aqua/25 hover:border-aqua/50 text-mist hover:text-white text-xs font-sans tracking-wide shadow-glass-dark hover:shadow-glow-aqua transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label={isPlaying ? t.pause : t.play}
            >
              {isPlaying ? <Pause size={14} className="text-aqua" /> : <Play size={14} className="text-gold" />}
              <span className="hidden sm:inline">{isPlaying ? t.pause : t.play}</span>
            </button>

            {/* Right: Sound Toggle + Fullscreen */}
            <div className="flex items-center gap-2.5">
              {/* Sound Toggle (Mute / Unmute) */}
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy/80 hover:bg-navy border border-aqua/25 hover:border-aqua/50 text-mist hover:text-white text-xs font-sans tracking-wide shadow-glass-dark hover:shadow-glow-aqua transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold/60"
                aria-label={isMuted ? t.unmute : t.mute}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={15} className="text-gold" />
                    <span>{t.unmute}</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={15} className="text-aqua animate-pulse" />
                    <span>{t.mute}</span>
                  </>
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-full bg-navy/80 hover:bg-navy border border-aqua/25 hover:border-aqua/50 text-mist hover:text-white shadow-glass-dark hover:shadow-glow-aqua transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold/60"
                aria-label={t.fullscreen}
                title={t.fullscreen}
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Subtle bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,20,35,0.6), transparent)' }}
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
    </section>
  );
};

export default BrandFilm;
