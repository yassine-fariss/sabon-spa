import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Lang, t } from '../../i18n';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { scrollProgressStore } from '../../hooks/useScrollProgress';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { Sparkles, Calendar, ArrowUp } from 'lucide-react';

interface SoapProgressProps {
  lang: Lang;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const SoapProgress: React.FC<SoapProgressProps> = ({ lang }) => {
  const tier = usePerformanceTier();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [milestoneTooltip, setMilestoneTooltip] = useState<string | null>(null);
  const [isAt100, setIsAt100] = useState(false);
  const [ariaValue, setAriaValue] = useState(0);
  const [isRinsing, setIsRinsing] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const liquidRef = useRef<SVGRectElement>(null);
  const waveGroupRef = useRef<SVGGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lastStepRef = useRef<number>(0);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor DOM for open modals (Lightbox, BookingModal) to hide SoapProgress
  useEffect(() => {
    const checkModal = () => {
      const openDialog = document.querySelector('[role="dialog"]');
      const bodyLocked = document.body.classList.contains('overflow-hidden');
      setIsModalOpen(Boolean(openDialog || bodyLocked));
    };

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    checkModal();

    return () => observer.disconnect();
  }, []);

  // Show milestone tooltip for ~2 seconds
  const showMilestone = useCallback((key: string) => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setMilestoneTooltip(t(lang, key));
    tooltipTimeoutRef.current = setTimeout(() => {
      setMilestoneTooltip(null);
    }, 2200);
  }, [lang]);

  // Spawn bubbles when 10% steps are crossed
  const spawnBubbles = useCallback((count = 3) => {
    if (tier === 'low' || tier === 'reduced') return;

    setBubbles((prev) => {
      const newBubbles: Bubble[] = [];
      const timestamp = Date.now();
      for (let i = 0; i < count; i++) {
        newBubbles.push({
          id: timestamp + i,
          x: 20 + Math.random() * 60, // percentage within soap
          y: 70 + Math.random() * 20,
          size: 3 + Math.random() * 4,
          opacity: 0.85,
        });
      }
      // Cap at 6 bubbles max
      return [...prev.slice(-3), ...newBubbles].slice(-6);
    });

    // Cleanup bubbles after float animation
    setTimeout(() => {
      setBubbles((prev) => prev.slice(count));
    }, 1800);
  }, [tier]);

  // Subscribe to shared passive scroll progress store
  useEffect(() => {
    return scrollProgressStore.subscribe((progress) => {
      targetProgressRef.current = progress;

      // Throttle aria-valuenow updates to multiples of 5%
      const roundedPercent = Math.round(progress * 100);
      const steppedAria = Math.floor(roundedPercent / 5) * 5;
      setAriaValue(steppedAria);

      // Check milestones
      const currentStep10 = Math.floor(roundedPercent / 10);
      if (currentStep10 !== lastStepRef.current && roundedPercent > 0) {
        lastStepRef.current = currentStep10;
        spawnBubbles(currentStep10 === 10 ? 6 : 3);
      }

      if (roundedPercent >= 24 && roundedPercent <= 26) {
        showMilestone('soap.milestone25');
      } else if (roundedPercent >= 49 && roundedPercent <= 51) {
        showMilestone('soap.milestone50');
      } else if (roundedPercent >= 74 && roundedPercent <= 76) {
        showMilestone('soap.milestone75');
      } else if (roundedPercent >= 99) {
        showMilestone('soap.milestone100');
      }

      // Morph to CTA at 100%
      setIsAt100(progress >= 0.985);
    });
  }, [showMilestone, spawnBubbles]);

  // Smooth rAF loop to interpolate fill percentage & liquid height
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const target = isRinsing ? 0 : targetProgressRef.current;
      const speed = tier === 'reduced' ? 1 : 0.12;

      // Lerp smooth interpolation
      currentProgressRef.current += (target - currentProgressRef.current) * speed;
      const cur = currentProgressRef.current;

      // Soap inner cavity height is 90 units (from y=95 to y=5)
      const liquidHeight = Math.max(0, Math.min(90, cur * 90));
      const liquidY = 95 - liquidHeight;

      if (liquidRef.current) {
        liquidRef.current.setAttribute('y', String(liquidY));
        liquidRef.current.setAttribute('height', String(liquidHeight));
      }

