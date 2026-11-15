/**
 * CandleRitual — Luxury SVG pillar-candle scroll-progress indicator.
 *
 * Placement: fixed bottom-center.
 * The candle starts unlit at 0% scroll and progressively fills with warm amber light
 * and a layered SVG flame as the visitor scrolls. At 100%, an animated eye-catching
 * pop-up appears directly above the candle flame inviting the visitor to book.
 *
 * Reuses: scrollProgressStore, usePerformanceTier, getWhatsAppUrl, t(lang, key)
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Lang, t } from '../../i18n';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { scrollProgressStore } from '../../hooks/useScrollProgress';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { Sparkles, MessageSquare, X } from 'lucide-react';

interface CandleRitualProps {
  lang: Lang;
}

// ─── Flame stage helper ──────────────────────────────────────────────────────
type FlameStage = 'cold' | 'ember' | 'small' | 'large' | 'ignited';

function getFlameStage(progress: number): FlameStage {
  if (progress >= 0.94) return 'ignited';
  if (progress >= 0.65) return 'large';
  if (progress >= 0.30) return 'small';
  if (progress >= 0.08) return 'ember';
  return 'cold';
}

// ─── Component ───────────────────────────────────────────────────────────────
export const CandleRitual: React.FC<CandleRitualProps> = ({ lang }) => {
  const tier = usePerformanceTier();

  // ── State that drives React renders (kept minimal) ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flameStage, setFlameStage] = useState<FlameStage>('cold');
  const [showCTA, setShowCTA] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const [ctaLeaving, setCtaLeaving] = useState(false);
  const [milestoneTooltip, setMilestoneTooltip] = useState<string | null>(null);
  const [ariaAnnouncement, setAriaAnnouncement] = useState('');
  const [showWisp, setShowWisp] = useState(false);
  const [showDrip, setShowDrip] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  // ── DOM refs for rAF-driven updates (zero React re-renders) ──
  const glowRectRef = useRef<SVGRectElement>(null);
  const glowTopRef = useRef<SVGPathElement>(null);
  const wickGlowRef = useRef<SVGCircleElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const flameGroupRef = useRef<SVGGElement>(null);

  // ── Internal state refs ──
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const leanRef = useRef(0);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ignitionFiredRef = useRef(false);
  const lastStageRef = useRef<FlameStage>('cold');
  const lastMilestoneRef = useRef(-1);

  // ── External Modal / Lightbox detection (ignore candle elements) ──
  useEffect(() => {
    const checkModal = () => {
      const openDialog = document.querySelector('[role="dialog"]:not([data-candle-element])');
      const bodyLocked = document.body.classList.contains('overflow-hidden');
      setIsModalOpen(Boolean(openDialog || bodyLocked));
    };
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    checkModal();
    return () => observer.disconnect();
  }, []);

  // ── Milestone tooltip helper ──
  const showMilestone = useCallback((key: string) => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setMilestoneTooltip(t(lang, key));
    tooltipTimeoutRef.current = setTimeout(() => setMilestoneTooltip(null), 2200);
  }, [lang]);

  // ── Escape key dismisses CTA ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCTA && !ctaDismissed) {
        setCtaLeaving(true);
        setTimeout(() => {
          setCtaDismissed(true);
          setCtaLeaving(false);
        }, 300);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCTA, ctaDismissed]);

  // ── Subscribe to scroll progress store ──
  useEffect(() => {
    return scrollProgressStore.subscribe((progress) => {
      targetProgressRef.current = progress;

      const pct = Math.round(progress * 100);
      const stage = getFlameStage(progress);

      // React state only updated when stage changes
      if (stage !== lastStageRef.current) {
        lastStageRef.current = stage;
        setFlameStage(stage);

        // Ignition moment
        if (stage === 'ignited' && !ignitionFiredRef.current) {
          ignitionFiredRef.current = true;
          setAriaAnnouncement(t(lang, 'candle.candleIgnited'));
          setShowDrip(true);
          setCtaDismissed(false);
          setShowCTA(true);

          // Sparks burst
          if (tier !== 'reduced') {
            const newSparks = Array.from({ length: 8 }, (_, i) => ({
              id: Date.now() + i,
              x: 28 + (Math.random() - 0.5) * 16,
              y: 12 + Math.random() * 10,
              angle: (i / 8) * 360,
            }));
            setSparks(newSparks);
            setTimeout(() => setSparks([]), 1200);
          }
        }

        // When scrolling away from bottom, close CTA and reset ignition
        if (stage !== 'ignited') {
          ignitionFiredRef.current = false;
          setShowCTA(false);
          setShowDrip(false);
        }
      }

      // Reset dismissed state if user scrolled far up
      if (pct < 75 && ctaDismissed) {
        setCtaDismissed(false);
      }

      // Wisp of smoke when near top
      if (pct <= 2 && lastStageRef.current === 'cold') {
        setShowWisp(true);
        setTimeout(() => setShowWisp(false), 1500);
      }

      // Milestone tooltips
      const milestoneStep =
        pct >= 74 && pct <= 76 ? 75 :
        pct >= 49 && pct <= 51 ? 50 :
        pct >= 24 && pct <= 26 ? 25 : -1;
      if (milestoneStep !== -1 && milestoneStep !== lastMilestoneRef.current) {
        lastMilestoneRef.current = milestoneStep;
        const key = `soap.milestone${milestoneStep}` as `soap.milestone${25 | 50 | 75}`;
        showMilestone(key);
      }
    });
  }, [lang, showMilestone, tier, ctaDismissed]);

  // ── rAF render loop: smooth fill + subtle flame sway (anchored at wick base) ──
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const speed = tier === 'reduced' ? 1 : 0.12;
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * speed;
      const cur = currentProgressRef.current;

      // Glow rect fills from bottom of candle body: y=125 up to y=18
      const cavityH = 107;
      const cavityBottom = 125;
      const glowH = Math.max(0, Math.min(cavityH, cur * cavityH));
      const glowY = cavityBottom - glowH;

      if (glowRectRef.current) {
        glowRectRef.current.setAttribute('y', String(glowY));
        glowRectRef.current.setAttribute('height', String(glowH));
      }

      // Sine wave top edge of inner wax glow
      if (glowTopRef.current && tier !== 'reduced') {
        const t0 = performance.now() / 1000;
        const waveAmp = 2;
        const wx = cur > 0.02 ? waveAmp : 0;
        const d = `M 8 ${glowY + wx * Math.sin(t0 * 1.5)} ` +
          `Q 20 ${glowY - wx * 1} 28 ${glowY + wx * Math.sin(t0 * 1.5 + 1)} ` +
          `T 48 ${glowY - wx * Math.sin(t0 * 1.5 + 2)}`;
        glowTopRef.current.setAttribute('d', d);
      }

      // Wick ember glow opacity (steady and smooth)
      if (wickGlowRef.current) {
        wickGlowRef.current.setAttribute('opacity', cur >= 0.08 ? '0.9' : '0');
      }

      // Percentage Counter
      if (counterRef.current) {
        counterRef.current.textContent = `${Math.round(cur * 100)}%`;
      }

      // Flame wind lean (anchored precisely at wick base x=28, y=18)
      if (flameGroupRef.current && tier !== 'reduced') {
        const currentScrollY = window.scrollY;
        const velocity = currentScrollY - lastScrollYRef.current;
        lastScrollYRef.current = currentScrollY;

        const targetLean = Math.max(-6, Math.min(6, -velocity * 0.4));
        leanRef.current += (targetLean - leanRef.current) * 0.1;

        if (Math.abs(leanRef.current) > 0.05) {
          flameGroupRef.current.style.transform = `rotate(${leanRef.current.toFixed(2)}deg)`;
        } else if (flameGroupRef.current.style.transform !== '') {
          flameGroupRef.current.style.transform = '';
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [tier]);

  // ── Handlers ──
  const handleCandleClick = () => {
    if (flameStage === 'ignited') {
      window.open(getWhatsAppUrl(undefined, lang), '_blank', 'noopener,noreferrer');
    } else {
      window.scrollTo({ top: 0, behavior: tier === 'reduced' ? 'auto' : 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCandleClick();
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getWhatsAppUrl(undefined, lang), '_blank', 'noopener,noreferrer');
  };

  const handleCtaDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCtaLeaving(true);
    setTimeout(() => {
      setCtaDismissed(true);
      setCtaLeaving(false);
    }, 300);
  };

  if (isModalOpen) return null;

  const flameVisible = flameStage !== 'cold';
  const isIgnited = flameStage === 'ignited';
  const isLarge = flameStage === 'large' || isIgnited;
  const isSmall = flameStage === 'small' || isLarge;
  const isEmber = flameStage === 'ember' || isSmall;

  return (
    <>
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes candleFlicker {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          25%       { transform: scaleY(1.04) skewX(-0.8deg); }
          50%       { transform: scaleY(0.96) skewX(0.6deg); }
          75%       { transform: scaleY(1.02) skewX(-0.4deg); }
        }
        @keyframes candleEmberPulse {
          0%, 100% { opacity: 0.65; transform: scale(0.9); }
          50%       { opacity: 1; transform: scale(1.1); }
        }
        @keyframes candleEmberFloat {
          0%   { transform: translate(0, 0); opacity: 0; }
          20%  { opacity: 0.9; }
          100% { transform: translate(var(--ex), -16px); opacity: 0; }
        }
        @keyframes candleSparkBurst {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--sx), var(--sy)) scale(0); opacity: 0; }
        }
        @keyframes candleWispRise {
          0%   { opacity: 0; transform: translateY(0) scaleX(1); }
          40%  { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-24px) scaleX(1.6); }
        }
        @keyframes candleDrip {
          0%   { stroke-dashoffset: 60; opacity: 0.9; }
          100% { stroke-dashoffset: 0; opacity: 0.4; }
        }
        @keyframes candleHaloPulse {
          0%, 100% { opacity: 0.08; transform: scale(0.95); }
          50%       { opacity: 0.16; transform: scale(1.08); }
        }
        .candle-flame-flicker {
          animation: candleFlicker 2.4s ease-in-out infinite;
          transform-origin: 28px 18px;
        }
        .candle-ember-pulse {
          animation: candleEmberPulse 1.2s ease-in-out infinite;
          transform-origin: 28px 8px;
        }
        .candle-halo-pulse {
          animation: candleHaloPulse 2.4s ease-in-out infinite;
          transform-origin: 28px 18px;
        }

        /* ── Pop-Up CTA at Top of Candle ── */
        @keyframes candleCtaPopIn {
          0% {
            opacity: 0;
            transform: translate(-50%, 18px) scale(0.72);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -4px) scale(1.04);
          }
          85% {
            transform: translate(-50%, 1px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        @keyframes candleCtaPopOut {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 14px) scale(0.85);
          }
        }
        @keyframes candleCtaGlowPulse {
          0%, 100% {
            box-shadow: 0 0 20px 2px rgba(201,161,107,0.30), 0 10px 30px rgba(8,43,73,0.55);
          }
          50% {
            box-shadow: 0 0 35px 6px rgba(201,161,107,0.55), 0 12px 42px rgba(99,185,209,0.35);
          }
        }
        @keyframes ctaShimmerLoop {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .candle-cta-pop {
          animation: candleCtaPopIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .candle-cta-leave {
          animation: candleCtaPopOut 0.3s ease-in forwards;
        }
        .candle-cta-card {
          animation: candleCtaGlowPulse 2.4s ease-in-out infinite;
        }
        .cta-gold-shimmer {
          background: linear-gradient(90deg, #F5EFE2 0%, #FFE2A6 45%, #F5EFE2 60%, #E9B7BE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ctaShimmerLoop 2.8s linear infinite;
        }
      `}</style>

      {/* ── Fixed candle widget (Centered horizontally) ── */}
      <aside
        aria-label={t(lang, 'candle.ariaLabel')}
        className={`
          fixed z-30 select-none flex flex-col items-center
          left-1/2 -translate-x-1/2 bottom-20 sm:bottom-24
          max-md:bottom-6
        `}
        style={{ width: 56 }}
      >
        {/* ── Eye-Catching Animated Pop-up CTA directly above the Candle / Flame ── */}
        {showCTA && !ctaDismissed && (
          <div
            data-candle-element="true"
            className={`absolute bottom-[104%] left-1/2 mb-2 z-40 pointer-events-auto ${
              ctaLeaving ? 'candle-cta-leave' : 'candle-cta-pop'
            }`}
            style={{ width: 'max-content', maxWidth: 'min(90vw, 300px)' }}
          >
            <div
              className="candle-cta-card relative rounded-2xl border border-champagne/60 p-3 sm:p-3.5 backdrop-blur-xl flex flex-col items-center text-center text-white"
              style={{
                background: 'linear-gradient(145deg, rgba(14, 45, 75, 0.97) 0%, rgba(8, 30, 52, 0.99) 100%)',
              }}
            >
              {/* Little downward speech caret pointing at the tip of the flame */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-champagne/60 pointer-events-none"
                style={{ background: 'rgba(8, 30, 52, 0.99)' }}
              />

              {/* Close '×' button */}
              <button
                onClick={handleCtaDismiss}
                aria-label={t(lang, 'candle.ctaDismiss')}
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-champagne/70 hover:text-champagne hover:bg-white/10 transition-colors text-xs"
              >
                <X size={12} />
              </button>

              {/* Header badge */}
              <div className="flex items-center gap-1.5 mb-1 text-[9px] uppercase tracking-[0.2em] text-champagne-light font-medium">
                <Sparkles size={11} className="text-champagne animate-pulse" />
                <span>Sabon Spa Tanger</span>
              </div>

              {/* Title with gold shimmer */}
              <p className="cta-gold-shimmer text-base sm:text-lg font-serif font-bold tracking-wide leading-tight mb-2.5">
                {t(lang, 'candle.ctaText')}
              </p>

              {/* Action Button */}
              <button
                onClick={handleCtaClick}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full bg-gradient-to-r from-brand via-brand-600 to-brand-500 hover:from-brand-600 hover:to-brand-700 border border-champagne/40 text-white text-xs font-serif font-semibold tracking-wider shadow-lg hover:shadow-xl transform hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <MessageSquare size={13} className="text-champagne shrink-0" />
                <span>{lang === 'fr' ? 'Réserver maintenant' : 'Book Now'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Milestone tooltip (right side, toward page center) ── */}
        {milestoneTooltip && (
          <div
            className="absolute left-full ml-3 bottom-1/3 px-3 py-1.5 rounded-xl bg-navy/90 backdrop-blur-md border border-champagne/40 text-ivory text-xs shadow-xl whitespace-nowrap pointer-events-none animate-fade-in"
            role="status"
            aria-live="polite"
          >
            <span className="font-serif tracking-wide">{milestoneTooltip}</span>
          </div>
        )}

        {/* ── Main candle SVG button ── */}
        <button
          onClick={handleCandleClick}
          onKeyDown={handleKeyDown}
          aria-label={isIgnited ? t(lang, 'candle.ctaText') : t(lang, 'candle.backToTop')}
          className="relative focus:outline-none focus:ring-2 focus:ring-aqua focus:ring-offset-2 focus:ring-offset-ivory rounded-[14px] hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{ width: 56, height: 150 }}
        >
          <svg
            viewBox="0 0 56 150"
            width="56"
            height="150"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="overflow-visible drop-shadow-md max-md:w-10 max-md:h-[110px]"
            aria-hidden="true"
          >
            <defs>
              {/* Candle body: ivory → champagne */}
              <linearGradient id="candle-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDFAF5" />
                <stop offset="45%" stopColor="#F5EFE2" />
                <stop offset="80%" stopColor="#EDE0CA" />
                <stop offset="100%" stopColor="#D6C4A6" />
              </linearGradient>

              {/* Rose-quartz tint at base */}
              <linearGradient id="candle-rose-tint" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E9B7BE" stopOpacity="0" />
                <stop offset="100%" stopColor="#E9B7BE" stopOpacity="0.28" />
              </linearGradient>

              {/* Amber inner glow gradient (rising from base) */}
              <linearGradient id="candle-amber-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAD68A" stopOpacity="0.72" />
                <stop offset="40%" stopColor="#F4A03C" stopOpacity="0.82" />
                <stop offset="100%" stopColor="#C9A16B" stopOpacity="0.90" />
              </linearGradient>

              {/* Candle body clip (tall rounded rect) */}
              <clipPath id="candle-body-clip">
                <rect x="8" y="18" width="40" height="107" rx="12" ry="12" />
              </clipPath>

              {/* Flame gradient: aqua base → white → gold → rose tip */}
              <linearGradient id="flame-grad-core" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#63B9D1" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#C9A16B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F9B8C2" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="flame-grad-outer" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#C9A16B" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#FAE18A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F9D0D8" stopOpacity="0.2" />
              </linearGradient>

              {/* Glass glare on candle body */}
              <linearGradient id="candle-glare" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Halo radial gradient */}
              <radialGradient id="flame-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A16B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#C9A16B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── Halo behind flame ── */}
            {isLarge && tier !== 'reduced' && (
              <ellipse
                cx="28"
                cy="18"
                rx={isIgnited ? 22 : 18}
                ry={isIgnited ? 22 : 18}
                fill="url(#flame-halo)"
                className="candle-halo-pulse pointer-events-none"
              />
            )}

            {/* ── Candle body ── */}
            <rect
              x="8" y="18" width="40" height="107"
              rx="12" ry="12"
              fill="url(#candle-body-grad)"
              stroke="#D4BFA0"
              strokeWidth="1"
            />

            {/* Rose-quartz tint overlay at base */}
            <rect
              x="8" y="18" width="40" height="107"
              rx="12" ry="12"
              fill="url(#candle-rose-tint)"
              clipPath="url(#candle-body-clip)"
            />

            {/* ── Amber inner glow fill (rAF-driven height) ── */}
            <g clipPath="url(#candle-body-clip)">
              <rect
                ref={glowRectRef}
                x="8"
                y="125"
                width="40"
                height="0"
                fill="url(#candle-amber-glow)"
              />
              {/* Animated wave top-edge of glow */}
              {tier !== 'reduced' && (
                <path
                  ref={glowTopRef}
                  d="M 8 125 Q 20 123 28 125 T 48 125"
                  fill="none"
                  stroke="#FAD68A"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              )}

              {/* Ember specks inside wax */}
              {tier === 'high' && isEmber && [0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={16 + i * 10}
                  cy={120 - i * 6}
                  r="1.2"
                  fill="#FAD68A"
                  style={{
                    '--ex': `${(Math.random() - 0.5) * 10}px`,
                    animation: `candleEmberFloat ${1.2 + i * 0.3}s ease-out ${i * 0.4}s infinite`,
                  } as React.CSSProperties}
                />
              ))}
            </g>

            {/* ── Gold band ── */}
            <rect
              x="8" y="118" width="40" height="5"
              fill="#C9A16B"
              opacity="0.55"
              clipPath="url(#candle-body-clip)"
            />

            {/* ── Embossed SABON wordmark ── */}
            <text
              x="28" y="80"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
              fontSize="5.5"
              fontWeight="600"
              letterSpacing="0.3em"
              fill="#9E8A6D"
              opacity="0.60"
            >
              SABON
            </text>

            {/* ── Glare highlight on candle body ── */}
            <path
              d="M 13 22 C 18 20, 36 20, 40 25 C 36 42 24 70 13 88 Z"
              fill="url(#candle-glare)"
              clipPath="url(#candle-body-clip)"
              pointerEvents="none"
            />

            {/* ── Brass dish ── */}
            <ellipse cx="28" cy="132" rx="20" ry="6"
              fill="#C9A16B"
              opacity="0.55"
            />
            <ellipse cx="28" cy="130" rx="20" ry="4"
              fill="#D4B88A"
              opacity="0.60"
            />
            <ellipse cx="28" cy="130" rx="20" ry="4"
              fill="none"
              stroke="#C9A16B"
              strokeWidth="0.8"
              opacity="0.80"
            />

            {/* ── Wick ── */}
            <path
              d="M 28 18 C 29 15, 27 12, 28 10"
              stroke="#2A1A0A"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Wick glow (red-orange tip) */}
            <circle
              ref={wickGlowRef}
              cx="28" cy="10" r="2"
              fill="#E05C2A"
              opacity="0"
            />

            {/* ── Wisp of smoke (near 0%) ── */}
            {showWisp && tier !== 'reduced' && (
              <path
                d="M 28 10 C 30 5, 26 1, 28 -4"
                stroke="#B0A090"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
                style={{ animation: 'candleWispRise 1.5s ease-out forwards' }}
              />
            )}

            {/* ── Wax drip (at 100%) ── */}
            {showDrip && (
              <path
                d="M 46 50 C 47 60, 48 72, 47 85"
                stroke="#F5EFE2"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="60"
                style={{ animation: 'candleDrip 2.4s ease-out 0.3s forwards' }}
              />
            )}

            {/* ── FLAME GROUP (Anchored at base x=28, y=18) ── */}
            <g ref={flameGroupRef} style={{ transformOrigin: '28px 18px' }}>
              {/* Ember stage */}
              {flameVisible && (
                <ellipse
                  cx="28" cy="8" rx="2" ry="2.5"
                  fill="#E05C2A"
                  opacity={isEmber ? 0.8 : 0}
                  className={tier !== 'reduced' ? 'candle-ember-pulse' : ''}
                />
              )}

              {/* Small flame (30–65%) */}
              {isSmall && (
                <>
                  <path
                    d="M 28 18 C 24 12, 22 6, 28 1 C 34 6, 32 12, 28 18 Z"
                    fill="url(#flame-grad-outer)"
                    className={tier !== 'reduced' ? 'candle-flame-flicker' : ''}
                  />
                  <path
                    d="M 28 16 C 25 11, 25 7, 28 3 C 31 7, 31 11, 28 16 Z"
                    fill="url(#flame-grad-core)"
                    className={tier !== 'reduced' ? 'candle-flame-flicker' : ''}
                    style={tier !== 'reduced' ? { animationDelay: '-0.4s' } : {}}
                  />
                </>
              )}

              {/* Large flame (65–94%) */}
              {isLarge && (
                <>
                  <path
                    d="M 28 18 C 22 10, 19 2, 28 -5 C 37 2, 34 10, 28 18 Z"
                    fill="url(#flame-grad-outer)"
                    className={tier !== 'reduced' ? 'candle-flame-flicker' : ''}
                  />
                  <path
                    d="M 28 16 C 24 9, 23 3, 28 -2 C 33 3, 32 9, 28 16 Z"
                    fill="url(#flame-grad-core)"
                    className={tier !== 'reduced' ? 'candle-flame-flicker' : ''}
                    style={tier !== 'reduced' ? { animationDelay: '-0.7s' } : {}}
                  />
                </>
              )}

              {/* Ignition (94%+) */}
              {isIgnited && (
                <path
                  d="M 28 18 C 20 8, 17 -2, 28 -10 C 39 -2, 36 8, 28 18 Z"
                  fill="url(#flame-grad-outer)"
                  className={tier !== 'reduced' ? 'candle-flame-flicker' : ''}
                  style={tier !== 'reduced' ? { animationDelay: '-1.1s', opacity: 0.75 } : {}}
                />
              )}
            </g>

            {/* ── Spark burst at ignition ── */}
            {sparks.map((s) => (
              <circle
                key={s.id}
                cx={s.x} cy={s.y} r="1.5"
                fill="#FAD68A"
                style={{
                  '--sx': `${Math.cos((s.angle * Math.PI) / 180) * 20}px`,
                  '--sy': `${Math.sin((s.angle * Math.PI) / 180) * 20 - 10}px`,
                  animation: 'candleSparkBurst 0.9s ease-out forwards',
                } as React.CSSProperties}
              />
            ))}
          </svg>

          {/* ── Percentage counter under dish ── */}
          <div className="absolute inset-x-0 bottom-1 flex justify-center pointer-events-none">
            <span
              ref={counterRef}
              className="text-[10px] font-bold tracking-tight"
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontVariantNumeric: 'tabular-nums',
                color: '#7A6248',
              }}
            >
              0%
            </span>
          </div>
        </button>
      </aside>

      {/* ── Aria live region ── */}
      <div role="status" aria-live="polite" className="sr-only">
        {ariaAnnouncement}
      </div>
    </>
  );
};

export default CandleRitual;
