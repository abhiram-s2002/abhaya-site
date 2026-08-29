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

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    CURRENCIES,
    showToast,
    adminEnabled
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({
    collection: true,
    fabric: false,
    color: false,
    essentials: false,
    about: false,
    help: false
  });
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyMenuRef = useRef(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
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

  const handleNav = (view, category = null, collectionsTab = null, color = null) => {
    navigateTo(view, null, category, collectionsTab, color);
    setMobileMenuOpen(false);
  };

  const currentCurrencyData = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#fff7fc]/95 backdrop-blur-md border-b border-[#ebdcd0]/60 shadow-[0px_4px_25px_rgba(74,44,42,0.04)] transition-all duration-300">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5 md:py-4.5 max-w-7xl mx-auto relative">
          
          {/* Left: Desktop Navigation Links (SHOP, COLLECTIONS, OUR STORY, CONTACT) + Mobile Menu Trigger */}
          <div className="flex items-center gap-4 lg:gap-8 z-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden text-primary focus:outline-none p-1.5 -ml-1 rounded-lg hover:bg-stone-100/80 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <Menu className="w-5 h-5 text-primary group-hover:scale-105 transition-transform" />
              <span className="text-xs tracking-wider uppercase font-semibold text-primary">Menu</span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase">
              <button
                onClick={() => handleNav('shop')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'shop' ? 'text-royal-violet font-black' : 'text-primary/90 hover:text-royal-violet'
                }`}
              >
                Shop
                {currentView === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal-violet rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleNav('collections')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'collections' ? 'text-royal-violet font-black' : 'text-primary/90 hover:text-royal-violet'
                }`}
              >
                Collections
                {currentView === 'collections' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal-violet rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleNav('story')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'story' ? 'text-royal-violet font-black' : 'text-primary/90 hover:text-royal-violet'
                }`}
              >
                Our Story
                {currentView === 'story' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal-violet rounded-full" />
                )}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'contact' ? 'text-royal-violet font-black' : 'text-primary/90 hover:text-royal-violet'
                }`}
              >
                Contact
                {currentView === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-royal-violet rounded-full" />
                )}
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo & Name */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center flex items-center group cursor-pointer z-20">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 sm:gap-2.5 focus:outline-none"
              aria-label="NOOR AL DHUHA - Home"
            >
              <img
                src={brandLogo}
                alt="NOOR AL DHUHA Logo"
                className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-[0.14em] text-primary uppercase whitespace-nowrap">
                NOOR AL DHUHA
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-primary z-10 shrink-0">
            {/* Currency Selector (Desktop) */}
            <div className="relative hidden sm:block" ref={currencyMenuRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100/80 hover:bg-stone-200/80 text-xs font-medium text-stone-700 transition-colors cursor-pointer"
                aria-label="Select Currency & Market"
              >
                <span>{currentCurrencyData.flag}</span>
                <span className="font-semibold">{currency}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-stone-400 border-b border-stone-100 mb-1">
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
                        currency === code ? 'bg-stone-100 font-bold text-primary' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-medium text-stone-900 leading-tight">{item.name}</span>
                        </div>
                      </span>
                      {currency === code && <Check className="w-3.5 h-3.5 text-royal-violet shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:text-royal-violet transition-colors p-1 rounded-full hover:bg-stone-100"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            
            {/* VIP Member Icon */}
            <button
              onClick={() => showToast('VIP Patron Portal: Logged in as VIP Member')}
              aria-label="Account"
              className="hidden sm:block hover:text-royal-violet transition-colors p-1 rounded-full hover:bg-stone-100"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Admin Portal Button */}
            {adminEnabled && (
              <button
                onClick={() => handleNav('admin')}
                aria-label="Admin Portal"
                title="Admin Portal"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-royal-violet/10 hover:bg-royal-violet/20 border border-royal-violet/20 text-royal-violet text-[11px] font-semibold transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
            
            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="hover:text-royal-violet transition-colors p-1 rounded-full hover:bg-stone-100 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-royal-violet text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs animate-scale-in">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* FULL LUXURY NAVIGATION DRAWER (Exact CasBasics & Luxury Boutique Layout) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-[85%] max-w-sm bg-[#fcfaf7] h-full shadow-2xl z-10 overflow-hidden animate-slide-in-left">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200/80 bg-white">
              <button
                onClick={() => { handleNav('home'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2.5 text-left focus:outline-none"
                aria-label="Go to Home"
              >
                <img
                  src={brandLogo}
                  alt="NOOR AL DHUHA Logo"
                  className="h-9 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm sm:text-base tracking-[0.16em] font-semibold text-[#2E1C1A] leading-tight">
                    NOOR AL DHUHA
                  </span>
                  <span className="text-[7px] tracking-[0.28em] text-stone-500 uppercase font-light">
                    DUBAI HAUTE COUTURE
                  </span>
                </div>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 divide-y divide-stone-200/70 text-sm">
              
              {/* Accordion 1: SHOP BY COLLECTION */}
              <div className="pt-1">
                <button
                  onClick={() => toggleAccordion('collection')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span>Shop By Collection</span>
                  {openAccordions.collection ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.collection && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l-2 border-stone-200 animate-fade-in">
                    <button
                      onClick={() => handleNav('collections', null, 'collection')}
                      className="block w-full text-left py-1 text-xs text-stone-600 hover:text-royal-violet hover:translate-x-1 transition-all font-medium"
                    >
                      ✦ Explore All Collections Hub
                    </button>
                    <button
                      onClick={() => handleNav('violet-edition')}
                      className="block w-full text-left py-1 text-xs text-royal-violet font-semibold hover:translate-x-1 transition-all"
                    >
                      • The Violet Edition Lookbook
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Modal Jersey')}
                      className="block w-full text-left py-1 text-xs text-stone-600 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Everyday Abaya Essentials
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'bridal')}
                      className="block w-full text-left py-1 text-xs text-stone-600 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Occasion & Bridal Atelier
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Silk')}
                      className="block w-full text-left py-1 text-xs text-stone-600 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Pure Mulberry Silk Edit
                    </button>
                    <button
                      onClick={() => handleNav('shop')}
                      className="block w-full text-left py-1 text-xs text-stone-600 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Signature Silhouette Cuts (Farashas & Kimonos)
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 2: SHOP BY FABRIC (Key CasBasics Feature) */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Shop By Fabric</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-accent"></span>
                  </span>
                  {openAccordions.fabric ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.fabric && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l-2 border-stone-200 animate-fade-in">
                    <button
                      onClick={() => handleNav('collections', null, 'fabric')}
                      className="block w-full text-left py-1 text-xs text-royal-violet font-semibold hover:translate-x-1 transition-all"
                    >
                      ✦ View All Fabrics In One Page
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Silk')}
                      className="block w-full text-left py-1 text-xs text-stone-700 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Pure Mulberry Silk (19 Momme • Grade 6A)
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Georgette')}
                      className="block w-full text-left py-1 text-xs text-stone-700 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Japanese Pebble Georgette
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Chiffon')}
                      className="block w-full text-left py-1 text-xs text-stone-700 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Airy Microfiber Chiffon
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Modal Jersey')}
                      className="block w-full text-left py-1 text-xs text-stone-700 hover:text-royal-violet hover:translate-x-1 transition-all"
                    >
                      • Austrian TENCEL™ Modal Jersey
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 3: SHOP BY COLOR */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('color')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span>Shop By Color</span>
                  {openAccordions.color ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.color && (
                  <div className="mt-3 pl-2 grid grid-cols-2 gap-2 animate-fade-in">
                    {[
                      { name: 'Espresso', hex: '#2E1C1A', label: 'Midnight Espresso' },
                      { name: 'Violet', hex: '#982476', label: 'Royal Violet' },
                      { name: 'Amethyst', hex: '#C76AA9', label: 'Amethyst Mist' },
                      { name: 'Lavender', hex: '#D4C5DD', label: 'Lavender Pastel' },
                      { name: 'Rose', hex: '#C49A99', label: 'Dusty Rose' },
                      { name: 'Sage', hex: '#7D8B79', label: 'Serene Sage' },
                      { name: 'Ivory', hex: '#FBF6EE', label: 'Ivory Pearl' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleNav('collections', null, 'color', c.name)}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-stone-200/60 text-left transition-colors"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[11px] text-stone-700 font-medium truncate">
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: ESSENTIALS */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('essentials')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span>Essentials</span>
                  {openAccordions.essentials ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.essentials && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l-2 border-stone-200 animate-fade-in text-xs text-stone-600">
                    <button
                      onClick={() => handleNav('shop', '2-piece')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Tailored Inner Slip Dresses
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Chiffon')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Matching Silk & Chiffon Shayla Sets
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Modal Jersey')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • No-Slip Modal Undercaps
                    </button>
                    <button
                      onClick={() => showToast('Complimentary luxury keepsake box included with every order.')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Bespoke Magnetic Gift Boxes
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion: OUR STORY & ATELIER */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('about')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span>Our Story & Atelier</span>
                  {openAccordions.about ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.about && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l-2 border-stone-200 animate-fade-in text-xs text-stone-600">
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Our Story & Dubai Atelier
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Mulberry Silk Certification & Ethics
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Master Artisans & Handwork Heritage
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 7: HELP CENTER */}
              <div className="pt-4 pb-2">
                <button
                  onClick={() => toggleAccordion('help')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-bold text-stone-900 py-1 hover:text-royal-violet transition-colors"
                >
                  <span>Help Center</span>
                  {openAccordions.help ? (
                    <Minus className="w-4 h-4 text-stone-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {openAccordions.help && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l-2 border-stone-200 animate-fade-in text-xs text-stone-600">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openWhatsApp('Salam / Hello! I would like to speak with the NOOR AL DHUHA Atelier concierge.');
                      }}
                      className="block w-full text-left py-1 text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
                    >
                      💬 WhatsApp Concierge ({WHATSAPP_PHONE_DISPLAY})
                    </button>
                    <button
                      onClick={() => handleNav('offers')}
                      className="block w-full text-left py-1 text-royal-violet font-medium hover:underline transition-colors"
                    >
                      ✦ Atelier Privileges & Gifting
                    </button>
                    <button
                      onClick={() => handleNav('refund-policy')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Returns & Exchanges Policy
                    </button>
                    <button
                      onClick={() => handleNav('terms')}
                      className="block w-full text-left py-1 hover:text-royal-violet transition-colors"
                    >
                      • Terms of Service & Privacy
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Drawer Footer: Account & Currency Selector (Exact Screenshot Style) */}
            <div className="p-6 bg-stone-100/90 border-t border-stone-200/80 space-y-4">
              
              {/* Account Links */}
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-800">
                <button
                  onClick={() => showToast('VIP Patron Portal Login')}
                  className="hover:text-royal-violet transition-colors"
                >
                  Log In
                </button>
                <span className="text-stone-300">|</span>
                <button
                  onClick={() => showToast('VIP Registration opened')}
                  className="hover:text-royal-violet transition-colors"
                >
                  Create Account
                </button>
                <span className="text-stone-300">|</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="hover:text-royal-violet transition-colors flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
                <span className="text-stone-300">|</span>
                {adminEnabled && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="text-royal-violet font-semibold hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                )}
              </div>

              {/* Currency Selector (Matches screenshot: [Flag] INR v) */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <div className="relative w-full">
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      showToast(`Region updated to ${CURRENCIES[e.target.value]?.name}`);
                    }}
                    className="w-full appearance-none bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:border-stone-500 shadow-xs cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([code, item]) => (
                      <option key={code} value={code}>
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="text-[10px] text-stone-500 text-center font-light leading-snug">
                Complimentary luxury keepsake box & free worldwide tracked delivery.
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

