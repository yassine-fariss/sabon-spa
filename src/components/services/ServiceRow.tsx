import React, { useState } from 'react';
import type { Service } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { formatPrice, formatDuration } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Clock, ChevronDown, Check, ArrowRight } from 'lucide-react';

interface ServiceRowProps {
  service: Service;
  lang: Lang;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const ServiceRow: React.FC<ServiceRowProps> = ({
  service,
  lang,
  isExpanded: controlledExpanded,
  onToggleExpand,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const toggle = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  const hasDetails = Boolean(
    service.description ||
    (service.includes && service.includes.length > 0) ||
    (service.variants && service.variants.length > 0)
  );

  const hasVariantsOrFrom = Boolean(service.priceFrom || (service.variants && service.variants.length > 0));
  const displayPrice = service.price !== undefined
    ? hasVariantsOrFrom
      ? `${t(lang, 'services.from')} ${formatPrice(service.price)}`
      : formatPrice(service.price)
    : '';

  const reservationLabel = `${service.name}${service.price ? ` (${service.price} MAD)` : ''}`;
  const whatsappUrl = getWhatsAppUrl(reservationLabel, lang);

  return (
    <div className="border-b border-sand/50 last:border-b-0 transition-colors bg-white hover:bg-sand/20">
      <div className="flex items-center justify-between min-h-[58px] px-4 sm:px-6 py-3.5 gap-3">
        {/* Clickable area for title + duration */}
        <div
          onClick={hasDetails ? toggle : undefined}
          className={`flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 ${
            hasDetails ? 'cursor-pointer select-none group' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-medium text-navy group-hover:text-brand transition-colors">
              {service.name}
            </h4>

            {service.audience && service.audience.length > 0 && (
              <div className="flex items-center gap-1">
                {service.audience.map((aud) => (
                  <span
                    key={aud}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sand/70 text-navy border border-champagne/40 font-medium"
                  >
                    {aud === 'kids' ? 'Enfant' : aud === 'men' ? 'Homme' : aud === 'pregnancy' ? 'Maternité' : 'Femme'}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-auto">
            {service.duration && (
              <span className="text-xs text-charcoal-muted flex items-center gap-1">
                <Clock size={12} className="text-brand/70" />
                {formatDuration(service.duration)}
              </span>
            )}

            {displayPrice && (
              <span className="text-sm sm:text-base font-serif font-semibold text-gold-dark tracking-tight whitespace-nowrap">
                {displayPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 text-xs uppercase tracking-[0.14em] font-medium rounded-lg bg-brand hover:bg-brand-600 text-white shadow-xs hover:shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand/40 whitespace-nowrap"
          >
            {t(lang, 'cta.book')}
          </a>

          {hasDetails && (
            <button
              onClick={toggle}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? t(lang, 'cta.collapse') : t(lang, 'cta.expand')}
              className="p-1.5 text-charcoal-muted hover:text-navy hover:bg-sand/40 rounded-md transition-colors"
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-brand' : ''}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && hasDetails && (
        <div className="px-4 sm:px-6 pb-4 pt-2 bg-sand/15 text-xs sm:text-sm text-charcoal space-y-3 animate-fade-in border-t border-sand/50">
          {service.description && (
            <p className="leading-relaxed text-charcoal-muted italic font-light">
              {service.description}
            </p>
          )}

          {service.includes && service.includes.length > 0 && (
            <div>
              <p className="font-semibold text-brand mb-1.5 text-[11px] uppercase tracking-[0.16em]">
                {t(lang, 'services.includes')}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-charcoal">
                {service.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check size={14} className="text-brand shrink-0 mt-0.5" />
                    <span className="font-light">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.variants && service.variants.length > 0 && (
            <div>
              <p className="font-semibold text-brand mb-2 text-[11px] uppercase tracking-[0.16em]">
                {t(lang, 'services.variants')}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.variants.map((v, idx) => {
                  const varBookingUrl = getWhatsAppUrl(
                    `${service.name} (${v.label}) - ${v.price} MAD`,
                    lang
                  );
                  return (
                    <a
                      key={idx}
                      href={varBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-champagne/40 hover:border-brand text-xs font-medium text-navy hover:text-brand transition-all shadow-xs"
                    >
                      <span className="font-light">{v.label}</span>
                      {v.duration && <span className="text-charcoal-muted">· {formatDuration(v.duration)}</span>}
                      <span className="font-serif font-semibold text-gold-dark">{formatPrice(v.price)}</span>
                      <ArrowRight size={12} className="text-brand" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