      if (waveGroupRef.current) {
        waveGroupRef.current.setAttribute('transform', `translate(0, ${liquidY})`);
        waveGroupRef.current.style.opacity = cur > 0.02 && cur < 0.98 ? '1' : '0.4';
      }

      if (counterRef.current) {
        counterRef.current.textContent = `${Math.round(cur * 100)}%`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isRinsing, tier]);

  // Click handler
  const handleClick = (e: React.MouseEvent) => {
    if (isAt100) {
      // Natural conclusion: open WhatsApp reservation
      window.open(getWhatsAppUrl(undefined, lang), '_blank', 'noopener,noreferrer');
    } else {
      // Rinse animation: drain liquid downward then return to top
      setIsRinsing(true);
      window.scrollTo({
        top: 0,
        behavior: tier === 'reduced' ? 'auto' : 'smooth',
      });
      setTimeout(() => setIsRinsing(false), 900);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  if (isModalOpen) return null;

  return (
    <>
      <style>{`
        @keyframes soapWaveLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .soap-wave-front {
          animation: soapWaveLoop 6s linear infinite;
        }
        .soap-wave-back {
          animation: soapWaveLoop 9s linear infinite reverse;
        }
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-40px) scale(1.1); opacity: 0; }
        }
      `}</style>

      {/* Floating Widget: Desktop bottom-right (above WhatsApp), Mobile slim bottom-center */}
      <aside
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
        aria-label={t(lang, 'soap.ariaLabel')}
        className={`fixed z-30 transition-all duration-500 select-none
          /* Desktop placement: bottom-right (above WhatsApp button at bottom-6) */
          right-6 bottom-24 hidden md:flex flex-col items-center
          /* Mobile placement: slim version docked bottom-center without covering buttons */
          max-md:flex max-md:left-1/2 max-md:-translate-x-1/2 max-md:bottom-4
        `}
      >
        {/* Milestone Glass Tooltip */}
        {milestoneTooltip && (
          <div
            className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-navy-950/90 backdrop-blur-md border border-champagne/40 text-ivory text-xs shadow-xl flex items-center gap-1.5 whitespace-nowrap animate-fade-in pointer-events-none"
            role="status"
            aria-live="polite"
          >
            <Sparkles size={12} className="text-champagne shrink-0" />
            <span className="font-serif tracking-wide">{milestoneTooltip}</span>
          </div>
        )}

        {/* Morphing Soap / CTA Container */}
        <div
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={isAt100 ? t(lang, 'soap.bookNow') : t(lang, 'soap.backToTop')}
          className={`group relative flex items-center justify-center cursor-pointer transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-aqua focus:ring-offset-2 focus:ring-offset-ivory ${
            isAt100
              ? 'px-5 py-3 rounded-full bg-navy text-ivory border-2 border-champagne/80 shadow-2xl hover:scale-105 active:scale-95'
              : 'w-[72px] h-[110px] max-md:w-[64px] max-md:h-[96px] rounded-[24px] p-1.5 bg-gradient-to-b from-white/90 via-ivory/80 to-sand/60 backdrop-blur-md border border-champagne/50 shadow-luxury hover:shadow-2xl hover:scale-105 active:scale-95'
          }`}
        >
          {!isAt100 ? (
            /* ======================================================== */
            /* Vertical Soap Bar (SVG)                                  */
            /* ======================================================== */
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Floating Bubbles */}
              {bubbles.map((b) => (
                <span
                  key={b.id}
                  className="absolute rounded-full bg-white/90 border border-aqua/60 pointer-events-none"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    animation: 'bubbleFloat 1.6s ease-out forwards',
                  }}
                />
              ))}

              <svg
                viewBox="0 0 60 100"
                className="w-full h-full drop-shadow-sm overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Ivory-to-champagne soap body gradient */}
                  <linearGradient id="soap-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCFAF7" />
                    <stop offset="40%" stopColor="#F5EFE6" />
                    <stop offset="85%" stopColor="#EDE2D0" />
                    <stop offset="100%" stopColor="#DFD0BA" />
                  </linearGradient>

                  {/* Aqua foam/liquid fill gradient */}
                  <linearGradient id="soap-aqua-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7CDCEE" stopOpacity="0.88" />
                    <stop offset="35%" stopColor="#4BB9D4" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#1672B1" stopOpacity="0.98" />
                  </linearGradient>

                  {/* Back counter wave */}
                  <linearGradient id="soap-aqua-back" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A5EDFA" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#125E92" stopOpacity="0.65" />
                  </linearGradient>

                  {/* Inner soap cavity clip */}
                  <clipPath id="soap-inner-clip">
                    <rect x="5" y="5" width="50" height="90" rx="19" ry="19" />
                  </clipPath>

                  {/* Subtle glass reflection */}
                  <linearGradient id="soap-glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 1. Realistic Rounded Soap Bar Base */}
                <rect
                  x="5"
                  y="5"
                  width="50"
                  height="90"
                  rx="19"
                  ry="19"
                  fill="url(#soap-body-grad)"
                  stroke="#D8C6A5"
                  strokeWidth="1.2"
                />

                {/* 2. Embossed "SABON" Wordmark */}
                <text
                  x="30"
                  y="52"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
                  fontSize="6.5"
                  fontWeight="600"
                  letterSpacing="0.28em"
                  fill="#9E8A6D"
                  opacity="0.65"
                  style={{
                    textShadow: '0 1px 1px rgba(255,255,255,0.9), 0 -1px 1px rgba(120,95,65,0.2)',
                  }}
                >
                  SABON
                </text>

                {/* 3. Liquid & Foam Filling (Clipped to Soap Cavity) */}
                <g clipPath="url(#soap-inner-clip)">
                  {/* Liquid fill body */}
                  <rect
                    ref={liquidRef}
                    x="5"
                    y="95"
                    width="50"
                    height="0"
                    fill="url(#soap-aqua-fill)"
                  />

                  {/* Double sine wave surface (animated with CSS transform translateX) */}
                  {tier !== 'reduced' && (
                    <g ref={waveGroupRef} className="transition-opacity duration-300">
                      {/* Back Wave */}
                      {tier === 'high' && (
                        <g className="soap-wave-back">
                          <path
                            d="M -60 0 Q -45 4, -30 0 T 0 0 T 30 0 T 60 0 T 90 0 T 120 0 V 10 H -60 Z"
                            fill="url(#soap-aqua-back)"
                          />
                        </g>
                      )}

                      {/* Front Wave */}
                      <g className="soap-wave-front">
                        <path
                          d="M -60 0 Q -45 -4, -30 0 T 0 0 T 30 0 T 60 0 T 90 0 T 120 0 V 10 H -60 Z"
                          fill="url(#soap-aqua-fill)"
                        />
                        {/* Foam crest line */}
                        <path
                          d="M -60 0 Q -45 -4, -30 0 T 0 0 T 30 0 T 60 0 T 90 0 T 120 0"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                          strokeOpacity="0.9"
                        />
                      </g>
                    </g>
                  )}

                  {/* Submerged SABON highlight */}
                  <text
                    x="30"
                    y="52"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
                    fontSize="6.5"
                    fontWeight="600"
                    letterSpacing="0.28em"
                    fill="#FFFFFF"
                    opacity="0.8"
                    style={{
                      textShadow: '0 1px 2px rgba(18,94,146,0.6)',
                    }}
                  >
                    SABON
                  </text>
                </g>

                {/* 4. Glass Glare & Cylindrical Edge Highlight */}
                <path
                  d="M 10 10 C 16 8, 38 8, 44 12 C 40 28, 25 55, 10 75 Z"
                  fill="url(#soap-glass-glare)"
                  clipPath="url(#soap-inner-clip)"
                  pointerEvents="none"
                />
              </svg>

              {/* Counter in Cormorant Garamond with Tabular-Nums */}
              <div className="absolute inset-x-0 bottom-1 flex flex-col items-center pointer-events-none">
                <span
                  ref={counterRef}
                  className="font-serif text-[11px] font-bold text-navy tracking-tight drop-shadow-xs"
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                  }}
                >
                  0%
                </span>
              </div>

              {/* Hover Cue: Scroll to top arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-navy text-champagne border border-champagne/60 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition duration-200 shadow-sm pointer-events-none">
                <ArrowUp size={11} />
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* 100% Morph: Refined Reservation Pill CTA                 */
            /* ======================================================== */
            <div className="flex items-center gap-3 animate-fade-in whitespace-nowrap">
              <div className="w-7 h-7 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center shrink-0">
                <Calendar size={14} className="text-champagne" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-widest text-champagne-light font-medium">
                  Sabon Spa Tanger
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-ivory tracking-wide leading-tight">
                  {t(lang, 'soap.bookNow')}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SoapProgress;
