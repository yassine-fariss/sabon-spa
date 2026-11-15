import React from 'react';
import { Sparkles } from 'lucide-react';

export type TransitionVariant =
  | 'curve-down'
  | 'curve-up'
  | 'wave-soft'
  | 'accent-line'
  | 'gradient-fade';

interface SectionTransitionProps {
  variant?: TransitionVariant;
  fillColor?: string;
  fromColor?: string;
  toColor?: string;
  height?: number | string;
  className?: string;
  showIcon?: boolean;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant = 'curve-down',
  fillColor = '#F7F3EB',
  fromColor,
  toColor,
  height = 48,
  className = '',
  showIcon = false,
}) => {
  if (variant === 'accent-line') {
    return (
      <div className={`relative w-full flex items-center justify-center py-4 overflow-hidden pointer-events-none ${className}`}>
        <div className="w-full max-w-5xl mx-auto px-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne/40 to-champagne/20" />
          {showIcon && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-champagne/40 text-gold-dark shadow-xs">
              <Sparkles size={11} className="text-gold" />
              <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-navy/70">
                Sabon Spa
              </span>
            </div>
          )}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-champagne/40 to-champagne/20" />
        </div>
      </div>
    );
  }

  if (variant === 'gradient-fade') {
    return (
      <div
        className={`w-full pointer-events-none relative z-10 ${className}`}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          background: `linear-gradient(to bottom, ${fromColor || 'transparent'}, ${toColor || fillColor})`,
        }}
      />
    );
  }

  if (variant === 'curve-up') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none relative z-20 ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'wave-soft') {
    return (
      <div
        className={`w-full overflow-hidden leading-none pointer-events-none relative z-20 ${className}`}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,24 C320,44 640,4 960,28 C1200,44 1360,20 1440,24 L1440,48 L0,48 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  // Default: 'curve-down'
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none relative z-20 ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C480,56 960,56 1440,0 L1440,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
