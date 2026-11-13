import React from 'react';
import { ArrowRight, Sparkles, Droplets, HeartHandshake, Eye, Award, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface IntroductionProps {
  lang: Language;
}

export const Introduction: React.FC<IntroductionProps> = ({ lang }) => {
  return (
    <section id="presentation" className="relative py-28 bg-navy-950 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-brand/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-aqua/10 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium">
              <Sparkles size={13} />
              <span>{lang === 'fr' ? "L'Esprit Sabon Spa" : 'The Sabon Spa Philosophy'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white leading-[1.15] font-light">
              {lang === 'fr' ? (
                <>
                  Une immersion rare entre <span className="italic text-aqua">l&apos;onde bleue</span> et la tradition marocaine.
                </>
              ) : (
                <>
                  A rare immersion between <span className="italic text-aqua">azure depths</span> and Moroccan heritage.
                </>
              )}
            </h2>

            <p className="text-mist/80 text-base sm:text-lg leading-relaxed font-light">
              {lang === 'fr'
                ? "Dès l'entrée, l'effervescence de Tanger s'efface au profit d'une atmosphère feutrée et apaisante. Conçu comme un sanctuaire aquatique, Sabon Spa associe la chaleur enveloppante du hammam traditionnel en briques de sel, la délicatesse des rituels botaniques et l'intimité la plus absolue."
                : "From the moment you step inside, the vibrant bustle of Tangier fades into a serene, atmospheric haven. Imagined as an aquatic sanctuary, Sabon Spa unites the radiant warmth of traditional salt-brick hammams, precious botanical care, and absolute discretion."}
            </p>

            {/* Two key pillars */}
            <div className="pt-2 space-y-3.5">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/60 border border-aqua/15 hover:border-aqua/30 transition">
                <div className="w-9 h-9 rounded-lg bg-aqua/10 text-aqua flex items-center justify-center shrink-0 mt-0.5">
                  <Droplets size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {lang === 'fr' ? 'La Voûte de Sel & Ciel Étoilé' : 'Salt Vault & Starfield Ceiling'}
                  </h4>
                  <p className="text-xs text-mist/70 mt-0.5 leading-relaxed">
                    {lang === 'fr'
                      ? "Des briques de sel minéral illuminées d'une lumière sous-marine pour purifier les voies respiratoires et le corps."
                      : 'Illuminated mineral salt bricks and fiber-optic starfields creating an otherworldly therapeutic microclimate.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/60 border border-aqua/15 hover:border-aqua/30 transition">
                <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {lang === 'fr' ? 'Intimité Totale : Espaces 100% Séparés' : 'Complete Privacy: 100% Separate Wings'}
                  </h4>
                  <p className="text-xs text-mist/70 mt-0.5 leading-relaxed">
                    {lang === 'fr'
                      ? 'Deux parcours spa entièrement cloisonnés et dédiés aux femmes et aux hommes, avec vestiaires et hammams autonomes.'
                      : 'Two entirely dedicated, fully sequestered wings for ladies and gentlemen with independent facilities.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-5">
              <a
                href={getWhatsAppUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-[0.16em] font-medium shadow-lg transition"
              >
                <MessageSquare size={15} />
                <span>{lang === 'fr' ? 'Réserver sur WhatsApp' : 'Book on WhatsApp'}</span>
              </a>

              <a
                href="#sanctuaire"
                className="text-xs uppercase tracking-[0.16em] text-aqua hover:text-white transition inline-flex items-center gap-1.5"
              >
                <Eye size={13} />
                <span>{lang === 'fr' ? 'Explorer la galerie' : 'Explore gallery'}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Editorial Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none grid grid-cols-12 gap-4">
              {/* Primary Image: Lounge with Pink Velvet & Blossom Tree */}
              <div className="col-span-8 relative">
                <div className="arch-top overflow-hidden border border-aqua/25 shadow-2xl relative h-[420px] sm:h-[490px] group bg-navy-900">
                  <img
                    src={SPA_IMAGES.loungeReception}
                    alt="Sabon Spa Reception & Lounge"
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-navy-950/80 backdrop-blur-md rounded-lg border border-aqua/20">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-aqua font-medium block">
                      {lang === 'fr' ? "Lounge d'Accueil" : 'Welcome Lounge'}
                    </span>
                    <span className="text-xs text-white font-serif">
                      {lang === 'fr' ? 'Marbre rayé, velours rose poudré & arbre fleuri' : 'Striped marble, blush velvet & cherry blossoms'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Image: Hammam Starfield */}
              <div className="col-span-6 absolute -bottom-8 -right-2 sm:-right-4 w-[230px] sm:w-[270px]">
                <div className="arch-top overflow-hidden border-2 border-aqua/30 shadow-luxury rounded-2xl relative h-[290px] sm:h-[330px] bg-navy-900 group">
                  <img
                    src={SPA_IMAGES.hammamStarlight}
                    alt="Sabon Spa Hammam Starfield"
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-navy-950/85 backdrop-blur-md rounded border border-aqua/20">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium block">
                      {lang === 'fr' ? 'Voûte Céleste' : 'Starlight Vault'}
                    </span>
                    <span className="text-[11px] text-white font-serif block">
                      {lang === 'fr' ? 'Hammam briques de sel illuminées' : 'Illuminated salt-brick hammam'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-navy-950/90 backdrop-blur-md border border-gold/40 text-gold text-[10px] uppercase tracking-[0.16em] font-medium flex items-center gap-1.5 shadow-lg">
                <Award size={12} className="text-gold" />
                <span>5.0 ★ Malabata Bay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
