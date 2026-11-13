import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { Language } from '../../types';
import { SERVICES, PACKS, BUSINESS_INFO } from '../../data/content';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedServiceId
}) => {
  const [selectedItem, setSelectedItem] = useState<string>(preselectedServiceId || 'hammam-royal');
  const [wing, setWing] = useState<'women' | 'men'>('women');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Find the selected service or pack title
  const currentService = SERVICES.find(s => s.id === selectedItem);
  const currentPack = PACKS.find(p => p.id === selectedItem);
  const itemTitle = currentService?.title[lang] || currentPack?.title[lang] || selectedItem;

  const handleWhatsAppBooking = () => {
    const wingText = wing === 'women' ? (lang === 'fr' ? 'Espace Femmes' : 'Women Wing') : (lang === 'fr' ? 'Espace Hommes' : 'Men Wing');
    const text = encodeURIComponent(
      lang === 'fr'
        ? `Bonjour Sabon Spa Tanger,\n\nJe souhaite effectuer une réservation :\n• Soin/Pack : ${itemTitle}\n• Espace : ${wingText}\n• Date : ${date || 'À convenir'}\n• Heure : ${time}\n• Nom : ${name || 'Non renseigné'}\n• Tél : ${phone || 'Non renseigné'}${notes ? `\n• Remarques : ${notes}` : ''}`
        : `Hello Sabon Spa Tangier,\n\nI would like to book an appointment:\n• Treatment/Pack: ${itemTitle}\n• Wing: ${wingText}\n• Date: ${date || 'To be scheduled'}\n• Time: ${time}\n• Name: ${name || 'Not specified'}\n• Phone: ${phone || 'Not specified'}${notes ? `\n• Notes: ${notes}` : ''}`
    );
    window.open(`https://wa.me/212600437982?text=${text}`, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(lang === 'fr' ? 'Veuillez renseigner votre nom et numéro de téléphone.' : 'Please provide your name and phone number.');
      return;
    }
    // Set confirmed state and also prompt direct WhatsApp confirmation
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-navy-900 border border-aqua/30 rounded-2xl p-6 sm:p-8 shadow-luxury max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-mist/60 hover:text-white rounded-full bg-navy-800/80 hover:bg-navy-700 transition"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-aqua font-medium">
                {lang === 'fr' ? 'Réservation Exclusive' : 'Exclusive Reservation'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                {lang === 'fr' ? 'Votre Parenthèse de Bien-Être' : 'Your Sanctuary Escape'}
              </h3>
              <p className="text-sm text-mist/70 mt-1">
                {lang === 'fr'
                  ? 'Confirmez vos souhaits ou discutez en direct avec notre équipe d\'accueil.'
                  : 'Specify your preferences or converse directly with our concierge team.'}
              </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Soin ou Pack */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium">
                  {lang === 'fr' ? 'Soin ou Rituel souhaité' : 'Desired Treatment or Pack'}
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition"
                >
                  <optgroup label={lang === 'fr' ? 'Packs & Rituels Complets' : 'Packs & Complete Rituals'}>
                    {PACKS.map(p => (
                      <option key={p.id} value={p.id}>{p.title[lang]} ({p.duration} — {p.price})</option>
                    ))}
                  </optgroup>
                  <optgroup label={lang === 'fr' ? 'Soins Individuels' : 'Individual Treatments'}>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.title[lang]} ({s.duration} — {s.price})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* 100% Espaces Séparés Choix */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium">
                  {lang === 'fr' ? 'Espace Réservé (100% Séparé)' : 'Dedicated Wing (100% Separate)'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWing('women')}
                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition ${
                      wing === 'women'
                        ? 'bg-brand/20 border-aqua text-white shadow-glow-aqua'
                        : 'bg-navy-950/60 border-navy-800 text-mist/60 hover:border-navy-700'
                    }`}
                  >
                    ✨ {lang === 'fr' ? 'Espace Femmes' : 'Women Wing'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setWing('men')}
                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-lg border transition ${
                      wing === 'men'
                        ? 'bg-brand/20 border-aqua text-white shadow-glow-aqua'
                        : 'bg-navy-950/60 border-navy-800 text-mist/60 hover:border-navy-700'
                    }`}
                  >
                    🌿 {lang === 'fr' ? 'Espace Hommes' : 'Men Wing'}
                  </button>
                </div>
              </div>

              {/* Date & Heure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium flex items-center gap-1.5">
                    <Calendar size={13} className="text-aqua" />
                    {lang === 'fr' ? 'Date souhaitée' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium flex items-center gap-1.5">
                    <Clock size={13} className="text-aqua" />
                    {lang === 'fr' ? 'Heure (10h - 23h)' : 'Time (10 AM - 11 PM)'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition"
                  >
                    {['10:00', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nom & Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium flex items-center gap-1.5">
                    <User size={13} className="text-aqua" />
                    {lang === 'fr' ? 'Nom complet' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Sarah Bennani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition placeholder:text-mist/30"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium flex items-center gap-1.5">
                    <Phone size={13} className="text-aqua" />
                    {lang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2.5 outline-none transition placeholder:text-mist/30"
                  />
                </div>
              </div>

              {/* Remarques */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-mist/80 mb-1.5 font-medium">
                  {lang === 'fr' ? 'Demandes particulières (optionnel)' : 'Special Requests (optional)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'fr' ? 'Pression du massage, formule duo, occasion spéciale...' : 'Massage pressure, couples suite, special occasion...'}
                  className="w-full bg-navy-950/80 border border-navy-700 focus:border-aqua text-white text-sm rounded-lg px-3.5 py-2 outline-none transition placeholder:text-mist/30 resize-none"
                />
              </div>

              {/* Boutons d'action */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-brand hover:bg-brand-600 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 shadow-lg border border-aqua/30 transition active:scale-[0.98]"
                >
                  <MessageSquare size={17} />
                  <span>
                    {lang === 'fr' ? 'Réserver' : 'Book'}
                  </span>
                </button>

                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-600 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-aqua/30 transition active:scale-[0.98]"
                >
                  <span>
                    {lang === 'fr' ? 'Envoyer la demande de réservation' : 'Submit Reservation Request'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-aqua/20 text-aqua rounded-full flex items-center justify-center mx-auto mb-4 border border-aqua/40 shadow-glow-aqua">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-2xl font-serif text-white">
              {lang === 'fr' ? 'Demande bien reçue !' : 'Request Received!'}
            </h4>
            <p className="text-mist/80 text-sm mt-2 max-w-sm mx-auto">
              {lang === 'fr'
                ? `Merci ${name}. Notre équipe Sabon Spa prend en charge votre demande pour le ${itemTitle} et vous confirmera votre créneau par téléphone ou WhatsApp.`
                : `Thank you ${name}. Our concierge team is processing your request for ${itemTitle} and will confirm your appointment shortly.`}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppBooking}
                className="bg-brand hover:bg-brand-600 border border-aqua/30 text-white py-2.5 px-5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                <MessageSquare size={16} />
                <span>{lang === 'fr' ? 'Réserver' : 'Book'}</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-navy-800 hover:bg-navy-700 text-white py-2.5 px-5 rounded-lg text-sm font-medium transition"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
