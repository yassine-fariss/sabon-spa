import React, { useEffect, useState } from 'react';
import type { Service } from '../../lib/data';
import { fetchCategory } from '../../lib/data';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { PackCard } from '../services/PackCard';
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
    <section className="py-24 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand/10 filter blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-aqua/10 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Harmonie & Rituels Complets' : 'Complete Harmony & Rituals'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                Nos Packs <span className="italic text-aqua">Signature</span>
              </>
            ) : (
              <>
                Signature <span className="italic text-aqua">Packages</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed">
            {t(lang, 'packs.featuredSubtitle')}
          </p>
        </div>

        {/* 4 featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredPacks.map((pack) => (
            <PackCard key={pack.id} pack={pack} lang={lang} />
          ))}
        </div>

        {onExploreAllPacks && (
          <div className="text-center mt-12">
            <button
              onClick={onExploreAllPacks}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-white hover:text-aqua bg-navy-900/80 hover:bg-navy-900 px-7 py-3.5 rounded-full border border-aqua/30 shadow-glow-aqua hover:border-aqua/60 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{t(lang, 'packs.viewAll')}</span>
              <ArrowRight size={14} className="text-aqua" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
