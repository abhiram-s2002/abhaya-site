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
        <div className="flex flex-wrap sm:items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-stone-700">
          <button
            onClick={() => navigateTo('terms')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Terms & Privacy
          </button>
          <button
            onClick={() => navigateTo('refund-policy')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => navigateTo('order-lookup')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Track Order
          </button>
          <button
            onClick={() => navigateTo('offers')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Privileges & Offers
          </button>
          <button
            onClick={() => navigateTo('story')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer"
          >
            Concierge & Contact
          </button>
        </div>

      </div>
    </footer>
  );
}

