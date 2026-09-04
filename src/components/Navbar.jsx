import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Plus,
  Minus,
  ChevronDown,
  Sparkles,
  Star,
  Award,
  Crown,
  Gift,
  Phone,
  HelpCircle,
  Info,
  Check,
  User,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { openWhatsApp, WHATSAPP_PHONE_DISPLAY } from '../utils/whatsapp';
import brandLogo from '../assets/logo.png';
import { MAIN_CATEGORIES, ABAYA_STYLES, ABAYA_WORKS, WHOLESALE_TYPES, HIJAB_TYPES, SHAILA_TYPES, INNER_PRAYER_TYPES, KIDS_ABAYA_TYPES } from '../data/products';

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    cart,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    CURRENCIES,
    showToast,
    adminEnabled
  } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const shopMenuRef = useRef(null);
  const [openAccordions, setOpenAccordions] = useState({
    category: true,
    abayaStyle: false,
    abayaWork: false,
    shaila: false,
    hijab: false,
    innerPrayer: false,
    kidsAbaya: false,
    wholesale: false,
    help: false
  });
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyMenuRef = useRef(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Sync search input when opened and autofocus
  useEffect(() => {
    if (isSearchOpen) {
      setSearchTerm(searchQuery || '');
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  }, [isSearchOpen, searchQuery]);

  // Handle ESC key to close search & menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (shopDropdownOpen) setShopDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, shopDropdownOpen, setIsSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanTerm = searchTerm.trim();
    setSearchQuery(cleanTerm);
    setIsSearchOpen(false);
    navigateTo('shop', null, null, null, null, null, null, false, cleanTerm);
  };

  // Prevent background scrolling when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNav = (view, category = null, collectionsTab = null, color = null, style = null, work = null, wishlistOnly = false, search = null, subcategory = null, wholesaleType = null) => {
    console.log('[Navbar] handleNav triggered:', { view, category, collectionsTab, color, style, work, subcategory, wholesaleType });
    navigateTo(view, null, category, collectionsTab, color, style, work, wishlistOnly, search, subcategory, wholesaleType);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  const currentCurrencyData = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-[#7A0648]/95 backdrop-blur-md border-b border-white/20 transition-all duration-300 text-white font-semibold">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5 md:py-4 max-w-7xl mx-auto relative">
          
          {/* Left: Desktop Navigation Links + Mobile Menu Trigger */}
          <div className="flex items-center gap-4 lg:gap-8 z-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden text-white focus:outline-none p-1.5 -ml-1 hover:bg-white/10 transition-colors flex items-center group cursor-pointer"
            >
              <Menu className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.08em] uppercase">
              
              {/* Shop Mega Menu Dropdown */}
              <div 
                className="relative" 
                ref={shopMenuRef}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNav('shop')}
                  className={`transition-colors py-1 flex items-center gap-1 cursor-pointer ${
                    currentView === 'shop' ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
                  {currentView === 'shop' && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                  )}
                </button>

                {/* Mega Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[520px] animate-fade-in z-50">
                    <div className="bg-[#68043D] text-white shadow-2xl border border-white/20 p-5 grid grid-cols-2 gap-5">
                      
                      {/* Col 1: Categories */}
                      <div className="space-y-3">
                        <div className="text-[11px] uppercase tracking-wider text-[#FFD700] font-bold border-b border-white/15 pb-1">
                          Categories
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <button
                            onClick={() => handleNav('shop', 'Abaya')}
                            className="block w-full text-left py-1 text-white/90 hover:text-[#FFD700] hover:translate-x-1 transition-all cursor-pointer font-bold"
                          >
                            1. Abaya (Haute Couture)
                          </button>
                          <button
                            onClick={() => handleNav('shop', 'Shaila/Shawl')}
                            className="block w-full text-left py-1 text-white/90 hover:text-[#FFD700] hover:translate-x-1 transition-all cursor-pointer font-bold"
                          >
                            2. Shaila / Shawl
                          </button>
                          <button
                            onClick={() => handleNav('shop', 'Hijab')}
                            className="block w-full text-left py-1 text-white/90 hover:text-[#FFD700] hover:translate-x-1 transition-all cursor-pointer font-bold"
                          >
                            3. Hijab, Niqab & Gloves
                          </button>
                          <button
                            onClick={() => handleNav('shop', 'Inner & Prayer dress')}
                            className="block w-full text-left py-1 text-white/90 hover:text-[#FFD700] hover:translate-x-1 transition-all cursor-pointer font-bold"
                          >
                            4. Inner & Prayer Dress
                          </button>
                          <button
                            onClick={() => handleNav('shop', 'Kids abaya')}
                            className="block w-full text-left py-1 text-white/90 hover:text-[#FFD700] hover:translate-x-1 transition-all cursor-pointer font-bold"
                          >
                            5. Kids Abaya
                          </button>
                          <button
                            onClick={() => handleNav('shop', 'Wholesale')}
                            className="block w-full text-left py-1.5 px-2 bg-white/10 text-[#FFD700] hover:bg-white/20 transition-colors font-bold rounded-xs cursor-pointer"
                          >
                            6. Wholesale (B2B Bulk Hub) ★
                          </button>
                        </div>
                      </div>

                      {/* Col 2: Abaya Silhouettes & Craftsmanship Works */}
                      <div className="space-y-3 border-l border-white/15 pl-5">
                        <div className="text-[11px] uppercase tracking-wider text-[#FFD700] font-bold border-b border-white/15 pb-1">
                          Abaya Styles & Works
                        </div>
                        <div className="space-y-1 text-[11px] text-white/80">
                          <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Styles</div>
                          {ABAYA_STYLES.slice(0, 4).map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleNav('shop', 'Abaya', null, null, s.name)}
                              className="block w-full text-left py-0.5 hover:text-white transition-colors cursor-pointer"
                            >
                              • {s.name}
                            </button>
                          ))}
                          <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider pt-1.5">Artisan Works</div>
                          {ABAYA_WORKS.slice(0, 4).map(w => (
                            <button
                              key={w.id}
                              onClick={() => handleNav('shop', 'Abaya', null, null, null, w.name)}
                              className="block w-full text-left py-0.5 hover:text-white transition-colors cursor-pointer"
                            >
                              • {w.name}
                            </button>
                          ))}
                          <button
                            onClick={() => handleNav('shop', 'All')}
                            className="block w-full text-left pt-2 text-[#FFD700] font-bold hover:underline cursor-pointer text-xs"
                          >
                            Browse All Collections →
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('collections')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'collections' ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                }`}
              >
                Collections
                {currentView === 'collections' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>

              <button
                onClick={() => handleNav('story')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'story' ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                }`}
              >
                Our Story
                {currentView === 'story' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'contact' ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                }`}
              >
                Contact
                {currentView === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>
            </nav>
          </div>

          {/* Center: Brand Name */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center flex items-center group cursor-pointer z-20">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center focus:outline-none"
              aria-label="NOOR AL DHUHA - Home"
            >
              <span className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.18em] text-white uppercase whitespace-nowrap transition-transform duration-300 group-hover:scale-105 drop-shadow-xs">
                NOOR AL DHUHA
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5 text-white z-10 shrink-0">
            {/* Currency Selector (Desktop) */}
            <div className="relative hidden sm:block" ref={currencyMenuRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-white/40 hover:border-white text-[11px] font-medium text-white transition-colors cursor-pointer uppercase"
                aria-label="Select Currency & Market"
              >
                <span>{currentCurrencyData.flag}</span>
                <span className="font-semibold">{currency}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-[#68043D] text-white rounded-none shadow-2xl border border-white/20 py-1 z-50 animate-fade-in font-semibold">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-white/70 border-b border-white/15 mb-1">
                    Select Region & Currency
                  </div>
                  {Object.entries(CURRENCIES).map(([code, item]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                        showToast(`Region updated to ${item.name}`);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currency === code ? 'bg-white/20 font-bold text-white' : 'text-white/90 hover:bg-white/10 font-semibold'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.flag}</span>
                        <span className="font-semibold leading-tight">{item.name}</span>
                      </span>
                      {currency === code && <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" strokeWidth={1.5} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              className={`p-1.5 transition-colors cursor-pointer text-white ${
                isSearchOpen ? 'text-[#FFF0A0]' : 'hover:text-white/80'
              }`}
            >
              <Search className="w-4.5 h-4.5" strokeWidth={1.5} />
            </button>

            {/* Admin Portal Button */}
            {adminEnabled && (
              <button
                onClick={() => handleNav('admin')}
                aria-label="Admin Portal"
                title="Admin Portal"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-none border border-white/40 text-white hover:bg-white hover:text-[#7A0648] text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Admin</span>
              </button>
            )}
            
            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="text-white hover:text-white/80 transition-colors p-1.5 relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-white text-[#7A0648] text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold shadow-sm leading-none">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Top Search Bar Directly Under the Top Section */}
        {isSearchOpen && (
          <div className="w-full border-t border-white/20 bg-[#7A0648] animate-fade-in shadow-md">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4"
            >
              {/* Left Search Icon */}
              <button
                type="submit"
                aria-label="Search"
                className="text-white hover:opacity-70 transition-opacity p-0.5 cursor-pointer shrink-0"
              >
                <Search className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>

              {/* Search Input */}
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH FOR ABAYAS, HIJABS, SHAWLS, WHOLESALE..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/70 font-medium tracking-[0.08em] uppercase focus:outline-none"
                aria-label="Search abayas and collections"
              />

              {/* Clear button if text typed */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Clear input"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              )}

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-white hover:opacity-60 transition-opacity cursor-pointer shrink-0 ml-1"
                title="Close search"
                aria-label="Close search"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Backdrop below the fixed top header when search is open */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 animate-fade-in"
          onClick={() => setIsSearchOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ========================================================================= */}
      {/* FULL LUXURY NAVIGATION DRAWER (Logo Violet Edition) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-[85%] max-w-sm bg-[#68043D] text-white h-full shadow-2xl z-10 overflow-hidden animate-slide-in-left border-r border-white/20 font-semibold">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 bg-[#7A0648]">
              <button
                onClick={() => { handleNav('home'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2.5 text-left focus:outline-none"
                aria-label="Go to Home"
              >
                <img
                  src={brandLogo}
                  alt="NOOR AL DHUHA Logo"
                  className="h-9 w-auto object-contain brightness-200"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm sm:text-base tracking-[0.16em] font-semibold text-white leading-tight">
                    NOOR AL DHUHA
                  </span>
                  <span className="text-[7px] tracking-[0.28em] text-white/80 uppercase font-light">
                    DUBAI HAUTE COUTURE
                  </span>
                </div>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 divide-y divide-white/20 text-sm">
              
              {/* Accordion: SHOP BY CATEGORY */}
              <div className="pt-1 space-y-2">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#FFD700] pb-1">
                  Shop by Category
                </div>

                {/* 1. Abaya */}
                <div className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Abaya')}
                      className="text-xs uppercase tracking-wide font-bold text-white hover:text-[#FFD700] text-left"
                    >
                      1. Abaya
                    </button>
                    <button
                      onClick={() => toggleAccordion('abayaStyle')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Abaya Subcategories"
                    >
                      {openAccordions.abayaStyle ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>

                  {openAccordions.abayaStyle && (
                    <div className="mt-2 pl-3 space-y-3 border-l border-white/20 text-xs animate-fade-in">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider mb-1">By Category Style</div>
                        <div className="space-y-1">
                          {ABAYA_STYLES.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => handleNav('shop', 'Abaya', null, null, style.name)}
                              className="block w-full text-left py-0.5 text-white/85 hover:text-white text-[11px]"
                            >
                              • {style.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider mb-1">By Work</div>
                        <div className="space-y-1">
                          {ABAYA_WORKS.map((work) => (
                            <button
                              key={work.id}
                              onClick={() => handleNav('shop', 'Abaya', null, null, null, work.name)}
                              className="block w-full text-left py-0.5 text-white/85 hover:text-white text-[11px]"
                            >
                              • {work.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Shaila / Shawl */}
                <div className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Shaila/Shawl')}
                      className="text-xs uppercase tracking-wide font-bold text-white hover:text-[#FFD700] text-left py-1"
                    >
                      2. Shaila / Shawl
                    </button>
                    <button
                      onClick={() => toggleAccordion('shaila')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Shaila Subcategories"
                    >
                      {openAccordions.shaila ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>
                  {openAccordions.shaila && (
                    <div className="mt-1.5 pl-3 space-y-1 border-l border-white/20 text-xs animate-fade-in">
                      {SHAILA_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleNav('shop', 'Shaila/Shawl', null, null, null, null, false, null, type.name)}
                          className="block w-full text-left py-0.5 text-white/85 hover:text-[#FFD700] text-[11px]"
                        >
                          • {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Hijab */}
                <div className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Hijab')}
                      className="text-xs uppercase tracking-wide font-bold text-white hover:text-[#FFD700] text-left py-1"
                    >
                      3. Hijab (Niqab, Cap, Glove, etc.)
                    </button>
                    <button
                      onClick={() => toggleAccordion('hijab')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Hijab Subcategories"
                    >
                      {openAccordions.hijab ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>
                  {openAccordions.hijab && (
                    <div className="mt-1.5 pl-3 space-y-1 border-l border-white/20 text-xs animate-fade-in">
                      {HIJAB_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleNav('shop', 'Hijab', null, null, null, null, false, null, type.name)}
                          className="block w-full text-left py-0.5 text-white/85 hover:text-[#FFD700] text-[11px]"
                        >
                          • {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Inner and Prayer dress */}
                <div className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Inner & Prayer dress')}
                      className="text-xs uppercase tracking-wide font-bold text-white hover:text-[#FFD700] text-left py-1"
                    >
                      4. Inner & Prayer Dress
                    </button>
                    <button
                      onClick={() => toggleAccordion('innerPrayer')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Inner and Prayer Dress Subcategories"
                    >
                      {openAccordions.innerPrayer ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>
                  {openAccordions.innerPrayer && (
                    <div className="mt-1.5 pl-3 space-y-1 border-l border-white/20 text-xs animate-fade-in">
                      {INNER_PRAYER_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleNav('shop', 'Inner & Prayer dress', null, null, null, null, false, null, type.name)}
                          className="block w-full text-left py-0.5 text-white/85 hover:text-[#FFD700] text-[11px]"
                        >
                          • {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Kids Abaya */}
                <div className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Kids abaya')}
                      className="text-xs uppercase tracking-wide font-bold text-white hover:text-[#FFD700] text-left py-1"
                    >
                      5. Kids Abaya
                    </button>
                    <button
                      onClick={() => toggleAccordion('kidsAbaya')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Kids Abaya Subcategories"
                    >
                      {openAccordions.kidsAbaya ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>
                  {openAccordions.kidsAbaya && (
                    <div className="mt-1.5 pl-3 space-y-1 border-l border-white/20 text-xs animate-fade-in">
                      {KIDS_ABAYA_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleNav('shop', 'Kids abaya', null, null, null, null, false, null, type.name)}
                          className="block w-full text-left py-0.5 text-white/85 hover:text-[#FFD700] text-[11px]"
                        >
                          • {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. WHOLESALE */}
                <div className="pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNav('shop', 'Wholesale')}
                      className="text-xs uppercase tracking-wide font-bold text-[#FFD700] hover:underline text-left py-1"
                    >
                      6. WHOLESALE (B2B Bulk Hub) ★
                    </button>
                    <button
                      onClick={() => toggleAccordion('wholesale')}
                      className="p-1 hover:bg-white/10 rounded-xs"
                      aria-label="Toggle Wholesale Subcategories"
                    >
                      {openAccordions.wholesale ? (
                        <Minus className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>
                  </div>

                  {openAccordions.wholesale && (
                    <div className="mt-1.5 pl-3 space-y-1 border-l border-[#FFD700]/40 text-xs animate-fade-in">
                      {WHOLESALE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleNav('shop', 'Wholesale', null, null, null, null, false, null, null, type.name)}
                          className="block w-full text-left py-0.5 text-white/90 hover:text-[#FFD700] text-[11px]"
                        >
                          • Wholesale {type.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* OUR STORY */}
              <div className="pt-4">
                <button
                  onClick={() => handleNav('story')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors cursor-pointer"
                >
                  <span>Our Story</span>
                </button>
              </div>

              {/* HELP CENTER */}
              <div className="pt-4 pb-2">
                <button
                  onClick={() => toggleAccordion('help')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors"
                >
                  <span>Help Center & Concierge</span>
                  {openAccordions.help ? (
                    <Minus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.help && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-white/30 animate-fade-in text-xs text-white/85">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openWhatsApp('Salam / Hello! I would like to speak with the NOOR AL DHUHA Atelier concierge.');
                      }}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      WhatsApp Concierge ({WHATSAPP_PHONE_DISPLAY})
                    </button>
                    <button
                      onClick={() => handleNav('offers')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Atelier Privileges & Gifting
                    </button>
                    <button
                      onClick={() => handleNav('refund-policy')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Returns & Exchanges Policy
                    </button>
                    <button
                      onClick={() => handleNav('terms')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Terms of Service & Privacy
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Drawer Footer: Account & Currency Selector */}
            <div className="p-6 bg-[#580233] border-t border-white/20 space-y-4 text-white font-semibold">
              
              {/* Quick Links */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="hover:text-white/80 transition-colors flex items-center gap-1.5 py-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Catalog</span>
                </button>
                {adminEnabled && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="text-white font-bold hover:text-white/80 transition-colors flex items-center gap-1.5 py-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                )}
              </div>

              {/* Currency Selector */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                <div className="relative w-full">
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      showToast(`Region updated to ${CURRENCIES[e.target.value]?.name}`);
                    }}
                    className="w-full appearance-none bg-[#68043D] border border-white/30 rounded-none px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-white shadow-xs cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([code, item]) => (
                      <option key={code} value={code} className="bg-[#68043D] text-white font-semibold">
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="text-[10px] text-white/80 text-center font-light leading-snug">
                Complimentary luxury keepsake box & bespoke atelier craftsmanship.
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

