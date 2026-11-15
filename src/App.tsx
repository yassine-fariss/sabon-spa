import React from 'react';
import { TrustBar } from './components/layout/TrustBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ProofStrip } from './components/sections/ProofStrip';
import { Introduction } from './components/sections/Introduction';
import { FeaturedPacks } from './components/sections/FeaturedPacks';
import { ServicesPage } from './components/services/ServicesPage';
import { ImmersiveBreak } from './components/sections/ImmersiveBreak';
import { GallerySection } from './components/sections/GallerySection';
import { WhySabon } from './components/sections/WhySabon';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { FAQSection } from './components/sections/FAQSection';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from './data/content';
import { useLang } from './hooks/useLang';

export const App: React.FC = () => {
  const { lang, switchLang } = useLang();

  const handleScrollToServices = () => {
    const el = document.getElementById('soins');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-navy font-sans selection:bg-brand selection:text-white">
      {/* Top Header Area: Slim Trust Bar (scrolls away) + Floating Navbar */}
      <div className="relative z-40">
        <TrustBar lang={lang} />
        <Navbar
          lang={lang}
          onLanguageChange={switchLang}
        />
      </div>

      <main>
        {/* 1. Cinematic Video Hero */}
        <HeroSection lang={lang} />

        {/* 2. Proof Strip */}
        <ProofStrip lang={lang} />

        {/* 3. Brand Story & Architecture */}
        <Introduction lang={lang} />

        {/* 4. Signature Featured Packs (Bronze, Silver, Golden, Royal) */}
        <FeaturedPacks lang={lang} onExploreAllPacks={handleScrollToServices} />

        {/* 5. Complete Data-Driven Services & Category Catalog */}
        <ServicesPage lang={lang} />

        {/* 6. Immersive Caustic Break */}
        <ImmersiveBreak lang={lang} />

        {/* 7. Authentic Photography Gallery & Lightbox */}
        <GallerySection lang={lang} />

        {/* 8. Why Sabon Spa */}
        <WhySabon lang={lang} />

        {/* 9. Verified Google Reviews & Social Proof */}
        <ReviewsSection lang={lang} />

        {/* 10. FAQ Section */}
        <FAQSection lang={lang} />
      </main>

      {/* Footer with Interactive Google Map & Hours */}
      <Footer lang={lang} />

      {/* Floating Instant WhatsApp Button */}
      <a
        href={BUSINESS_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand hover:bg-brand-600 border border-champagne/40 text-white shadow-luxury hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-brand/40"
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
