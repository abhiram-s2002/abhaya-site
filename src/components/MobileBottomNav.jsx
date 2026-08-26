import React from 'react';
import { Home, Compass, Search, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const {
    currentView,
    navigateTo,
    cart,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#fff7fc]/95 backdrop-blur-xl border-t border-surface-container-high/80 shadow-[0_-4px_25px_rgba(33,17,38,0.08)] pb-safe">
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto items-center px-2">
        
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
            currentView === 'home' ? 'text-primary font-bold' : 'text-stone-500 hover:text-primary'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className="text-[10px] tracking-wider uppercase font-medium">Home</span>
          {currentView === 'home' && (
            <span className="absolute top-1 right-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-royal-violet" />
          )}
        </button>

        {/* Collections & Shop Explore */}
        <button
          onClick={() => navigateTo('collections', null, 'fabric')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
            currentView === 'collections' || currentView === 'shop' || currentView === 'violet-edition'
              ? 'text-primary font-bold'
              : 'text-stone-500 hover:text-primary'
          }`}
          aria-label="Explore Collections"
        >
          <Compass
            className={`w-5 h-5 ${
              currentView === 'collections' || currentView === 'shop' ? 'stroke-[2.2]' : 'stroke-[1.6]'
            }`}
          />
          <span className="text-[10px] tracking-wider uppercase font-medium">Explore</span>
          {(currentView === 'collections' || currentView === 'shop' || currentView === 'violet-edition') && (
            <span className="absolute top-1 right-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-royal-violet" />
          )}
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-stone-500 hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 stroke-[1.6]" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Search</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-stone-500 hover:text-primary transition-colors relative"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse-glow">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium">Bag</span>
        </button>

      </div>
    </div>
  );
}
