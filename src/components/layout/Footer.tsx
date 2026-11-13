import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Instagram, ArrowUp, Sparkles, Navigation, ExternalLink } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO } from '../../data/content';
import { getAssetUrl } from '../../utils/assets';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { Reveal } from '../ui/Reveal';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapEmbedUrl = "https://maps.google.com/maps?q=Sabon%20Spa,%20R%C3%A9sidence%20Iris,%20Route%20de%20Malabata,%20Tanger&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <footer id="contact" className="bg-navy-950 text-white border-t border-aqua/15 pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-brand/10 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up" duration={700}>
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
                    Tanger
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
                  className="w-10 h-10 rounded-full bg-navy-900 border border-aqua/25 text-aqua hover:bg-brand hover:text-white transition flex items-center justify-center shadow-sm"
                  aria-label="Instagram Sabon Spa"
                >
                  <Instagram size={17} />
                </a>

                <a
                  href={BUSINESS_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-navy-900 border border-aqua/25 text-aqua hover:bg-brand hover:text-white transition flex items-center justify-center shadow-sm"
                  aria-label="WhatsApp Sabon Spa"
                >
                  <MessageSquare size={17} />
                </a>

                <a
                  href={getWhatsAppUrl(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-brand hover:bg-brand-600 border border-aqua/40 text-white text-xs uppercase tracking-wider font-medium shadow-glow-aqua hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
                </a>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-aqua font-semibold block mb-4">
                {lang === 'fr' ? 'Navigation' : 'Explore'}
              </span>
              <ul className="space-y-2 text-xs text-mist/75 font-light">
                <li>
                  <a href="#soins" className="hover:text-aqua transition">{lang === 'fr' ? 'Carte des Soins' : 'Treatments'}</a>
                </li>
                <li>
                  <a href="#packs" className="hover:text-aqua transition">{lang === 'fr' ? 'Packs & Forfaits' : 'Packages & Bundles'}</a>
                </li>
                <li>
                  <a href="#sanctuaire" className="hover:text-aqua transition">{lang === 'fr' ? 'Galerie du Sanctuaire' : 'Sanctuary Gallery'}</a>
                </li>
                <li>
                  <a href="#avis" className="hover:text-aqua transition">{lang === 'fr' ? 'Avis Clients Google (5.0 ★)' : 'Google Reviews (5.0 ★)'}</a>
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
                  <MessageSquare size={15} className="text-aqua shrink-0" />
                  <span>WhatsApp : {BUSINESS_INFO.phones.whatsapp}</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ========================================================= */}
        {/* INTERACTIVE GOOGLE MAP SECTION                            */}
        {/* ========================================================= */}
        <Reveal variant="fade-up" delay={200} duration={800}>
          <div className="py-12 border-b border-aqua/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-aqua font-semibold mb-2">
                  <MapPin size={13} />
                  <span>{lang === 'fr' ? 'Emplacement Privilégié' : 'Prime Location'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-light">
                  {lang === 'fr' ? 'Nous Trouver à Malabata' : 'Find Us in Malabata Bay'}
                </h3>
                <p className="text-xs text-mist/70 font-light mt-1">
                  {BUSINESS_INFO.location.address}, {BUSINESS_INFO.location.city} — {BUSINESS_INFO.location.landmark[lang]}
                </p>
              </div>

              <a
                href={BUSINESS_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-900 hover:bg-brand text-aqua hover:text-white border border-aqua/30 text-xs uppercase tracking-[0.14em] font-medium transition shadow-sm self-start md:self-auto transform hover:-translate-y-0.5 duration-200"
              >
                <Navigation size={13} />
                <span>{lang === 'fr' ? 'Itinéraire Google Maps' : 'Get Directions'}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Map Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-aqua/25 shadow-2xl bg-navy-900 h-72 sm:h-96">
              <iframe
                title="Sabon Spa Google Map Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {/* Top location badge inside map */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-navy-950/90 backdrop-blur-md border border-aqua/30 text-white text-xs font-serif flex items-center gap-2 shadow-lg pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-aqua animate-pulse" />
                <span>Sabon Spa</span>
              </div>
            </div>
          </div>
        </Reveal>

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
