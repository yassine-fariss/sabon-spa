import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Clock, Crown, ArrowRight, X, Heart, Check, ChevronRight, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { ALL_TREATMENTS, TreatmentService } from '../../data/servicesData';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface PacksSectionProps {
  lang: Language;
}

export const PacksSection: React.FC<PacksSectionProps> = ({
  lang
}) => {
  const [isAllPacksOpen, setIsAllPacksOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<'all' | 'adults' | 'kids'>('all');

  // Top 3 Flagship Packages for the Homepage
  const featuredPacks = useMemo(() => {
    return [
      {
        id: 'pkg-royal',
        name: { fr: 'Royal Package', en: 'Royal Package' },
        duration: '5h',
        price: '2 500 MAD',
        badge: { fr: 'Luxe Absolu', en: 'Pure Luxury' },
        image: SPA_IMAGES.hammamStarlight,
        desc: {
          fr: 'Une demi-journée d’immersion totale : Hammam impérial sous voûte étoilée de briques de sel, gommage kessa, massage d’exception, soin visage régénérant et jacuzzi privatif.',
          en: 'A half-day royal sanctuary immersion: Imperial Hammam beneath illuminated salt vaults, bespoke bodywork, revitalizing facial, and private hydro-jacuzzi.'
        },
        inclusions: {
          fr: ['Hammam impérial privatisé', 'Gommage kessa & ghassoul royal', 'Massage d’exception sur mesure', 'Soin du visage & Jacuzzi'],
          en: ['Private imperial hammam', 'Kessa scrub & royal ghassoul', 'Signature bespoke bodywork', 'Facial & private jacuzzi']
        }
      },
      {
        id: 'pkg-mariee',
        name: { fr: 'Forfait Mariée', en: 'Bridal Luxury Package' },
        duration: '4h',
        price: '5 000 MAD',
        badge: { fr: 'Prestige Mariée', en: 'Bridal Prestige' },
        image: SPA_IMAGES.loungeReception,
        desc: {
          fr: 'La cérémonie nuptiale par excellence : Grand hammam rituel aux pétales de roses, gommage d’or et ghassoul royal, massage à 4 mains, beauté complète des mains & pieds et mise en beauté féerique.',
          en: 'The definitive bridal ritual: Rose petal hammam, royal herbal scrub, synchronized 4-hand massage, complete spa manicure & pedicure, and ethereal care.'
        },
        inclusions: {
          fr: ['Hammam rituel aux pétales de roses', 'Gommage d’or & ghassoul royal', 'Massage d’exception à 4 mains', 'Manucure & pédicure spa complètes'],
          en: ['Rose petal ritual hammam', 'Gold scrub & royal clay', 'Synchronized 4-hand massage', 'Complete spa mani & pedi']
        }
      },
      {
        id: 'pkg-silver',
        name: { fr: 'Silver Package', en: 'Silver Package' },
        duration: '2h30',
        price: '1 500 MAD',
        badge: { fr: 'Choix Signature', en: 'Signature Choice' },
        image: SPA_IMAGES.bluePoolJacuzzi,
        desc: {
          fr: 'L’équilibre parfait entre tradition et relaxation : Hammam royal au savon noir d’eucalyptus, enveloppement purifiant et massage signature Merzouga aux pochons chauds.',
          en: 'Harmonious signature experience: Royal eucalyptus hammam, purifying ghassoul cocoon, and Merzouga heated sand herbal pouch massage.'
        },
        inclusions: {
          fr: ['Hammam royal sous voûte de sel', 'Savon noir bio & gant de kessa', 'Massage Merzouga aux pochons chauds', 'Accès lounge & thé à la menthe'],
          en: ['Royal salt-vault hammam', 'Organic eucalyptus black soap', 'Heated sand Merzouga massage', 'Tranquility lounge & mint tea']
        }
      }
    ];
  }, [lang]);

  // All 11 Packages from servicesData
  const allPackages = useMemo(() => {
    const list = ALL_TREATMENTS.filter(
      s => s.category === 'spa-packages' || s.category === 'kids-packages' || s.id === 'pkg-golden-hair'
    );
    if (filterTab === 'adults') return list.filter(s => s.category === 'spa-packages' || s.id === 'pkg-golden-hair');
    if (filterTab === 'kids') return list.filter(s => s.category === 'kids-packages');
    return list;
  }, [filterTab]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAllPacksOpen(false);
    };
    if (isAllPacksOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAllPacksOpen]);

  return (
    <section id="packs" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand/10 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'Nos Expériences & Packs' : 'Signature Experiences & Packs'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight">
            {lang === 'fr' ? (
              <>
                Les Grands Forfaits du <span className="italic text-aqua">Sanctuaire</span>
              </>
            ) : (
              <>
                The Sanctuary’s <span className="italic text-aqua">Signature Packs</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed">
            {lang === 'fr'
              ? 'Des rituels combinés de 2h à 5h associant hammam privé sous voûte de sel, gommages authentiques, massages signatures et soins d’exception.'
              : 'Holistic journeys from 2h to 5h pairing private thermal hammams, artisanal scrubs, signature bodywork, and restorative care.'}
          </p>
        </div>

        {/* 3 Prominent Featured Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {featuredPacks.map((pack) => (
            <div
              key={pack.id}
              className="rounded-3xl overflow-hidden bg-navy-900/80 border border-aqua/20 hover:border-aqua/50 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl hover:shadow-glow-aqua"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 overflow-hidden bg-navy-950">
                  <img
                    src={pack.image}
                    alt={pack.name[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-700 ease-out filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-gold text-navy-950 font-semibold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Crown size={11} />
                      <span>{pack.badge[lang]}</span>
                    </span>

                    <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white font-medium text-xs shadow-sm flex items-center gap-1.5 border border-aqua/20">
                      <Clock size={12} className="text-aqua" />
                      <span>{pack.duration}</span>
                    </span>
                  </div>

                  {/* Price Banner */}
                  <div className="absolute bottom-4 left-6">
                    <span className="text-3xl font-serif font-light text-white drop-shadow-md">
                      {pack.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl font-serif text-white font-normal mb-2.5 group-hover:text-aqua transition">
                    {pack.name[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-mist/80 font-light leading-relaxed mb-6">
                    {pack.desc[lang]}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-2 mb-4 pt-4 border-t border-aqua/10">
                    {pack.inclusions[lang].map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-mist/75">
                        <Check size={13} className="text-aqua shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={getWhatsAppUrl(pack.name[lang], lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs uppercase tracking-[0.16em] shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} />
                  <span>{lang === 'fr' ? 'Réserver sur WhatsApp' : 'Book on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: "Voir tous les packs" */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setIsAllPacksOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-navy-900/90 hover:bg-navy-800 text-aqua hover:text-white border border-aqua/30 text-xs uppercase tracking-[0.16em] font-medium transition shadow-lg hover:shadow-glow-aqua"
          >
            <Sparkles size={13} className="text-gold" />
            <span>{lang === 'fr' ? 'Voir tous les packs & forfaits (11)' : 'View All 11 Packages'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ALL PACKS MODAL (COMPREHENSIVE CATALOGUE OF PACKAGES)     */}
      {/* ========================================================= */}
      {isAllPacksOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsAllPacksOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-900 border border-aqua/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 border-b border-aqua/10 bg-navy-950 flex items-center justify-between flex-shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-aqua font-medium block mb-1">
                  {lang === 'fr' ? 'Collection Complète' : 'Full Collection'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                  {lang === 'fr' ? 'Nos Expériences & Forfaits Sabon' : 'Sabon Packages & Ritual Journeys'}
                </h3>
              </div>

              <button
                onClick={() => setIsAllPacksOpen(false)}
                className="w-10 h-10 rounded-full bg-navy-900 border border-aqua/30 text-white hover:text-aqua transition flex items-center justify-center shadow-lg"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="p-4 px-6 border-b border-aqua/10 flex items-center gap-2 flex-shrink-0 bg-navy-900/60">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
                  filterTab === 'all'
                    ? 'bg-aqua text-navy-950 shadow-glow-aqua font-semibold'
                    : 'bg-navy-800 text-mist/70 hover:text-white border border-aqua/15'
                }`}
              >
                {lang === 'fr' ? 'Tous les forfaits (11)' : 'All Packages (11)'}
              </button>
              <button
                onClick={() => setFilterTab('adults')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
                  filterTab === 'adults'
                    ? 'bg-aqua text-navy-950 shadow-glow-aqua font-semibold'
                    : 'bg-navy-800 text-mist/70 hover:text-white border border-aqua/15'
                }`}
              >
                {lang === 'fr' ? 'Forfaits Adultes (7)' : 'Adult Packages (7)'}
              </button>
              <button
                onClick={() => setFilterTab('kids')}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition ${
                  filterTab === 'kids'
                    ? 'bg-aqua text-navy-950 shadow-glow-aqua font-semibold'
                    : 'bg-navy-800 text-mist/70 hover:text-white border border-aqua/15'
                }`}
              >
                {lang === 'fr' ? 'Forfaits Enfants (4)' : 'Kids Packages (4)'}
              </button>
            </div>

            {/* Scrollable List of All Packages */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-220px)] scrollbar-thin scrollbar-thumb-aqua/20">
              {allPackages.map((pack) => (
                <div
                  key={pack.id}
                  className="p-5 rounded-2xl bg-navy-950/70 border border-aqua/15 hover:border-aqua/40 transition duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="text-lg font-serif text-white group-hover:text-aqua transition font-normal">
                        {pack.name[lang]}
                      </h4>

                      {pack.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] uppercase tracking-wider font-semibold">
                          {pack.badge[lang]}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-mist/70 font-light leading-relaxed mb-3 max-w-2xl">
                      {pack.description?.[lang]}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-aqua font-medium">
                      <Clock size={12} />
                      <span>{pack.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-aqua/10">
                    <span className="text-xl font-serif text-gold font-semibold">
                      {pack.price}
                    </span>

                    <a
                      href={getWhatsAppUrl(pack.name[lang], lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-[0.14em] font-medium shadow-lg transition flex items-center gap-1.5"
                    >
                      <MessageSquare size={13} />
                      <span>{lang === 'fr' ? 'Réserver sur WhatsApp' : 'Book on WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom note */}
            <div className="p-4 px-6 border-t border-aqua/10 bg-navy-950/80 flex items-center justify-between text-[11px] text-mist/60 font-light flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-gold" />
                <span>{lang === 'fr' ? 'Inclus peignoirs, serviettes & thé marocain traditionnel' : 'Includes plush robes, towels & authentic mint tea'}</span>
              </span>

              <button
                onClick={() => setIsAllPacksOpen(false)}
                className="text-aqua hover:text-white transition uppercase tracking-wider text-[10px] font-medium"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
