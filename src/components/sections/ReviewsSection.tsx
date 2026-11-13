import React from 'react';
import { Star, MessageCircle, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { REVIEWS } from '../../data/content';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="avis" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-aqua/10 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
            <Star size={13} className="text-gold" fill="currentColor" />
            <span>{lang === 'fr' ? 'Témoignages Authentiques' : 'Verified Guest Reviews'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                Ce que nos hôtes <span className="italic text-aqua">ressentent</span>
              </>
            ) : (
              <>
                What Our Guests <span className="italic text-aqua">Experience</span>
              </>
            )}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 text-xs text-mist/80">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span>5.0 / 5.0</span>
            <span className="text-mist/40">•</span>
            <span>Google • Tripadvisor • Fresha</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                rev.highlight
                  ? 'bg-gradient-to-b from-navy-900 to-navy-800 border-2 border-gold/40 shadow-glow-gold'
                  : 'bg-navy-900/60 border border-aqua/15 hover:border-aqua/40 shadow-lg'
              }`}
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy-950/80 text-aqua border border-aqua/20 flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    <span>{rev.source}</span>
                  </span>
                </div>

                <Quote size={20} className="text-aqua/40 mb-2" />

                <p className="text-xs text-mist/85 font-light leading-relaxed italic mb-6">
                  « {rev.quote[lang]} »
                </p>
              </div>

              <div className="pt-4 border-t border-aqua/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-semibold text-white">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-mist/50">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[10px] text-mist/40">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
