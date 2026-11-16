import React from 'react';
import type { Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { formatPrice, formatDuration } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Clock, Check, MessageSquare } from 'lucide-react';

export interface PackCardProps {
  pack: Service;
  lang: Lang;
  variant?: 'dark' | 'light';
}

export const PackCard: React.FC<PackCardProps> = ({ pack, lang, variant = 'dark' }) => {
  const whatsappUrl = getWhatsAppUrl(
    `${pack.name}${pack.price ? ` (${pack.price} MAD)` : ''}`,
    lang
  );

  const isHighlighted =
    pack.id.includes('royal') ||
    pack.id.includes('gold') ||
    pack.name.toLowerCase().includes('royal') ||
    pack.name.toLowerCase().includes('gold');

  if (variant === 'light') {
    return (
      <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-champagne/40 hover:border-champagne-dark shadow-sm hover:shadow-luxury transition-all duration-300 group hover:-translate-y-1 text-navy">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-navy bg-sand/70 border border-champagne/40 px-2.5 py-1 rounded-full">
                {t(lang, 'packs.badge')}
              </span>
              <h4 className="mt-3 text-xl font-serif font-medium text-navy group-hover:text-brand transition-colors">
                {pack.name}
              </h4>
            </div>

            <div className="text-right flex-shrink-0">
              {pack.price !== undefined && (
                <span className="text-xl sm:text-2xl font-serif font-semibold text-gold-dark block tracking-tight">
                  {formatPrice(pack.price)}
                </span>
              )}
              {pack.duration && (
                <span className="text-xs text-charcoal-muted flex items-center justify-end gap-1 mt-0.5">
                  <Clock size={12} className="text-brand/70" />
                  {formatDuration(pack.duration)}
                </span>
              )}
            </div>
          </div>

          {pack.description && (
            <p className="mt-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
              {pack.description}
            </p>
          )}

          {pack.includes && pack.includes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-sand space-y-2">
              <p className="text-[11px] font-semibold text-brand uppercase tracking-[0.16em]">
                {t(lang, 'services.includes')}
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal">
                {pack.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-brand shrink-0 mt-0.5" />
                    <span className="font-light">{inc}</span>
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
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-[0.16em] shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <MessageSquare size={14} />
            <span>{t(lang, 'cta.book')}</span>
          </a>
        </div>
      </div>
    );
  }

  // Dark blue theme matching ReviewsSection cards
  return (
    <div
      className={`h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group overflow-hidden
        transition-all duration-500 hover:-translate-y-2 ${
          isHighlighted
            ? 'border border-gold/40 shadow-glow-gold'
            : 'border border-aqua/15 hover:border-aqua/35 shadow-glass-dark hover:shadow-glow-aqua'
        }`}
      style={{
        background: isHighlighted
          ? 'linear-gradient(135deg, #1a3454 0%, #182D46 60%, #142840 100%)'
          : 'linear-gradient(135deg, #142840 0%, #182D46 70%, #1a3050 100%)',
      }}
    >
      {/* Shimmer sweep on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background:
            'linear-gradient(105deg, transparent 35%, rgba(99,185,209,0.08) 50%, transparent 65%)',
          backgroundSize: '200% 100%',
          animation: 'shimmerSweep 2.4s linear infinite',
        }}
      />

      {/* Top-left aqua glow orb */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,185,209,0.13) 0%, transparent 70%)' }}
      />

      {/* Gold glow for highlighted / royal card */}
      {isHighlighted && (
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,161,107,0.14) 0%, transparent 70%)' }}
        />
      )}

      {/* ── Content ── */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full border ${
                isHighlighted
                  ? 'text-gold bg-navy/70 border-gold/30'
                  : 'text-aqua bg-navy/60 border border-aqua/20'
              }`}
            >
              {t(lang, 'packs.badge')}
            </span>
            <h4 className="mt-3 text-xl font-serif font-medium text-mist group-hover:text-aqua transition-colors">
              {pack.name}
            </h4>
          </div>

          <div className="text-right flex-shrink-0">
            {pack.price !== undefined && (
              <span className="text-xl sm:text-2xl font-serif font-semibold text-gold block tracking-tight">
                {formatPrice(pack.price)}
              </span>
            )}
            {pack.duration && (
              <span className="text-xs text-mist/50 flex items-center justify-end gap-1 mt-0.5">
                <Clock size={12} className="text-aqua" />
                {formatDuration(pack.duration)}
              </span>
            )}
          </div>
        </div>

        {pack.description && (
          <p className="mt-3 text-xs sm:text-sm text-mist/70 leading-relaxed font-light">
            {pack.description}
          </p>
        )}

        {pack.includes && pack.includes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-aqua/10 space-y-2">
            <p className="text-[11px] font-semibold text-aqua uppercase tracking-[0.16em]">
              {t(lang, 'services.includes')}
            </p>
            <ul className="space-y-1.5 text-xs text-mist/80">
              {pack.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-aqua shrink-0 mt-0.5" />
                  <span className="font-light">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Book Button ── */}
      <div className="relative z-10 mt-6 pt-4 border-t border-aqua/10">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-[0.16em] shadow-md hover:shadow-glow-aqua transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-aqua/40 group/btn"
        >
          <MessageSquare size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
          <span>{t(lang, 'cta.book')}</span>
        </a>
      </div>
    </div>
  );
};
