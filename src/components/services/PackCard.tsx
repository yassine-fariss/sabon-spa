import React from 'react';
import type { Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { formatPrice, formatDuration } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Clock, Check, MessageSquare } from 'lucide-react';

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
    <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-navy-900/80 backdrop-blur-xl border border-aqua/20 hover:border-aqua/50 shadow-luxury transition-all duration-300 group hover:-translate-y-1">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold bg-gold/10 border border-gold/25 px-2.5 py-1 rounded-full">
              {t(lang, 'packs.badge')}
            </span>
            <h4 className="mt-3 text-xl font-serif font-medium text-white group-hover:text-aqua transition-colors">
              {pack.name}
            </h4>
          </div>

          <div className="text-right flex-shrink-0">
            {pack.price !== undefined && (
              <span className="text-xl sm:text-2xl font-serif font-medium text-gold block tracking-tight">
                {formatPrice(pack.price)}
              </span>
            )}
            {pack.duration && (
              <span className="text-xs text-mist/60 flex items-center justify-end gap-1 mt-0.5">
                <Clock size={12} className="text-aqua/70" />
                {formatDuration(pack.duration)}
              </span>
            )}
          </div>
        </div>

        {pack.description && (
          <p className="mt-3 text-xs sm:text-sm text-mist/75 leading-relaxed font-light">
            {pack.description}
          </p>
        )}

        {pack.includes && pack.includes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-aqua/10 space-y-2">
            <p className="text-[11px] font-semibold text-aqua/90 uppercase tracking-[0.16em]">
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

      <div className="mt-6 pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand hover:bg-brand-600 border border-aqua/40 text-white font-medium text-xs uppercase tracking-[0.16em] shadow-glow-aqua hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <MessageSquare size={14} />
          <span>{t(lang, 'cta.book')}</span>
        </a>
      </div>
    </div>
  );
};
