import React from 'react';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from './cms/EditableSection';

export default function AnnouncementBar() {
  const { currency, setCurrency, CURRENCIES, siteContent, userLocation } = useShop();
  const a = siteContent?.announcement || {};

  // If admin disabled the bar entirely, hide it
  if (a.enabled === false) return null;

  return (
    <EditableSection cmsKey="announcement" label="Announcement Bar">
      <div className="bg-[#E4D9CE] text-[#1C1C1C] text-[10px] sm:text-[11px] py-2 px-3 sm:px-4 border-b border-[#C2B8AF] tracking-[0.06em] uppercase transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">

          {/* Left perk */}
          <div className="hidden md:flex items-center gap-2 text-[#1C1C1C] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#1C1C1C]" strokeWidth={1.5} />
            <span>{a.leftText || 'Free Worldwide Express Shipping On Orders Over $150'}</span>
          </div>

          {/* Center message */}
          <div className="flex items-center gap-1.5 text-center text-[#1C1C1C] mx-auto md:mx-0 truncate">
            <span className="font-semibold tracking-wider text-[#1C1C1C] shrink-0">
              {a.centerBadge || 'NEW ARRIVALS:'}
            </span>
            <span className="truncate font-normal">{a.centerText || 'Discover The Minimalist Abaya Collection'}</span>
          </div>

          {/* Right tools: Country Location & Currency Selector */}
          <div className="hidden sm:flex items-center gap-3.5 text-[11px] shrink-0">
            {/* Country indicator */}
            {userLocation?.country && (
              <div 
                className="flex items-center gap-1.5 text-[#1C1C1C] border-r border-[#C2B8AF] pr-3.5 font-medium"
                title={`Detected Location: ${userLocation.city ? userLocation.city + ', ' : ''}${userLocation.country}`}
              >
                <span className="text-sm leading-none">{userLocation.flag || '🌐'}</span>
                <span className="text-[#1C1C1C] font-medium text-[11px] max-w-[100px] truncate">
                  {userLocation.countryCode === 'IN' ? 'India' : userLocation.country}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[#1C1C1C]">
              <Globe className="w-3.5 h-3.5 text-[#1C1C1C]" strokeWidth={1.5} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none text-[#1C1C1C] uppercase font-semibold cursor-pointer focus:outline-none focus:ring-0 text-[11px] p-0"
                aria-label="Currency Selector"
              >
                {Object.entries(CURRENCIES).map(([code, item]) => (
                  <option key={code} value={code} className="bg-[#1C1C1C] text-white font-medium">
                    {item.flag} {code} ({item.symbol.trim()})
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[#1C1C1C] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1C1C1C]" strokeWidth={1.5} />
              <span>{a.rightBadge || 'Bespoke Atelier'}</span>
            </div>
          </div>

        </div>
      </div>
    </EditableSection>
  );
}
