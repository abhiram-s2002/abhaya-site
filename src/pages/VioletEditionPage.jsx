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
      <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-gradient-to-b from-[#580233] via-[#7A0648] to-[#68043D] text-white flex items-center justify-center text-center px-4 overflow-hidden font-semibold">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Sf1dgvSxQEdIcuInSxcRUwW6B-nBrZnNrAlOjxmNSTXEgqHvgbTWfGWkg5QYKVY0d9lsnGmuQwBuPf3yXH71nFMwMaVjxwvCixfo4u7HOgAOx-Z-drovy_YH-5MOgACvt0Pwe1icr3mK9M_bxXtmzzaUPFW_vyPfmx1GGDVrW_F2AgYUY40fBuNWPQElc5LbqXQuB_wLdkClmmrvrK6lHW6RI2zefAzNng6DUsYCen2Ggb06fdIVoA"
            alt="The Violet Edition Editorial"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-[#FFF0A0] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFD700]" />
            <span>Limited Seasonal Capsule</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
            The Violet Edition <br />
            <span className="italic font-light text-white/90">Ethereal Amethyst</span>
          </h1>

          <p className="text-xs sm:text-base text-white font-semibold leading-relaxed max-w-xl mx-auto px-2">
            A celebration of regal hues, liquid sheen, and deep mineral undertones. Each piece in this capsule reflects ambient light with mysterious dimension.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#7A0648]">
              The Color Story
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1E141B] font-bold leading-tight">
              From Royal Violet to Lavender Mist
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-medium">
              Historically reserved for royalty and spiritual sanctuaries, violet represents introspection, grace, and sovereign quietude. For this capsule, our master dyers developed non-toxic mineral dyes that yield three interconnected nuances:
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-none bg-white border border-stone-200 shadow-xs flex items-center gap-3.5 text-[#1E141B]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A0648] shrink-0 border border-stone-300 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1E141B]">Royal Violet</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Deep, saturated velvet tone for high-contrast evening presence.</p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-none bg-white border border-stone-200 shadow-xs flex items-center gap-3.5 text-[#1E141B]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#B32D7F] shrink-0 border border-stone-300 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1E141B]">Amethyst Soft</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Muted heather undertones that flatter both warm and cool complexions.</p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-none bg-white border border-stone-200 shadow-xs flex items-center gap-3.5 text-[#1E141B]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5D2E8] shrink-0 border border-stone-300 shadow-inner" />
                <div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1E141B]">Lavender Mist</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Airy pastel glow that shimmers subtly in direct daylight.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] rounded-none overflow-hidden shadow-md border border-stone-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYEamtzjpK7ME6SNcwB_Dm777cIG9hjrlL-HktMD3xXRRagPMwnPzQ6iQe0viQ-TzLh4QmpxHcu3NVanxe3hDnC2QRxOeS2lYJYUCj57wjk6s6zQPxuGfRymUJvAtpdqSxQyOCVxYVVXZeKjX1PtHzUwTdxLxRFkQ-uy0Wkdt9PLVSix-WW_Yhj9Q-7vckCUPA1NjfPSGWo1RpBTx4655Eg32yHhxICDT7wKDiG-eqw4hPAEADpyQ5vA"
                alt="Royal Violet silk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-none overflow-hidden shadow-md border border-stone-200 mt-6 sm:mt-8">
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
        <div className="border-b border-stone-200 pb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#7A0648]">
            Capsule Pieces
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1E141B] font-bold mt-0.5">
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

