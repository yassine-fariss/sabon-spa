import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../../types';
import { FAQS } from '../../data/content';
import { Reveal } from '../ui/Reveal';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-mist text-navy relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-semibold mb-3">
              <HelpCircle size={13} />
              <span>{lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Tout ce qu’il faut savoir avant <span className="italic text-brand">votre visite</span>
                </>
              ) : (
                <>
                  Everything You Need to Know Before <span className="italic text-brand">Your Visit</span>
                </>
              )}
            </h2>
          </div>
        </Reveal>

        {/* Accordion List with Staggered Reveal */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal
                key={idx}
                variant="fade-up"
                delay={idx * 70}
                duration={650}
              >
                <div
                  className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-serif font-medium text-navy">
                      {faq.question[lang]}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-mist flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand text-white' : 'text-navy/70'
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-navy/75 leading-relaxed font-light border-t border-navy/5 pt-4 animate-fade-in">
                      {faq.answer[lang]}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
