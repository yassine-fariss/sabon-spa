import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';
import { getAssetUrl } from '../../utils/assets';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // The 4 nav items only
  const navLinks = [
    { label: { fr: 'Services', en: 'Services' },      href: '#soins' },
    { label: { fr: 'À Propos', en: 'About Us' },      href: '#presentation' },
    { label: { fr: 'Nos Espaces', en: 'Our Spaces' }, href: '#sanctuaire' },
    { label: { fr: 'Avis Clients', en: 'Reviews' },   href: '#avis' },
  ];

  // Scroll sentinel — collapse navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth-scroll helper that also closes the mobile menu
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'fixed top-0 bg-ivory/95 backdrop-blur-md border-b border-champagne/40 py-3 shadow-sm text-navy'
          : 'absolute top-full bg-gradient-to-b from-navy/80 via-navy/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Brand Logo ── */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-champagne/50 shadow-sm transition group-hover:scale-105">
            <img
              src={getAssetUrl('logo.jpg')}
              alt="Sabon Spa Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.12em] uppercase transition ${
              scrolled ? 'text-navy group-hover:text-brand' : 'text-white group-hover:text-champagne-light'
            }`}>
              Sabon Spa
            </span>
            <span className={`text-[9px] uppercase tracking-[0.25em] -mt-1 font-medium ${
              scrolled ? 'text-brand' : 'text-champagne-light'
            }`}>
              Tanger
            </span>
          </div>
        </a>

        {/* ── Desktop Nav (4 links) ── */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-xs uppercase tracking-[0.18em] py-1.5 transition-all duration-200 font-medium
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:transition-all after:duration-300
                  ${scrolled
                    ? isActive
                      ? 'text-brand after:w-full after:bg-brand'
                      : 'text-navy/75 hover:text-brand after:w-0 hover:after:w-full after:bg-brand'
                    : isActive
                      ? 'text-champagne-light after:w-full after:bg-champagne'
                      : 'text-mist/85 hover:text-champagne-light after:w-0 hover:after:w-full after:bg-champagne'
                  }`}
              >
                {link.label[lang]}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Right: Lang + WhatsApp CTA ── */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <div className={`flex items-center rounded-full border p-1 text-xs transition-colors ${
            scrolled ? 'bg-sand/60 border-champagne/40' : 'bg-navy/80 border-champagne/30'
          }`}>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 rounded-full transition font-medium ${
                lang === 'fr'
                  ? 'bg-brand text-white shadow-xs'
                  : scrolled ? 'text-navy/60 hover:text-navy' : 'text-mist/60 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full transition font-medium ${
                lang === 'en'
                  ? 'bg-brand text-white shadow-xs'
                  : scrolled ? 'text-navy/60 hover:text-navy' : 'text-mist/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppUrl(undefined, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-[0.16em] font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <MessageSquare size={14} />
            <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
          </a>
        </div>

        {/* ── Mobile: Lang toggle + Hamburger ── */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
            className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
              scrolled
                ? 'bg-sand/60 border-champagne/40 text-navy'
                : 'bg-navy/80 border-champagne/30 text-champagne-light'
            }`}
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-colors ${
              scrolled
                ? 'text-navy hover:text-brand bg-sand/60 border-champagne/40'
                : 'text-mist hover:text-white bg-navy/80 border-champagne/30'
            }`}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className={`sm:hidden backdrop-blur-xl border-b px-6 py-6 animate-fade-in ${
          scrolled
            ? 'bg-ivory/98 border-champagne/40 text-navy'
            : 'bg-navy/98 border-champagne/30 text-white'
        }`}>
          <nav className="flex flex-col space-y-1" aria-label="Navigation mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between py-3 px-3 rounded-xl text-sm uppercase tracking-[0.16em] border transition-all duration-200 ${
                    scrolled
                      ? isActive
                        ? 'text-brand border-champagne/50 bg-sand/40 font-semibold'
                        : 'text-navy/80 border-transparent hover:text-brand hover:bg-sand/20'
                      : isActive
                        ? 'text-champagne-light border-champagne/40 bg-champagne/10 font-semibold'
                        : 'text-mist/90 border-transparent hover:text-champagne-light hover:bg-champagne/5'
                  }`}
                >
                  <span>{link.label[lang]}</span>
                  <ChevronRight size={16} className={scrolled ? (isActive ? 'text-brand' : 'text-navy/30') : (isActive ? 'text-aqua' : 'text-aqua/40')} />
                </a>
              );
            })}
          </nav>

          <div className={`mt-6 pt-5 border-t flex flex-col gap-3 ${
            scrolled ? 'border-champagne/30' : 'border-aqua/10'
          }`}>
            <a
              href={getWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-600 text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare size={16} />
              <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
            </a>

            <div className={`flex items-center justify-center gap-1.5 text-xs pt-1 ${
              scrolled ? 'text-navy/60' : 'text-mist/50'
            }`}>
              <Phone size={12} className={scrolled ? 'text-brand' : 'text-aqua'} />
              <span>{BUSINESS_INFO.phones.primary}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
