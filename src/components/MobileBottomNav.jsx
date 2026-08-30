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
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#D975BD] border-t border-white/20 shadow-lg pb-safe text-white">
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto items-center px-2">
        
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
            currentView === 'home' ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" strokeWidth={currentView === 'home' ? 1.8 : 1.4} />
          <span className="text-[10px] tracking-wider uppercase font-medium">Home</span>
          {currentView === 'home' && (
            <span className="absolute top-1 right-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </button>

        {/* Collections & Shop Explore */}
        <button
          onClick={() => navigateTo('collections')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
            currentView === 'collections' || currentView === 'shop' || currentView === 'violet-edition'
              ? 'text-white font-semibold'
              : 'text-white/70 hover:text-white'
          }`}
          aria-label="Explore Collections"
        >
          <Compass
            className="w-5 h-5"
            strokeWidth={currentView === 'collections' || currentView === 'shop' ? 1.8 : 1.4}
          />
          <span className="text-[10px] tracking-wider uppercase font-medium">Explore</span>
          {(currentView === 'collections' || currentView === 'shop' || currentView === 'violet-edition') && (
            <span className="absolute top-1 right-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-white/70 hover:text-white transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" strokeWidth={1.4} />
          <span className="text-[10px] tracking-wider uppercase font-medium">Search</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-white/70 hover:text-white transition-colors relative"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.4} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-[#C85DA9] text-[10px] min-w-[16px] h-[16px] px-0.5 rounded-full flex items-center justify-center font-bold shadow-xs leading-none">
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
