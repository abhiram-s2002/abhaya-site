import React from 'react';
import { Sparkles, ShieldCheck, Heart, Feather, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function StoryPage() {
  const { navigateTo } = useShop();

  return (
    <div className="space-y-12 sm:space-y-20 pb-20 sm:pb-24 animate-fade-in">
      
      {/* Header Banner */}
      <section className="bg-primary text-white py-12 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-gold-soft">
            Heritage & Manifesto
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight">
            The House of HAYAT
          </h1>
          <p className="text-stone-300 text-xs sm:text-base font-light max-w-xl mx-auto leading-relaxed px-2">
            Founded on the belief that modesty should never ask for compromise in luxury, quality, or architectural beauty.
          </p>
        </div>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              The Genesis
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium leading-tight">
              Crafted in Reverence of Detail
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
              For decades, modest fashion was forced to choose between synthetic polyester blends that slipped and snagged, or heavy fabrics that suffocated. We sought to re-imagine the hijab as a piece of haute couture sculpture.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
              We spent three years testing over 40 distinct silk weights before settling on our proprietary <strong>19-Momme Grade 6A Mulberry Silk</strong>—which features a luminous, fluid face and a micro-textured matte reverse weave that eliminates slippage without pins.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                <span className="font-serif text-xl sm:text-2xl text-primary font-bold">100%</span>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium">Grade 6A Long-Fiber Mulberry Silk</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                <span className="font-serif text-xl sm:text-2xl text-primary font-bold">0%</span>
                <p className="text-[11px] sm:text-xs text-stone-600 font-medium">Synthetic Plastic Fillers or Harsh Chemicals</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-surface-container-highest">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g"
              alt="HAYAT Atelier"
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
              Guiding Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              The Four Pillars of HAYAT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-primary font-medium">Organic Fiber Purity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We use organic Mulberry silk and FSC-certified Austrian TENCEL™ modal that nurture hair and skin naturally.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                <Feather className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-primary font-medium">Architectural Drape</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Precision edge rolls and balanced weights ensure effortless hold without bunching or collapsing.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-primary font-medium">Fair Artisan Guild</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Each border is rolled by master artisans receiving above-living wages and complete healthcare benefits.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-primary font-medium">Zero-Plastic Promise</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                All packaging is 100% recyclable, plastic-free, and enclosed in keepsake gift boxes designed for lifelong use.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-14 rounded-2xl bg-gradient-to-r from-primary to-plum-deep text-white space-y-4 sm:space-y-6 shadow-luxury">
          <h2 className="font-serif text-2xl sm:text-4xl font-medium">
            Experience the Luster of Pure Mulberry Silk
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto font-light">
            Indulge in silhouettes crafted for the modern woman who refuses to compromise on modesty or refinement.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-gold-soft text-primary text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded shadow-md inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <span>Explore The Boutique</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}

