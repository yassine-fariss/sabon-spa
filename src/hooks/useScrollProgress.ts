import { useState, useEffect } from 'react';

type ScrollProgressCallback = (progress: number, scrollY: number) => void;

class ScrollProgressStore {
  private subscribers = new Set<ScrollProgressCallback>();
  private progress = 0;
  private scrollY = 0;
  private ticking = false;
  private isListening = false;

  private update = () => {
    if (typeof window === 'undefined') return;

    // Do not run if document is hidden to conserve power and CPU
    if (document.hidden) {
      this.ticking = false;
      return;
    }

    const doc = document.documentElement;
    const winHeight = window.innerHeight;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(1, doc.scrollHeight - winHeight);
    const rawProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

    this.scrollY = currentScrollY;
    this.progress = rawProgress;

    // Write directly to CSS custom property for zero-JS CSS transforms/masks
    doc.style.setProperty('--scroll-progress', rawProgress.toFixed(4));

    for (const sub of this.subscribers) {
      sub(rawProgress, currentScrollY);
    }

    this.ticking = false;
  };

  private handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(this.update);
    }
  };

  public subscribe(fn: ScrollProgressCallback): () => void {
    this.subscribers.add(fn);

    if (!this.isListening && typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      window.addEventListener('resize', this.handleScroll, { passive: true });
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      this.isListening = true;
      this.update();
    } else {
      fn(this.progress, this.scrollY);
    }

    return () => {
      this.subscribers.delete(fn);
      if (this.subscribers.size === 0 && this.isListening && typeof window !== 'undefined') {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        this.isListening = false;
      }
    };
  }

  private handleVisibilityChange = () => {
    if (!document.hidden) {
      this.handleScroll();
    }
  };

  public getProgress(): number {
    return this.progress;
  }

  public getScrollY(): number {
    return this.scrollY;
  }
}

export const scrollProgressStore = new ScrollProgressStore();

/**
 * React hook that returns throttled scroll progress (0 to 1).
 * Updates state only every 1% to prevent unnecessary React re-renders.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let lastReported = -1;
    return scrollProgressStore.subscribe((p) => {
      if (Math.abs(p - lastReported) >= 0.01 || p === 0 || p === 1) {
        lastReported = p;
        setProgress(p);
      }
    });
  }, []);

  return progress;
}

export default useScrollProgress;
