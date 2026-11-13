import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ProofStrip } from './components/sections/ProofStrip';
import { Introduction } from './components/sections/Introduction';
import { Services } from './components/sections/Services';
import { ImmersiveBreak } from './components/sections/ImmersiveBreak';
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
        {/* 1. Cinematic Video Hero */}
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

        {/* 4. The Single Unified Services, Pricing & Experience Menu */}
        <Services
          lang={lang}
          onSelectService={(id) => handleOpenBooking(id)}
        />

        {/* 5. Immersive Caustic Break */}
        <ImmersiveBreak lang={lang} />

        {/* 6. Authentic Photography Gallery & Lightbox */}
        <GallerySection lang={lang} />

        {/* 7. Why Sabon Spa */}
        <WhySabon lang={lang} />

        {/* 8. Master Team Section */}
        <TeamSection lang={lang} />

        {/* 9. Verified Google Reviews & Social Proof */}
        <ReviewsSection lang={lang} />

        {/* 10. Booking & Practical Coordinates */}
        <BookingSection lang={lang} />

        {/* 11. FAQ Section */}
        <FAQSection lang={lang} />
      </main>

      {/* Footer with Interactive Google Map & Hours */}
      <Footer
        lang={lang}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        preselectedServiceId={preselectedService}
      />

      {/* Floating Instant WhatsApp Button */}
      <a
        href={BUSINESS_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageSquare size={26} className="group-hover:scale-105 transition" />
        <span className="sr-only">Contact Sabon Spa WhatsApp</span>
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white" />
      </a>
    </div>
  );
};

export default App;
