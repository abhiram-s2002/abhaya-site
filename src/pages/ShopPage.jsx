import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  SlidersHorizontal,
  Heart,
  Sparkles,
  RotateCcw,
  X,
  Check,
  Search,
  ChevronDown,
  LayoutGrid,
  Square,
  Filter
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ABAYA_STYLES, ABAYA_WORKS } from '../data/products';

export default function ShopPage() {
  const {
    PRODUCTS,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    wishlistOnlyFilter,
    wishlist,
    formatPrice,
    searchQuery,
    setSearchQuery
  } = useShop();

  // Price calculations
  const maxPriceLimit = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price), 250);
  }, [PRODUCTS]);

  const minPriceLimit = 0;

  // Filter States
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);
  const [selectedTab, setSelectedTab] = useState('All'); // 'All' | 'Silk' | 'Chiffon' | 'Modal Jersey' | 'Georgette' | 'New Arrivals' | 'Bridal' | 'Violet Edition'
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('All');
  const [selectedWorkFilter, setSelectedWorkFilter] = useState('All');
  const [selectedShade, setSelectedShade] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyWishlist, setOnlyWishlist] = useState(Boolean(wishlistOnlyFilter));

  // UI state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileGridCols, setMobileGridCols] = useState(2);
  const [activeDrawerTab, setActiveDrawerTab] = useState('style'); // 'style' | 'work' | 'shade' | 'all'

  const sortDropdownRef = useRef(null);

  // Sync wishlistOnlyFilter from context
  useEffect(() => {
    if (wishlistOnlyFilter) {
      setOnlyWishlist(true);
    }
  }, [wishlistOnlyFilter]);

  // Sync selectedCategoryFilter from context if set from external links
  useEffect(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'All') {
      setSelectedTab(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Tabs matching the exact reference style (All, Fabric Collections, New Arrivals, Bridal, etc.)
  const categoryTabs = [
    { id: 'All', label: 'All' },
    { id: 'Silk', label: 'Silk Collection' },
    { id: 'Chiffon', label: 'Chiffon' },
    { id: 'Modal Jersey', label: 'Modal Jersey' },
    { id: 'Georgette', label: 'Georgette' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'bridal', label: 'Bridal Atelier' },
    { id: 'violet-edition', label: 'The Violet Edition' },
  ];

  const shades = [
    { name: 'All', hex: null },
    { name: 'Espresso', hex: '#2E1C1A' },
    { name: 'Violet', hex: '#982476' },
    { name: 'Amethyst', hex: '#C76AA9' },
    { name: 'Rose', hex: '#C49A99' },
    { name: 'Sage', hex: '#7D8B79' },
    { name: 'Ivory', hex: '#FBF6EE' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortBy)?.label || 'Featured';

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle ? product.subtitle.toLowerCase().includes(q) : false;
        const matchesStyle =
          (product.defaultStyle && product.defaultStyle.toLowerCase().includes(q)) ||
          (product.styles && product.styles.some(s => s.toLowerCase().includes(q)));
        const matchesWork =
          (product.defaultWork && product.defaultWork.toLowerCase().includes(q)) ||
          (product.works && product.works.some(w => w.toLowerCase().includes(q)));
        const matchesColor = product.colors && product.colors.some(c => c.name.toLowerCase().includes(q));

        if (!matchesName && !matchesCategory && !matchesSubtitle && !matchesStyle && !matchesWork && !matchesColor) {
          return false;
        }
      }

      // 2. Main Horizontal Category / Collection Tab
      if (selectedTab === 'new-arrivals') {
        if (product.badge !== 'New Arrival' && product.badge !== 'Trending') return false;
      } else if (selectedTab === 'bridal') {
        if (product.category !== 'Georgette' && !product.name.toLowerCase().includes('bridal')) return false;
      } else if (selectedTab === 'violet-edition') {
        if (!product.isVioletEdition) return false;
      } else if (selectedTab !== 'All') {
        if (product.category !== selectedTab) return false;
      }

      // 3. Max Price Slider
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Style Filter
      if (selectedStyleFilter !== 'All') {
        const matchesStyle =
          (product.defaultStyle && product.defaultStyle.toLowerCase() === selectedStyleFilter.toLowerCase()) ||
          (product.styles && product.styles.some(s => s.toLowerCase() === selectedStyleFilter.toLowerCase()));
        if (!matchesStyle) return false;
      }

      // 5. Work / Craftsmanship Filter
      if (selectedWorkFilter !== 'All') {
        const matchesWork =
          (product.defaultWork && product.defaultWork.toLowerCase() === selectedWorkFilter.toLowerCase()) ||
          (product.works && product.works.some(w => w.toLowerCase() === selectedWorkFilter.toLowerCase()));
        if (!matchesWork) return false;
      }

      // 6. Shade Filter
      if (selectedShade !== 'All') {
        const matchesShade = product.colors.some(c =>
          c.name.toLowerCase().includes(selectedShade.toLowerCase())
        );
        if (!matchesShade) return false;
      }

      // 7. Wishlist Filter
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
  }, [
    PRODUCTS,
    searchQuery,
    selectedTab,
    maxPrice,
    selectedStyleFilter,
    selectedWorkFilter,
    selectedShade,
    onlyWishlist,
    wishlist,
    sortBy
  ]);

  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
    if (tabId === 'All' || tabId === 'Silk' || tabId === 'Chiffon' || tabId === 'Modal Jersey' || tabId === 'Georgette') {
      setSelectedCategoryFilter(tabId);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTab('All');
    setSelectedCategoryFilter('All');
    setMaxPrice(maxPriceLimit);
    setSelectedStyleFilter('All');
    setSelectedWorkFilter('All');
    setSelectedShade('All');
    setOnlyWishlist(false);
    setSortBy('featured');
    setMobileFilterOpen(false);
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedTab !== 'All' ||
    maxPrice < maxPriceLimit ||
    selectedStyleFilter !== 'All' ||
    selectedWorkFilter !== 'All' ||
    selectedShade !== 'All' ||
    onlyWishlist ||
    sortBy !== 'featured';

  const secondaryFiltersActiveCount =
    (selectedStyleFilter !== 'All' ? 1 : 0) +
    (selectedWorkFilter !== 'All' ? 1 : 0) +
    (selectedShade !== 'All' ? 1 : 0) +
    (onlyWishlist ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-7 animate-fade-in pb-28">
      
      {/* 1. Header Section */}
      <div className="space-y-1 pt-1 text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium uppercase tracking-[0.06em]">
          All Abayas & Collections
        </h1>
        <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed max-w-xl">
          Discover our collections of premium bespoke abayas. Minimalist, modern modesty tailored to perfection.
        </p>
      </div>

      {/* 2. Items Count & Sort Pill Row */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/20">
        {/* Item count in clean uppercase */}
        <div className="text-[11px] font-medium tracking-widest text-white/80 uppercase">
          {filteredProducts.length} PRODUCTS
        </div>

        {/* Sort Pill Dropdown + Deep Filters Trigger */}
        <div className="flex items-center gap-2">
          {/* Deep Filters Button (Silhouettes & Craft) */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
              secondaryFiltersActiveCount > 0
                ? 'bg-white text-[#C85DA9] border-white shadow-sm'
                : 'bg-white/15 hover:bg-white/25 text-white border-white/30'
            }`}
            aria-label="Filter Silhouettes and Craft"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Filters</span>
            {secondaryFiltersActiveCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C85DA9] text-white text-[10px] flex items-center justify-center font-bold">
                {secondaryFiltersActiveCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-none px-3 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              aria-expanded={isSortOpen}
              aria-label="Sort products"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              <span>{currentSortLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>

            {/* Sort Popover Menu */}
            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-[#C85DA9] text-white rounded-none shadow-2xl border border-white/20 py-1 z-30 animate-fade-in">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs uppercase tracking-wide flex items-center justify-between transition-colors cursor-pointer ${
                      sortBy === option.id
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.id && <Check className="w-3.5 h-3.5 text-[#FFD700] shrink-0" strokeWidth={1.5} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Search Box */}
      <div className="space-y-1">
        <label className="block text-[10px] sm:text-[11px] uppercase tracking-widest font-medium text-white/80">
          SEARCH
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find an abaya style or fabric..."
            className="w-full pl-10 pr-9 py-2.5 bg-white/15 border border-white/30 rounded-none text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 uppercase tracking-wide transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Scrolling Category Navigation Tabs */}
      <div className="border-b border-white/20">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-2.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. MAX PRICE Slider Section */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-white/80">
            MAX PRICE
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={minPriceLimit}
          max={maxPriceLimit}
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="luxury-slider w-full"
          aria-label="Filter by maximum price"
        />
      </div>

      {/* 6. Active Filter Tags Bar (When any filter is active) */}
      {isFiltered && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/20">
          <span className="text-[10px] uppercase tracking-wider font-bold text-white/70 mr-1">
            Active:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-white text-[11px] text-[#2D143D] font-medium shadow-xs">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove search filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTab !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-white text-[11px] text-[#2D143D] font-medium shadow-xs">
              {categoryTabs.find(t => t.id === selectedTab)?.label || selectedTab}
              <button onClick={() => handleTabChange('All')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Clear collection filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxPrice < maxPriceLimit && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-white text-[11px] text-[#2D143D] font-medium shadow-xs">
              ≤ {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(maxPriceLimit)} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Reset max price">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedStyleFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#C85DA9] border border-white text-[11px] font-medium shadow-xs">
              Cut: {selectedStyleFilter}
              <button onClick={() => setSelectedStyleFilter('All')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove style filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWorkFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#C85DA9] border border-white text-[11px] font-medium shadow-xs capitalize">
              Craft: {selectedWorkFilter}
              <button onClick={() => setSelectedWorkFilter('All')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove craftsmanship filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedShade !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-white text-[11px] text-[#C85DA9] font-medium shadow-xs">
              Shade: {selectedShade}
              <button onClick={() => setSelectedShade('All')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove shade filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyWishlist && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#C85DA9] border border-white text-[11px] font-medium shadow-xs">
              <Heart className="w-3 h-3 fill-[#C85DA9]" />
              Wishlist
              <button onClick={() => setOnlyWishlist(false)} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove wishlist filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] text-white/90 hover:text-white font-semibold underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* 7. Product Grid Header / Layout Switcher */}
      <div className="flex items-center justify-between text-xs text-white/80 pt-1">
        <span>
          Showing <strong className="text-white font-semibold">{filteredProducts.length}</strong> items
        </span>

        {/* Mobile View Toggle (Single vs Two Columns) */}
        <div className="flex sm:hidden items-center bg-white/15 border border-white/25 rounded-none p-0.5 shadow-xs">
          <button
            onClick={() => setMobileGridCols(1)}
            className={`p-1.5 transition-all cursor-pointer ${
              mobileGridCols === 1 ? 'bg-white text-[#C85DA9] shadow-xs' : 'text-white/70 hover:text-white'
            }`}
            title="Single card view"
            aria-label="1 column view"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileGridCols(2)}
            className={`p-1.5 transition-all cursor-pointer ${
              mobileGridCols === 2 ? 'bg-white text-[#C85DA9] shadow-xs' : 'text-white/70 hover:text-white'
            }`}
            title="2-column grid view"
            aria-label="2 column view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 8. Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-[#C85DA9] rounded-none border border-white/20 p-6 sm:p-12 space-y-4 max-w-lg mx-auto shadow-2xl animate-fade-in text-white">
          <div className="w-14 h-14 mx-auto rounded-full bg-white/15 flex items-center justify-center text-white">
            <Filter className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium uppercase tracking-wider">
              No abayas match your filters
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              We couldn't find any items matching your selected criteria. Try adjusting the price slider or clearing your search.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-white hover:bg-white/90 text-[#C85DA9] text-xs uppercase tracking-widest font-semibold rounded-none shadow-md active:scale-95 transition-all cursor-pointer border border-white"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-3 sm:gap-6 lg:gap-8 ${
            mobileGridCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
          } sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 9. Mobile Bottom Sheet Drawer for Deep Silhouette & Craft Filters */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#C85DA9] text-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-slide-in-up border-t border-white/20">
            
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-white/40 rounded-full mx-auto mt-3 mb-1" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/20">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-white" />
                <h3 className="font-serif text-lg font-medium text-white uppercase tracking-wider">Atelier Filters</h3>
                {secondaryFiltersActiveCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#C85DA9] text-[10px] flex items-center justify-center font-bold">
                    {secondaryFiltersActiveCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs in Drawer */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 border-b border-white/20 bg-white/10">
              {[
                { id: 'style', label: 'Silhouettes' },
                { id: 'work', label: 'Craftsmanship' },
                { id: 'shade', label: 'Colors' },
                { id: 'wishlist', label: 'Wishlist' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDrawerTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-none text-xs font-semibold shrink-0 transition-all uppercase tracking-wider cursor-pointer ${
                    activeDrawerTab === tab.id
                      ? 'bg-white text-[#C85DA9] shadow-xs border border-white'
                      : 'text-white/80 hover:bg-white/15'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-white">
              
              {/* Silhouette Cuts */}
              {activeDrawerTab === 'style' && (
                <div className="space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-white">
                      Signature Silhouettes
                    </label>
                    <span className="text-[11px] text-white/70">7 Cuts available</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setSelectedStyleFilter('All')}
                      className={`p-3 text-xs font-medium rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedStyleFilter === 'All'
                          ? 'bg-white text-[#C85DA9] border-white shadow-sm font-semibold'
                          : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">All Silhouettes</div>
                        <div className={`text-[10px] ${selectedStyleFilter === 'All' ? 'text-[#C85DA9]/80' : 'text-white/70'}`}>
                          View all 7 cuts and silhouettes
                        </div>
                      </div>
                      {selectedStyleFilter === 'All' && <Check className="w-4 h-4 text-[#C85DA9]" />}
                    </button>

                    {ABAYA_STYLES.map((style) => {
                      const isSelected = selectedStyleFilter.toLowerCase() === style.name.toLowerCase();
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyleFilter(style.name)}
                          className={`p-3 text-xs font-medium rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-[#C85DA9] border-white shadow-sm font-semibold'
                              : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm">{style.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-[#C85DA9]/80' : 'text-white/70'}`}>
                              {style.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#C85DA9]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Craftsmanship Works */}
              {activeDrawerTab === 'work' && (
                <div className="space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-white">
                      Artisanal Works & Embellishments
                    </label>
                    <span className="text-[11px] text-white/70">7 Craft types</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setSelectedWorkFilter('All')}
                      className={`p-3 text-xs font-medium rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedWorkFilter === 'All'
                          ? 'bg-white text-[#C85DA9] border-white shadow-sm font-semibold'
                          : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">All Craftsmanship</div>
                        <div className={`text-[10px] ${selectedWorkFilter === 'All' ? 'text-[#C85DA9]/80' : 'text-white/70'}`}>
                          All artisan needlework & embellishments
                        </div>
                      </div>
                      {selectedWorkFilter === 'All' && <Check className="w-4 h-4 text-[#C85DA9]" />}
                    </button>

                    {ABAYA_WORKS.map((work) => {
                      const isSelected = selectedWorkFilter.toLowerCase() === work.name.toLowerCase();
                      return (
                        <button
                          key={work.id}
                          onClick={() => setSelectedWorkFilter(work.name)}
                          className={`p-3 text-xs font-medium rounded-none text-left border flex items-center justify-between transition-all capitalize cursor-pointer ${
                            isSelected
                              ? 'bg-white text-[#C85DA9] border-white shadow-sm font-semibold'
                              : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm capitalize">{work.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-[#C85DA9]/80' : 'text-white/70'}`}>
                              {work.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#C85DA9]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Shade Palette */}
              {activeDrawerTab === 'shade' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    Shade & Color Spectrum
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {shades.map((shade) => {
                      const isSelected = selectedShade === shade.name;
                      return (
                        <button
                          key={shade.name}
                          onClick={() => setSelectedShade(shade.name)}
                          className={`p-3 rounded-none border flex items-center gap-2.5 transition-all text-xs font-medium cursor-pointer ${
                            isSelected
                              ? 'bg-white text-[#C85DA9] border-white shadow-sm font-semibold'
                              : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                          }`}
                        >
                          {shade.hex ? (
                            <span
                              className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: shade.hex }}
                            />
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-200 via-rose-300 to-indigo-400 shrink-0" />
                          )}
                          <span className="truncate">{shade.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Wishlist Toggle */}
              {activeDrawerTab === 'wishlist' && (
                <div className="space-y-4 animate-fade-in p-2">
                  <div className="p-4 rounded-none bg-white/15 border border-white/20 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-[#FFF0A0] fill-[#FFF0A0]" />
                        <span>Saved Wishlist Only</span>
                      </div>
                      <p className="text-xs text-white/70">
                        Show only products currently in your saved wishlist ({wishlist.length})
                      </p>
                    </div>
                    <button
                      onClick={() => setOnlyWishlist(!onlyWishlist)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        onlyWishlist ? 'bg-white border border-white/40' : 'bg-white/30'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full ${onlyWishlist ? 'bg-[#C85DA9]' : 'bg-white'} shadow-md transform transition-transform ${
                          onlyWishlist ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/20 bg-[#C85DA9] flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-white/30 text-white text-xs uppercase tracking-wider font-semibold rounded-none hover:bg-white/15 active:scale-98 transition-all cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[2] py-3 bg-white text-[#C85DA9] text-xs uppercase tracking-wider font-bold rounded-none shadow-md hover:bg-white/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white"
              >
                <span>View {filteredProducts.length} Abayas</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
