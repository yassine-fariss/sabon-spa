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
    <section
      id="packs-signature"
      className="py-24 sm:py-28 relative overflow-hidden transition-colors"
      style={{ background: 'linear-gradient(180deg, #0E1F33 0%, #182D46 40%, #142840 100%)' }}
    >
      {/* Background texture blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(99,185,209,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 35% at 80% 70%, rgba(201,161,107,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/70 border border-aqua/20 text-aqua text-xs uppercase tracking-[0.22em] font-medium shadow-xs backdrop-blur-sm">
              <Sparkles size={13} className="text-aqua" />
              <span>{lang === 'fr' ? 'Harmonie & Rituels Complets' : 'Complete Harmony & Rituals'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-mist font-light tracking-tight leading-tight">
              {lang === 'fr' ? (
                <>
                  Nos Packs <span className="italic font-normal text-aqua">Signature</span>
                </>
              ) : (
                <>
                  Signature <span className="italic font-normal text-aqua">Packages</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-mist/60 font-light leading-relaxed max-w-2xl mx-auto">
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
              <PackCard pack={pack} lang={lang} variant="dark" />
            </Reveal>
          ))}
        </div>

        {onExploreAllPacks && (
          <Reveal variant="pop-up" delay={250} duration={650}>
            <div className="text-center mt-12">
              <button
                onClick={onExploreAllPacks}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-mist hover:text-white bg-navy/70 hover:bg-navy px-7 py-3.5 rounded-full border border-aqua/20 hover:border-aqua/40 shadow-glass-dark hover:shadow-glow-aqua transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 backdrop-blur-sm"
              >
                <span>{t(lang, 'packs.viewAll')}</span>
                <ArrowRight size={14} className="text-aqua" />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
