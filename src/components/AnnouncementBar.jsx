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
      <div className="bg-[#68043D] text-white text-[10px] sm:text-[11px] py-2 px-3 sm:px-4 border-b border-white/20 tracking-[0.06em] uppercase transition-colors font-semibold">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">

          {/* Left perk */}
          <div className="hidden md:flex items-center gap-2 text-white font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" strokeWidth={1.5} />
            <span>{a.leftText || 'Worldwide Express Delivery to Your Doorstep'}</span>
          </div>

          {/* Center message */}
          <div className="flex items-center gap-1.5 text-center text-white mx-auto md:mx-0 truncate font-semibold">
            <span className="font-bold tracking-wider text-[#FFF0A0] shrink-0">
              {a.centerBadge || 'NEW ARRIVALS:'}
            </span>
            <span className="truncate font-medium text-white">{a.centerText || 'Discover The Minimalist Abaya Collection'}</span>
          </div>

          {/* Right tools: Country Location & Currency Selector */}
          <div className="hidden sm:flex items-center gap-3.5 text-[11px] shrink-0 text-white font-semibold">
            {/* Country indicator */}
            {userLocation?.country && (
              <div 
                className="flex items-center gap-1.5 text-white border-r border-white/20 pr-3.5 font-semibold"
                title={`Detected Location: ${userLocation.city ? userLocation.city + ', ' : ''}${userLocation.country}`}
              >
                <span className="text-sm leading-none">{userLocation.flag || '🌐'}</span>
                <span className="text-white font-semibold text-[11px] max-w-[100px] truncate">
                  {userLocation.countryCode === 'IN' ? 'India' : userLocation.country}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-white">
              <Globe className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none text-white uppercase font-bold cursor-pointer focus:outline-none focus:ring-0 text-[11px] p-0"
                aria-label="Currency Selector"
              >
                {Object.entries(CURRENCIES).map(([code, item]) => (
                  <option key={code} value={code} className="bg-[#68043D] text-white font-semibold">
                    {item.flag} {code} ({item.symbol.trim()})
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-white/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" strokeWidth={1.5} />
              <span>{a.rightBadge || 'Bespoke Atelier'}</span>
            </div>
          </div>

        </div>
      </div>
    </EditableSection>
  );
}
