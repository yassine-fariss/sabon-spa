import React, { useState, useMemo, useEffect } from 'react';
import {
  Clock, Sparkles, ArrowRight, X, Crown, Heart, Waves,
  Smile, Hand, Scissors, Search, Check, ChevronRight, MessageSquare
} from 'lucide-react';
import { Language } from '../../types';
import { ALL_TREATMENTS, TreatmentService } from '../../data/servicesData';
import { SPA_IMAGES } from '../../data/spaImages';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface ServicesProps {
  lang: Language;
}

interface MainCategory {
  id: string;
  name: { fr: string; en: string };
  tagline: { fr: string; en: string };
  image: string;
  filterFn: (service: TreatmentService) => boolean;
  subCategories: { id: string; label: { fr: string; en: string } }[];
}

export const Services: React.FC<ServicesProps> = ({
  lang,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // 6 Main Categories as requested
  const MAIN_CATEGORIES: MainCategory[] = useMemo(() => [
    {
      id: 'hammam-body',
      name: { fr: 'Hammam & Body', en: 'Hammam & Body' },
      tagline: {
        fr: 'Voûtes célestes aux briques de sel, bains de vapeur traditionnels & jacuzzi privatif.',
        en: 'Starry salt-brick vaults, traditional Moroccan steam baths & private jacuzzi.'
      },
      image: SPA_IMAGES.hammamBlueTiles,
      filterFn: (s) => s.category === 'hammam-body',
      subCategories: [
        { id: 'all', label: { fr: 'Tous les rituels', en: 'All Rituals' } },
        { id: 'adults', label: { fr: 'Rituels Adultes', en: 'Adult Hammams' } },
        { id: 'kids', label: { fr: 'Rituels Enfants', en: 'Kids Hammams' } },
        { id: 'jacuzzi', label: { fr: 'Jacuzzi Privatif', en: 'Private Jacuzzi' } }
      ]
    },
    {
      id: 'massage',
      name: { fr: 'Massage', en: 'Massage' },
      tagline: {
        fr: 'Rituels aux pochons de sable chaud, pierres volcaniques, shiatsu & thérapies ciblées.',
        en: 'Heated sand Merzouga rituals, volcanic hot stones, shiatsu & targeted bodywork.'
      },
      image: SPA_IMAGES.massageCandle,
      filterFn: (s) => s.category === 'massage',
      subCategories: [
        { id: 'all', label: { fr: 'Tous les massages', en: 'All Massages' } },
        { id: 'relaxation', label: { fr: 'Relaxation & Traditionnel', en: 'Relaxation & Traditional' } },
        { id: 'therapeutic', label: { fr: 'Thérapeutique & Ciblé', en: 'Therapeutic & Deep Work' } },
        { id: 'premium', label: { fr: 'Signatures & Rituels du Monde', en: 'Signature Rituals' } }
      ]
    },
    {
      id: 'beauty-nails',
      name: { fr: 'Beauty & Nails', en: 'Beauty & Nails' },
      tagline: {
        fr: 'Soins spa des mains et des pieds, manucure russe, BIAB, rehaussement de cils & regard.',
        en: 'Spa manicure & pedicure, Russian technique, BIAB, lash lift & brow styling.'
      },
      image: SPA_IMAGES.freshaBeautyClean,
      filterFn: (s) => s.category === 'manicure-pedicure' || s.category === 'lashes-brows' || s.category === 'extras',
      subCategories: [
        { id: 'all', label: { fr: 'Toutes les prestations', en: 'All Services' } },
        { id: 'manicure', label: { fr: 'Manucure & Soins des Mains', en: 'Manicure' } },
        { id: 'pedicure', label: { fr: 'Pédicure & Soins des Pieds', en: 'Pedicure' } },
        { id: 'extensions', label: { fr: 'Extensions & BIAB', en: 'Extensions & BIAB' } },
        { id: 'lashes', label: { fr: 'Cils & Sourcils', en: 'Lashes & Brows' } },
        { id: 'waxing', label: { fr: 'Épilations & Finitions', en: 'Waxing & Extras' } }
      ]
    },
    {
      id: 'hair-care',
      name: { fr: 'Hair Care', en: 'Hair Care' },
      tagline: {
        fr: 'Coupes signatures, brushings sur mesure, botox capillaire & protocoles régénérants.',
        en: 'Signature cuts, bespoke blowouts, hair botox & intensive restorative protocols.'
      },
      image: SPA_IMAGES.socialAmberTreatment,
      filterFn: (s) => s.category === 'hair-services' || s.category === 'hair-treatments' || (s.category === 'organic-products' && s.subCategory === 'products'),
      subCategories: [
        { id: 'all', label: { fr: 'Tous les soins capillaires', en: 'All Hair Services' } },
        { id: 'styling', label: { fr: 'Coupe & Coiffage', en: 'Cut & Styling' } },
        { id: 'brushing', label: { fr: 'Brushing sur Mesure', en: 'Blowouts' } },
        { id: 'color', label: { fr: 'Coloration & Balayage', en: 'Color & Highlights' } },
        { id: 'treatments', label: { fr: 'Botox & Traitements Profonds', en: 'Botox & Treatments' } },
        { id: 'organic', label: { fr: 'Gamme Botanique & Soins', en: 'Organic Botanicals' } }
      ]
    },
    {
      id: 'facial',
      name: { fr: 'Facial & Skincare', en: 'Facial & Skincare' },
      tagline: {
        fr: 'Lifting manuel ancestral Kobido, nettoyage profond aux ultrasons & élixirs botaniques.',
        en: 'Ancestral Japanese Kobido sculpting lift, deep ultrasonic cleansing & botanicals.'
      },
      image: SPA_IMAGES.socialSpaProducts,
      filterFn: (s) => s.category === 'facial',
      subCategories: [
        { id: 'all', label: { fr: 'Tous les soins visage', en: 'All Facials' } }
      ]
    },
    {
      id: 'spa-experiences',
      name: { fr: 'Spa Experiences & Packages', en: 'Spa Experiences & Packages' },
      tagline: {
        fr: 'Immersions complètes d’exception, forfaits royaux, cérémonies mariée & rituels junior.',
        en: 'Comprehensive half-day immersions, royal packages, bridal ceremony & junior wellness.'
      },
      image: SPA_IMAGES.hammamStarlight,
      filterFn: (s) => s.category === 'spa-packages' || s.category === 'kids-packages' || s.id === 'pkg-golden-hair',
      subCategories: [
        { id: 'all', label: { fr: 'Tous les forfaits', en: 'All Packages' } },
        { id: 'adults', label: { fr: 'Forfaits Signatures & Mariée', en: 'Signature & Bridal' } },
        { id: 'kids', label: { fr: 'Forfaits Enfants (Kids)', en: 'Kids Packages' } }
      ]
    }
  ], [lang]);

  // Selected category object
  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return MAIN_CATEGORIES.find(c => c.id === activeCategoryId) || null;
  }, [activeCategoryId, MAIN_CATEGORIES]);

  // Filtered treatments inside the category modal
  const categoryTreatments = useMemo(() => {
    if (!activeCategory) return [];
    let list = ALL_TREATMENTS.filter(activeCategory.filterFn);

    // Subcategory mapping
    if (activeSubCategory !== 'all') {
      if (activeCategory.id === 'hammam-body') {
        list = list.filter(s => s.subCategory === activeSubCategory);
      } else if (activeCategory.id === 'massage') {
        list = list.filter(s => s.subCategory === activeSubCategory);
      } else if (activeCategory.id === 'beauty-nails') {
        if (activeSubCategory === 'manicure') list = list.filter(s => s.category === 'manicure-pedicure' && s.subCategory === 'manicure');
        else if (activeSubCategory === 'pedicure') list = list.filter(s => s.category === 'manicure-pedicure' && s.subCategory === 'pedicure');
        else if (activeSubCategory === 'extensions') list = list.filter(s => s.category === 'manicure-pedicure' && (s.subCategory === 'extensions' || s.subCategory === 'finishing' || s.subCategory === 'removal'));
        else if (activeSubCategory === 'lashes') list = list.filter(s => s.category === 'lashes-brows');
        else if (activeSubCategory === 'waxing') list = list.filter(s => s.category === 'extras');
      } else if (activeCategory.id === 'hair-care') {
        if (activeSubCategory === 'styling') list = list.filter(s => s.category === 'hair-services' && s.subCategory === 'instant');
        else if (activeSubCategory === 'brushing') list = list.filter(s => s.category === 'hair-services' && s.subCategory === 'brushing');
        else if (activeSubCategory === 'color') list = list.filter(s => s.category === 'hair-services' && s.subCategory === 'color-care');
        else if (activeSubCategory === 'treatments') list = list.filter(s => s.category === 'hair-treatments');
        else if (activeSubCategory === 'organic') list = list.filter(s => s.category === 'organic-products');
      } else if (activeCategory.id === 'spa-experiences') {
        if (activeSubCategory === 'adults') list = list.filter(s => s.category === 'spa-packages' || s.id === 'pkg-golden-hair');
        else if (activeSubCategory === 'kids') list = list.filter(s => s.category === 'kids-packages');
      }
    }

    // Search inside modal
    if (searchFilter.trim().length > 1) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(s =>
        s.name.fr.toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q) ||
        (s.description?.fr.toLowerCase().includes(q) ?? false) ||
        (s.description?.en.toLowerCase().includes(q) ?? false) ||
        s.price.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, activeSubCategory, searchFilter]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategoryId(null);
      }
    };
    if (activeCategoryId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategoryId]);

  const handleOpenCategory = (id: string) => {
    setActiveCategoryId(id);
    setActiveSubCategory('all');
    setSearchFilter('');
  };

  return (
    <section id="soins" className="py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Anchor for backward compatibility */}
      <div id="rituels" className="absolute -top-10" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-aqua/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-aqua font-medium mb-3">
            <Sparkles size={13} />
            <span>{lang === 'fr' ? 'La Carte des Soins' : 'Treatment Collection'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-light tracking-tight leading-tight">
            {lang === 'fr' ? (
              <>
                Découvrez Nos <span className="italic text-aqua">Expériences</span>
              </>
            ) : (
              <>
                Discover Our <span className="italic text-aqua">Experiences</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-mist/75 font-light leading-relaxed max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Une collection raffinée de rituels et de cérémonies thermales face à la baie de Tanger. Sélectionnez une expérience pour explorer nos soins.'
              : 'A curated collection of thermal rituals and botanical ceremonies facing Tangier Bay. Choose a category below to explore treatments.'}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 6 LARGE EDITORIAL CATEGORY CARDS                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MAIN_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleOpenCategory(cat.id)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 flex flex-col justify-between border border-aqua/15 hover:border-aqua/50 bg-navy-900 shadow-xl hover:shadow-glow-aqua hover:-translate-y-1.5 h-[380px] sm:h-[420px]"
            >
              {/* High-Resolution Full Cover Image with subtle zoom on hover */}
              <img
                src={cat.image}
                alt={cat.name[lang]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-108 group-hover:brightness-105 transition duration-700 ease-out"
              />

              {/* Luxury dark gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/20 opacity-85 group-hover:opacity-75 transition duration-500" />

              {/* Subtle top golden light line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aqua/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Top Index Badge */}
              <div className="relative z-10 p-6 flex items-start justify-between">
                <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/25 text-aqua text-[11px] font-mono tracking-wider">
                  0{idx + 1}
                </span>

                <div className="w-9 h-9 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition duration-300">
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 p-6 sm:p-8 space-y-2.5">
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal group-hover:text-aqua transition duration-300">
                  {cat.name[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-mist/80 font-light leading-relaxed line-clamp-2">
                  {cat.tagline[lang]}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-aqua group-hover:text-white font-medium transition duration-300">
                    <span>{lang === 'fr' ? 'Découvrir' : 'Explore'}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition duration-300" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DEDICATED CATEGORY MODAL (CLEAN & EASY TO NAVIGATE)       */}
      {/* ========================================================= */}
      {activeCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveCategoryId(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-900 border border-aqua/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner with Category Photograph */}
            <div className="relative h-44 sm:h-56 overflow-hidden flex-shrink-0 bg-navy-950">
              <img
                src={activeCategory.image}
                alt={activeCategory.name[lang]}
                className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveCategoryId(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-white hover:text-aqua hover:border-aqua transition flex items-center justify-center shadow-lg"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              {/* Header Title & Tagline */}
              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.24em] text-aqua font-medium block mb-1">
                  {lang === 'fr' ? 'Expérience Spa Sabon' : 'Spa Sabon Experience'}
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-white font-light">
                  {activeCategory.name[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-mist/80 font-light mt-1 max-w-xl line-clamp-2">
                  {activeCategory.tagline[lang]}
                </p>
              </div>
            </div>

            {/* Modal Subcategories Navigation & Search */}
            <div className="p-4 sm:p-6 pb-2 border-b border-aqua/10 flex-shrink-0 space-y-3">
              {activeCategory.subCategories.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {activeCategory.subCategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubCategory(sub.id)}
                      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition ${
                        activeSubCategory === sub.id
                          ? 'bg-aqua text-navy-950 shadow-glow-aqua font-semibold'
                          : 'bg-navy-800/80 text-mist/75 hover:text-white border border-aqua/15'
                      }`}
                    >
                      {sub.label[lang]}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Search inside this category */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist/50" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder={lang === 'fr' ? 'Rechercher un soin dans cette catégorie...' : 'Filter treatments in this category...'}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-navy-950/70 border border-aqua/20 text-xs text-white placeholder:text-mist/40 outline-none focus:border-aqua/60 transition"
                />
                {searchFilter && (
                  <button
                    onClick={() => setSearchFilter('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-mist/60 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Modal Scrollable Services List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-320px)] scrollbar-thin scrollbar-thumb-aqua/20">
              {categoryTreatments.map((service) => (
                <div
                  key={service.id}
                  className="p-5 rounded-2xl bg-navy-950/60 border border-aqua/15 hover:border-aqua/40 transition duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="text-base sm:text-lg font-serif text-white group-hover:text-aqua transition font-normal">
                        {service.name[lang]}
                      </h4>

                      {service.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] uppercase tracking-wider font-semibold">
                          {service.badge[lang]}
                        </span>
                      )}
                    </div>

                    {service.description && (
                      <p className="text-xs text-mist/70 font-light leading-relaxed mb-2.5 max-w-2xl">
                        {service.description[lang]}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-mist/60 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-aqua" />
                        <span>{service.duration}</span>
                      </span>
                      {service.priceNote && (
                        <>
                          <span>•</span>
                          <span className="text-[11px] text-mist/50">{service.priceNote[lang]}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Price & Booking Trigger */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-aqua/10">
                    <span className="text-lg sm:text-xl font-serif text-gold font-semibold">
                      {service.price}
                    </span>

                    <a
                      href={getWhatsAppUrl(service.name[lang], lang)}
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

              {categoryTreatments.length === 0 && (
                <div className="text-center py-12 text-mist/60 font-light text-xs">
                  {lang === 'fr' ? 'Aucun soin correspondant trouvé.' : 'No treatments match your search.'}
                </div>
              )}
            </div>

            {/* Modal Bottom note */}
            <div className="p-4 px-6 border-t border-aqua/10 bg-navy-950/80 flex items-center justify-between text-[11px] text-mist/60 font-light flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-gold" />
                <span>{lang === 'fr' ? 'Espaces 100% séparés femmes et hommes' : '100% separate wings for women and men'}</span>
              </span>

              <button
                onClick={() => setActiveCategoryId(null)}
                className="text-aqua hover:text-white transition uppercase tracking-wider text-[10px] font-medium"
              >
                {lang === 'fr' ? 'Fermer la vue' : 'Close view'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
