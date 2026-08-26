import React from 'react';
import { Sparkles, ShieldCheck, Heart, Feather, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';

const ICON_MAP = {
  sparkles: Sparkles,
  feather: Feather,
  shield: ShieldCheck,
  globe: Globe,
  heart: Heart,
};

export default function StoryPage() {
  const { navigateTo, siteContent } = useShop();
  const s = siteContent?.story_page || {};

  const pillars = Array.isArray(s.pillars) ? s.pillars : [];
  const paragraphs = Array.isArray(s.genesis_paragraphs) ? s.genesis_paragraphs : [];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20 sm:pb-24 animate-fade-in">

      {/* Header Banner */}
      <EditableSection cmsKey="story_page" label="Our Story Page">
        <section className="bg-primary text-white py-12 sm:py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-gold-soft">
              {s.tagline || 'Heritage & Manifesto'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight">
              {s.headline || 'The House of NOOR AL DHUHA'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-base font-light max-w-xl mx-auto leading-relaxed px-2">
              {s.subheading || 'Founded on the belief that modesty should never ask for compromise in luxury, quality, or architectural beauty.'}
            </p>
          </div>
        </section>
      </EditableSection>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              {s.genesis_label || 'The Genesis'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium leading-tight">
              {s.genesis_title || 'Crafted in Reverence of Detail'}
            </h2>
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                {para}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                <span className="font-serif text-xl sm:text-2xl text-primary font-bold">{s.stat1_value || '100%'}</span>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium">{s.stat1_label || 'Grade 6A Long-Fiber Mulberry Silk'}</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                <span className="font-serif text-xl sm:text-2xl text-primary font-bold">{s.stat2_value || '0%'}</span>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium">{s.stat2_label || 'Synthetic Plastic Fillers or Harsh Chemicals'}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-surface-container-highest">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g"
              alt="NOOR AL DHUHA Atelier"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-surface-container-low py-12 sm:py-20 border-y border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              {s.pillars_label || 'Guiding Principles'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              {s.pillars_title || 'The Four Pillars of NOOR AL DHUHA'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = ICON_MAP[pillar.icon] || Sparkles;
              return (
                <div key={idx} className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-primary font-medium">{pillar.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium">
            Experience Pure Atelier Luxury
          </h2>
          <p className="text-xs sm:text-sm text-white/75 font-sans max-w-lg mx-auto leading-relaxed">
            Every creation is an intimate collaboration between our master artisans and your individual vision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3 rounded-xl bg-white text-primary font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Explore Catalog
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-8 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2 justify-center"
            >
              <span>Bespoke Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
