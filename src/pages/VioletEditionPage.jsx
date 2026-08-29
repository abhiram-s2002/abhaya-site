import React from 'react';
import { Sparkles, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function VioletEditionPage() {
  const { PRODUCTS, navigateTo } = useShop();

  const violetProducts = PRODUCTS.filter((p) => p.isVioletEdition);

  return (
    <div className="space-y-12 sm:space-y-20 pb-20 sm:pb-24 animate-fade-in">
      
      {/* Editorial Header */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-gradient-to-b from-primary via-plum-deep to-primary text-white flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Sf1dgvSxQEdIcuInSxcRUwW6B-nBrZnNrAlOjxmNSTXEgqHvgbTWfGWkg5QYKVY0d9lsnGmuQwBuPf3yXH71nFMwMaVjxwvCixfo4u7HOgAOx-Z-drovy_YH-5MOgACvt0Pwe1icr3mK9M_bxXtmzzaUPFW_vyPfmx1GGDVrW_F2AgYUY40fBuNWPQElc5LbqXQuB_wLdkClmmrvrK6lHW6RI2zefAzNng6DUsYCen2Ggb06fdIVoA"
            alt="The Violet Edition Editorial"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-royal-violet/60 border border-gold-soft/40 backdrop-blur-md text-gold-soft text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-accent" />
            <span>Limited Seasonal Capsule</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-tight">
            The Violet Edition <br />
            <span className="italic font-light text-stone-200">Ethereal Amethyst</span>
          </h1>

          <p className="text-xs sm:text-base text-stone-300 font-light leading-relaxed max-w-xl mx-auto px-2">
            A celebration of regal hues, liquid sheen, and deep mineral undertones. Each piece in this capsule reflects ambient light with mysterious dimension.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              The Color Story
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium leading-tight">
              From Royal Violet to Lavender Mist
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
              Historically reserved for royalty and spiritual sanctuaries, violet represents introspection, grace, and sovereign quietude. For this capsule, our master dyers developed non-toxic mineral dyes that yield three interconnected nuances:
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-surface-container-highest shadow-sm flex items-center gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#982476] shrink-0 border border-black/10 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-primary">Royal Violet</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Deep, saturated velvet tone for high-contrast evening presence.</p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-surface-container-highest shadow-sm flex items-center gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C76AA9] shrink-0 border border-black/10 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-primary">Amethyst Soft</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Muted heather undertones that flatter both warm and cool complexions.</p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-surface-container-highest shadow-sm flex items-center gap-3.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4C5DD] shrink-0 border border-black/10 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-primary">Lavender Mist</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Airy pastel glow that shimmers subtly in direct daylight.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-luxury">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYEamtzjpK7ME6SNcwB_Dm777cIG9hjrlL-HktMD3xXRRagPMwnPzQ6iQe0viQ-TzLh4QmpxHcu3NVanxe3hDnC2QRxOeS2lYJYUCj57wjk6s6zQPxuGfRymUJvAtpdqSxQyOCVxYVVXZeKjX1PtHzUwTdxLxRFkQ-uy0Wkdt9PLVSix-WW_Yhj9Q-7vckCUPA1NjfPSGWo1RpBTx4655Eg32yHhxICDT7wKDiG-eqw4hPAEADpyQ5vA"
                alt="Royal Violet silk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-luxury mt-6 sm:mt-8">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC62Pubod6uVtguy05UptSBB8reu4JabPY0PwbiPYPXlEDpfoyvWWm_LbQNVVa2vA_XcMhrFIIBFxe-w0OoW5jrkDOfsMuBpdvFb1KE8yOvQP3elB3A6xfTzLB8rTL6U3551DMCeA9q2oMYmOIJbZpUDr1DlrwerOph-ZxGnsRCoO8TEijtBJqZUIeWwRen9k_MtD_Br7xdakBcNQjnRMRcXfgOBFn60si3c_yt84p0f1dKFD9kqRq06g"
                alt="Soft Amethyst silk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Curated Products for Capsule - 2 Column Mobile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="border-b border-surface-container-high pb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-amethyst-soft">
            Capsule Pieces
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-primary font-medium mt-0.5">
            Featured in The Violet Edition
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {violetProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}

