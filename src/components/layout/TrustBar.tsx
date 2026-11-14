import React from 'react';
import type { Lang } from '../../i18n';
import { getAssetUrl } from '../../utils/assets';

interface TrustBarProps {
  lang: Lang;
}

const AVATARS = [
  'images/avatars/avatar-1.jpg',
  'images/avatars/avatar-2.jpg',
  'images/avatars/avatar-3.jpg',
  'images/avatars/avatar-4.jpg',
  'images/avatars/avatar-5.jpg',
];

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const satisfiedText = lang === 'fr' ? '15K+ clients satisfaits' : '2K+ Satisfied Customers';

  return (
    <div
      className="w-full bg-sand text-ink text-xs sm:text-[13px] py-1.5 px-3 sm:px-4 max-h-[56px] sm:max-h-[44px] flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-0.5 overflow-hidden select-none relative z-30"
    >
      {/* 1. Avatars: 5 overlapping round photos */}
      <div className="flex items-center -space-x-2.5 shrink-0" aria-hidden="true">
        {AVATARS.map((path, idx) => (
          <img
            key={idx}
            src={getAssetUrl(path)}
            alt=""
            className="w-7 h-7 min-[480px]:w-8 min-[480px]:h-8 rounded-full border-2 border-cream object-cover shrink-0"
            loading="eager"
            width={32}
            height={32}
          />
        ))}
      </div>

      {/* 2. Rating: 5 gold stars + 4.9 */}
      <div className="flex items-center gap-1 shrink-0">
        <div className="flex items-center text-gold" aria-label="Note de 4.9 sur 5 étoiles">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="font-semibold text-ink text-xs sm:text-[13px] ml-0.5">
          4.9
        </span>
      </div>

      {/* Thin vertical divider on screens >= 640px */}
      <span
        className="hidden sm:inline-block w-px h-3.5 bg-ink/20 shrink-0"
        aria-hidden="true"
      />

      {/* 3. Customer Count + Smiley Emoji */}
      <div className="flex items-center gap-1.5 shrink-0 font-medium">
        <span>{satisfiedText}</span>
        <span role="img" aria-label="Visage souriant">😊</span>
      </div>
    </div>
  );
};
