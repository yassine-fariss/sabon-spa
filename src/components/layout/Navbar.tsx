import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';
import { getAssetUrl } from '../../utils/assets';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onNavigateSection,
}) => {
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
    if (onNavigateSection) {
      onNavigateSection(href);
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-300 px-4 sm:px-6 flex items-center justify-between shadow-luxury ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-md border-champagne/40 py-2 sm:py-2.5 shadow-2xl text-white'
            : 'bg-navy/90 backdrop-blur-md border-champagne/25 py-3 sm:py-3.5 shadow-lg text-white'
        }`}
      >

        {/* ── Brand Logo ── */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateSection) {
              onNavigateSection('#');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-champagne/40 shadow-sm transition group-hover:scale-105">
            <img
              src={getAssetUrl('logo.jpg')}
              alt="Sabon Spa Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.12em] uppercase text-white group-hover:text-champagne-light transition">
              Sabon Spa
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] -mt-1 font-medium text-champagne-light">
              Tanger
            </span>
          </div>
        </a>

        {/* ── Desktop Nav (4 links) ── */}
        <nav className="hidden lg:flex items-center gap-9 lg:gap-11" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-xs uppercase tracking-[0.2em] py-1.5 transition-all duration-200 font-medium
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:transition-all after:duration-300
                  ${isActive
                    ? 'text-champagne-light after:w-full after:bg-champagne font-semibold'
                    : 'text-mist/80 hover:text-white after:w-0 hover:after:w-full after:bg-champagne'
                  }`}
              >
                {link.label[lang]}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Right: Language Switcher (Spacious & Minimalist) ── */}
        <div className="hidden sm:flex items-center">
          <div className="flex items-center rounded-full border border-champagne/30 bg-navy-950/80 p-1 text-xs transition-colors">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-3 py-1 rounded-full transition font-medium ${
                lang === 'fr'
                  ? 'bg-brand text-white shadow-xs'
                  : 'text-mist/70 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full transition font-medium ${
                lang === 'en'
                  ? 'bg-brand text-white shadow-xs'
                  : 'text-mist/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* ── Mobile: Lang toggle + Hamburger ── */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
            className="px-2.5 py-1 text-xs font-medium rounded-full border border-champagne/30 bg-navy-950/80 text-champagne-light transition-colors"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-champagne/30 text-white hover:text-champagne-light bg-navy-950/80 transition-colors"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer (Rounded floating card) ── */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto sm:hidden w-full max-w-5xl mt-2 rounded-2xl backdrop-blur-xl border border-champagne/30 bg-navy-950/98 px-6 py-6 animate-fade-in text-white shadow-2xl">
          <nav className="flex flex-col space-y-1" aria-label="Navigation mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between py-3 px-3 rounded-xl text-sm uppercase tracking-[0.16em] border transition-all duration-200 ${
                    isActive
                      ? 'text-champagne-light border-champagne/40 bg-white/10 font-semibold'
                      : 'text-mist/85 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label[lang]}</span>
                  <ChevronRight size={16} className={isActive ? 'text-champagne-light' : 'text-mist/40'} />
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 border-t border-champagne/20 flex flex-col gap-3">
            <a
              href={getWhatsAppUrl(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-600 border border-champagne/30 text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare size={16} />
              <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-xs pt-1 text-mist/70">
              <Phone size={12} className="text-champagne-light" />
              <span>{BUSINESS_INFO.phones.primary}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
