import React, { CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';

export type RevealVariant =
  | 'fade-up'       // fade in + translate up (default)
  | 'fade-down'     // fade in + translate down
  | 'fade-left'     // fade in + translate from left
  | 'fade-right'    // fade in + translate from right
  | 'fade-in'       // pure fade, no movement
  | 'scale-up'      // scale from 0.92 to 1 + fade
  | 'clip-up'       // clip-path reveal from bottom
  | 'pop-up';       // spring pop-up with subtle bouncy scale (translateY 32px + scale 0.91 -> 1.0)

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** Delay in ms before animation starts (use for stagger) */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Optional custom cubic-bezier timing function */
  easing?: string;
  /** Extra className on the wrapper div */
  className?: string;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  as?: keyof JSX.IntrinsicElements;
}

const HIDDEN_STYLES: Record<RevealVariant, CSSProperties> = {
  'fade-up':    { opacity: 0, transform: 'translateY(24px)' },
  'fade-down':  { opacity: 0, transform: 'translateY(-24px)' },
  'fade-left':  { opacity: 0, transform: 'translateX(-32px)' },
  'fade-right': { opacity: 0, transform: 'translateX(32px)' },
  'fade-in':    { opacity: 0 },
  'scale-up':   { opacity: 0, transform: 'scale(0.92)' },
  'clip-up':    { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  'pop-up':     { opacity: 0, transform: 'translateY(32px) scale(0.91)' },
};

const VISIBLE_STYLES: Record<RevealVariant, CSSProperties> = {
  'fade-up':    { opacity: 1, transform: 'translateY(0)' },
  'fade-down':  { opacity: 1, transform: 'translateY(0)' },
  'fade-left':  { opacity: 1, transform: 'translateX(0)' },
  'fade-right': { opacity: 1, transform: 'translateX(0)' },
  'fade-in':    { opacity: 1 },
  'scale-up':   { opacity: 1, transform: 'scale(1)' },
  'clip-up':    { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  'pop-up':     { opacity: 1, transform: 'translateY(0) scale(1)' },
};

/**
 * Wraps any content with a scroll-triggered reveal animation.
 * Uses only CSS transitions + IntersectionObserver — zero extra dependencies.
 *
 * @example
 * <Reveal variant="pop-up" delay={100}>
 *   <Card />
 * </Reveal>
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  easing,
  className = '',
  threshold = 0.04,
  rootMargin = '0px 0px -15px 0px',
  as: Tag = 'div',
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin });

  // Use spring curve for pop-up, luxury smooth ease for others unless overridden
  const defaultEasing =
    variant === 'pop-up'
      ? 'cubic-bezier(0.34, 1.35, 0.64, 1)'
      : 'cubic-bezier(0.22, 1, 0.36, 1)';

  const style: CSSProperties = {
    ...(inView ? VISIBLE_STYLES[variant] : HIDDEN_STYLES[variant]),
    transitionProperty: 'opacity, transform, clip-path',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing || defaultEasing,
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
