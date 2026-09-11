import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function FloatingRegionSelector() {
  const {
    currency,
    setCurrency,
    CURRENCIES,
    userLocation,
    isLocationLoading,
    currentView,
    showToast,
  } = useShop();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const current = CURRENCIES[currency] || CURRENCIES.INR;

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  if (currentView === 'admin') return null;

  return (
    <div
      ref={menuRef}
      className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[60]"
      role="navigation"
      aria-label="Region and currency selector"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#68043D] text-white border border-white/25 shadow-lg hover:shadow-xl hover:bg-[#7A0648] transition-all cursor-pointer"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-bold uppercase tracking-wide">{currency}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-[#68043D] text-white rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50 animate-fade-in overflow-hidden">
          <div className="px-3.5 py-2 border-b border-white/15">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-white/70">
              <Globe className="w-3 h-3" strokeWidth={2} />
              <span>Select Market</span>
            </div>
            {!isLocationLoading && userLocation?.country && (
              <p className="text-[10px] text-white/60 mt-1 font-medium">
                Detected: {userLocation.flag} {userLocation.country}
              </p>
            )}
          </div>

          {Object.entries(CURRENCIES).map(([code, item]) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={currency === code}
              onClick={() => {
                setCurrency(code);
                setOpen(false);
                showToast(`Region updated to ${item.name}`);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                currency === code
                  ? 'bg-white/20 font-bold text-white'
                  : 'text-white/90 hover:bg-white/10 font-semibold'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{item.flag}</span>
                <span className="leading-tight">{item.name}</span>
              </span>
              {currency === code && (
                <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
