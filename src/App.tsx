import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ProofStrip } from './components/sections/ProofStrip';
import { Introduction } from './components/sections/Introduction';
import { FeaturedPacks } from './components/sections/FeaturedPacks';
import { ServicesPage } from './components/services/ServicesPage';
import { CategoryDetailPage } from './components/services/CategoryDetailPage';
import { ImmersiveBreak } from './components/sections/ImmersiveBreak';
import { GallerySection } from './components/sections/GallerySection';
import { WhySabon } from './components/sections/WhySabon';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { FAQSection } from './components/sections/FAQSection';
import { SectionTransition } from './components/ui/SectionTransition';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from './data/content';
import { useLang } from './hooks/useLang';
import { useSpaRouter } from './hooks/useSpaRouter';

export const App: React.FC = () => {
  const { lang, switchLang } = useLang();
  const { activeCategorySlug, navigateToCategory, navigateToHome } = useSpaRouter();

  const handleNavSection = (href: string) => {
    if (href === '#' || href === '#presentation') {
      navigateToHome(href === '#' ? undefined : 'presentation');
    } else {
      const sectionId = href.replace('#', '');
      navigateToHome(sectionId);
    }
  };

  const handleScrollToServices = () => {
    navigateToHome('soins');
  };

  return (
    <div className="min-h-screen bg-ivory text-navy font-sans selection:bg-brand selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={switchLang}
        onNavigateSection={handleNavSection}
      />

      {activeCategorySlug ? (
        /* Dedicated Category Detail Page (Inspired by Reference Screenshot 2) */
        <main>
          <CategoryDetailPage
            categorySlug={activeCategorySlug}
            lang={lang}
            onBackToDirectory={() => navigateToHome('soins')}
            onSelectCategory={navigateToCategory}
            onNavigateHome={() => navigateToHome()}
          />
        </main>
      ) : (
        /* Main Homepage with Horizontal Directory List (Inspired by Reference Screenshot 1) */
        <main>
          {/* 1. Cinematic Video Hero */}
          <HeroSection lang={lang} />

          {/* 2. Proof Strip */}
          <ProofStrip lang={lang} />

          {/* 3. Brand Story & Architecture */}
          <Introduction lang={lang} />

          <SectionTransition variant="accent-line" showIcon className="-my-2" />

          {/* 4. Signature Featured Packs */}
          <FeaturedPacks lang={lang} onExploreAllPacks={handleScrollToServices} />

          {/* 5. Complete Services Directory Horizontal List */}
          <ServicesPage
            lang={lang}
            onSelectCategory={navigateToCategory}
          />

          {/* 6. Immersive Caustic Break */}
          <ImmersiveBreak lang={lang} />

          {/* 7. Authentic Photography Gallery & Lightbox */}
          <GallerySection lang={lang} />

          {/* 8. Why Sabon Spa */}
          <WhySabon lang={lang} />

          <SectionTransition variant="accent-line" showIcon className="-my-2" />

          {/* 9. Verified Google Reviews & Social Proof */}
          <ReviewsSection lang={lang} />

          {/* 10. FAQ Section */}
          <FAQSection lang={lang} />
        </main>
      )}

      {/* Footer with Interactive Google Map & Hours */}
      <Footer lang={lang} onNavigateSection={handleNavSection} />

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
