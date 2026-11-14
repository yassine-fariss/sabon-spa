import React, { useEffect, useState } from 'react';
import type { Service } from '../../lib/data';
import { fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { PackCard } from '../services/PackCard';

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
    <section className="py-20 sm:py-28 bg-gradient-to-b from-mist/50 to-ivory/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            {lang === 'fr' ? 'Harmonie & Rituels Complets' : 'Complete Harmony & Rituals'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy">
            {t(lang, 'packs.featuredTitle')}
          </h2>
          <p className="text-sm sm:text-base text-navy/70 leading-relaxed font-sans">
            {t(lang, 'packs.featuredSubtitle')}
          </p>
        </div>

        {/* 4 featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPacks.map((pack) => (
            <PackCard key={pack.id} pack={pack} lang={lang} />
          ))}
        </div>

        {onExploreAllPacks && (
          <div className="text-center mt-12">
            <button
              onClick={onExploreAllPacks}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-700 bg-white/90 hover:bg-white px-6 py-3 rounded-full border border-navy/15 shadow-sm hover:shadow transition-all"
            >
              <span>{t(lang, 'packs.viewAll')}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
