import React, { useEffect, useState } from 'react';
import type { Service } from '../../lib/data';
import { fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { PackCard } from '../services/PackCard';
import { Reveal } from '../ui/Reveal';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedPacksProps {
  lang: Lang;
  onExploreAllPacks?: () => void;
}

export const FeaturedPacks: React.FC<FeaturedPacksProps> = ({
  lang,
  onExploreAllPacks,
}) => {
  const [featuredPacks, setFeaturedPacks] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory('packs')
      .then((data) => {
        const featured = data.services.filter((s) => s.featured);
        setFeaturedPacks(featured);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load featured packs:', err);
        setLoading(false);
      });
  }, []);

  if (loading || featuredPacks.length === 0) return null;

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-ivory via-sand-light to-sand text-navy relative overflow-hidden transition-colors">
      {/* Background warm ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne/25 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-medium">
              <Sparkles size={13} />
              <span>{lang === 'fr' ? 'Harmonie & Rituels Complets' : 'Complete Harmony & Rituals'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Nos Packs <span className="italic text-brand">Signature</span>
                </>
              ) : (
                <>
                  Signature <span className="italic text-brand">Packages</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
              {t(lang, 'packs.featuredSubtitle')}
            </p>
          </div>
        </Reveal>

        {/* 4 featured cards with staggered pop-up reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredPacks.map((pack, idx) => (
            <Reveal
              key={pack.id}
              variant="pop-up"
              delay={idx * 110}
              duration={700}
              className="h-full"
            >
              <PackCard pack={pack} lang={lang} />
            </Reveal>
          ))}
        </div>

        {onExploreAllPacks && (
          <Reveal variant="pop-up" delay={250} duration={650}>
            <div className="text-center mt-12">
              <button
                onClick={onExploreAllPacks}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-navy hover:text-brand bg-white hover:bg-sand-light px-7 py-3.5 rounded-full border border-champagne/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>{t(lang, 'packs.viewAll')}</span>
                <ArrowRight size={14} className="text-brand" />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
