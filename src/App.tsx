import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ProofStrip } from './components/sections/ProofStrip';
import { Introduction } from './components/sections/Introduction';
import { SignatureExperiences } from './components/sections/SignatureExperiences';
import { Services } from './components/sections/Services';
import { ImmersiveBreak } from './components/sections/ImmersiveBreak';
import { PacksSection } from './components/sections/PacksSection';
import { GallerySection } from './components/sections/GallerySection';
import { WhySabon } from './components/sections/WhySabon';
import { TeamSection } from './components/sections/TeamSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { BookingSection } from './components/sections/BookingSection';
import { FAQSection } from './components/sections/FAQSection';
import { BookingModal } from './components/ui/BookingModal';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from './data/content';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedService(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans selection:bg-brand selection:text-white">
      {/* Refined Floating Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        {/* 1. Cinematic 3D & Video Hero */}
        <HeroSection
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 2. Proof Strip */}
        <ProofStrip lang={lang} />

        {/* 3. Brand Story & Architecture */}
        <Introduction
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Flagship Signature Rituals */}
        <SignatureExperiences
          lang={lang}
          onSelectService={(id) => handleOpenBooking(id)}
        />

        {/* 5. Complete Services Menu */}
        <Services
          lang={lang}
          onSelectService={(id) => handleOpenBooking(id)}
        />

        {/* 6. Immersive Caustic Break */}
        <ImmersiveBreak lang={lang} />

        {/* 7. Packs Sabon (Bronze, Silver, Gold) */}
        <PacksSection
          lang={lang}
          onSelectPack={(id) => handleOpenBooking(id)}
        />

        {/* 8. Authentic Photography Gallery & Lightbox */}
        <GallerySection lang={lang} />

        {/* 9. Why Sabon Spa */}
        <WhySabon lang={lang} />

        {/* 10. Master Team Section */}
        <TeamSection lang={lang} />

        {/* 11. Verified Reviews & Social Proof */}
        <ReviewsSection lang={lang} />

        {/* 12. Booking & Practical Coordinates */}
        <BookingSection lang={lang} />

        {/* 13. Accessible FAQ */}
        <FAQSection lang={lang} />
      </main>

      {/* Refined Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        preselectedServiceId={preselectedService}
      />

      {/* Floating WhatsApp Quick Action (Bottom-right on mobile/desktop) */}
      <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={BUSINESS_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition duration-300 border-2 border-white/20"
          title="WhatsApp Sabon Spa"
          aria-label="WhatsApp Sabon Spa"
        >
          <MessageSquare size={26} />
          {/* Tooltip on hover for desktop */}
          <span className="hidden sm:block absolute right-16 px-3 py-1.5 rounded-lg bg-navy-900/90 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg border border-aqua/20 pointer-events-none">
            {lang === 'fr' ? 'Écrivez-nous sur WhatsApp' : 'Chat with us on WhatsApp'}
          </span>
        </a>
      </aside>
    </div>
  );
};

export default App;
