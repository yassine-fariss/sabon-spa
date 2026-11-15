import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'low' | 'reduced';

export function getPerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'high';

  // 1. Accessibility: prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'reduced';
  }

  // 2. Hardware constraints
  const concurrency = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 4;
  const memory = typeof (navigator as any).deviceMemory === 'number' ? (navigator as any).deviceMemory : 4;

  // Low-power mobile detection
  const isMobile = window.innerWidth < 640;
  const isLowHardware = concurrency <= 4 || memory < 4;

  if (isLowHardware || (isMobile && concurrency <= 4)) {
    return 'low';
  }

  return 'high';
}

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>(getPerformanceTier);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTier('reduced');
      } else {
        setTier(getPerformanceTier());
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return tier;
}

export default usePerformanceTier;
