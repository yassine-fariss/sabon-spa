import React from 'react';
import { Users } from 'lucide-react';
import { Language } from '../../types';
import { TEAM_MEMBERS } from '../../data/content';
import { getAssetUrl } from '../../utils/assets';
import { Reveal } from '../ui/Reveal';

interface TeamSectionProps {
  lang: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang }) => {
  return (
    <section id="equipe" className="py-28 bg-mist text-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand font-semibold mb-3">
              <Users size={13} />
              <span>{lang === 'fr' ? 'Maîtres Praticiens' : 'Master Therapists'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-navy font-light tracking-tight">
              {lang === 'fr' ? (
                <>
                  Les Mains Expertes du <span className="italic text-brand">Sanctuaire</span>
                </>
              ) : (
                <>
                  The Expert Hands Behind <span className="italic text-brand">The Sanctuary</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-navy/70 font-light leading-relaxed">
              {lang === 'fr'
                ? 'Une équipe de maîtres praticiens chevronnés dévoués à votre bien-être, alliant l\'art traditionnel marocain aux protocoles bien-être internationaux.'
                : 'A dedicated team of seasoned practitioners blending ancestral Moroccan warmth with advanced international bodywork.'}
            </p>
          </div>
        </Reveal>

        {/* Big Authentic Team Photo Banner with Reveal */}
        <Reveal variant="scale-up" duration={850}>
          <div className="mb-16 relative rounded-3xl overflow-hidden border border-navy/10 shadow-2xl bg-navy-950 max-h-[500px] group">
            <img
              src={getAssetUrl('images/team.jpg')}
              alt="L'équipe Sabon Spa Tanger"
              className="w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-aqua font-semibold block">
                  {lang === 'fr' ? 'Équipe Officielle Sabon Spa' : 'Official Sabon Spa Team'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                  {lang === 'fr' ? 'Bienveillance, Rigueur & Discrétion' : 'Warmth, Mastery & Complete Discretion'}
                </h3>
              </div>
              <div className="px-4 py-2 rounded-full bg-navy-900/80 backdrop-blur-md border border-aqua/30 text-white text-xs font-medium self-start sm:self-auto">
                ✨ {lang === 'fr' ? 'Personnel qualifié & bilingue' : 'Qualified & multilingual staff'}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Individual Therapist Specialty Cards with Staggered Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <Reveal
              key={idx}
              variant="fade-up"
              delay={idx * 100}
              duration={700}
            >
              <div
                className="h-full bg-white rounded-2xl p-6 border border-navy/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-serif text-lg font-bold mb-4 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition duration-300">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="text-lg font-serif text-navy font-semibold group-hover:text-brand transition duration-200">
                    {member.name}
                  </h4>
                  <p className="text-xs text-brand uppercase tracking-wider font-medium mt-1 mb-3">
                    {member.role[lang]}
                  </p>
                  <p className="text-xs text-navy/70 leading-relaxed font-light mb-4">
                    {member.bio[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy/5">
                  <span className="text-[10px] uppercase tracking-wider text-navy/50 font-semibold block mb-1.5">
                    {lang === 'fr' ? 'Spécialités :' : 'Specialties:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties[lang].map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-mist text-navy font-medium group-hover:bg-brand/10 transition duration-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
