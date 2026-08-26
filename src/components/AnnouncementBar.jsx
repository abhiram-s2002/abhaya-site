import React from 'react';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from './cms/EditableSection';

export default function AnnouncementBar() {
  const { currency, setCurrency, CURRENCIES, siteContent } = useShop();
  const a = siteContent?.announcement || {};

  // If admin disabled the bar entirely, hide it
  if (a.enabled === false) return null;

  return (
    <EditableSection cmsKey="announcement" label="Announcement Bar">
      <div className="bg-primary text-[#EBE3F0] text-[10px] sm:text-xs py-2 px-3 sm:px-4 border-b border-royal-violet/30 tracking-wider sm:tracking-widest uppercase transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">

          {/* Left perk */}
          <div className="hidden md:flex items-center gap-2 text-gold-soft/90 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            <span>{a.leftText || 'Complimentary Silk Gift Box on Orders $150+'}</span>
          </div>

          {/* Center message */}
          <div className="flex items-center gap-1.5 text-center text-stone-200 mx-auto md:mx-0 truncate">
            <span className="font-semibold tracking-wider text-gold-soft shrink-0">
              {a.centerBadge || 'The Violet Edition:'}
            </span>
            <span className="truncate">{a.centerText || 'Limited Mulberry Silk & Amethyst Drapes'}</span>
          </div>

          {/* Right tools: Currency Selector */}
          <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-stone-300">
              <Globe className="w-3.5 h-3.5 text-amethyst-soft" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none text-stone-200 uppercase font-semibold cursor-pointer focus:outline-none focus:ring-0 text-[11px] p-0"
                aria-label="Currency Selector"
              >
                {Object.keys(CURRENCIES).map((curr) => (
                  <option key={curr} value={curr} className="bg-primary text-white">
                    {curr} ({CURRENCIES[curr].symbol.trim()})
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amethyst-soft" />
              <span>{a.rightBadge || 'Worldwide Express'}</span>
            </div>
          </div>

        </div>
      </div>
    </EditableSection>
  );
}
