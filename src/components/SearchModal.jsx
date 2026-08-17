import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, PRODUCTS, navigateTo, formatPrice } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Prevent background scroll when search modal is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickTags = ['Silk', 'Midnight Espresso', 'Violet Edition', 'Modal Jersey', 'Chiffon', 'Georgette'];

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.colors.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', productId);
  };

  const handleQuickTagClick = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-3 sm:p-6 pt-4 sm:pt-20 z-10">
        <div className="bg-[#fff7fc] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-surface-container-highest animate-fade-in my-auto sm:my-0">
          
          {/* Search Header */}
          <div className="p-3.5 sm:p-5 border-b border-surface-container-high relative flex items-center gap-2.5 sm:gap-3">
            <Search className="w-5 h-5 text-royal-violet shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search silk, shade, or collection..."
              className="w-full bg-transparent text-sm sm:text-lg text-primary placeholder-stone-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-stone-400 hover:text-primary rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-stone-500 hover:text-primary rounded-full hover:bg-surface-container ml-1"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 sm:px-6 py-2.5 bg-surface-container-low/50 border-b border-surface-container-high/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 font-semibold shrink-0">
              Popular:
            </span>
            <div className="flex gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2.5 py-1 bg-white hover:bg-surface-container rounded-full text-[11px] sm:text-xs text-stone-700 hover:text-royal-violet border border-surface-container-highest transition-colors shrink-0 active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
            {searchTerm.trim() === '' ? (
              <div className="py-8 sm:py-12 text-center space-y-2 text-stone-400">
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-amethyst-soft stroke-[1.2]" />
                <p className="text-xs uppercase tracking-widest text-stone-500">
                  Search across our modest haute couture catalogue
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-10 sm:py-12 text-center space-y-2">
                <p className="font-serif text-base sm:text-lg text-primary">No results found for "{searchTerm}"</p>
                <p className="text-xs text-stone-500">Try searching for "Silk", "Espresso", or "Violet".</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold text-amethyst-soft uppercase tracking-wider mb-2">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Design Found' : 'Designs Found'}
                </div>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-white border border-transparent hover:border-surface-container-highest cursor-pointer transition-all active:scale-[0.99] group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-15 sm:w-14 sm:h-16 object-cover rounded-lg bg-stone-100 shrink-0 border border-surface-container-highest"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-royal-violet">
                        {p.category}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-medium text-primary group-hover:text-royal-violet transition-colors truncate">
                        {p.name}
                      </h4>
                      <span className="text-[11px] text-stone-500 line-clamp-1">{p.subtitle}</span>
                    </div>
                    <div className="text-right flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="font-serif text-xs sm:text-sm font-semibold text-primary">
                        {formatPrice(p.price)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 group-hover:text-royal-violet group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

