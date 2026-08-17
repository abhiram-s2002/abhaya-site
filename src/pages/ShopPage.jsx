import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, Heart, Sparkles, RotateCcw, X, Check, ArrowDownUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const {
    PRODUCTS,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    wishlist,
    formatPrice
  } = useShop();

  const [selectedShade, setSelectedShade] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Silk', 'Chiffon', 'Modal Jersey', 'Georgette'];

  const shades = [
    { name: 'All', hex: null },
    { name: 'Espresso', hex: '#2E1C1A' },
    { name: 'Violet', hex: '#4A2B5E' },
    { name: 'Amethyst', hex: '#7D628A' },
    { name: 'Rose', hex: '#C49A99' },
    { name: 'Sage', hex: '#7D8B79' },
    { name: 'Ivory', hex: '#FBF6EE' },
  ];

  // Prevent background scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileFilterOpen]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategoryFilter !== 'All' && product.category !== selectedCategoryFilter) {
        return false;
      }
      // Shade filter
      if (selectedShade !== 'All') {
        const matchesShade = product.colors.some(c =>
          c.name.toLowerCase().includes(selectedShade.toLowerCase())
        );
        if (!matchesShade) return false;
      }
      // Wishlist filter
      if (onlyWishlist && !wishlist.includes(product.id)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [PRODUCTS, selectedCategoryFilter, selectedShade, onlyWishlist, wishlist, sortBy]);

  const resetFilters = () => {
    setSelectedCategoryFilter('All');
    setSelectedShade('All');
    setOnlyWishlist(false);
    setSortBy('featured');
    setMobileFilterOpen(false);
  };

  const activeFiltersCount = (selectedCategoryFilter !== 'All' ? 1 : 0) +
    (selectedShade !== 'All' ? 1 : 0) +
    (onlyWishlist ? 1 : 0) +
    (sortBy !== 'featured' ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-10 animate-fade-in pb-20 sm:pb-24">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
          Curated Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-medium">
          The Haute Modestie Collection
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed px-2">
          Explore our range of 100% Grade 6A pure mulberry silk, Japanese pebble georgette, and cloud-soft Austrian modal hijabs.
        </p>
      </div>

      {/* Category Pills & Mobile Filter Bar */}
      <div className="space-y-3">
        {/* Category Horizontal Scroll Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all shrink-0 active:scale-95 ${
                  selectedCategoryFilter === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container text-stone-700 hover:bg-surface-container-highest'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Sheet Trigger Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-surface-container-highest text-xs font-semibold text-stone-800 shadow-sm shrink-0 active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-royal-violet" />
            <span>Filter & Sort</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-royal-violet text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Filter Bar (Visible on lg screens) */}
        <div className="hidden lg:block bg-white rounded-xl p-5 border border-surface-container-highest shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-4 text-xs">
            
            {/* Palette selection */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-stone-400 uppercase tracking-wider font-semibold shrink-0">
                Palette:
              </span>
              <div className="flex items-center gap-1.5">
                {shades.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedShade(s.name)}
                    className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 border transition-all ${
                      selectedShade === s.name
                        ? 'border-royal-violet bg-royal-violet/10 text-royal-violet font-bold ring-1 ring-royal-violet'
                        : 'border-surface-container-highest text-stone-600 hover:bg-surface-container'
                    }`}
                  >
                    {s.hex && (
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                        style={{ backgroundColor: s.hex }}
                      />
                    )}
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Saved toggle & Sort */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOnlyWishlist(!onlyWishlist)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  onlyWishlist
                    ? 'bg-royal-violet text-white border-royal-violet shadow-sm'
                    : 'bg-white text-stone-700 border-surface-container-highest hover:bg-surface-container'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-white' : ''}`} />
                <span>Saved ({wishlist.length})</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-stone-400 uppercase tracking-wider font-semibold">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container border border-surface-container-highest rounded px-3 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-royal-violet cursor-pointer"
                >
                  <option value="featured">Atelier Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="p-1.5 text-stone-400 hover:text-primary rounded-full hover:bg-surface-container transition-colors"
                  title="Reset Filters"
                  aria-label="Reset Filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Active Filter Chips on Mobile */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-stone-400 text-[11px] uppercase tracking-wider font-semibold shrink-0">Filters:</span>
          {selectedCategoryFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium shrink-0">
              {selectedCategoryFilter}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategoryFilter('All')} />
            </span>
          )}
          {selectedShade !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-royal-violet/10 text-royal-violet font-medium shrink-0">
              Shade: {selectedShade}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedShade('All')} />
            </span>
          )}
          {onlyWishlist && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-royal-violet text-white font-medium shrink-0">
              Saved Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyWishlist(false)} />
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[11px] text-royal-violet font-semibold underline shrink-0 ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Counter & 2-Column Mobile Grid */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center text-[11px] sm:text-xs text-stone-500">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} creations
          </span>
          {onlyWishlist && (
            <span className="text-royal-violet font-semibold">Your Saved Favorites</span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-10 sm:p-16 text-center border border-surface-container-highest space-y-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-amethyst-soft stroke-[1.2]" />
            <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">No creations match your current filters</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your category or color shade selection to discover our other modest silhouettes.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-widest font-medium rounded transition-colors active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter & Sort Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Modal */}
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#fff7fc] rounded-t-2xl shadow-2xl flex flex-col justify-between z-10 border-t border-surface-container-high animate-slide-in-up pb-safe">
            
            {/* Sheet Header */}
            <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-royal-violet" />
                <h3 className="font-serif text-lg font-medium text-primary">Filter & Sort</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-stone-500 hover:text-primary rounded-full hover:bg-surface-container"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Sort By Option */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-600">Sort By</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'featured', label: 'Featured' },
                    { id: 'price-low', label: 'Price: Low to High' },
                    { id: 'price-high', label: 'Price: High to Low' },
                    { id: 'rating', label: 'Top Rated' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                        sortBy === s.id
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'bg-white text-stone-700 border-surface-container-highest'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Shade Palette */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-600">Color Shade</span>
                <div className="grid grid-cols-3 gap-2">
                  {shades.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedShade(s.name)}
                      className={`p-2 rounded-lg flex items-center gap-2 text-xs border transition-all ${
                        selectedShade === s.name
                          ? 'border-royal-violet bg-royal-violet/10 text-royal-violet font-bold'
                          : 'bg-white border-surface-container-highest text-stone-700'
                      }`}
                    >
                      {s.hex && (
                        <span
                          className="w-3 h-3 rounded-full inline-block border border-black/10 shrink-0"
                          style={{ backgroundColor: s.hex }}
                        />
                      )}
                      <span className="truncate">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wishlist only switch */}
              <div className="space-y-2 pt-2 border-t border-surface-container-high">
                <label
                  onClick={() => setOnlyWishlist(!onlyWishlist)}
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-surface-container-highest cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Heart className={`w-4 h-4 ${onlyWishlist ? 'text-royal-violet fill-royal-violet' : 'text-stone-500'}`} />
                    <span className="text-xs font-medium text-stone-800">Saved in Wishlist Only</span>
                  </div>
                  <span className={`w-5 h-5 rounded flex items-center justify-center border ${onlyWishlist ? 'bg-royal-violet text-white border-royal-violet' : 'border-stone-300'}`}>
                    {onlyWishlist && <Check className="w-3.5 h-3.5" />}
                  </span>
                </label>
              </div>

            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-surface-container-high bg-white flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-3 rounded-lg border border-surface-container-highest text-xs uppercase tracking-wider font-semibold text-stone-700 hover:bg-surface-container"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 rounded-lg bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-wider font-semibold shadow-md"
              >
                View {filteredProducts.length} Results
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

