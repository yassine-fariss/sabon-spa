import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Lang, t } from '../../i18n';
import { usePerformanceTier } from '../../hooks/usePerformanceTier';
import { Sparkles, Hand, X } from 'lucide-react';

interface SteamMirrorProps {
  lang: Lang;
  onCleared: () => void;
}

interface Droplet {
  x: number;
  y: number;
  speed: number;
  radius: number;
  length: number;
  life: number;
}

const STORAGE_KEY = 'sabon_mirror_wiped';

export const SteamMirror: React.FC<SteamMirrorProps> = ({ lang, onCleared }) => {
  const tier = usePerformanceTier();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isWiped, setIsWiped] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const dropletsRef = useRef<Droplet[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const sampleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refogCountRef = useRef(0);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mark mirror as completely wiped & store in session
  const completeReveal = useCallback(() => {
    if (isWiped) return;
    setIsFadingOut(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (_) {}

    setTimeout(() => {
      setIsWiped(true);
      onCleared();
      // Free canvas memory
      if (canvasRef.current) {
        canvasRef.current.width = 1;
        canvasRef.current.height = 1;
      }
      if (offscreenCanvasRef.current) {
        offscreenCanvasRef.current.width = 1;
        offscreenCanvasRef.current.height = 1;
      }
    }, 600);
  }, [isWiped, onCleared]);

  // If reduced motion or already wiped, immediately finish
  useEffect(() => {
    if (tier === 'reduced' || isWiped) {
      onCleared();
      setIsWiped(true);
    }
  }, [tier, isWiped, onCleared]);

  // Check scroll progress: if scrolled > 20% of hero, auto-reveal
  useEffect(() => {
    if (isWiped) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > window.innerHeight * 0.2) {
        completeReveal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isWiped, completeReveal]);

  // Initialize and draw the frosted hammam mirror fog layer
  const initFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // 1. Frosted hammam mist gradient (Navy & Mist)
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(24, 45, 70, 0.94)'); // Brand Navy
    grad.addColorStop(0.4, 'rgba(42, 70, 100, 0.90)');
    grad.addColorStop(0.7, 'rgba(234, 243, 246, 0.92)'); // Hammam mist
    grad.addColorStop(1, 'rgba(24, 45, 70, 0.95)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Condensation Droplets Noise texture (skip on low tier for 60fps)
    if (tier === 'high') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      const dropletCount = Math.min(800, Math.floor((width * height) / 3000));
      for (let i = 0; i < dropletCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 2 + 0.6;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }, [tier]);

  // Setup canvas size with DPI capping
  useEffect(() => {
    if (isWiped || tier === 'reduced') return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = tier === 'low' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Prepare offscreen canvas for sampling cleared ratio (64x36)
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 64;
    offCanvas.height = 36;
    offscreenCanvasRef.current = offCanvas;

    initFog();

    const handleResize = () => {
      if (isWiped) return;
      const newRect = container.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      canvas.style.width = `${newRect.width}px`;
      canvas.style.height = `${newRect.height}px`;
      const newCtx = canvas.getContext('2d');
      if (newCtx) newCtx.scale(dpr, dpr);
      initFog();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isWiped, tier, initFog]);

  // Erase stroke with destination-out & soft radial gradient brush
  const wipeAt = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 640;
    const brushRadius = isMobile ? 64 : 48;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    const brush = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    brush.addColorStop(0, 'rgba(0, 0, 0, 1)');
    brush.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
    brush.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = brush;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Spawn 1 to 2 running droplets on high tier
    if (tier === 'high' && dropletsRef.current.length < 20 && Math.random() < 0.25) {
      dropletsRef.current.push({
        x: x + (Math.random() * 20 - 10),
        y: y + Math.random() * 10,
        speed: 1.2 + Math.random() * 1.8,
        radius: 1.5 + Math.random() * 1.5,
        length: 8 + Math.random() * 14,
        life: 100,
      });
    }
  }, [tier]);

  // Interpolate between two points so fast wipes leave zero gaps
  const interpolateWipe = useCallback((p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const step = 8;
    const steps = Math.max(1, Math.floor(dist / step));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      wipeAt(p1.x + dx * t, p1.y + dy * t);
    }
  }, [wipeAt]);

  // Inactivity tracking: ghost teaching hand after 4s, re-fog after 8s
  const resetInactivityTimers = useCallback(() => {
    setUserInteracted(true);
    setShowHint(false);

    if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);

    // Re-fog after 8s of inactivity (max 1 cycle)
    if (refogCountRef.current === 0) {
      inactiveTimerRef.current = setTimeout(() => {
        if (!isWiped && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(234, 243, 246, 0.22)';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.restore();
            refogCountRef.current += 1;
          }
        }
      }, 8000);
    }
  }, [isWiped]);

  // Teaching Ghost Hand-wipe after 4 seconds of inactivity
  useEffect(() => {
    if (isWiped || userInteracted || tier === 'low' || tier === 'reduced') return;

    const timer = setTimeout(() => {
      setShowHint(true);
      // Auto-play a gentle ghost wave swipe across canvas center
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const startX = rect.width * 0.25;
      const startY = rect.height * 0.45;
      const endX = rect.width * 0.75;
      const endY = rect.height * 0.42;

      let step = 0;
      const totalSteps = 40;
      const interval = setInterval(() => {
        if (step > totalSteps || isDrawingRef.current) {
          clearInterval(interval);
          return;
        }
        const t = step / totalSteps;
        const curX = startX + (endX - startX) * t;
        const curY = startY + Math.sin(t * Math.PI) * 35;
        wipeAt(curX, curY);
        step++;
      }, 20);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isWiped, userInteracted, tier, wipeAt]);

  // Sample cleared area every 300ms on offscreen 64x36 canvas
  useEffect(() => {
    if (isWiped) return;

    sampleIntervalRef.current = setInterval(() => {
      const canvas = canvasRef.current;
      const offCanvas = offscreenCanvasRef.current;
      if (!canvas || !offCanvas) return;

      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.clearRect(0, 0, 64, 36);
      offCtx.drawImage(canvas, 0, 0, 64, 36);

      const imgData = offCtx.getImageData(0, 0, 64, 36);
      const data = imgData.data;
      let clearedPixels = 0;
      const totalPixels = 64 * 36;

      for (let i = 3; i < data.length; i += 4) {
        // Pixel is considered cleared if alpha < 50
        if (data[i] < 50) {
          clearedPixels++;
        }
      }

      const clearedRatio = clearedPixels / totalPixels;
      // If ~60% is cleared, complete the reveal!
      if (clearedRatio >= 0.58) {
        completeReveal();
      }
    }, 300);

    return () => {
      if (sampleIntervalRef.current) clearInterval(sampleIntervalRef.current);
    };
  }, [isWiped, completeReveal]);

  // Animation frame loop for trickling water droplets
  useEffect(() => {
    if (isWiped || tier !== 'high') return;

    const renderDroplets = () => {
      const canvas = canvasRef.current;
      if (!canvas || dropletsRef.current.length === 0) {
        animFrameRef.current = requestAnimationFrame(renderDroplets);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const d = dropletsRef.current[i];
        d.y += d.speed;
        d.life -= 1;

        // Draw tear droplet
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();

        if (d.life <= 0 || d.y > canvas.height) {
          dropletsRef.current.splice(i, 1);
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderDroplets);
    };

    animFrameRef.current = requestAnimationFrame(renderDroplets);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isWiped, tier]);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    resetInactivityTimers();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPointRef.current = { x, y };
    wipeAt(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (lastPointRef.current) {
      interpolateWipe(lastPointRef.current, currentPoint);
    } else {
      wipeAt(currentPoint.x, currentPoint.y);
    }

    lastPointRef.current = currentPoint;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  if (isWiped) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-20 overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Interactive Steam Mirror Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label={t(lang, 'steamMirror.ariaLabel')}
        role="img"
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Teaching Cue / Prompt */}
      {showHint && !isFadingOut && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-champagne/50 text-ivory text-xs sm:text-sm font-serif shadow-2xl flex items-center gap-2.5 animate-pulse pointer-events-none"
          role="status"
        >
          <Hand size={16} className="text-champagne animate-bounce" />
          <span>{t(lang, 'steamMirror.hint')}</span>
        </div>
      )}

      {/* Immediate Keyboard-Focusable Skip Button */}
      <button
        type="button"
        onClick={completeReveal}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 px-4 py-2 rounded-full bg-navy-900/80 hover:bg-navy-800 text-ivory hover:text-champagne border border-champagne/40 text-xs font-serif tracking-wider uppercase transition shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-aqua"
        aria-label={t(lang, 'steamMirror.skip')}
      >
        <span>{t(lang, 'steamMirror.skip')}</span>
      </button>
    </div>
  );
};

export default SteamMirror;
