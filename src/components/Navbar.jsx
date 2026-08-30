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
  const [openAccordions, setOpenAccordions] = useState({
    category: true,
    work: false,
    about: false,
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

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

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

  const handleNav = (view, category = null, collectionsTab = null, color = null, style = null, work = null) => {
    navigateTo(view, null, category, collectionsTab, color, style, work);
    setMobileMenuOpen(false);
  };

  const currentCurrencyData = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-[#D975BD]/95 backdrop-blur-md border-b border-white/20 transition-all duration-300 text-white">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5 md:py-4 max-w-7xl mx-auto relative">
          
          {/* Left: Desktop Navigation Links (SHOP, COLLECTIONS, OUR STORY, CONTACT) + Mobile Menu Trigger */}
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
              <button
                onClick={() => handleNav('shop')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'shop' ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
                }`}
              >
                Shop
                {currentView === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>

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
                <div className="absolute right-0 mt-1.5 w-44 bg-[#2D143D] text-white rounded-none shadow-2xl border border-white/20 py-1 z-50 animate-fade-in">
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
                        currency === code ? 'bg-white/20 font-semibold text-white' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.flag}</span>
                        <span className="font-medium leading-tight">{item.name}</span>
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
            
            {/* VIP Member Icon */}
            <button
              onClick={() => showToast('VIP Patron Portal: Logged in as VIP Member')}
              aria-label="Account"
              className="hidden sm:block text-white hover:text-white/80 transition-colors p-1.5 cursor-pointer"
            >
              <User className="w-4.5 h-4.5" strokeWidth={1.5} />
            </button>

            {/* Admin Portal Button */}
            {adminEnabled && (
              <button
                onClick={() => handleNav('admin')}
                aria-label="Admin Portal"
                title="Admin Portal"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-none border border-white/40 text-white hover:bg-white hover:text-[#2D143D] text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
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
                <span className="absolute -top-0.5 -right-0.5 bg-[#2D143D] text-white border border-white/30 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Top Search Bar Directly Under the Top Section */}
        {isSearchOpen && (
          <div className="w-full border-t border-white/20 bg-[#D975BD] animate-fade-in shadow-md">
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
                placeholder="SEARCH FOR..."
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
          <div className="relative flex flex-col w-[85%] max-w-sm bg-[#C85DA9] text-white h-full shadow-2xl z-10 overflow-hidden animate-slide-in-left border-r border-white/20">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 bg-[#C85DA9]">
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
                className="p-2 rounded-full text-white hover:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 divide-y divide-white/20 text-sm">
              
              {/* Accordion 1: SHOP BY CATEGORY */}
              <div className="pt-1">
                <button
                  onClick={() => toggleAccordion('category')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors"
                >
                  <span>Shop by Category</span>
                  {openAccordions.category ? (
                    <Minus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.category && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-white/30 animate-fade-in">
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Open abaya')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Open Abaya
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Closed cut')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Closed Cut
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Butterfly cut')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Butterfly / Farasha Cut
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Kimono & Kaftan')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Kimono & Kaftan
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, '2-Piece set')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      2-Piece Abaya Set
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Batwing')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Batwing Silhouette
                    </button>
                    <button
                      onClick={() => handleNav('collections')}
                      className="block w-full text-left py-1 text-xs text-white font-bold hover:text-white/80 transition-colors uppercase tracking-wide"
                    >
                      View All Categories
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 2: SHOP BY WORK */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('work')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors"
                >
                  <span>Shop by Work</span>
                  {openAccordions.work ? (
                    <Minus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.work && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-white/30 animate-fade-in">
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Handwork')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Handwork Embroidery
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Stonework')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Stonework & Crystal Detailing
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Embroidery')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Artisanal Thread Embroidery
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Cutwork')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Cutwork & French Seam
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Pearl detailing')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Pearl Detailing
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Plain / Minimal')}
                      className="block w-full text-left py-1 text-xs text-white/85 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Minimalist Plain Atelier
                    </button>
                    <button
                      onClick={() => handleNav('collections')}
                      className="block w-full text-left py-1 text-xs text-white font-bold hover:text-white/80 transition-colors uppercase tracking-wide"
                    >
                      View All Work Styles
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion: OUR STORY & ATELIER */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('about')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors"
                >
                  <span>Our Story & Atelier</span>
                  {openAccordions.about ? (
                    <Minus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-white" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.about && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-white/30 animate-fade-in text-xs text-white/85">
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Our Story & Dubai Atelier
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Mulberry Silk Certification & Ethics
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-white transition-colors uppercase tracking-wide"
                    >
                      Master Artisans & Handwork Heritage
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 7: HELP CENTER */}
              <div className="pt-4 pb-2">
                <button
                  onClick={() => toggleAccordion('help')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white py-1 hover:text-white/80 transition-colors"
                >
                  <span>Help Center</span>
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
            <div className="p-6 bg-[#B84E99] border-t border-white/20 space-y-4 text-white">
              
              {/* Account Links */}
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white">
                <button
                  onClick={() => showToast('VIP Patron Portal Login')}
                  className="hover:text-white/80 transition-colors"
                >
                  Log In
                </button>
                <span className="text-white/40">|</span>
                <button
                  onClick={() => showToast('VIP Registration opened')}
                  className="hover:text-white/80 transition-colors"
                >
                  Create Account
                </button>
                <span className="text-white/40">|</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="hover:text-white/80 transition-colors flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
                <span className="text-white/40">|</span>
                {adminEnabled && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="text-white font-semibold hover:text-white/80 transition-colors flex items-center gap-1"
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
                    className="w-full appearance-none bg-[#C85DA9] border border-white/30 rounded-none px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-white shadow-xs cursor-pointer"
                  >
                    {Object.entries(CURRENCIES).map(([code, item]) => (
                      <option key={code} value={code} className="bg-[#2D143D] text-white">
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="text-[10px] text-white/80 text-center font-light leading-snug">
                Complimentary luxury keepsake box & free worldwide tracked delivery.
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

