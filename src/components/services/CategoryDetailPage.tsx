import React, { useState, useMemo } from 'react';
import type { Lang } from '../../i18n';
import { t } from '../../i18n';
import { MAIN_SERVICE_CATEGORIES, MainCategoryConfig } from '../../data/categoriesData';
import servicesData from '../../data/services.json';
import { formatPrice, formatDuration } from '../../lib/format';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Reveal } from '../ui/Reveal';
import {
  Clock,
  Check,
  Star,
  ChevronRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface CategoryDetailPageProps {
  categorySlug: string;
  lang: Lang;
  onBackToDirectory: () => void;
  onSelectCategory: (categorySlug: string) => void;
  onNavigateHome: () => void;
}

interface ServiceItem {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  duration?: number;
  price?: number;
  priceFrom?: boolean;
  variants?: { label: string; price: number; duration?: number }[];
  description?: string;
  includes?: string[];
  featured?: boolean;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categorySlug,
  lang,
  onBackToDirectory,
  onSelectCategory,
  onNavigateHome,
}) => {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  const currentCategory = useMemo(() => {
    return (
      MAIN_SERVICE_CATEGORIES.find((c) => c.slug === categorySlug) ||
      MAIN_SERVICE_CATEGORIES[0]
    );
  }, [categorySlug]);

  // Load services belonging to this category
  const allCategoryServices = useMemo<ServiceItem[]>(() => {
    const rawServices = (servicesData.services as ServiceItem[]).filter((s: any) =>
      currentCategory.sourceCategoryIds.includes(s.category) && s.type !== 'product'
    );
    return rawServices;
  }, [currentCategory]);

  // Compute available subcategories
  const availableSubcategories = useMemo(() => {
    const subcatMap = new Map<string, { id: string; name: { fr: string; en: string } }>();

    for (const catId of currentCategory.sourceCategoryIds) {
      const catConfig = servicesData.categories.find((c: any) => c.id === catId);
      if (catConfig?.subcategories) {
        for (const sub of catConfig.subcategories) {
          // Check if there are services in this subcategory
          const hasServices = allCategoryServices.some((s) => s.subcategory === sub.id);
          if (hasServices && !subcatMap.has(sub.id)) {
            subcatMap.set(sub.id, {
              id: sub.id,
              name: sub.name,
            });
          }
        }
      }
    }

    return Array.from(subcatMap.values());
  }, [currentCategory, allCategoryServices]);

  // Filter services by active subcategory & search query
  const filteredServices = useMemo(() => {
    return allCategoryServices.filter((service) => {
      // Subcategory match
      if (selectedSubcat !== 'all' && service.subcategory !== selectedSubcat) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = service.name.toLowerCase().includes(query);
        const matchesDesc = (service.description || '').toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [allCategoryServices, selectedSubcat, searchQuery]);

  // Compute price range and durations
  const { minPrice, maxPrice, durationsList } = useMemo(() => {
    const prices = allCategoryServices
      .map((s) => s.price)
      .filter((p): p is number => typeof p === 'number');
    const min = prices.length ? Math.min(...prices) : currentCategory.priceStartingMAD;
    const max = prices.length ? Math.max(...prices) : 1000;
    const durs = Array.from(
      new Set(allCategoryServices.map((s) => s.duration).filter((d): d is number => Boolean(d)))
    ).sort((a, b) => a - b);
    return { minPrice: min, maxPrice: max, durationsList: durs };
  }, [allCategoryServices, currentCategory]);

  // Other categories for footer switcher
  const otherCategories = useMemo(() => {
    return MAIN_SERVICE_CATEGORIES.filter((c) => c.slug !== currentCategory.slug);
  }, [currentCategory]);

  return (
    <div className="min-h-screen bg-ivory text-navy pt-28 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ========================================================= */}
        {/* A. HERO SECTION (INSPIRED BY REFERENCE SCREENSHOT 2)      */}
        {/* ========================================================= */}
        <Reveal variant="fade-up" duration={700}>
          <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-12 bg-navy-950 shadow-luxury border border-champagne/30 group">
            {/* Background Image with slow breathing scale & dark gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={currentCategory.heroImage}
                alt={currentCategory.name[lang]}
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />
              {/* Subtle ambient light orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 filter blur-[120px] pointer-events-none" />
            </div>

            {/* Top Bar: Breadcrumbs & Back Button */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              {/* Breadcrumb Navigation: Home > Services > Category */}
              <nav
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/15 text-xs text-mist/90 shadow-sm"
                aria-label="Fil d'Ariane"
              >
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'fr' ? 'Accueil' : 'Home'}
                </button>
                <ChevronRight size={13} className="text-champagne/60 shrink-0" />
                <button
                  type="button"
                  onClick={onBackToDirectory}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'fr' ? 'Carte des Soins' : 'Services'}
                </button>
                <ChevronRight size={13} className="text-champagne/60 shrink-0" />
                <span className="text-champagne font-medium truncate max-w-[160px] sm:max-w-none">
                  {currentCategory.name[lang]}
                </span>
              </nav>

              {/* Quick Return to Directory */}
              <button
                type="button"
                onClick={onBackToDirectory}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/80 backdrop-blur-md border border-champagne/30 text-xs font-medium text-white hover:text-champagne hover:border-champagne transition-all shadow-sm active:scale-95"
              >
                <ArrowLeft size={14} className="text-champagne" />
                <span>{lang === 'fr' ? 'Tous les soins' : 'All Services'}</span>
              </button>
            </div>

            {/* Hero Main Content */}
            <div className="relative z-10 my-auto py-8 max-w-3xl text-center mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-champagne font-medium">
                <Sparkles size={14} className="text-gold" />
                <span>Sabon Spa Tanger • Malabata Bay</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-light tracking-tight leading-tight drop-shadow-md">
                {currentCategory.name[lang]}
              </h1>

              <p className="text-sm sm:text-base text-mist/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
                {currentCategory.shortDesc[lang]}
              </p>

              {/* Hero Meta Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
                {/* Durations Pill */}
                {durationsList.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/20 text-white font-medium shadow-xs">
                    <Clock size={13} className="text-champagne" />
                    <span>
                      {durationsList.slice(0, 3).map((d) => `${d} min`).join(' · ')}
                    </span>
                  </span>
                )}

                {/* Starting Price Pill */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-champagne/40 text-gold-light font-medium shadow-xs">
                  <span>{lang === 'fr' ? 'Dès' : 'From'}</span>
                  <span className="font-serif font-bold text-sm text-white">{minPrice} MAD</span>
                </span>

                {/* Rating Badge */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/20 text-white font-medium shadow-xs">
                  <Star size={13} className="text-gold fill-current" />
                  <span>5.0 ★ Google Maps</span>
                </span>
              </div>
            </div>

            {/* Bottom Accent: 100% Espaces Séparés Pill */}
            <div className="relative z-10 flex items-center justify-between text-xs text-mist/60 pt-4 border-t border-white/10">
              <span className="flex items-center gap-2 text-champagne/90">
                <ShieldCheck size={14} className="text-gold" />
                <span>{lang === 'fr' ? 'Ailes 100% dédiées et indépendantes femmes & hommes' : '100% dedicated separate wings for ladies and gentlemen'}</span>
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-white/50">
                {allCategoryServices.length} {lang === 'fr' ? 'soins disponibles' : 'treatments available'}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ========================================================= */}
        {/* B. OVERVIEW / "WHO IT'S FOR" SECTION                       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & "Who It's For" Tag Pills */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal variant="fade-up" duration={650}>
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-champagne/35 shadow-sm space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold block mb-2">
                    ● {lang === 'fr' ? "L'Expérience & les Bienfaits" : 'Overview & Wellness Benefits'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-navy font-light tracking-tight">
                    {currentCategory.overviewTitle[lang]}
                  </h2>
                </div>

                <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed font-light">
                  {currentCategory.overviewDesc[lang]}
                </p>

                {/* "Who It's For" Tag Chips */}
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider text-navy/70 font-semibold block mb-3">
                    {lang === 'fr' ? 'Idéal pour :' : 'Who It’s For:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentCategory.whoItsFor[lang].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sand/40 border border-champagne/40 text-navy text-xs font-medium"
                      >
                        <Check size={12} className="text-brand shrink-0" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Highlights Card with Concierge Direct Booking */}
          <div className="lg:col-span-5">
            <Reveal variant="fade-up" delay={150} duration={650}>
              <div className="p-8 sm:p-10 rounded-3xl bg-sand/30 border border-champagne/45 shadow-sm space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold block mb-1">
                    ● {lang === 'fr' ? 'Points Clés' : 'At a Glance'}
                  </span>
                  <h3 className="text-xl font-serif text-navy font-medium">
                    {lang === 'fr' ? 'Le Standard Sabon Spa' : 'The Sabon Spa Standard'}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {currentCategory.keyHighlights[lang].map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal">
                      <div className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span className="font-light leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-champagne/40 space-y-3">
                  <a
                    href={getWhatsAppUrl(currentCategory.name[lang], lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-luxury transition-all duration-300"
                  >
                    <MessageSquare size={16} />
                    <span>{lang === 'fr' ? 'Réserver via WhatsApp' : 'Reserve on WhatsApp'}</span>
                  </a>
                  <p className="text-[11px] text-center text-charcoal-muted font-light">
                    {lang === 'fr'
                      ? 'Réponse rapide & confirmation immédiate 7j/7'
                      : 'Immediate response & confirmation 7 days a week'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ========================================================= */}
        {/* C. AVAILABLE TREATMENTS CATALOG LIST                      */}
        {/* ========================================================= */}
        <div id="treatments-list" className="space-y-8 pt-6">
          <Reveal variant="fade-up" duration={650}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-champagne/35">
              <div>
                <span className="text-xs uppercase tracking-[0.24em] text-brand font-semibold block mb-1">
                  {lang === 'fr' ? 'Catalogue Détaillé' : 'Complete Menu'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-navy font-light tracking-tight">
                  {lang === 'fr' ? 'Nos Rituels & Prestations' : 'Available Treatments'}
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-light">
                  {filteredServices.length}{' '}
                  {lang === 'fr' ? 'soins répertoriés avec tarifs officiels en MAD' : 'verified treatments with official MAD rates'}
                </p>
              </div>

              {/* In-category Search Filter */}
              <div className="relative w-full md:w-72">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted/60"
                />
                <input
                  type="text"
                  placeholder={lang === 'fr' ? 'Rechercher un soin...' : 'Search treatment...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-champagne/40 rounded-full pl-9 pr-4 py-2 text-xs text-navy placeholder:text-charcoal-muted/50 focus:outline-none focus:border-brand transition shadow-xs"
                />
              </div>
            </div>
          </Reveal>

          {/* Subcategory Filter Tabs (If Multiple Subcategories Exist) */}
          {availableSubcategories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedSubcat('all')}
                className={`text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap shadow-xs ${
                  selectedSubcat === 'all'
                    ? 'bg-brand text-white border border-brand'
                    : 'bg-white text-navy/75 hover:bg-sand/40 border border-champagne/40'
                }`}
              >
                {lang === 'fr' ? 'Tous les rituels' : 'All Treatments'} ({allCategoryServices.length})
              </button>
              {availableSubcategories.map((subcat) => {
                const subName = subcat.name[lang] || subcat.name.fr;
                const count = allCategoryServices.filter((s) => s.subcategory === subcat.id).length;
                const isActive = selectedSubcat === subcat.id;
                return (
                  <button
                    key={subcat.id}
                    type="button"
                    onClick={() => setSelectedSubcat(subcat.id)}
                    className={`text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap shadow-xs ${
                      isActive
                        ? 'bg-brand text-white border border-brand'
                        : 'bg-white text-navy/75 hover:bg-sand/40 border border-champagne/40'
                    }`}
                  >
                    {subName} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* The Treatments List */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white/70 rounded-3xl border border-champagne/30 space-y-3">
              <p className="text-sm text-charcoal-muted font-light">
                {lang === 'fr' ? 'Aucun soin ne correspond à votre recherche.' : 'No treatments match your search.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubcat('all');
                }}
                className="text-xs uppercase tracking-wider text-brand font-semibold hover:underline"
              >
                {lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service, idx) => {
                const hasVariants = Boolean(service.variants && service.variants.length > 0);
                const activeVariantIndex = selectedVariants[service.id] ?? 0;
                const activeVariant = hasVariants ? service.variants![activeVariantIndex] : null;

                const currentDuration = activeVariant?.duration ?? service.duration;
                const currentPrice = activeVariant?.price ?? service.price;

                const bookingTitle = `${service.name}${
                  activeVariant ? ` (${activeVariant.label})` : ''
                }${currentPrice ? ` — ${currentPrice} MAD` : ''}`;

                const whatsappUrl = getWhatsAppUrl(bookingTitle, lang);

                return (
                  <Reveal
                    key={service.id}
                    variant="pop-up"
                    delay={Math.min(idx * 40, 400)}
                    duration={600}
                  >
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-champagne/35 hover:border-brand/40 shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group">
                      {/* Left: Title, Description, Variants & Inclusions */}
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-serif font-medium text-navy group-hover:text-brand transition-colors">
                            {service.name}
                          </h3>

                          {service.featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sand text-navy font-semibold border border-champagne/40">
                              <Sparkles size={11} className="text-gold" />
                              <span>Signature</span>
                            </span>
                          )}
                        </div>

                        {service.description && (
                          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light max-w-3xl">
                            {service.description}
                          </p>
                        )}

                        {/* Inclusions list if pack or ritual */}
                        {service.includes && service.includes.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {service.includes.map((inc, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[11px] text-charcoal-muted font-light bg-sand/30 px-2.5 py-0.5 rounded-md"
                              >
                                <Check size={11} className="text-brand shrink-0" />
                                <span>{inc}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* If Treatment has Multiple Duration / Price Variants */}
                        {hasVariants && (
                          <div className="pt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-charcoal-muted/80 font-medium uppercase tracking-wider">
                              {lang === 'fr' ? 'Options :' : 'Options:'}
                            </span>
                            {service.variants!.map((v, vIdx) => {
                              const isSelected = activeVariantIndex === vIdx;
                              return (
                                <button
                                  key={vIdx}
                                  type="button"
                                  onClick={() =>
                                    setSelectedVariants((prev) => ({
                                      ...prev,
                                      [service.id]: vIdx,
                                    }))
                                  }
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                    isSelected
                                      ? 'bg-navy text-white shadow-xs'
                                      : 'bg-sand/40 hover:bg-sand text-navy border border-champagne/40'
                                  }`}
                                >
                                  {v.label} — {v.price} MAD
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Right: Duration, Price & Réserver CTA */}
                      <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-sand/60">
                        <div className="text-left md:text-right">
                          {currentPrice !== undefined && (
                            <div className="flex items-baseline md:justify-end gap-1 font-serif text-2xl font-semibold text-gold-dark">
                              <span>{formatPrice(currentPrice)}</span>
                            </div>
                          )}
                          {currentDuration && (
                            <span className="text-xs text-charcoal-muted flex items-center md:justify-end gap-1 mt-0.5 font-light">
                              <Clock size={12} className="text-brand/70" />
                              <span>{formatDuration(currentDuration)}</span>
                            </span>
                          )}
                        </div>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-[0.14em] font-medium shadow-md hover:shadow-luxury transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <MessageSquare size={13} />
                          <span>{t(lang, 'cta.book')}</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* D. OTHER CATEGORIES SWITCHER (FOOTER DIRECTORY)           */}
        {/* ========================================================= */}
        <div className="pt-12 border-t border-champagne/35 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold block mb-1">
                {lang === 'fr' ? 'Poursuivre la découverte' : 'Explore More'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-navy font-light">
                {lang === 'fr' ? 'Autres Catégories du Sanctuaire' : 'Other Spa Categories'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onBackToDirectory}
              className="text-xs uppercase tracking-[0.16em] font-medium text-brand hover:underline"
            >
              {lang === 'fr' ? 'Toutes les catégories' : 'All Categories'} →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {otherCategories.map((other) => (
              <button
                key={other.slug}
                type="button"
                onClick={() => {
                  onSelectCategory(other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-3 sm:p-4 rounded-2xl bg-white border border-champagne/35 hover:border-brand/45 shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="w-full h-20 rounded-xl overflow-hidden bg-sand/60 mb-2.5">
                  <img
                    src={other.thumbnail}
                    alt={other.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-medium text-navy group-hover:text-brand transition-colors line-clamp-1">
                  {other.name[lang]}
                </h4>
                <span className="text-[10px] text-charcoal-muted mt-1 font-light block">
                  {lang === 'fr' ? 'Dès' : 'From'} {other.priceStartingMAD} MAD
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
