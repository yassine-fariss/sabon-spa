import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Globe, ChevronRight } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: { fr: 'Rituels', en: 'Rituals' }, href: '#rituels' },
    { label: { fr: 'Soins', en: 'Treatments' }, href: '#soins' },
    { label: { fr: 'Packs Sabon', en: 'Packs' }, href: '#packs' },
    { label: { fr: 'Le Sanctuaire', en: 'The Sanctuary' }, href: '#sanctuaire' },
    { label: { fr: 'Équipe', en: 'Team' }, href: '#equipe' },
    { label: { fr: 'Avis', en: 'Reviews' }, href: '#avis' },
    { label: { fr: 'Contact', en: 'Contact' }, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/85 backdrop-blur-md border-b border-aqua/15 py-3 shadow-lg'
          : 'bg-gradient-to-b from-navy-950/80 via-navy-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-aqua/40 shadow-glow-aqua transition group-hover:scale-105">
            <img
              src="/logo.jpg"
              alt="Sabon Spa Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.12em] text-white uppercase group-hover:text-aqua transition">
              Sabon Spa
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-aqua/90 -mt-1 font-medium">
              Tanger • Malabata
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.16em] text-mist/80 hover:text-aqua transition duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-aqua hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Right CTA / Language Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full bg-navy-900/80 border border-aqua/25 p-1 text-xs">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 rounded-full transition font-medium ${
                lang === 'fr' ? 'bg-brand text-white shadow-sm' : 'text-mist/60 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full transition font-medium ${
                lang === 'en' ? 'bg-brand text-white shadow-sm' : 'text-mist/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Quick WhatsApp Link */}
          <a
            href={BUSINESS_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-navy-900/80 border border-aqua/25 text-aqua hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition shadow-sm"
            title="WhatsApp Sabon Spa"
            aria-label="WhatsApp Sabon Spa"
          >
            <MessageSquare size={16} />
          </a>

          {/* Primary Booking CTA */}
          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-brand to-brand-600 border border-aqua/40 text-white text-xs uppercase tracking-[0.16em] font-medium shadow-glow-aqua hover:shadow-lg transition active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{lang === 'fr' ? 'Réserver' : 'Book Now'}</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition duration-300" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
            className="px-2 py-1 text-xs font-medium rounded-full bg-navy-900 border border-aqua/30 text-aqua"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-mist hover:text-white rounded-lg bg-navy-900/80 border border-aqua/20"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-navy-950/95 backdrop-blur-xl border-b border-aqua/20 px-6 py-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.16em] text-mist/90 hover:text-aqua py-2 border-b border-navy-800 flex items-center justify-between"
              >
                <span>{link.label[lang]}</span>
                <ChevronRight size={16} className="text-aqua/60" />
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-brand text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-glow-aqua"
            >
              <span>{lang === 'fr' ? 'Réserver une expérience' : 'Book an Experience'}</span>
              <ChevronRight size={15} />
            </button>

            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Direct</span>
            </a>

            <div className="flex items-center justify-center gap-4 text-xs text-mist/60 pt-2">
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-aqua" />
                {BUSINESS_INFO.phones.primary}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
