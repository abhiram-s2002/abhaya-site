import React from 'react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { navigateTo, showToast } = useShop();

  return (
    <footer className="w-full bg-[#fff4f9]/80 border-t border-[#ebdcd0]/60 py-12 sm:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Copyright (Left) */}
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#2E1C1A] text-left hover:opacity-80 transition-opacity"
          >
            NOOR AL DHUHA
          </button>
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500 font-medium">
            © 2024 NOOR AL DHUHA. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Navigation Links (Right) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:gap-10 text-xs sm:text-sm text-stone-700">
          <button
            onClick={() => showToast('NOOR AL DHUHA Atelier Privacy & Data Governance')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => showToast('Complimentary DHL Express Tracked Shipping & 14-Day Exchanges')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline"
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => navigateTo('story')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline"
          >
            Sustainability
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline"
          >
            Wholesale
          </button>
        </div>

      </div>
    </footer>
  );
}

