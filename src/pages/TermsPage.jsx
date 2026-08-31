import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function TermsPage() {
  const { navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-8 sm:pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fade-in text-[#1E141B] font-sans font-semibold">
      
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#7A0648] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </button>

      <div className="space-y-2">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#7A0648]">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E141B] font-bold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
          Please review the terms governing your purchase and use of the NOOR AL DHUHA Atelier digital boutique.
        </p>
      </div>

      <div className="bg-white rounded-none border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-stone-700 font-medium">
        
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#1E141B]">
            1. Intellectual Property & Brand Rights
          </h2>
          <p>
            All content, brand identity, signature color palettes, garment designs, photographic assets, and editorial copy displayed on this platform remain the exclusive intellectual property of NOOR AL DHUHA Haute Modestie.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#1E141B]">
            2. Product Representation & Color Accuracy
          </h2>
          <p>
            We photograph all items under natural daylight and studio calibrated lighting to ensure colors appear true to life. Minor hue variations may occur depending on individual screen calibration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#1E141B]">
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
