import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from './cms/EditableSection';
import brandLogo from '../assets/logo.png';

export default function Footer() {
  const { navigateTo, siteContent } = useShop();
  const f = siteContent?.footer_content || {};
  const brandName = f.brand_name || 'NOOR AL DHUHA';
  const copyright = f.copyright || '© 2024 NOOR AL DHUHA. ALL RIGHTS RESERVED.';

  return (
    <EditableSection cmsKey="footer_content" label="Footer">
      <footer className="w-full bg-[#fff4f9]/80 border-t border-[#ebdcd0]/60 pt-12 pb-28 lg:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Brand & Copyright (Left) */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => navigateTo('home')}
              className="focus:outline-none shrink-0 group"
              aria-label="NOOR AL DHUHA Home"
            >
              <img
                src={brandLogo}
                alt="NOOR AL DHUHA Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('home')}
                className="font-serif text-xl sm:text-2xl tracking-[0.16em] font-semibold text-[#2E1C1A] text-left hover:opacity-80 transition-opacity block leading-tight"
              >
                {brandName}
              </button>
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-stone-500 font-medium">
                {copyright}
              </p>
            </div>
          </div>

          {/* Navigation Links (Right) */}
          <div className="flex flex-wrap sm:items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-stone-700">
            <button onClick={() => navigateTo('terms')} className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer">
              Terms & Privacy
            </button>
            <button onClick={() => navigateTo('refund-policy')} className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer">
              Shipping & Returns
            </button>
            <button onClick={() => navigateTo('offers')} className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer">
              Atelier Privileges
            </button>
            <button onClick={() => navigateTo('story')} className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer">
              Our Story
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-stone-950 text-left transition-colors font-medium hover:underline cursor-pointer">
              Concierge & Contact
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1 text-royal-violet hover:text-primary transition-colors font-semibold cursor-pointer px-2 py-1 rounded bg-royal-violet/10 hover:bg-royal-violet/20 border border-royal-violet/20 text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>

        </div>
      </footer>
    </EditableSection>
  );
}
