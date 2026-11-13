import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Instagram, ArrowUp, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';
import { getAssetUrl } from '../../utils/assets';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-aqua/15 pt-20 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-brand/10 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-aqua/10">
          {/* Brand Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-aqua/40 shadow-glow-aqua">
                <img
                  src={getAssetUrl('logo.jpg')}
                  alt="Sabon Spa Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-normal tracking-[0.12em] text-white uppercase block">
                  Sabon Spa
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-aqua font-medium">
                  Tanger • Le Sanctuaire Bleu
                </span>
              </div>
            </div>

            <p className="text-xs text-mist/75 font-light leading-relaxed max-w-sm">
              {lang === 'fr'
                ? 'Une expérience thermale et sensorielle immersive à Tanger. Hammam royal en briques de sel, massages signatures et espaces 100% séparés pour les femmes et les hommes.'
                : 'An immersive thermal and sensory sanctuary in Tangier. Royal salt-brick hammam, signature body rituals, and completely separate wings for ladies and gentlemen.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-900 border border-aqua/25 text-aqua hover:bg-brand hover:text-white transition flex items-center justify-center"
                aria-label="Instagram Sabon Spa"
              >
                <Instagram size={17} />
              </a>

              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-900 border border-aqua/25 text-[#25D366] hover:bg-[#25D366] hover:text-white transition flex items-center justify-center"
                aria-label="WhatsApp Sabon Spa"
              >
                <MessageSquare size={17} />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full bg-brand/30 hover:bg-brand border border-aqua/30 text-white text-xs uppercase tracking-wider font-medium transition"
              >
                {lang === 'fr' ? 'Réserver un soin' : 'Book Ritual'}
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-aqua font-semibold block mb-4">
              {lang === 'fr' ? 'Navigation' : 'Explore'}
            </span>
            <ul className="space-y-2 text-xs text-mist/75 font-light">
              <li>
                <a href="#rituels" className="hover:text-aqua transition">{lang === 'fr' ? 'Grands Rituels' : 'Signature Rituals'}</a>
              </li>
              <li>
                <a href="#soins" className="hover:text-aqua transition">{lang === 'fr' ? 'Menu des Soins' : 'Treatment Menu'}</a>
              </li>
              <li>
                <a href="#packs" className="hover:text-aqua transition">{lang === 'fr' ? 'Packs Sabon' : 'Packs & Bundles'}</a>
              </li>
              <li>
                <a href="#sanctuaire" className="hover:text-aqua transition">{lang === 'fr' ? 'Galerie du Sanctuaire' : 'Sanctuary Gallery'}</a>
              </li>
              <li>
                <a href="#equipe" className="hover:text-aqua transition">{lang === 'fr' ? 'Maîtres Praticiens' : 'Master Therapists'}</a>
              </li>
              <li>
                <a href="#avis" className="hover:text-aqua transition">{lang === 'fr' ? 'Avis Clients' : 'Guest Reviews'}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-aqua transition">{lang === 'fr' ? 'Questions Fréquentes' : 'FAQ'}</a>
              </li>
            </ul>
          </div>

          {/* Practical & Verified Coordinates */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-aqua font-semibold block mb-4">
              {lang === 'fr' ? 'Coordonnées & Horaires' : 'Contact & Hours'}
            </span>
            <ul className="space-y-3 text-xs text-mist/80 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-aqua shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.location.address}, {BUSINESS_INFO.location.city}
                  <span className="block text-[11px] text-mist/50">
                    {BUSINESS_INFO.location.landmark[lang]}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-aqua shrink-0" />
                <span>{BUSINESS_INFO.hours[lang]}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-aqua shrink-0" />
                <span>{BUSINESS_INFO.phones.primary} / {BUSINESS_INFO.phones.landline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare size={15} className="text-[#25D366] shrink-0" />
                <span>WhatsApp : {BUSINESS_INFO.phones.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-mist/50">
          <p>© {new Date().getFullYear()} Sabon Spa Tanger. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-aqua/70">
              <Sparkles size={12} />
              <span>100% Espaces Séparés Hommes & Femmes</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-navy-900 border border-aqua/20 text-mist/70 hover:text-white transition flex items-center gap-1"
              aria-label="Retour en haut"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
