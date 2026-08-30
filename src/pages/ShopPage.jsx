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
    formatPrice
  } = useShop();

  // Price calculations
  const maxPriceLimit = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price), 250);
  }, [PRODUCTS]);

  const minPriceLimit = useMemo(() => {
    return Math.min(...PRODUCTS.map(p => p.price), 100);
  }, [PRODUCTS]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#1C1C1C] font-medium uppercase tracking-[0.06em]">
          All Abayas & Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#707070] font-normal leading-relaxed max-w-xl">
          Discover our collections of premium bespoke abayas. Minimalist, modern modesty tailored to perfection.
        </p>
      </div>

      {/* 2. Items Count & Sort Pill Row */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#E5E5E5]">
        {/* Item count in clean uppercase */}
        <div className="text-[11px] font-medium tracking-widest text-[#707070] uppercase">
          {filteredProducts.length} PRODUCTS
        </div>

        {/* Sort Pill Dropdown + Deep Filters Trigger */}
        <div className="flex items-center gap-2">
          {/* Deep Filters Button (Silhouettes & Craft) */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs uppercase tracking-wider font-medium border transition-colors ${
              secondaryFiltersActiveCount > 0
                ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                : 'bg-white hover:bg-[#F9F9F9] text-[#1C1C1C] border-[#E5E5E5]'
            }`}
            aria-label="Filter Silhouettes and Craft"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Filters</span>
            {secondaryFiltersActiveCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1C1C1C] text-white text-[10px] flex items-center justify-center font-bold">
                {secondaryFiltersActiveCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="bg-white hover:bg-[#F9F9F9] text-[#1C1C1C] border border-[#E5E5E5] rounded-none px-3 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors"
              aria-expanded={isSortOpen}
              aria-label="Sort products"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1C1C1C]" strokeWidth={1.5} />
              <span>{currentSortLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#707070] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>

            {/* Sort Popover Menu */}
            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-none shadow-lg border border-[#E5E5E5] py-1 z-30 animate-fade-in">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs uppercase tracking-wide flex items-center justify-between transition-colors ${
                      sortBy === option.id
                        ? 'bg-[#F5EFE9] text-[#1C1C1C] font-semibold'
                        : 'text-[#707070] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.id && <Check className="w-3.5 h-3.5 text-[#1C1C1C]" strokeWidth={1.5} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Search Box */}
      <div className="space-y-1">
        <label className="block text-[10px] sm:text-[11px] uppercase tracking-widest font-medium text-[#707070]">
          SEARCH
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E] pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find an abaya style or fabric..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E5E5E5] rounded-none text-xs sm:text-sm text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none focus:border-[#1C1C1C] uppercase tracking-wide transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070] hover:text-[#1C1C1C] p-1"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Scrolling Category Navigation Tabs */}
      <div className="border-b border-[#E5E5E5]">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-2.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-[#1C1C1C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1C1C1C]'
                    : 'text-[#707070] hover:text-[#1C1C1C]'
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
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-stone-500">
            MAX PRICE
          </span>
          <span className="text-xs sm:text-sm font-semibold text-stone-900">
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
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-surface-container-high/60">
          <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mr-1">
            Active:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#ebdcd0] text-[11px] text-primary shadow-xs">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-red-600 p-0.5" aria-label="Remove search filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTab !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#ebdcd0] text-[11px] text-primary shadow-xs">
              {categoryTabs.find(t => t.id === selectedTab)?.label || selectedTab}
              <button onClick={() => handleTabChange('All')} className="hover:text-red-600 p-0.5" aria-label="Clear collection filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxPrice < maxPriceLimit && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#ebdcd0] text-[11px] text-primary shadow-xs">
              ≤ {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(maxPriceLimit)} className="hover:text-red-600 p-0.5" aria-label="Reset max price">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedStyleFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-royal-violet/10 border border-royal-violet/30 text-[11px] font-medium text-royal-violet shadow-xs">
              Cut: {selectedStyleFilter}
              <button onClick={() => setSelectedStyleFilter('All')} className="hover:text-red-600 p-0.5" aria-label="Remove style filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWorkFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-royal-violet/10 border border-royal-violet/30 text-[11px] font-medium text-royal-violet shadow-xs capitalize">
              Craft: {selectedWorkFilter}
              <button onClick={() => setSelectedWorkFilter('All')} className="hover:text-red-600 p-0.5" aria-label="Remove craftsmanship filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedShade !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#ebdcd0] text-[11px] text-primary shadow-xs">
              Shade: {selectedShade}
              <button onClick={() => setSelectedShade('All')} className="hover:text-red-600 p-0.5" aria-label="Remove shade filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyWishlist && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-royal-violet text-white text-[11px] font-medium shadow-xs">
              <Heart className="w-3 h-3 fill-white" />
              Wishlist
              <button onClick={() => setOnlyWishlist(false)} className="hover:text-red-200 p-0.5" aria-label="Remove wishlist filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] text-stone-500 hover:text-royal-violet font-semibold underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* 7. Product Grid Header / Layout Switcher */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span>
          Showing <strong className="text-stone-900 font-semibold">{filteredProducts.length}</strong> items
        </span>

        {/* Mobile View Toggle (Single vs Two Columns) */}
        <div className="flex sm:hidden items-center bg-[#f7f2ea] border border-[#e8ded2] rounded-lg p-0.5 shadow-xs">
          <button
            onClick={() => setMobileGridCols(1)}
            className={`p-1.5 rounded transition-all ${
              mobileGridCols === 1 ? 'bg-royal-violet text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
            title="Single card view"
            aria-label="1 column view"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileGridCols(2)}
            className={`p-1.5 rounded transition-all ${
              mobileGridCols === 2 ? 'bg-royal-violet text-white shadow-xs' : 'text-stone-500 hover:text-stone-800'
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
        <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-[#ebdcd0] p-6 sm:p-12 space-y-4 max-w-lg mx-auto shadow-subtle animate-fade-in">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#f7f2ea] flex items-center justify-center text-stone-600">
            <Filter className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">
              No abayas match your filters
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              We couldn't find any items matching your selected criteria. Try adjusting the price slider or clearing your search.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md active:scale-95 transition-all"
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
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#fff7fc] rounded-t-3xl shadow-2xl flex flex-col z-10 animate-slide-in-up">
            
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-royal-violet" />
                <h3 className="font-serif text-lg font-medium text-primary">Atelier Filters</h3>
                {secondaryFiltersActiveCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-royal-violet text-white text-[10px] flex items-center justify-center font-bold">
                    {secondaryFiltersActiveCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-stone-500 hover:bg-surface-container hover:text-primary transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs in Drawer */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-4 py-2 border-b border-surface-container-high bg-white/60">
              {[
                { id: 'style', label: 'Silhouettes' },
                { id: 'work', label: 'Craftsmanship' },
                { id: 'shade', label: 'Colors' },
                { id: 'wishlist', label: 'Wishlist' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDrawerTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                    activeDrawerTab === tab.id
                      ? 'bg-royal-violet text-white shadow-xs'
                      : 'text-stone-600 hover:bg-surface-container'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Silhouette Cuts */}
              {activeDrawerTab === 'style' && (
                <div className="space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">
                      Signature Silhouettes
                    </label>
                    <span className="text-[11px] text-stone-500">7 Cuts available</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setSelectedStyleFilter('All')}
                      className={`p-3 text-xs font-medium rounded-xl text-left border flex items-center justify-between transition-all ${
                        selectedStyleFilter === 'All'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-stone-800 border-[#ebdcd0] hover:bg-surface-container'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">All Silhouettes</div>
                        <div className={`text-[10px] ${selectedStyleFilter === 'All' ? 'text-white/80' : 'text-stone-500'}`}>
                          View all 7 cuts and silhouettes
                        </div>
                      </div>
                      {selectedStyleFilter === 'All' && <Check className="w-4 h-4 text-gold-accent" />}
                    </button>

                    {ABAYA_STYLES.map((style) => {
                      const isSelected = selectedStyleFilter.toLowerCase() === style.name.toLowerCase();
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyleFilter(style.name)}
                          className={`p-3 text-xs font-medium rounded-xl text-left border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-royal-violet text-white border-royal-violet shadow-sm'
                              : 'bg-white text-stone-800 border-[#ebdcd0] hover:bg-surface-container'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm">{style.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                              {style.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-gold-accent" />}
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
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">
                      Artisanal Works & Embellishments
                    </label>
                    <span className="text-[11px] text-stone-500">7 Craft types</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setSelectedWorkFilter('All')}
                      className={`p-3 text-xs font-medium rounded-xl text-left border flex items-center justify-between transition-all ${
                        selectedWorkFilter === 'All'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-stone-800 border-[#ebdcd0] hover:bg-surface-container'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">All Craftsmanship</div>
                        <div className={`text-[10px] ${selectedWorkFilter === 'All' ? 'text-white/80' : 'text-stone-500'}`}>
                          All artisan needlework & embellishments
                        </div>
                      </div>
                      {selectedWorkFilter === 'All' && <Check className="w-4 h-4 text-gold-accent" />}
                    </button>

                    {ABAYA_WORKS.map((work) => {
                      const isSelected = selectedWorkFilter.toLowerCase() === work.name.toLowerCase();
                      return (
                        <button
                          key={work.id}
                          onClick={() => setSelectedWorkFilter(work.name)}
                          className={`p-3 text-xs font-medium rounded-xl text-left border flex items-center justify-between transition-all capitalize ${
                            isSelected
                              ? 'bg-royal-violet text-white border-royal-violet shadow-sm'
                              : 'bg-white text-stone-800 border-[#ebdcd0] hover:bg-surface-container'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-sm capitalize">{work.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                              {work.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-gold-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Shade Palette */}
              {activeDrawerTab === 'shade' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary">
                    Shade & Color Spectrum
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {shades.map((shade) => {
                      const isSelected = selectedShade === shade.name;
                      return (
                        <button
                          key={shade.name}
                          onClick={() => setSelectedShade(shade.name)}
                          className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-medium ${
                            isSelected
                              ? 'bg-royal-violet text-white border-royal-violet shadow-sm'
                              : 'bg-white text-stone-800 border-[#ebdcd0] hover:bg-surface-container'
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
                  <div className="p-4 rounded-2xl bg-white border border-[#ebdcd0] flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-primary flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-royal-violet fill-royal-violet" />
                        <span>Saved Wishlist Only</span>
                      </div>
                      <p className="text-xs text-stone-500">
                        Show only products currently in your saved wishlist ({wishlist.length})
                      </p>
                    </div>
                    <button
                      onClick={() => setOnlyWishlist(!onlyWishlist)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        onlyWishlist ? 'bg-royal-violet' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          onlyWishlist ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-surface-container-high bg-white flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-surface-container-highest text-stone-700 text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-surface-container active:scale-98 transition-all"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[2] py-3 bg-primary text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-md hover:bg-royal-violet active:scale-98 transition-all flex items-center justify-center gap-2"
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
