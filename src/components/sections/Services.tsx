import React, { useState, useMemo } from 'react';
import {
  Clock, Sparkles, Check, ArrowRight, Crown, Heart, Waves,
  Smile, Hand, Eye, Scissors, ShieldCheck, Leaf, Plus, Search,
  Info, Star, CheckCircle2, SlidersHorizontal, LayoutGrid, ListFilter,
  ChevronLeft
} from 'lucide-react';
import { Language } from '../../types';
import { TREATMENT_CATEGORIES, ALL_TREATMENTS, TreatmentService } from '../../data/servicesData';
import { SPA_IMAGES, CATEGORY_IMAGES } from '../../data/spaImages';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  lang,
  onSelectService
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'catalogue'>('visual');
  const [selectedCategory, setSelectedCategory] = useState<string>('spa-packages');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown size={15} />;
      case 'Heart': return <Heart size={15} />;
      case 'Waves': return <Waves size={15} />;
      case 'Sparkles': return <Sparkles size={15} />;
      case 'Smile': return <Smile size={15} />;
      case 'Hand': return <Hand size={15} />;
      case 'Eye': return <Eye size={15} />;
      case 'Scissors': return <Scissors size={15} />;
      case 'ShieldCheck': return <ShieldCheck size={15} />;
      case 'Leaf': return <Leaf size={15} />;
      case 'Plus': return <Plus size={15} />;
      default: return <Sparkles size={15} />;
    }
  };

  // Visual Category Definition with dedicated imagery and custom CTA
  const visualCategories = useMemo(() => {
    return [
      {
        id: 'spa-packages',
        name: { fr: 'Spa Packages', en: 'Spa Packages' },
        desc: {
          fr: 'Forfaits royaux, rituel mariée & immersions complètes d’exception.',
          en: 'Royal packages, bridal rituals & exceptional comprehensive half-day immersions.'
        },
        image: SPA_IMAGES.hammamStarlight,
        cta: { fr: 'Explorer les forfaits', en: 'Explore Packages' },
        count: '6 forfaits',
        featured: true
      },
      {
        id: 'hammam-body',
        name: { fr: 'Hammam & Body', en: 'Hammam & Body' },
        desc: {
          fr: 'Voûtes célestes en briques de sel, gommages kessa & jacuzzi privatif.',
          en: 'Starry salt-brick vaults, artisanal kessa scrubs & private bubbling jacuzzi.'
        },
        image: SPA_IMAGES.hammamBlueTiles,
        cta: { fr: 'Explorer les hammams', en: 'Explore Hammam' },
        count: '7 rituels',
        featured: true
      },
      {
        id: 'massage',
        name: { fr: 'Massages du Monde', en: 'World Massages' },
        desc: {
          fr: 'Merzouga aux pochons chauds, pierres chaudes, shiatsu & bougies relaxantes.',
          en: 'Heated sand Merzouga, volcanic hot stones, shiatsu & candlelit tranquility.'
        },
        image: SPA_IMAGES.massageCandle,
        cta: { fr: 'Explorer les massages', en: 'Explore Massages' },
        count: '15 thérapies',
        featured: true
      },
      {
        id: 'facial',
        name: { fr: 'Facial & Skincare', en: 'Facial & Skincare' },
        desc: {
          fr: 'Soins visage haute précision, lifting Kobido impérial & élixirs botaniques.',
          en: 'Targeted skincare therapies, Kobido face sculpting & botanical elixirs.'
        },
        image: SPA_IMAGES.socialSpaProducts,
        cta: { fr: 'Explorer les soins visage', en: 'Explore Facials' },
        count: '3 protocoles'
      },
      {
        id: 'manicure-pedicure',
        name: { fr: 'Manucure & Pédicure', en: 'Manicure & Pedicure' },
        desc: {
          fr: 'Soins spa complets, pose gel, BIAB & manucure russe de précision.',
          en: 'Nail beauty spa care, BIAB, gel extensions & meticulous Russian technique.'
        },
        image: SPA_IMAGES.freshaBeautyClean,
        cta: { fr: 'Explorer l’espace ongles', en: 'Explore Nails' },
        count: '14 prestations'
      },
      {
        id: 'hair-services',
        name: { fr: 'Services Coiffure', en: 'Hair Styling & Color' },
        desc: {
          fr: 'Coupes signatures, brushings sur mesure, balayages & colorations expertes.',
          en: 'Signature cuts, bespoke blowouts, bespoke color & hair artistry.'
        },
        image: SPA_IMAGES.socialAmberTreatment,
        cta: { fr: 'Explorer la coiffure', en: 'Explore Hair Care' },
        count: '9 services'
      },
      {
        id: 'hair-treatments',
        name: { fr: 'Soins & Traitements Capillaires', en: 'Hair Treatments & Protocols' },
        desc: {
          fr: 'Soins réparateurs profonds, botox capillaire, kératine & régénération intense.',
          en: 'Deep restorative hair therapies, hair botox, keratin & intensive gloss care.'
        },
        image: SPA_IMAGES.interiorWarm,
        cta: { fr: 'Explorer les protocoles', en: 'Explore Protocols' },
        count: '5 protocoles'
      },
      {
        id: 'lashes-brows',
        name: { fr: 'Cils & Sourcils', en: 'Lashes & Brows' },
        desc: {
          fr: 'Lash lift, brow lift, coloration henné & mise en beauté du regard.',
          en: 'Lash lifts, brow sculpting, henna tinting & expressive eye architecture.'
        },
        image: SPA_IMAGES.socialBrightInterior,
        cta: { fr: 'Explorer le regard', en: 'Explore Lashes & Brows' },
        count: '6 prestations'
      },
      {
        id: 'kids-packages',
        name: { fr: 'Espace Enfants (Kids)', en: 'Kids Wellness Packages' },
        desc: {
          fr: 'Rituels doux et bienveillants adaptés aux plus jeunes (1h à 3h).',
          en: 'Gentle, soothing thermal rituals crafted specifically for children (1h to 3h).'
        },
        image: SPA_IMAGES.freshaTreatment,
        cta: { fr: 'Explorer l’espace enfants', en: 'Explore Kids Care' },
        count: '4 forfaits'
      },
      {
        id: 'organic-products',
        name: { fr: 'Produits Biologiques', en: 'Organic Botanicals' },
        desc: {
          fr: 'Gamme botanique de prestige, huile d’argan pure & Golden Package salon.',
          en: 'Precious argan oils, artisan black soaps & signature salon retail packages.'
        },
        image: SPA_IMAGES.spaProducts,
        cta: { fr: 'Explorer la boutique', en: 'Explore Products' },
        count: '15 références'
      },
      {
        id: 'extras',
        name: { fr: 'Extras & Finitions', en: 'Extras & Finishing Touches' },
        desc: {
          fr: 'Épilations douces, touches finales & compléments de soins personnalisés.',
          en: 'Finishing touches, gentle waxing & supplementary private experiences.'
        },
        image: SPA_IMAGES.hammamPanorama,
        cta: { fr: 'Explorer les extras', en: 'Explore Extras' },
        count: '16 options'
      }
    ];
  }, [lang]);

  const currentCategoryInfo = useMemo(() => {
    return TREATMENT_CATEGORIES.find(c => c.id === selectedCategory) || TREATMENT_CATEGORIES[0];
  }, [selectedCategory]);

  // Filtered services
  const filteredServices = useMemo(() => {
    let list = ALL_TREATMENTS;

    // Search query takes precedence across all treatments
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(s =>
        s.name.fr.toLowerCase().includes(q) ||
        s.name.en.toLowerCase().includes(q) ||
        (s.description?.fr.toLowerCase().includes(q) ?? false) ||
        (s.description?.en.toLowerCase().includes(q) ?? false) ||
        s.price.toLowerCase().includes(q)
      );
    }

    // Filter by selected category
    list = list.filter(s => s.category === selectedCategory);

    // Filter by subcategory if applicable
    if (activeSubCategory !== 'all') {
      list = list.filter(s => s.subCategory === activeSubCategory);
    }

    return list;
  }, [selectedCategory, activeSubCategory, searchQuery]);

  // Subcategories definition based on active category
  const subCategories = useMemo(() => {
    switch (selectedCategory) {
      case 'hammam-body':
        return [
          { id: 'all', label: { fr: 'Tous les Hammams', en: 'All Hammam & Body' } },
          { id: 'adults', label: { fr: 'Rituels Adultes', en: 'Adult Hammams' } },
          { id: 'kids', label: { fr: 'Rituels Enfants', en: 'Kids Hammams' } },
          { id: 'jacuzzi', label: { fr: 'Jacuzzi Privatif', en: 'Private Jacuzzi' } }
        ];
      case 'massage':
        return [
          { id: 'all', label: { fr: 'Tous les Massages', en: 'All Massages' } },
          { id: 'relaxation', label: { fr: 'Relaxation & Traditionnel', en: 'Relaxation & Traditional' } },
          { id: 'therapeutic', label: { fr: 'Thérapeutique & Spécialisé', en: 'Therapeutic & Specialized' } },
          { id: 'premium', label: { fr: 'Expériences Signatures', en: 'Signature Experiences' } },
          { id: 'kids', label: { fr: 'Massages Enfants', en: 'Kids Massage' } }
        ];
      case 'manicure-pedicure':
        return [
          { id: 'all', label: { fr: 'Tout Ongles & Mains', en: 'All Nail Services' } },
          { id: 'manicure', label: { fr: 'Manucure', en: 'Manicure' } },
          { id: 'pedicure', label: { fr: 'Pédicure', en: 'Pedicure' } },
          { id: 'extensions', label: { fr: 'Extensions & BIAB', en: 'Extensions & BIAB' } },
          { id: 'finishing', label: { fr: 'Pose & Nail Art', en: 'Finishing & Art' } },
          { id: 'removal', label: { fr: 'Dépose / Removal', en: 'Removal Services' } }
        ];
      case 'hair-services':
        return [
          { id: 'all', label: { fr: 'Tous les Services Coiffure', en: 'All Hair Services' } },
          { id: 'instant', label: { fr: 'Instant Cheveux & Coupe', en: 'Instant Hair & Cut' } },
          { id: 'brushing', label: { fr: 'Brushing sur Mesure', en: 'Brushing & Blowouts' } },
          { id: 'color-care', label: { fr: 'Coloration & Protéines', en: 'Color & Protein Care' } }
        ];
      default:
        return [];
    }
  }, [selectedCategory]);

  const handleOpenCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveSubCategory('all');
    setViewMode('catalogue');
    setSearchQuery('');

    // Smooth scroll to catalogue top
    const el = document.getElementById('soins-catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setActiveSubCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="soins" className="py-28 bg-mist text-navy relative overflow-hidden">
      {/* Decorative background light accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-aqua/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs uppercase tracking-[0.22em] font-semibold mb-4 shadow-sm">
            <Sparkles size={13} className="text-brand" />
            <span>{lang === 'fr' ? 'La Carte des Soins & Cérémonies' : 'Treatment & Ritual Menu'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-navy font-light tracking-tight leading-tight">
            {lang === 'fr' ? 'Découvrez Nos Soins' : 'Discover Our Treatments'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-navy/70 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Une collection raffinée de rituels, soins et cérémonies conçus pour ressourcer le corps et apaiser l’esprit face à la baie de Tanger.'
              : 'A curated collection of rituals, treatments and experiences designed to restore your body and mind.'}
          </p>

          {/* Quick Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 1) {
                  setViewMode('catalogue');
                }
              }}
              placeholder={lang === 'fr' ? 'Rechercher un soin, massage, forfait ou produit...' : 'Search treatment, massage, package, or product...'}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/90 border border-navy/15 focus:border-brand focus:ring-2 focus:ring-brand/20 text-sm text-navy placeholder:text-navy/40 outline-none transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-navy/50 hover:text-navy font-medium"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Toggle (Visual Discovery vs Detailed Menu) */}
          {!searchQuery && (
            <div className="mt-6 inline-flex items-center p-1 rounded-full bg-white border border-navy/15 shadow-sm">
              <button
                onClick={() => setViewMode('visual')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition ${
                  viewMode === 'visual'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy/60 hover:text-navy'
                }`}
              >
                <LayoutGrid size={13} />
                <span>{lang === 'fr' ? 'Découverte Visuelle' : 'Visual Gallery'}</span>
              </button>
              <button
                onClick={() => setViewMode('catalogue')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition ${
                  viewMode === 'catalogue'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy/60 hover:text-navy'
                }`}
              >
                <ListFilter size={13} />
                <span>{lang === 'fr' ? 'Catalogue Détaillé & Tarifs' : 'Detailed Menu & Prices'}</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* IMAGE-FIRST: LARGE PHOTOGRAPHIC CATEGORY SHOWCASE         */}
        {/* ========================================================= */}
        {viewMode === 'visual' && !searchQuery && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visualCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleOpenCategory(cat.id)}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                    cat.featured
                      ? 'border-2 border-brand/30 h-[380px] sm:h-[420px]'
                      : 'border border-navy/10 h-[340px] sm:h-[380px]'
                  }`}
                >
                  {/* High-Resolution Photograph */}
                  <img
                    src={cat.image}
                    alt={cat.name[lang]}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-108 group-hover:brightness-105 transition duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay for Crisp Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/20 opacity-85 group-hover:opacity-75 transition duration-500" />

                  {/* Top Badges & Treatment Count */}
                  <div className="relative z-10 p-6 flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-aqua/30 text-aqua text-[11px] uppercase tracking-[0.16em] font-medium flex items-center gap-1.5 shadow-sm">
                      <Sparkles size={11} />
                      <span>{cat.count}</span>
                    </span>

                    {cat.featured && (
                      <span className="px-3 py-1 rounded-full bg-gold/90 text-navy-950 text-[10px] uppercase tracking-wider font-semibold shadow-sm flex items-center gap-1">
                        <Crown size={11} />
                        <span>{lang === 'fr' ? 'Incontournable' : 'Flagship'}</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Content & CTA */}
                  <div className="relative z-10 p-6 sm:p-7 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal group-hover:text-aqua transition duration-300">
                      {cat.name[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-mist/85 font-light leading-relaxed line-clamp-2">
                      {cat.desc[lang]}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-aqua group-hover:text-white font-medium transition duration-300">
                        <span>{cat.cta[lang]}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Switch to Full Catalogue */}
            <div className="text-center pt-6">
              <button
                onClick={() => setViewMode('catalogue')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy hover:bg-brand text-white text-xs uppercase tracking-[0.16em] font-medium transition shadow-md"
              >
                <span>{lang === 'fr' ? 'Voir l’ensemble des 60+ prestations & tarifs' : 'View all 60+ services & full pricing'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DETAILED CATALOGUE VIEW                                   */}
        {/* ========================================================= */}
        {(viewMode === 'catalogue' || searchQuery) && (
          <div id="soins-catalogue" className="animate-fade-in space-y-10">
            {/* Category Navigation Pills */}
            <div>
              <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-brand/20 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
                {TREATMENT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id && !searchQuery;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-navy text-white shadow-md scale-[1.02] border border-navy'
                          : 'bg-white/80 text-navy/70 hover:bg-white hover:text-navy border border-navy/10 hover:border-navy/25 shadow-sm'
                      }`}
                    >
                      <span className={isSelected ? 'text-aqua' : 'text-brand'}>
                        {getCategoryIcon(cat.icon)}
                      </span>
                      <span>{cat.name[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photographic Category Hero Banner */}
            {!searchQuery && (
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-aqua/20 bg-navy-950 text-white min-h-[160px] sm:min-h-[190px] flex items-center">
                {/* Background Image of Selected Category */}
                <img
                  src={CATEGORY_IMAGES[selectedCategory] || SPA_IMAGES.hammamBlueTiles}
                  alt={currentCategoryInfo.name[lang]}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent" />

                <div className="relative z-10 p-6 sm:p-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-aqua font-semibold mb-2">
                      <Sparkles size={11} />
                      <span>{currentCategoryInfo.name[lang]}</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-serif text-white font-light">
                      {currentCategoryInfo.name[lang]}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-mist/85 font-light leading-relaxed">
                      {currentCategoryInfo.tagline[lang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode('visual')}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.14em] font-medium border border-white/20 backdrop-blur-md transition flex items-center gap-1.5"
                    >
                      <ChevronLeft size={14} />
                      <span>{lang === 'fr' ? 'Toutes les catégories' : 'All Categories'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Category Filter Pills */}
            {subCategories.length > 0 && !searchQuery && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubCategory(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                      activeSubCategory === sub.id
                        ? 'bg-brand text-white shadow-sm'
                        : 'bg-navy/5 text-navy/70 hover:bg-navy/10 hover:text-navy border border-navy/5'
                    }`}
                  >
                    {sub.label[lang]}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Summary */}
            {searchQuery && (
              <div className="text-center">
                <span className="text-sm text-navy/70 font-light">
                  {filteredServices.length} {lang === 'fr' ? 'résultat(s) pour' : 'result(s) for'} « <strong className="text-navy">{searchQuery}</strong> »
                </span>
              </div>
            )}

            {/* ========================================================= */}
            {/* 1. SPA PACKAGES (FEATURED LUXURY CARDS)                   */}
            {/* ========================================================= */}
            {selectedCategory === 'spa-packages' && !searchQuery && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                        pkg.isFeatured
                          ? 'bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white border-2 border-gold/40 shadow-glow-gold'
                          : 'bg-white text-navy border border-navy/10 shadow-md hover:shadow-xl'
                      }`}
                    >
                      <div>
                        {/* Package Image */}
                        {pkg.image && (
                          <div className="relative h-60 overflow-hidden bg-navy/10">
                            <img
                              src={pkg.image}
                              alt={pkg.name[lang]}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${
                              pkg.isFeatured ? 'from-navy-950/90 via-navy-950/40 to-transparent' : 'from-navy/70 via-transparent to-transparent'
                            }`} />

                            {/* Top Badges */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                              {pkg.badge && (
                                <span className="px-3 py-1 rounded-full bg-gold text-navy-950 font-semibold text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                                  <Crown size={11} />
                                  <span>{pkg.badge[lang]}</span>
                                </span>
                              )}
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium text-xs shadow-sm flex items-center gap-1.5 ml-auto">
                                <Clock size={12} className="text-aqua" />
                                <span>{pkg.duration}</span>
                              </span>
                            </div>

                            {/* Price Banner */}
                            <div className="absolute bottom-4 left-4">
                              <span className="text-2xl sm:text-3xl font-serif font-semibold text-white drop-shadow-md">
                                {pkg.price}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 sm:p-7">
                          <h3 className={`text-2xl font-serif font-normal mb-2 ${
                            pkg.isFeatured ? 'text-white group-hover:text-gold' : 'text-navy group-hover:text-brand'
                          } transition`}>
                            {pkg.name[lang]}
                          </h3>

                          <p className={`text-xs sm:text-sm leading-relaxed font-light mb-6 ${
                            pkg.isFeatured ? 'text-mist/85' : 'text-navy/70'
                          }`}>
                            {pkg.description?.[lang]}
                          </p>
                        </div>
                      </div>

                      {/* Booking CTA */}
                      <div className="p-6 sm:p-7 pt-0">
                        <button
                          onClick={() => onSelectService(pkg.name[lang])}
                          className={`w-full py-3.5 px-6 rounded-full font-medium text-xs sm:text-sm uppercase tracking-[0.16em] transition flex items-center justify-center gap-2 ${
                            pkg.isFeatured
                              ? 'bg-gold hover:bg-gold-light text-navy-950 shadow-glow-gold hover:shadow-xl font-semibold'
                              : 'bg-navy hover:bg-brand text-white shadow-md'
                          }`}
                        >
                          <span>{lang === 'fr' ? 'Réserver ce forfait' : 'Book This Package'}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. KIDS PACKAGES (GENTLE WELCOMING GRID)                  */}
            {/* ========================================================= */}
            {selectedCategory === 'kids-packages' && !searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredServices.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {pkg.image && (
                        <div className="relative h-48 overflow-hidden bg-navy/5">
                          <img
                            src={pkg.image}
                            alt={pkg.name[lang]}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                            <Clock size={11} className="text-brand" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="absolute bottom-3 left-3 text-white font-serif text-xl font-semibold drop-shadow-sm">
                            {pkg.price}
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-brand font-semibold mb-2">
                          <Heart size={11} />
                          <span>{pkg.badge ? pkg.badge[lang] : 'Junior Wellness'}</span>
                        </div>

                        <h3 className="text-xl font-serif text-navy font-normal mb-2 group-hover:text-brand transition">
                          {pkg.name[lang]}
                        </h3>

                        <p className="text-xs text-navy/70 leading-relaxed font-light mb-4">
                          {pkg.description?.[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => onSelectService(pkg.name[lang])}
                        className="w-full py-2.5 px-4 rounded-full bg-mist hover:bg-brand text-navy hover:text-white border border-brand/20 text-xs uppercase tracking-[0.14em] font-medium transition flex items-center justify-center gap-2"
                      >
                        <span>{lang === 'fr' ? 'Réserver Enfant' : 'Book For Child'}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. ORGANIC PRODUCTS                                      */}
            {/* ========================================================= */}
            {selectedCategory === 'organic-products' && !searchQuery && (
              <div className="space-y-12">
                {/* Featured Golden Package at top */}
                {ALL_TREATMENTS.filter(s => s.id === 'pkg-golden-hair').map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-10 border-2 border-gold/40 shadow-glow-gold text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
                  >
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-wider font-semibold mb-4">
                        <Crown size={12} />
                        <span>{pkg.badge?.[lang]}</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-serif font-light text-white mb-3">
                        {pkg.name[lang]}
                      </h3>
                      <p className="text-sm sm:text-base text-mist/85 font-light leading-relaxed mb-4">
                        {pkg.description?.[lang]}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-aqua">
                        <span className="flex items-center gap-1.5"><Clock size={13} /> {pkg.duration}</span>
                        <span>•</span>
                        <span className="text-gold font-serif text-2xl font-semibold">{pkg.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectService(pkg.name[lang])}
                      className="px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-navy-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] shadow-glow-gold transition flex items-center gap-2 flex-shrink-0"
                    >
                      <span>{lang === 'fr' ? 'Réserver le Golden Package' : 'Book Golden Package'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}

                {/* Botanical Products Catalogue Grid */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand font-semibold">
                      <Leaf size={14} />
                      <span>{lang === 'fr' ? 'Flacons & Soins Biologiques à Emporter' : 'Organic Botanical Retail Collection'}</span>
                    </div>
                    <span className="text-xs text-navy/50 font-light">14 {lang === 'fr' ? 'références' : 'products'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {ALL_TREATMENTS.filter(s => s.category === 'organic-products' && s.subCategory === 'products').map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white rounded-2xl p-5 border border-navy/10 hover:border-brand/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-[10px] font-medium">
                              {prod.duration}
                            </span>
                            {prod.badge && (
                              <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark text-[10px] font-semibold">
                                {prod.badge[lang]}
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif text-lg text-navy font-medium mb-1.5 group-hover:text-brand transition">
                            {prod.name[lang]}
                          </h4>

                          <p className="text-xs text-navy/65 font-light leading-relaxed mb-4">
                            {prod.description?.[lang]}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-navy/5 flex items-center justify-between">
                          <span className="text-base font-serif font-semibold text-brand">
                            {prod.price}
                          </span>
                          <button
                            onClick={() => onSelectService(prod.name[lang])}
                            className="px-3 py-1.5 rounded-lg bg-mist hover:bg-brand text-navy hover:text-white text-[11px] font-medium transition"
                          >
                            {lang === 'fr' ? 'Commander' : 'Inquire'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. GENERAL CATEGORY CARDS (HAMMAM, MASSAGE, FACIAL, ETC)  */}
            {/* ========================================================= */}
            {selectedCategory !== 'spa-packages' && selectedCategory !== 'kids-packages' && selectedCategory !== 'organic-products' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                      service.isFeatured ? 'ring-2 ring-gold/40' : ''
                    }`}
                  >
                    <div>
                      {/* Image header if available */}
                      {service.image && (
                        <div className="relative h-52 overflow-hidden bg-navy/5">
                          <img
                            src={service.image}
                            alt={service.name[lang]}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy text-xs font-semibold flex items-center gap-1 shadow-sm">
                            <Clock size={11} className="text-brand" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="absolute bottom-3 left-3 text-white font-serif text-xl font-semibold">
                            {service.price}
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Header bar without image */}
                        {!service.image && (
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-navy/5 text-navy/70 text-xs font-medium">
                              <Clock size={11} className="text-brand" />
                              <span>{service.duration}</span>
                            </div>
                            {service.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[10px] font-semibold tracking-wider uppercase">
                                {service.badge[lang]}
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="text-xl font-serif text-navy font-normal mb-2 group-hover:text-brand transition">
                          {service.name[lang]}
                        </h3>

                        {service.description && (
                          <p className="text-xs sm:text-[13px] text-navy/70 leading-relaxed font-light mb-4">
                            {service.description[lang]}
                          </p>
                        )}

                        {/* Price Note */}
                        {service.priceNote && (
                          <div className="mt-2 mb-3 p-2 rounded-lg bg-navy/5 border border-navy/10 flex items-start gap-1.5 text-[11px] text-navy/60">
                            <Info size={12} className="text-brand shrink-0 mt-0.5" />
                            <span>{service.priceNote[lang]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer with Price & Booking Button */}
                    <div className="p-6 pt-0">
                      <div className="pt-3 border-t border-navy/5 flex items-center justify-between gap-4">
                        {!service.image && (
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-navy/40 font-medium">
                              {lang === 'fr' ? 'Tarif' : 'Price'}
                            </span>
                            <span className="text-lg sm:text-xl font-serif font-semibold text-brand">
                              {service.price}
                            </span>
                          </div>
                        )}

                        <button
                          onClick={() => onSelectService(service.name[lang])}
                          className="ml-auto py-2.5 px-5 rounded-full bg-navy hover:bg-brand text-white text-xs uppercase tracking-[0.14em] font-medium transition flex items-center gap-2 shadow-sm"
                        >
                          <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state for search */}
            {filteredServices.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-navy/10 p-8">
                <Sparkles size={28} className="text-brand/40 mx-auto mb-3" />
                <h4 className="text-xl font-serif text-navy font-normal mb-1">
                  {lang === 'fr' ? 'Aucun soin correspondant trouvé' : 'No matching treatment found'}
                </h4>
                <p className="text-xs text-navy/60 font-light mb-4">
                  {lang === 'fr'
                    ? 'Essayez avec un autre mot-clé ou contactez notre conciergerie directement.'
                    : 'Try searching with another keyword or contact our concierge directly.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full bg-navy text-white text-xs font-medium"
                >
                  {lang === 'fr' ? 'Réinitialiser la recherche' : 'Reset search'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM BESPOKE CONCIERGE BANNER                           */}
        {/* ========================================================= */}
        <div className="mt-16 rounded-3xl bg-navy text-white p-8 sm:p-10 border border-aqua/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-aqua font-semibold block mb-2">
              {lang === 'fr' ? 'Conseil & Réservation Personnalisée' : 'Personalized Spa Concierge'}
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif font-light text-white mb-2">
              {lang === 'fr' ? 'Besoin d’un conseil pour votre rituel ?' : 'Need guidance choosing your treatment?'}
            </h4>
            <p className="text-xs sm:text-sm text-mist/75 font-light leading-relaxed">
              {lang === 'fr'
                ? 'Notre équipe de réception vous oriente vers le rituel le plus adapté à votre sensibilité et vos envies du moment. Espaces 100% séparés hommes et femmes.'
                : 'Our concierge team will recommend the ideal treatment tailored to your wellness goals. Separate dedicated wings for women and men.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onSelectService('Réservation sur mesure')}
              className="px-6 py-3.5 rounded-full bg-brand hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-[0.16em] shadow-glow-aqua transition"
            >
              {lang === 'fr' ? 'Réserver un créneau' : 'Book an Appointment'}
            </button>
            <a
              href="https://wa.me/212600437982?text=Bonjour%20Sabon%20Spa,%20je%20souhaite%20un%20conseil%20pour%20choisir%20mon%20soin."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-[0.16em] border border-white/20 transition"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
