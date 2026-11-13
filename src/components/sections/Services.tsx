import React, { useState, useMemo } from 'react';
import {
  Clock, Sparkles, Check, ArrowRight, Crown, Heart, Waves,
  Smile, Hand, Eye, Scissors, ShieldCheck, Leaf, Plus, Search,
  Info, Star, CheckCircle2, SlidersHorizontal
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

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setActiveSubCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="soins" className="py-28 bg-mist text-navy relative overflow-hidden">
      {/* Anchor for backward compatibility */}
      <div id="rituels" className="absolute -top-10" />

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
            <span>{lang === 'fr' ? 'La Carte Complète des Soins & Cérémonies' : 'Treatment & Ritual Menu'}</span>
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
        </div>

        {/* ========================================================= */}
        {/* 11 CATEGORIES HORIZONTAL NAVIGATION                      */}
        {/* ========================================================= */}
        <div className="mb-10">
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

        {/* ========================================================= */}
        {/* CATEGORY PHOTOGRAPHIC HERO BANNER                        */}
        {/* ========================================================= */}
        {!searchQuery && (
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-aqua/20 bg-navy-950 text-white min-h-[160px] sm:min-h-[190px] flex items-center mb-10">
            {/* Background Image of Selected Category */}
            <img
              src={CATEGORY_IMAGES[selectedCategory] || SPA_IMAGES.hammamBlueTiles}
              alt={currentCategoryInfo.name[lang]}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
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

              <div className="px-3.5 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-aqua/30 text-aqua text-xs font-medium self-start md:self-auto flex items-center gap-1.5 shadow-sm">
                <span>{filteredServices.length} {lang === 'fr' ? 'prestations' : 'treatments'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Category Filter Pills */}
        {subCategories.length > 0 && !searchQuery && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
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
          <div className="mb-8 text-center">
            <span className="text-sm text-navy/70 font-light">
              {filteredServices.length} {lang === 'fr' ? 'résultat(s) pour' : 'result(s) for'} « <strong className="text-navy">{searchQuery}</strong> »
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1. SPA PACKAGES (FEATURED LUXURY CARDS WITH PHOTOS)       */}
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
                    <div className="relative h-60 overflow-hidden bg-navy/10">
                      <img
                        src={pkg.image || SPA_IMAGES.hammamStarlight}
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
        {/* 2. KIDS PACKAGES (GENTLE GRID WITH PHOTOS)                */}
        {/* ========================================================= */}
        {selectedCategory === 'kids-packages' && !searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-navy/5">
                    <img
                      src={pkg.image || SPA_IMAGES.freshaTreatment}
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
                    className="bg-white rounded-2xl overflow-hidden border border-navy/10 hover:border-brand/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Photo Header */}
                      <div className="relative h-40 overflow-hidden bg-navy/5">
                        <img
                          src={prod.image || SPA_IMAGES.spaProducts}
                          alt={prod.name[lang]}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-navy text-[10px] font-medium">
                          {prod.duration}
                        </span>
                        <div className="absolute bottom-2 left-3 font-serif text-lg font-semibold text-white drop-shadow-sm">
                          {prod.price}
                        </div>
                      </div>

                      <div className="p-5">
                        {prod.badge && (
                          <span className="inline-block px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark text-[10px] font-semibold mb-2">
                            {prod.badge[lang]}
                          </span>
                        )}

                        <h4 className="font-serif text-lg text-navy font-medium mb-1.5 group-hover:text-brand transition">
                          {prod.name[lang]}
                        </h4>

                        <p className="text-xs text-navy/65 font-light leading-relaxed mb-4">
                          {prod.description?.[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onSelectService(prod.name[lang])}
                        className="w-full py-2 px-3 rounded-lg bg-mist hover:bg-brand text-navy hover:text-white text-xs font-medium transition flex items-center justify-center gap-1.5"
                      >
                        <span>{lang === 'fr' ? 'Commander ce produit' : 'Order Product'}</span>
                        <ArrowRight size={12} />
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
            {filteredServices.map((service) => {
              const cardImage = service.image || CATEGORY_IMAGES[service.category] || SPA_IMAGES.hammamBlueTiles;

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                    service.isFeatured ? 'ring-2 ring-gold/40' : ''
                  }`}
                >
                  <div>
                    {/* Image Header with Price & Duration Overlay */}
                    <div className="relative h-52 overflow-hidden bg-navy/5">
                      <img
                        src={cardImage}
                        alt={service.name[lang]}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {service.badge ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/90 text-navy-950 font-semibold text-[10px] uppercase tracking-wider shadow-sm">
                            {service.badge[lang]}
                          </span>
                        ) : <span />}

                        <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <Clock size={11} className="text-brand" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      {/* Price on Image */}
                      <div className="absolute bottom-3 left-3 text-white font-serif text-xl font-semibold drop-shadow-sm">
                        {service.price}
                      </div>
                    </div>

                    <div className="p-6">
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
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-navy/40 font-medium">
                          {lang === 'fr' ? 'Tarif' : 'Price'}
                        </span>
                        <span className="text-lg sm:text-xl font-serif font-semibold text-brand">
                          {service.price}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectService(service.name[lang])}
                        className="py-2.5 px-5 rounded-full bg-navy hover:bg-brand text-white text-xs uppercase tracking-[0.14em] font-medium transition flex items-center gap-2 shadow-sm"
                      >
                        <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
