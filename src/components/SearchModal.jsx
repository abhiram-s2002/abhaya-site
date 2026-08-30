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
        <div className="bg-white rounded-none max-w-2xl w-full shadow-2xl overflow-hidden border border-[#E5E5E5] animate-fade-in my-auto sm:my-0">
          
          {/* Search Header */}
          <div className="p-3.5 sm:p-5 border-b border-[#E5E5E5] relative flex items-center gap-2.5 sm:gap-3 bg-white">
            <Search className="w-5 h-5 text-[#1C1C1C] shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search abayas, silks, shades, or collections..."
              className="w-full bg-transparent text-sm sm:text-base text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none uppercase tracking-wide"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-[#8E8E8E] hover:text-[#1C1C1C]"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#707070] hover:text-[#1C1C1C] ml-1"
              aria-label="Close search"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#FAFAFA] border-b border-[#E5E5E5] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#707070] font-medium shrink-0">
              Popular:
            </span>
            <div className="flex gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2.5 py-1 bg-white hover:bg-[#1C1C1C] hover:text-white rounded-none text-[11px] uppercase tracking-wider text-[#1C1C1C] border border-[#E5E5E5] transition-colors shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-white">
            {searchTerm.trim() === '' ? (
              <div className="py-8 sm:py-12 text-center space-y-2 text-[#8E8E8E]">
                <Sparkles className="w-6 h-6 mx-auto text-[#1C1C1C]" strokeWidth={1.25} />
                <p className="text-xs uppercase tracking-widest text-[#707070]">
                  Search across our entire abaya catalogue
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-10 sm:py-12 text-center space-y-2">
                <p className="text-sm sm:text-base uppercase tracking-wider font-medium text-[#1C1C1C]">No results found for "{searchTerm}"</p>
                <p className="text-xs text-[#707070]">Try searching for "Silk", "Espresso", or "Chiffon".</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-medium text-[#707070] uppercase tracking-wider mb-2">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Design Found' : 'Designs Found'}
                </div>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-none hover:bg-[#FAFAFA] border border-transparent hover:border-[#E5E5E5] cursor-pointer transition-all group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-15 sm:w-14 sm:h-16 object-cover rounded-none bg-[#F7F7F7] shrink-0 border border-[#E5E5E5]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-medium text-[#707070]">
                        {p.category}
                      </span>
                      <h4 className="text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#1C1C1C] group-hover:text-[#707070] transition-colors truncate">
                        {p.name}
                      </h4>
                      <span className="text-[11px] text-[#707070] line-clamp-1">{p.subtitle}</span>
                    </div>
                    <div className="text-right flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-xs sm:text-sm font-semibold text-[#1C1C1C] tabular-nums">
                        {formatPrice(p.price)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#707070] group-hover:text-[#1C1C1C] group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
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

