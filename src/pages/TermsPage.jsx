import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function TermsPage() {
  const { navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#7A0648] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 animate-fade-in text-white font-sans font-semibold">
      
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-royal-violet hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </button>

      <div className="space-y-3">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-secondary">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-medium tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-primary/70 leading-relaxed">
          Please review the terms governing your purchase and use of the NOOR AL DHUHA Atelier digital boutique.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-primary/15 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-primary/80">
        
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-primary">
            1. Intellectual Property & Brand Rights
          </h2>
          <p>
            All content, brand identity, signature color palettes, garment designs, photographic assets, and editorial copy displayed on this platform remain the exclusive intellectual property of NOOR AL DHUHA Haute Modestie.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-primary">
            2. Product Representation & Color Accuracy
          </h2>
          <p>
            We photograph all items under natural daylight and studio calibrated lighting to ensure colors appear true to life. Minor hue variations may occur depending on individual screen calibration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-primary">
            3. Pricing & Taxes
          </h2>
          <p>
            Prices are listed with transparent currency conversions. Applicable VAT, customs, and duty fees for international orders exceeding standard thresholds are handled seamlessly during express checkout.
          </p>
        </section>

      </div>

    </div>
  );
}
