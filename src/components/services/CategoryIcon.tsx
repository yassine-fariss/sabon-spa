import React from 'react';

interface CategoryIconProps {
  icon: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ icon, className = 'w-6 h-6' }) => {
  switch (icon) {
    case 'packs':
      // Gift / Box / Crown
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case 'hammam':
      // Water droplet / Steam
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M10 16a2 2 0 0 0 2 2" />
        </svg>
      );
    case 'massage':
      // Lotus / Hands / Wave
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 0 0-9 9c0 3.6 2.1 6.7 5.2 8.1" />
          <path d="M12 3a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.2 8.1" />
          <path d="M12 8a4 4 0 0 0-4 4c0 2 1.3 3.7 3.2 4.2" />
          <path d="M12 8a4 4 0 0 1 4 4c0 2-1.3 3.7-3.2 4.2" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case 'face':
      // Sparkle / Star / Glow
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <path d="m4.93 4.93 2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'nails':
      // Diamond / Feather / Hand
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 13L2 9z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case 'hair':
      // Scissors / Comb
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case 'waxing':
      // Feather / Leaf / Silk
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case 'barber':
      // Razor / Moustache / Barber pole
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="7" y1="15" x2="17" y2="15" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 8 4 4-4 4M8 12h8" />
        </svg>
      );
  }
};
