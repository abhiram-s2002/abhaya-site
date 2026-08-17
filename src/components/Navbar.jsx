import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    showToast
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

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

  const handleNavClick = (view, category = null) => {
    navigateTo(view, null, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md shadow-[0px_10px_40px_rgba(74,44,42,0.05)] transition-all duration-300">
        <div className="flex justify-between items-center px-mobile-margin md:px-content-margin py-4 md:py-6 max-w-container-max mx-auto relative">
          
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
            className="md:hidden text-primary focus:outline-none p-1.5 -ml-1 rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('shop')}
              className={`font-label-sm uppercase tracking-widest transition-colors duration-300 cursor-pointer active:opacity-70 ${
                currentView === 'shop'
                  ? 'text-primary border-b border-primary/40 pb-1 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Silk')}
              className="text-on-surface-variant font-label-sm uppercase tracking-widest hover:text-primary transition-colors duration-300 cursor-pointer active:opacity-70"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`font-label-sm uppercase tracking-widest transition-colors duration-300 cursor-pointer active:opacity-70 ${
                currentView === 'story'
                  ? 'text-primary border-b border-primary/40 pb-1 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-on-surface-variant font-label-sm uppercase tracking-widest hover:text-primary transition-colors duration-300 cursor-pointer active:opacity-70"
            >
              Contact
            </button>
          </nav>

          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 cursor-pointer focus:outline-none"
            aria-label="HAYAT Home"
          >
            <img
              alt="HAYAT Luxury Hijabs Logo"
              className="h-9 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAapIYIsBebio_HwgL_CAfE68Gl8pyxt_S_-AS04Tcd0a3GkM83EgHaP6u0KZa_MfR2SgSD9GjnamM7w_dBmR_6XJlIlBLrclkFmoZQMmaqyQO5J_QwKnOyWEcKFdadq4YsXDkjeN4XIuDiC5olEC9Gd3Cj_264lMqzXZhUm8JYfMZukazjSdp9kt9mnjgaOrDFF1OqXWUyDigU3wvsa7QV3ni3s9LyO3At1VGklfUZ8U7dLkTq7IiZpA"
            />
            <span className="sr-only">HAYAT</span>
          </button>

          {/* Trailing Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-primary">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:text-royal-violet transition-colors duration-300 cursor-pointer active:opacity-70 p-1"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            
            <button
              onClick={() => showToast('VIP Patron Portal: Logged in as VIP Member')}
              aria-label="Account"
              className="hidden md:block hover:text-royal-violet transition-colors duration-300 cursor-pointer active:opacity-70 p-1"
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="hover:text-royal-violet transition-colors duration-300 cursor-pointer active:opacity-70 p-1 relative"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-royal-violet text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-4/5 max-w-xs bg-surface-container-lowest h-full p-6 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
              <img
                alt="HAYAT Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAapIYIsBebio_HwgL_CAfE68Gl8pyxt_S_-AS04Tcd0a3GkM83EgHaP6u0KZa_MfR2SgSD9GjnamM7w_dBmR_6XJlIlBLrclkFmoZQMmaqyQO5J_QwKnOyWEcKFdadq4YsXDkjeN4XIuDiC5olEC9Gd3Cj_264lMqzXZhUm8JYfMZukazjSdp9kt9mnjgaOrDFF1OqXWUyDigU3wvsa7QV3ni3s9LyO3At1VGklfUZ8U7dLkTq7IiZpA"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-stone-600 hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 text-xs font-label-sm uppercase tracking-widest text-primary">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left py-2 hover:text-royal-violet border-b border-surface-container"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="text-left py-2 hover:text-royal-violet border-b border-surface-container"
              >
                Shop All
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Silk')}
                className="text-left py-2 hover:text-royal-violet border-b border-surface-container"
              >
                Everyday & Occasion Collections
              </button>
              <button
                onClick={() => handleNavClick('violet-edition')}
                className="text-left py-2 hover:text-royal-violet border-b border-surface-container text-royal-violet font-bold"
              >
                The Violet Edition Lookbook
              </button>
              <button
                onClick={() => handleNavClick('story')}
                className="text-left py-2 hover:text-royal-violet border-b border-surface-container"
              >
                Our Story & Atelier
              </button>
            </nav>

            <div className="pt-6 mt-auto border-t border-surface-container space-y-3">
              <p className="text-[11px] text-stone-500 font-light">
                Complimentary luxury keepsake gift box & free global tracked delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
