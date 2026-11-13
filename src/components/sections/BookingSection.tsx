import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Calendar, CheckCircle, Mail, Navigation } from 'lucide-react';
import { Language } from '../../types';
import { BUSINESS_INFO, SERVICES, PACKS } from '../../data/content';

interface BookingSectionProps {
  lang: Language;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ lang }) => {
  const [selectedService, setSelectedService] = useState('hammam-royal');
  const [wing, setWing] = useState<'women' | 'men'>('women');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('15:00');
  const [guests, setGuests] = useState('1');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentService = SERVICES.find(s => s.id === selectedService);
  const currentPack = PACKS.find(p => p.id === selectedService);
  const itemTitle = currentService?.title[lang] || currentPack?.title[lang] || selectedService;

  const handleWhatsAppDirect = () => {
    const wingText = wing === 'women'
      ? (lang === 'fr' ? 'Espace Femmes' : 'Women Wing')
      : (lang === 'fr' ? 'Espace Hommes' : 'Men Wing');
    const msg = encodeURIComponent(
      lang === 'fr'
        ? `Bonjour Sabon Spa Tanger,\n\nJe souhaite réserver une expérience :\n• Soin/Pack : ${itemTitle}\n• Espace : ${wingText}\n• Invités : ${guests} personne(s)\n• Date : ${date || 'À déterminer'}\n• Heure souhaitée : ${time}\n• Nom : ${name || 'Non renseigné'}\n• Tél : ${phone || 'Non renseigné'}${notes ? `\n• Notes : ${notes}` : ''}`
        : `Hello Sabon Spa Tangier,\n\nI would like to book a treatment:\n• Service/Pack: ${itemTitle}\n• Wing: ${wingText}\n• Guests: ${guests} person(s)\n• Date: ${date || 'To be scheduled'}\n• Desired Time: ${time}\n• Name: ${name || 'Not provided'}\n• Phone: ${phone || 'Not provided'}${notes ? `\n• Notes: ${notes}` : ''}`
    );
    window.open(`https://wa.me/212600437982?text=${msg}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(lang === 'fr' ? 'Veuillez remplir votre nom et numéro de téléphone.' : 'Please enter your name and phone number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-white text-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Practical Contact & Verified Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-brand font-semibold block mb-2">
                {lang === 'fr' ? 'Réservations & Accueil' : 'Reservations & Concierge'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
                {lang === 'fr' ? (
                  <>
                    Préparez votre <span className="italic text-brand">moment de grâce</span>
                  </>
                ) : (
                  <>
                    Begin your <span className="italic text-brand">serenity journey</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-sm text-navy/75 font-light leading-relaxed">
                {lang === 'fr'
                  ? 'Pour une réponse instantanée et la confirmation de votre créneau horaire, notre équipe de conciergerie est disponible 7j/7 sur WhatsApp et par téléphone.'
                  : 'For immediate assistance and live confirmation of your desired ritual slot, our concierge team is available 7 days a week on WhatsApp and telephone.'}
              </p>
            </div>

            {/* Quick Action Cards */}
            <div className="space-y-4">
              {/* WhatsApp direct card */}
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#128C7E] font-semibold block">
                    {lang === 'fr' ? 'WhatsApp Direct' : 'Direct WhatsApp'}
                  </span>
                  <span className="text-base font-semibold text-navy">
                    {BUSINESS_INFO.phones.whatsapp}
                  </span>
                  <p className="text-[11px] text-navy/60">
                    {lang === 'fr' ? 'Réponse rapide & confirmation immédiate' : 'Fast response & instant confirmation'}
                  </p>
                </div>
              </a>

              {/* Phone call card */}
              <a
                href={`tel:${BUSINESS_INFO.phones.primary.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-brand/5 border border-brand/20 hover:bg-brand/10 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand font-semibold block">
                    {lang === 'fr' ? 'Ligne Téléphonique Spa' : 'Spa Telephone'}
                  </span>
                  <span className="text-base font-semibold text-navy">
                    {BUSINESS_INFO.phones.primary}
                  </span>
                  <p className="text-[11px] text-navy/60">
                    {BUSINESS_INFO.phones.landline} ({lang === 'fr' ? 'Ligne fixe' : 'Landline'})
                  </p>
                </div>
              </a>

              {/* Address card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-mist border border-navy/10">
                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-navy/60 font-semibold block">
                    {lang === 'fr' ? 'Adresse & Localisation' : 'Address & Location'}
                  </span>
                  <span className="text-sm font-semibold text-navy block mt-0.5">
                    {BUSINESS_INFO.location.address}
                  </span>
                  <span className="text-xs text-navy/70 block">
                    {BUSINESS_INFO.location.city} ({BUSINESS_INFO.location.landmark[lang]})
                  </span>
                  <a
                    href={BUSINESS_INFO.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand hover:underline font-medium mt-2"
                  >
                    <Navigation size={12} />
                    <span>{lang === 'fr' ? 'Ouvrir sur Google Maps' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mist border border-navy/10">
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-aqua flex items-center justify-center shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-navy/60 font-semibold block">
                    {lang === 'fr' ? 'Horaires d\'Ouverture' : 'Operating Hours'}
                  </span>
                  <span className="text-sm font-semibold text-navy">
                    {BUSINESS_INFO.hours[lang]}
                  </span>
                  <p className="text-[11px] text-navy/60">
                    {lang === 'fr' ? 'Sans interruption toute la semaine' : 'Continuously every day'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Interactive Booking Request Form */}
          <div className="lg:col-span-7 bg-mist/60 border border-navy/10 rounded-3xl p-8 sm:p-10 shadow-lg">
            {!submitted ? (
              <div>
                <h3 className="text-2xl font-serif text-navy font-semibold mb-2">
                  {lang === 'fr' ? 'Demande de Réservation en Ligne' : 'Online Booking Request'}
                </h3>
                <p className="text-xs text-navy/70 mb-6">
                  {lang === 'fr'
                    ? 'Remplissez le formulaire ci-dessous ou basculez sur WhatsApp en un clic.'
                    : 'Fill out the form below or switch to WhatsApp with one click.'}
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Select Treatment / Pack */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                      {lang === 'fr' ? 'Prestation choisie' : 'Selected Service'}
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-4 py-3 text-sm text-navy outline-none transition"
                    >
                      <optgroup label={lang === 'fr' ? 'Packs Complets' : 'Complete Packages'}>
                        {PACKS.map(p => (
                          <option key={p.id} value={p.id}>{p.title[lang]} — {p.price} ({p.duration})</option>
                        ))}
                      </optgroup>
                      <optgroup label={lang === 'fr' ? 'Soins & Hammams' : 'Treatments & Hammams'}>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.title[lang]} — {s.price} ({s.duration})</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* 100% Espaces Séparés Options */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                      {lang === 'fr' ? 'Aile Réservée (100% Séparée)' : 'Dedicated Wing (100% Separate)'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setWing('women')}
                        className={`py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl border transition ${
                          wing === 'women'
                            ? 'bg-brand text-white border-brand shadow-md'
                            : 'bg-white text-navy/70 border-navy/20 hover:border-navy/40'
                        }`}
                      >
                        ✨ {lang === 'fr' ? 'Espace Femmes' : 'Women Wing'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setWing('men')}
                        className={`py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl border transition ${
                          wing === 'men'
                            ? 'bg-brand text-white border-brand shadow-md'
                            : 'bg-white text-navy/70 border-navy/20 hover:border-navy/40'
                        }`}
                      >
                        🌿 {lang === 'fr' ? 'Espace Hommes' : 'Men Wing'}
                      </button>
                    </div>
                  </div>

                  {/* Date, Time, Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5 flex items-center gap-1.5">
                        <Calendar size={13} className="text-brand" />
                        {lang === 'fr' ? 'Date' : 'Date'}
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-3.5 py-2.5 text-sm text-navy outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5 flex items-center gap-1.5">
                        <Clock size={13} className="text-brand" />
                        {lang === 'fr' ? 'Heure' : 'Time'}
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-3.5 py-2.5 text-sm text-navy outline-none"
                      >
                        {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '21:30'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                        {lang === 'fr' ? 'Personnes' : 'Guests'}
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-3.5 py-2.5 text-sm text-navy outline-none"
                      >
                        <option value="1">1 {lang === 'fr' ? 'Personne' : 'Guest'}</option>
                        <option value="2">2 {lang === 'fr' ? 'Personnes (Duo)' : 'Guests'}</option>
                        <option value="3">3 {lang === 'fr' ? 'Personnes' : 'Guests'}</option>
                        <option value="4+">4+ {lang === 'fr' ? 'Groupe' : 'Group'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                        {lang === 'fr' ? 'Votre Nom' : 'Your Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'fr' ? 'ex. Yassine Bennani' : 'e.g. John Doe'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-4 py-2.5 text-sm text-navy outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                        {lang === 'fr' ? 'Téléphone / WhatsApp' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+212 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-4 py-2.5 text-sm text-navy outline-none"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy/80 font-semibold mb-1.5">
                      {lang === 'fr' ? 'Remarques spécifiques' : 'Special Notes'}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={lang === 'fr' ? 'Anniversaire, demande d\'huile neutre, etc.' : 'Special requests or preferences'}
                      className="w-full bg-white border border-navy/20 focus:border-brand rounded-xl px-4 py-2 text-sm text-navy outline-none resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 shadow-md transition active:scale-[0.98]"
                    >
                      <MessageSquare size={18} />
                      <span>{lang === 'fr' ? 'Confirmer instantanément sur WhatsApp' : 'Instant WhatsApp Booking'}</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-navy hover:bg-navy-800 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition active:scale-[0.98]"
                    >
                      <span>{lang === 'fr' ? 'Transmettre ma demande par formulaire' : 'Submit Booking Request'}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4 border border-brand/30">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-2xl font-serif text-navy font-semibold">
                  {lang === 'fr' ? 'Demande envoyée avec succès' : 'Request Successfully Sent'}
                </h4>
                <p className="text-sm text-navy/70 mt-2 max-w-md mx-auto">
                  {lang === 'fr'
                    ? `Merci ${name}. Nous avons bien pris note de votre souhait pour le ${itemTitle}. Notre réceptionniste vous contactera au ${phone} pour confirmer le créneau.`
                    : `Thank you ${name}. Your request for ${itemTitle} has been recorded. Our reception team will reach out at ${phone} to confirm.`}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="bg-[#25D366] text-white py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={15} />
                    <span>{lang === 'fr' ? 'Envoyer aussi sur WhatsApp' : 'Open in WhatsApp'}</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-navy/10 hover:bg-navy/20 text-navy py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider font-medium"
                  >
                    {lang === 'fr' ? 'Nouvelle demande' : 'New Request'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
