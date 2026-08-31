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
    selectedStyleFilter: contextStyleFilter,
    setSelectedStyleFilter: setContextStyleFilter,
    selectedWorkFilter: contextWorkFilter,
    setSelectedWorkFilter: setContextWorkFilter,
    selectedColorFilter: contextColorFilter,
    setSelectedColorFilter: setContextColorFilter,
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
  const [selectedTab, setSelectedTab] = useState('All'); // 'All' | 'Open abaya' | 'Closed cut' | ...
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
    if (selectedCategoryFilter) {
      setSelectedTab(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  // Sync selectedStyleFilter from context if set from external links (e.g. Shop by Category on Homepage or Navbar)
  useEffect(() => {
    if (contextStyleFilter) {
      setSelectedTab(contextStyleFilter);
      setSelectedStyleFilter(contextStyleFilter);
    }
  }, [contextStyleFilter]);

  // Sync selectedWorkFilter from context if set from external links (e.g. Shop by Work on Homepage or Navbar)
  useEffect(() => {
    if (contextWorkFilter) {
      setSelectedWorkFilter(contextWorkFilter);
    }
  }, [contextWorkFilter]);

  // Sync selectedColorFilter from context if set from external links
  useEffect(() => {
    if (contextColorFilter) {
      setSelectedShade(contextColorFilter);
    }
  }, [contextColorFilter]);

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

  // Tabs matching the 7 Abaya Category Styles
  const categoryTabs = [
    { id: 'All', label: 'All Abayas' },
    { id: 'Open abaya', label: 'Open Abaya' },
    { id: 'Closed cut', label: 'Closed Cut' },
    { id: 'Kimono or kaftan', label: 'Kimono / Kaftan' },
    { id: 'Butterfly or farasha', label: 'Butterfly / Farasha' },
    { id: 'umbrella cut or Flare', label: 'Umbrella / Flare' },
    { id: '2 piece abaya (with inner)', label: '2 Piece Set' },
    { id: 'Coat abaya', label: 'Coat Abaya' },
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
        const matchesCategory = product.category ? product.category.toLowerCase().includes(q) : false;
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

      // 2. Main Horizontal Category Style Tab
      if (selectedTab !== 'All') {
        const tabLower = selectedTab.toLowerCase();
        const matchesStyle = product.defaultStyle && product.defaultStyle.toLowerCase() === tabLower;
        const matchesCat = product.category && product.category.toLowerCase() === tabLower;
        const matchesNameOrSub = (product.name && product.name.toLowerCase().includes(tabLower)) ||
                                 (product.subtitle && product.subtitle.toLowerCase().includes(tabLower));
        const matchesSpecial = (tabLower === 'violet edition' && product.isVioletEdition);

        if (!matchesStyle && !matchesCat && !matchesNameOrSub && !matchesSpecial) return false;
      }

      // 3. Max Price Slider
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Style Filter
      if (selectedStyleFilter !== 'All') {
        const styleLower = selectedStyleFilter.toLowerCase();
        const matchesStyle = product.defaultStyle && product.defaultStyle.toLowerCase() === styleLower;
        if (!matchesStyle) return false;
      }

      // 5. Work / Craftsmanship Filter
      if (selectedWorkFilter !== 'All') {
        const workLower = selectedWorkFilter.toLowerCase();
        const matchesWork = product.defaultWork && product.defaultWork.toLowerCase() === workLower;
        if (!matchesWork) return false;
      }

      // 6. Shade Filter
      if (selectedShade !== 'All') {
        const matchesShade = product.colors && product.colors.some(c =>
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
    setSelectedStyleFilter(tabId);
    if (setContextStyleFilter) setContextStyleFilter(tabId);
    setSelectedCategoryFilter(tabId);
    setSelectedWorkFilter('All');
    if (setContextWorkFilter) setContextWorkFilter('All');
    setSelectedShade('All');
    if (setContextColorFilter) setContextColorFilter('All');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTab('All');
    setSelectedCategoryFilter('All');
    if (setContextStyleFilter) setContextStyleFilter('All');
    if (setContextWorkFilter) setContextWorkFilter('All');
    if (setContextColorFilter) setContextColorFilter('All');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-7 animate-fade-in pb-28 text-[#1E141B]">
      
      {/* 1. Header Section */}
      <div className="space-y-1 pt-1 text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em]">
          All Abayas & Collections
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl">
          Discover our collections of premium bespoke abayas. Minimalist, modern modesty tailored to perfection.
        </p>
      </div>

      {/* 2. Items Count & Sort Pill Row */}
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-stone-200">
        {/* Item count in clean uppercase */}
        <div className="text-[11px] font-bold tracking-widest text-stone-600 uppercase">
          {filteredProducts.length} PRODUCTS
        </div>

        {/* Sort Pill Dropdown + Deep Filters Trigger */}
        <div className="flex items-center gap-2">
          {/* Deep Filters Button (Silhouettes & Craft) */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
              secondaryFiltersActiveCount > 0
                ? 'bg-[#7A0648] text-white border-[#7A0648] shadow-sm'
                : 'bg-white hover:bg-stone-50 text-[#1E141B] border-stone-300 font-semibold'
            }`}
            aria-label="Filter Silhouettes and Craft"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span>Filters</span>
            {secondaryFiltersActiveCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#7A0648] text-[10px] flex items-center justify-center font-bold">
                {secondaryFiltersActiveCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="bg-white hover:bg-stone-50 text-[#1E141B] border border-stone-300 rounded-none px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              aria-expanded={isSortOpen}
              aria-label="Sort products"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A0648]" strokeWidth={1.8} />
              <span>{currentSortLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>

            {/* Sort Popover Menu */}
            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white text-[#1E141B] rounded-none shadow-xl border border-stone-200 py-1 z-30 animate-fade-in font-semibold">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs uppercase tracking-wide flex items-center justify-between transition-colors cursor-pointer ${
                      sortBy === option.id
                        ? 'bg-[#F5EAF1] text-[#7A0648] font-bold'
                        : 'text-stone-700 hover:bg-stone-100 font-semibold'
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.id && <Check className="w-3.5 h-3.5 text-[#7A0648] shrink-0" strokeWidth={2} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Search Box */}
      <div className="space-y-1">
        <label className="block text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-stone-600">
          SEARCH
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find an abaya style or fabric..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-none text-xs sm:text-sm text-[#1E141B] placeholder-stone-400 focus:outline-none focus:border-[#7A0648] uppercase tracking-wide transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Horizontal Scrolling Category Navigation Tabs */}
      <div className="border-b border-stone-200">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoryTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#7A0648] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#7A0648]'
                    : 'text-stone-600 hover:text-[#1E141B]'
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
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-stone-600">
            MAX PRICE
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#7A0648]">
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
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-stone-200">
          <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mr-1">
            Active:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-stone-300 text-[11px] text-[#7A0648] font-bold shadow-xs">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove search filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTab !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-stone-300 text-[11px] text-[#7A0648] font-bold shadow-xs">
              {categoryTabs.find(t => t.id === selectedTab)?.label || selectedTab}
              <button onClick={() => handleTabChange('All')} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Clear collection filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxPrice < maxPriceLimit && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-stone-300 text-[11px] text-[#7A0648] font-bold shadow-xs">
              ≤ {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(maxPriceLimit)} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Reset max price">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedStyleFilter !== 'All' && selectedStyleFilter !== selectedTab && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#7A0648] border border-stone-300 text-[11px] font-bold shadow-xs">
              Cut: {selectedStyleFilter}
              <button
                onClick={() => {
                  setSelectedStyleFilter('All');
                  if (setContextStyleFilter) setContextStyleFilter('All');
                }}
                className="hover:text-red-600 p-0.5 cursor-pointer"
                aria-label="Remove style filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWorkFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#7A0648] border border-stone-300 text-[11px] font-bold shadow-xs capitalize">
              Craft: {selectedWorkFilter}
              <button
                onClick={() => {
                  setSelectedWorkFilter('All');
                  if (setContextWorkFilter) setContextWorkFilter('All');
                }}
                className="hover:text-red-600 p-0.5 cursor-pointer"
                aria-label="Remove craftsmanship filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedShade !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white border border-stone-300 text-[11px] text-[#7A0648] font-bold shadow-xs">
              Shade: {selectedShade}
              <button
                onClick={() => {
                  setSelectedShade('All');
                  if (setContextColorFilter) setContextColorFilter('All');
                }}
                className="hover:text-red-600 p-0.5 cursor-pointer"
                aria-label="Remove shade filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyWishlist && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white text-[#7A0648] border border-stone-300 text-[11px] font-bold shadow-xs">
              <Heart className="w-3 h-3 fill-[#7A0648]" />
              Wishlist
              <button onClick={() => setOnlyWishlist(false)} className="hover:text-red-600 p-0.5 cursor-pointer" aria-label="Remove wishlist filter">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] text-[#7A0648] hover:text-[#68043D] font-bold underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* 7. Product Grid Header / Layout Switcher */}
      <div className="flex items-center justify-between text-xs text-[#1E141B] pt-1 font-semibold">
        <span>
          Showing <strong className="text-[#7A0648] font-bold">{filteredProducts.length}</strong> items
        </span>

        {/* Mobile View Toggle (Single vs Two Columns) */}
        <div className="flex sm:hidden items-center bg-white border border-stone-300 rounded-none p-0.5 shadow-xs">
          <button
            onClick={() => setMobileGridCols(1)}
            className={`p-1.5 transition-all cursor-pointer ${
              mobileGridCols === 1 ? 'bg-[#7A0648] text-white shadow-xs' : 'text-stone-600 hover:text-[#1E141B]'
            }`}
            title="Single card view"
            aria-label="1 column view"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileGridCols(2)}
            className={`p-1.5 transition-all cursor-pointer ${
              mobileGridCols === 2 ? 'bg-[#7A0648] text-white shadow-xs' : 'text-stone-600 hover:text-[#1E141B]'
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
        <div className="text-center py-16 sm:py-20 bg-white rounded-none border border-stone-200 p-6 sm:p-12 space-y-4 max-w-lg mx-auto shadow-md animate-fade-in text-[#1E141B] font-semibold">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F5EAF1] flex items-center justify-center text-[#7A0648]">
            <Filter className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1E141B] font-bold uppercase tracking-wider">
              No abayas match your filters
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
              We couldn't find any items matching your selected criteria. Try adjusting the price slider or clearing your search.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#7A0648] hover:bg-[#68043D] text-white text-xs uppercase tracking-widest font-bold rounded-none shadow-md active:scale-95 transition-all cursor-pointer border border-[#7A0648]"
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
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white text-[#1E141B] rounded-t-3xl shadow-2xl flex flex-col z-10 animate-slide-in-up border-t border-stone-200 font-semibold">
            
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-[#7A0648] text-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-white" />
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Atelier Filters</h3>
                {secondaryFiltersActiveCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#7A0648] text-[10px] flex items-center justify-center font-bold">
                    {secondaryFiltersActiveCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs in Drawer */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 border-b border-stone-200 bg-[#FAF8F5]">
              {[
                { id: 'style', label: 'Silhouettes' },
                { id: 'work', label: 'Craftsmanship' },
                { id: 'shade', label: 'Colors' },
                { id: 'wishlist', label: 'Wishlist' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDrawerTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-none text-xs font-bold shrink-0 transition-all uppercase tracking-wider cursor-pointer ${
                    activeDrawerTab === tab.id
                      ? 'bg-[#7A0648] text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[#1E141B]">
              
              {/* Silhouette Cuts */}
              {activeDrawerTab === 'style' && (
                <div className="space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Signature Silhouettes
                    </label>
                    <span className="text-[11px] text-stone-500">7 Cuts available</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => {
                        setSelectedStyleFilter('All');
                        setSelectedTab('All');
                        if (setContextStyleFilter) setContextStyleFilter('All');
                      }}
                      className={`p-3 text-xs font-semibold rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedStyleFilter === 'All'
                          ? 'bg-[#F5EAF1] text-[#7A0648] border-[#7A0648] shadow-xs font-bold'
                          : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm">All Silhouettes</div>
                        <div className={`text-[10px] ${selectedStyleFilter === 'All' ? 'text-[#7A0648]/80' : 'text-stone-500'}`}>
                          View all 7 cuts and silhouettes
                        </div>
                      </div>
                      {selectedStyleFilter === 'All' && <Check className="w-4 h-4 text-[#7A0648]" />}
                    </button>

                    {ABAYA_STYLES.map((style) => {
                      const isSelected = selectedStyleFilter.toLowerCase() === style.name.toLowerCase();
                      return (
                        <button
                          key={style.id}
                          onClick={() => {
                            setSelectedStyleFilter(style.name);
                            setSelectedTab(style.name);
                            if (setContextStyleFilter) setContextStyleFilter(style.name);
                          }}
                          className={`p-3 text-xs font-semibold rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5EAF1] text-[#7A0648] border-[#7A0648] shadow-xs font-bold'
                              : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm">{style.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-[#7A0648]/80' : 'text-stone-500'}`}>
                              {style.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#7A0648]" />}
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
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Artisanal Works & Embellishments
                    </label>
                    <span className="text-[11px] text-stone-500">7 Craft types</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => {
                        setSelectedWorkFilter('All');
                        if (setContextWorkFilter) setContextWorkFilter('All');
                      }}
                      className={`p-3 text-xs font-semibold rounded-none text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedWorkFilter === 'All'
                          ? 'bg-[#F5EAF1] text-[#7A0648] border-[#7A0648] shadow-xs font-bold'
                          : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm">All Craftsmanship</div>
                        <div className={`text-[10px] ${selectedWorkFilter === 'All' ? 'text-[#7A0648]/80' : 'text-stone-500'}`}>
                          All artisan needlework & embellishments
                        </div>
                      </div>
                      {selectedWorkFilter === 'All' && <Check className="w-4 h-4 text-[#7A0648]" />}
                    </button>

                    {ABAYA_WORKS.map((work) => {
                      const isSelected = selectedWorkFilter.toLowerCase() === work.name.toLowerCase();
                      return (
                        <button
                          key={work.id}
                          onClick={() => {
                            setSelectedWorkFilter(work.name);
                            if (setContextWorkFilter) setContextWorkFilter(work.name);
                          }}
                          className={`p-3 text-xs font-semibold rounded-none text-left border flex items-center justify-between transition-all capitalize cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5EAF1] text-[#7A0648] border-[#7A0648] shadow-xs font-bold'
                              : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm capitalize">{work.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-[#7A0648]/80' : 'text-stone-500'}`}>
                              {work.description}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#7A0648]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Shade Palette */}
              {activeDrawerTab === 'shade' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Shade & Color Spectrum
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {shades.map((shade) => {
                      const isSelected = selectedShade === shade.name;
                      return (
                        <button
                          key={shade.name}
                          onClick={() => {
                            setSelectedShade(shade.name);
                            if (setContextColorFilter) setContextColorFilter(shade.name);
                          }}
                          className={`p-3 rounded-none border flex items-center gap-2.5 transition-all text-xs font-bold cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5EAF1] text-[#7A0648] border-[#7A0648] shadow-xs font-bold'
                              : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
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
                  <div className="p-4 rounded-none bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-[#1E141B] flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-[#7A0648] fill-[#7A0648]" />
                        <span>Saved Wishlist Only</span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium">
                        Show only products currently in your saved wishlist ({wishlist.length})
                      </p>
                    </div>
                    <button
                      onClick={() => setOnlyWishlist(!onlyWishlist)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        onlyWishlist ? 'bg-[#7A0648]' : 'bg-stone-300'
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
            <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider font-bold rounded-none hover:bg-stone-100 active:scale-98 transition-all cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[2] py-3 bg-[#7A0648] text-white text-xs uppercase tracking-wider font-bold rounded-none shadow-md hover:bg-[#68043D] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#7A0648]"
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
