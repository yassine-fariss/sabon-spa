import React, { CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';

export type RevealVariant =
  | 'fade-up'       // fade in + translate up (default)
  | 'fade-down'     // fade in + translate down
  | 'fade-left'     // fade in + translate from left
  | 'fade-right'    // fade in + translate from right
  | 'fade-in'       // pure fade, no movement
  | 'scale-up'      // scale from 0.92 to 1 + fade
  | 'clip-up';      // clip-path reveal from bottom

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** Delay in ms before animation starts (use for stagger) */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Extra className on the wrapper div */
  className?: string;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  as?: keyof JSX.IntrinsicElements;
}

const HIDDEN_STYLES: Record<RevealVariant, CSSProperties> = {
  'fade-up':    { opacity: 0, transform: 'translateY(36px)' },
  'fade-down':  { opacity: 0, transform: 'translateY(-36px)' },
  'fade-left':  { opacity: 0, transform: 'translateX(-40px)' },
  'fade-right': { opacity: 0, transform: 'translateX(40px)' },
  'fade-in':    { opacity: 0 },
  'scale-up':   { opacity: 0, transform: 'scale(0.92)' },
  'clip-up':    { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
};

const VISIBLE_STYLES: Record<RevealVariant, CSSProperties> = {
  'fade-up':    { opacity: 1, transform: 'translateY(0)' },
  'fade-down':  { opacity: 1, transform: 'translateY(0)' },
  'fade-left':  { opacity: 1, transform: 'translateX(0)' },
  'fade-right': { opacity: 1, transform: 'translateX(0)' },
  'fade-in':    { opacity: 1 },
  'scale-up':   { opacity: 1, transform: 'scale(1)' },
  'clip-up':    { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
};

/**
 * Wraps any content with a scroll-triggered reveal animation.
 * Uses only CSS transitions + IntersectionObserver — zero extra dependencies.
 *
 * @example
 * <Reveal variant="fade-up" delay={100}>
 *   <h2>Discover our rituals</h2>
 * </Reveal>
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  as: Tag = 'div',
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin });

  const style: CSSProperties = {
    ...(inView ? VISIBLE_STYLES[variant] : HIDDEN_STYLES[variant]),
    transitionProperty: 'opacity, transform, clip-path',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    // @ts-ignore — dynamic tag with ref
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
};

/**
 * Stagger container: applies incrementally increasing delays to children.
 * Children must be React elements.
 *
 * @example
 * <StaggerReveal variant="fade-up" staggerMs={80}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggerReveal>
 */
interface StaggerRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  staggerMs?: number;
  baseDelay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  variant = 'fade-up',
  staggerMs = 90,
  baseDelay = 0,
  duration = 750,
  className = '',
  threshold,
  rootMargin,
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) =>
        child ? (
          <Reveal
            key={i}
            variant={variant}
            delay={baseDelay + i * staggerMs}
            duration={duration}
            threshold={threshold}
            rootMargin={rootMargin}
          >
            {child}
          </Reveal>
        ) : null
      )}
    </div>
  );
};
