import React from 'react';
import type { Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { formatPrice, formatDuration } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface PackCardProps {
  pack: Service;
  lang: Lang;
}

export const PackCard: React.FC<PackCardProps> = ({ pack, lang }) => {
  const whatsappUrl = getWhatsAppUrl(
    `${pack.name}${pack.price ? ` (${pack.price} MAD)` : ''}`,
    lang
  );

  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-gold/30 hover:border-gold shadow-sm hover:shadow-luxury transition-all duration-300">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full">
              {t(lang, 'packs.badge')}
            </span>
            <h4 className="mt-3 text-xl font-serif font-bold text-navy">
              {pack.name}
            </h4>
          </div>

          <div className="text-right">
            {pack.price !== undefined && (
              <span className="text-xl sm:text-2xl font-serif font-bold text-gold-dark block tracking-tight">
                {formatPrice(pack.price)}
              </span>
            )}
            {pack.duration && (
              <span className="text-xs text-navy/55 flex items-center justify-end gap-1 mt-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {formatDuration(pack.duration)}
              </span>
            )}
          </div>
        </div>

        {pack.description && (
          <p className="mt-3 text-xs sm:text-sm text-navy/70 leading-relaxed italic">
            {pack.description}
          </p>
        )}

        {pack.includes && pack.includes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-navy/5 space-y-2">
            <p className="text-xs font-semibold text-navy/80 uppercase tracking-wider">
              {t(lang, 'services.includes')}
            </p>
            <ul className="space-y-1.5 text-xs text-navy/75">
              {pack.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-600 text-white font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <span>{t(lang, 'cta.book')}</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};
