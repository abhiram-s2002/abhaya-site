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
    category: true,
    work: false,
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

  const handleNav = (view, category = null, collectionsTab = null, color = null, style = null, work = null) => {
    navigateTo(view, null, category, collectionsTab, color, style, work);
    setMobileMenuOpen(false);
  };

  const currentCurrencyData = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-all duration-300">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5 md:py-4 max-w-7xl mx-auto relative">
          
          {/* Left: Desktop Navigation Links (SHOP, COLLECTIONS, OUR STORY, CONTACT) + Mobile Menu Trigger */}
          <div className="flex items-center gap-4 lg:gap-8 z-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden text-[#1C1C1C] focus:outline-none p-1.5 -ml-1 hover:bg-[#F5F5F5] transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <Menu className="w-5 h-5 text-[#1C1C1C]" strokeWidth={1.5} />
              <span className="text-[11px] tracking-widest uppercase font-medium text-[#1C1C1C]">Menu</span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.08em] uppercase">
              <button
                onClick={() => handleNav('shop')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'shop' ? 'text-[#1C1C1C] font-semibold' : 'text-[#1C1C1C]/80 hover:text-[#000000]'
                }`}
              >
                Shop
                {currentView === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1C1C]" />
                )}
              </button>

              <button
                onClick={() => handleNav('collections')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'collections' ? 'text-[#1C1C1C] font-semibold' : 'text-[#1C1C1C]/80 hover:text-[#000000]'
                }`}
              >
                Collections
                {currentView === 'collections' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1C1C]" />
                )}
              </button>

              <button
                onClick={() => handleNav('story')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'story' ? 'text-[#1C1C1C] font-semibold' : 'text-[#1C1C1C]/80 hover:text-[#000000]'
                }`}
              >
                Our Story
                {currentView === 'story' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1C1C]" />
                )}
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentView === 'contact' ? 'text-[#1C1C1C] font-semibold' : 'text-[#1C1C1C]/80 hover:text-[#000000]'
                }`}
              >
                Contact
                {currentView === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1C1C]" />
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
              <span className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.18em] text-[#1C1C1C] uppercase whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                NOOR AL DHUHA
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5 text-[#1C1C1C] z-10 shrink-0">
            {/* Currency Selector (Desktop) */}
            <div className="relative hidden sm:block" ref={currencyMenuRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-[#E5E5E5] hover:border-[#1C1C1C] text-[11px] font-medium text-[#1C1C1C] transition-colors cursor-pointer uppercase"
                aria-label="Select Currency & Market"
              >
                <span>{currentCurrencyData.flag}</span>
                <span className="font-semibold">{currency}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-none shadow-lg border border-[#E5E5E5] py-1 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#707070] border-b border-[#E5E5E5] mb-1">
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
                        currency === code ? 'bg-[#F5EFE9] font-semibold text-[#1C1C1C]' : 'text-[#1C1C1C] hover:bg-[#F9F9F9]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.flag}</span>
                        <span className="font-medium leading-tight">{item.name}</span>
                      </span>
                      {currency === code && <Check className="w-3.5 h-3.5 text-[#1C1C1C] shrink-0" strokeWidth={1.5} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:text-[#707070] transition-colors p-1.5"
            >
              <Search className="w-4.5 h-4.5" strokeWidth={1.5} />
            </button>
            
            {/* VIP Member Icon */}
            <button
              onClick={() => showToast('VIP Patron Portal: Logged in as VIP Member')}
              aria-label="Account"
              className="hidden sm:block hover:text-[#707070] transition-colors p-1.5"
            >
              <User className="w-4.5 h-4.5" strokeWidth={1.5} />
            </button>

            {/* Admin Portal Button */}
            {adminEnabled && (
              <button
                onClick={() => handleNav('admin')}
                aria-label="Admin Portal"
                title="Admin Portal"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-none border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white text-[11px] font-semibold tracking-wider uppercase transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Admin</span>
              </button>
            )}
            
            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="hover:text-[#707070] transition-colors p-1.5 relative"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1C1C1C] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
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
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 divide-y divide-[#E5E5E5] text-sm">
              
              {/* Accordion 1: SHOP BY CATEGORY */}
              <div className="pt-1">
                <button
                  onClick={() => toggleAccordion('category')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Shop by Category</span>
                  {openAccordions.category ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.category && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in">
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Open abaya')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Open Abaya
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Closed cut')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Closed Cut
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Butterfly cut')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Butterfly / Farasha Cut
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Kimono & Kaftan')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Kimono & Kaftan
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, '2-Piece set')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      2-Piece Abaya Set
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, 'Batwing')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Batwing Silhouette
                    </button>
                    <button
                      onClick={() => handleNav('collections')}
                      className="block w-full text-left py-1 text-xs text-[#1C1C1C] font-semibold hover:text-[#707070] transition-colors uppercase tracking-wide"
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
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Shop by Work</span>
                  {openAccordions.work ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.work && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in">
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Handwork')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Handwork Embroidery
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Stonework')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Stonework & Crystal Detailing
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Embroidery')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Artisanal Thread Embroidery
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Cutwork')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Cutwork & French Seam
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Pearl detailing')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Pearl Detailing
                    </button>
                    <button
                      onClick={() => handleNav('shop', null, null, null, null, 'Plain / Minimal')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Minimalist Plain Atelier
                    </button>
                    <button
                      onClick={() => handleNav('collections')}
                      className="block w-full text-left py-1 text-xs text-[#1C1C1C] font-semibold hover:text-[#707070] transition-colors uppercase tracking-wide"
                    >
                      View All Work Styles
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 2: SHOP BY FABRIC */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Shop By Fabric</span>
                  {openAccordions.fabric ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.fabric && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in">
                    <button
                      onClick={() => handleNav('collections', null, 'fabric')}
                      className="block w-full text-left py-1 text-xs text-[#1C1C1C] font-semibold hover:text-[#707070] transition-colors uppercase tracking-wide"
                    >
                      View All Fabrics In One Page
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Silk')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Pure Mulberry Silk (19 Momme • Grade 6A)
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Georgette')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Japanese Pebble Georgette
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Chiffon')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Airy Microfiber Chiffon
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Modal Jersey')}
                      className="block w-full text-left py-1 text-xs text-[#707070] hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Austrian TENCEL™ Modal Jersey
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 3: SHOP BY COLOR */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('color')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Shop By Color</span>
                  {openAccordions.color ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.color && (
                  <div className="mt-3 pl-3 grid grid-cols-2 gap-2 border-l border-[#E5E5E5] animate-fade-in">
                    {[
                      { name: 'Espresso', label: 'Midnight Espresso' },
                      { name: 'Violet', label: 'Royal Violet' },
                      { name: 'Amethyst', label: 'Amethyst Mist' },
                      { name: 'Lavender', label: 'Lavender Pastel' },
                      { name: 'Rose', label: 'Dusty Rose' },
                      { name: 'Sage', label: 'Serene Sage' },
                      { name: 'Ivory', label: 'Ivory Pearl' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleNav('collections', null, 'color', c.name)}
                        className="py-1 text-left hover:text-[#1C1C1C] text-[#707070] transition-colors uppercase tracking-wide text-xs"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: ESSENTIALS */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('essentials')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Essentials</span>
                  {openAccordions.essentials ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.essentials && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in text-xs text-[#707070]">
                    <button
                      onClick={() => handleNav('shop', '2-piece')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Tailored Inner Slip Dresses
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Chiffon')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Matching Silk & Chiffon Shayla Sets
                    </button>
                    <button
                      onClick={() => handleNav('shop', 'Modal Jersey')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      No-Slip Modal Undercaps
                    </button>
                    <button
                      onClick={() => showToast('Complimentary luxury keepsake box included with every order.')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Bespoke Magnetic Gift Boxes
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion: OUR STORY & ATELIER */}
              <div className="pt-4">
                <button
                  onClick={() => toggleAccordion('about')}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Our Story & Atelier</span>
                  {openAccordions.about ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.about && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in text-xs text-[#707070]">
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Our Story & Dubai Atelier
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Mulberry Silk Certification & Ethics
                    </button>
                    <button
                      onClick={() => handleNav('story')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
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
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1C1C] py-1 hover:text-[#707070] transition-colors"
                >
                  <span>Help Center</span>
                  {openAccordions.help ? (
                    <Minus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-[#707070]" strokeWidth={1.5} />
                  )}
                </button>

                {openAccordions.help && (
                  <div className="mt-2.5 pl-3 space-y-2 border-l border-[#E5E5E5] animate-fade-in text-xs text-[#707070]">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openWhatsApp('Salam / Hello! I would like to speak with the NOOR AL DHUHA Atelier concierge.');
                      }}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      WhatsApp Concierge ({WHATSAPP_PHONE_DISPLAY})
                    </button>
                    <button
                      onClick={() => handleNav('offers')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Atelier Privileges & Gifting
                    </button>
                    <button
                      onClick={() => handleNav('refund-policy')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Returns & Exchanges Policy
                    </button>
                    <button
                      onClick={() => handleNav('terms')}
                      className="block w-full text-left py-1 hover:text-[#1C1C1C] transition-colors uppercase tracking-wide"
                    >
                      Terms of Service & Privacy
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

