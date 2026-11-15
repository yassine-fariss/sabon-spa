import React from 'react';
import { Sparkles, Droplets, HeartHandshake, Eye, Award, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Reveal, StaggerReveal } from '../ui/Reveal';

interface IntroductionProps {
  lang: Language;
}

export const Introduction: React.FC<IntroductionProps> = ({ lang }) => {
  return (
    <section id="presentation" className="relative py-28 bg-ivory text-navy overflow-hidden">
      {/* Decorative ambient warm light touches */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-sand/50 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-champagne/30 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal variant="fade-up" duration={600}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-medium">
                <Sparkles size={13} />
                <span>{lang === 'fr' ? "L'Esprit Sabon Spa" : 'The Sabon Spa Philosophy'}</span>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={100} duration={700}>
              <h2 className="text-3xl sm:text-5xl font-serif text-navy leading-[1.15] font-light">
                {lang === 'fr' ? (
                  <>
                    Une immersion rare entre <span className="italic text-brand">l&apos;onde bleue</span> et la tradition marocaine.
                  </>
                ) : (
                  <>
                    A rare immersion between <span className="italic text-brand">azure depths</span> and Moroccan heritage.
                  </>
                )}
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={200} duration={700}>
              <p className="text-charcoal-muted text-base sm:text-lg leading-relaxed font-light">
                {lang === 'fr'
                  ? "Dès l'entrée, l'effervescence de Tanger s'efface au profit d'une atmosphère feutrée et apaisante. Conçu comme un sanctuaire aquatique, Sabon Spa associe la chaleur enveloppante du hammam traditionnel en briques de sel, la délicatesse des rituels botaniques et l'intimité la plus absolue."
                  : "From the moment you step inside, the vibrant bustle of Tangier fades into a serene, atmospheric haven. Imagined as an aquatic sanctuary, Sabon Spa unites the radiant warmth of traditional salt-brick hammams, precious botanical care, and absolute discretion."}
              </p>
            </Reveal>

            {/* Two key pillars - Staggered reveal */}
            <StaggerReveal variant="pop-up" baseDelay={200} staggerMs={110} className="pt-2 space-y-3.5">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-champagne/35 hover:border-brand/40 shadow-xs hover:shadow-md transition duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-sand/60 text-brand flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-sand transition duration-300">
                  <Droplets size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy group-hover:text-brand transition duration-200">
                    {lang === 'fr' ? 'La Voûte de Sel & Ciel Étoilé' : 'Salt Vault & Starfield Ceiling'}
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed font-light">
                    {lang === 'fr'
                      ? "Des briques de sel minéral illuminées d'une lumière sous-marine pour purifier les voies respiratoires et le corps."
                      : 'Illuminated mineral salt bricks and fiber-optic starfields creating an otherworldly therapeutic microclimate.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-champagne/35 hover:border-brand/40 shadow-xs hover:shadow-md transition duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-champagne/30 text-gold-dark flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-champagne/50 transition duration-300">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy group-hover:text-brand transition duration-200">
                    {lang === 'fr' ? 'Intimité Totale : Espaces 100% Séparés' : 'Complete Privacy: 100% Separate Wings'}
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed font-light">
                    {lang === 'fr'
                      ? 'Deux parcours spa entièrement cloisonnés et dédiés aux femmes et aux hommes, avec vestiaires et hammams autonomes.'
                      : 'Two entirely dedicated, fully sequestered wings for ladies and gentlemen with independent facilities.'}
                  </p>
                </div>
              </div>
            </StaggerReveal>

            {/* CTAs */}
            <Reveal variant="pop-up" delay={400} duration={650}>
              <div className="pt-4 flex flex-wrap items-center gap-5">
                <a
                  href={getWhatsAppUrl(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-[0.16em] font-medium shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 duration-200"
                >
                  <MessageSquare size={15} />
                  <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
                </a>

                <a
                  href="#soins"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-navy hover:text-brand transition"
                >
                  <span>{lang === 'fr' ? 'Découvrir la carte' : 'Explore Treatment Menu'}</span>
                  <span className="text-brand">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Visual Story Collage */}
          <div className="lg:col-span-6 relative">
            <Reveal variant="pop-up" duration={800}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card — Authentic Starlight Hammam */}
                <div className="relative rounded-3xl overflow-hidden border border-champagne/40 shadow-luxury group">
                  <img
                    src={SPA_IMAGES.hammamStarlight}
                    alt="Sabon Spa Hammam Voûte Étoilée"
                    className="w-full h-[440px] sm:h-[500px] object-cover group-hover:scale-105 transition duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

                  {/* Floating Caption on image */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-champagne/30 text-navy shadow-sm">
                    <p className="text-xs font-serif font-medium text-navy">
                      {lang === 'fr' ? 'Le Hammam Impérial sous la voûte étoilée' : 'The Imperial Hammam under starfield vault'}
                    </p>
                    <p className="text-[11px] text-charcoal-muted mt-0.5">
                      {lang === 'fr' ? 'Briques de sel minéral & rituels botaniques' : 'Mineral salt bricks & botanical rituals'}
                    </p>
                  </div>
                </div>

                {/* Overlapping Secondary Card — Luxury Lounge */}
                <div className="hidden sm:block absolute -bottom-8 -left-8 w-56 rounded-2xl overflow-hidden border border-champagne/40 shadow-xl group">
                  <img
                    src={SPA_IMAGES.loungeReception}
                    alt="Sabon Spa Salon de Repos"
                    className="w-full h-40 object-cover group-hover:scale-110 transition duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition duration-300" />
                </div>

                {/* Accent Floating Pill Badge */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-champagne/40 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <Award size={14} className="text-gold" />
                  <span className="text-[11px] uppercase tracking-wider text-navy font-semibold">
                    {lang === 'fr' ? 'Excellence Tanger' : 'Tangier Excellence'}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
