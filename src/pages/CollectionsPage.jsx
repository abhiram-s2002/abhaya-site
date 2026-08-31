import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  X,
  ChevronDown,
  ChevronRight,
  Check,
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  Columns,
  Square
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ABAYA_STYLES, ABAYA_WORKS, ABAYA_SIZES } from '../data/products';

// Comprehensive color swatches matching BasicAbaya
const COLOR_SWATCHES = [
  { name: 'Beige', hex: '#D8C8B8', border: false },
  { name: 'Black', hex: '#1C1C1C', border: false },
  { name: 'Blue', hex: '#3B6E8C', border: false },
  { name: 'Brown', hex: '#5C3A21', border: false },
  { name: 'Espresso', hex: '#2E1C1A', border: false },
  { name: 'Gold', hex: '#D4AF37', border: false },
  { name: 'Green', hex: '#3A5F43', border: false },
  { name: 'Grey', hex: '#8E9196', border: false },
  { name: 'Light Pink', hex: '#F2D6DC', border: false },
  { name: 'Maroon', hex: '#5E1914', border: false },
  { name: 'Navy', hex: '#1B263B', border: false },
  { name: 'Olive', hex: '#556B2F', border: false },
  { name: 'Orange', hex: '#D97724', border: false },
  { name: 'Peach', hex: '#FAD2B8', border: false },
  { name: 'Pink', hex: '#E295A8', border: false },
  { name: 'Plum Noir', hex: '#260A22', border: false },
  { name: 'Purple', hex: '#6A2E7E', border: false },
  { name: 'Royal Violet', hex: '#982476', border: false },
  { name: 'Red', hex: '#9E2A2B', border: false },
  { name: 'Sage Green', hex: '#7D8B79', border: false },
  { name: 'Silver', hex: '#C0C0C0', border: false },
  { name: 'Sky Blue', hex: '#87CEEB', border: false },
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Yellow', hex: '#E5A93B', border: false },
];

export default function CollectionsPage() {
  const {
    PRODUCTS,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedColorFilter,
    setSelectedColorFilter,
    selectedStyleFilter,
    setSelectedStyleFilter,
    selectedWorkFilter,
    setSelectedWorkFilter,
    setWishlistOnlyFilter,
    navigateTo,
    formatPrice,
    searchQuery,
    setSearchQuery
  } = useShop();

  // Filter States
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'latest' | 'alpha-az' | 'alpha-za'
  
  // Selected Filters
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Price calculations
  const maxPriceLimit = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price), 300);
  }, [PRODUCTS]);

  const minPriceLimit = 0;

  const [priceRange, setPriceRange] = useState(maxPriceLimit);

  // Grid layout switcher:
  // Mobile: 1 or 2 cols (default 2)
  const [mobileCols, setMobileCols] = useState(2);
  const [desktopCols, setDesktopCols] = useState(3);

  // Accordion Open States inside Filter Drawer
  const [openAccordions, setOpenAccordions] = useState({
    color: true,
    style: true,
    work: true,
    size: false,
    price: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sortMenuRef = useRef(null);

  // Sync external filters from context
  useEffect(() => {
    if (selectedStyleFilter && selectedStyleFilter !== 'All') {
      setSelectedStyles([selectedStyleFilter]);
    } else if (selectedStyleFilter === 'All' || selectedStyleFilter === null) {
      setSelectedStyles([]);
    }
  }, [selectedStyleFilter]);

  useEffect(() => {
    if (selectedWorkFilter && selectedWorkFilter !== 'All') {
      setSelectedWorks([selectedWorkFilter]);
    } else if (selectedWorkFilter === 'All' || selectedWorkFilter === null) {
      setSelectedWorks([]);
    }
  }, [selectedWorkFilter]);

  useEffect(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'All') {
      setSelectedStyles([selectedCategoryFilter]);
    } else if (selectedCategoryFilter === 'All' || selectedCategoryFilter === null) {
      setSelectedStyles([]);
    }
  }, [selectedCategoryFilter]);

  useEffect(() => {
    if (selectedColorFilter && selectedColorFilter !== 'All') {
      setSelectedColors([selectedColorFilter]);
    } else if (selectedColorFilter === 'All' || selectedColorFilter === null) {
      setSelectedColors([]);
    }
  }, [selectedColorFilter]);

  // Dynamic Page Title
  const pageTitle = useMemo(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      return searchQuery;
    }
    if (selectedStyles.length === 1) {
      return selectedStyles[0];
    }
    if (selectedStyles.length > 1) {
      return selectedStyles.join(' & ');
    }
    if (selectedWorks.length === 1) {
      return selectedWorks[0];
    }
    if (selectedWorks.length > 1) {
      return selectedWorks.join(' & ');
    }
    if (selectedColors.length === 1) {
      return `${selectedColors[0]} Abayas`;
    }
    return 'SHOP';
  }, [searchQuery, selectedStyles, selectedWorks, selectedColors]);

  // Handle Sort Menu Outside Click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when filter drawer is open
  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [filterDrawerOpen]);

  // Sort Options
  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-low', label: 'Price, low to high' },
    { id: 'price-high', label: 'Price, high to low' },
    { id: 'latest', label: 'Latest' },
    { id: 'alpha-az', label: 'Alphabetically, A-Z' },
    { id: 'alpha-za', label: 'Alphabetically, Z-A' },
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortBy)?.label || 'Featured';

  // Toggle Selection Helpers
  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedStyles([]);
    setSelectedWorks([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(maxPriceLimit);
    if (typeof setSearchQuery === 'function') setSearchQuery('');
    if (typeof setSelectedCategoryFilter === 'function') setSelectedCategoryFilter('All');
    if (typeof setSelectedColorFilter === 'function') setSelectedColorFilter('All');
    if (typeof setSelectedStyleFilter === 'function') setSelectedStyleFilter('All');
    if (typeof setSelectedWorkFilter === 'function') setSelectedWorkFilter('All');
    if (typeof setWishlistOnlyFilter === 'function') setWishlistOnlyFilter(false);
  };

  // Active filters count
  const activeFiltersCount =
    selectedStyles.length +
    selectedWorks.length +
    selectedColors.length +
    selectedSizes.length +
    (priceRange < maxPriceLimit ? 1 : 0) +
    (searchQuery && searchQuery.trim() !== '' ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }

      // 2. Silhouette / Styles Filter
      if (selectedStyles.length > 0) {
        const productStyles = [
          product.defaultStyle,
          ...(product.styles || [])
        ].filter(Boolean).map(s => s.toLowerCase());

        const hasMatch = selectedStyles.some(sel =>
          productStyles.some(ps => ps.includes(sel.toLowerCase()) || sel.toLowerCase().includes(ps))
        );
        if (!hasMatch) return false;
      }

      // 3. Work / Craftsmanship Filter
      if (selectedWorks.length > 0) {
        const productWorks = [
          product.defaultWork,
          ...(product.works || [])
        ].filter(Boolean).map(w => w.toLowerCase());

        const hasMatch = selectedWorks.some(sel =>
          productWorks.some(pw => pw.includes(sel.toLowerCase()) || sel.toLowerCase().includes(pw))
        );
        if (!hasMatch) return false;
      }

      // 5. Color Filter
      if (selectedColors.length > 0) {
        const productColors = (product.colors || []).map(c => c.name.toLowerCase());
        const hasMatch = selectedColors.some(sel =>
          productColors.some(pc => pc.includes(sel.toLowerCase()) || sel.toLowerCase().includes(pc))
        );
        if (!hasMatch) return false;
      }

      // 6. Size Filter
      if (selectedSizes.length > 0) {
        const productSizes = product.sizes || [];
        const hasMatch = selectedSizes.some(sel =>
          productSizes.some(ps => ps.includes(sel))
        );
        if (!hasMatch) return false;
      }

      // 7. Price Range
      if (product.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'latest':
        case 'date-new':
          return 0;
        case 'alpha-az':
          return a.name.localeCompare(b.name);
        case 'alpha-za':
          return b.name.localeCompare(a.name);
        case 'featured':
        default:
          return 0;
      }
    });
  }, [
    PRODUCTS,
    searchQuery,
    selectedStyles,
    selectedWorks,
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy
  ]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1E141B] pb-20 font-semibold">
      
      {/* 1. Header Banner */}
      <div className="pt-6 pb-4 sm:pt-8 sm:pb-5 px-4 max-w-7xl mx-auto text-center">
        {/* Collection Title / Dynamic search or filter term */}
        <div className="inline-flex items-center justify-center gap-2.5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.08em] uppercase text-[#1E141B] drop-shadow-xs">
            {pageTitle}
          </h1>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="p-1 rounded-full text-stone-500 hover:text-[#1E141B] hover:bg-stone-200 transition-colors cursor-pointer"
              title="Clear all filters"
              aria-label="Clear all filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Collection Sticky Toolbar (Filter, Sort, Count, Layout Switchers) */}
      <div className="sticky top-[60px] sm:top-[70px] z-30 bg-white/95 backdrop-blur-md border-y border-stone-200 px-4 sm:px-8 text-[#1E141B] font-semibold shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 sm:h-14">
          
          {/* Left Buttons: Filter & Sort */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="flex items-center gap-2 text-xs sm:text-[13px] uppercase tracking-[0.08em] font-bold text-[#1E141B] hover:text-[#7A0648] transition-colors cursor-pointer"
              aria-label="Open filter drawer"
            >
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#7A0648] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-stone-300 hidden sm:inline">|</span>

            {/* Sort Popover Dropdown */}
            <div className="relative" ref={sortMenuRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 text-xs sm:text-[13px] uppercase tracking-[0.08em] font-bold text-[#1E141B] hover:text-[#7A0648] transition-colors cursor-pointer"
                aria-label="Sort options"
              >
                <span>Sort by</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} strokeWidth={1.75} />
              </button>

              {isSortOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-stone-200 shadow-xl py-2 z-50 animate-fade-in rounded-none text-[#1E141B] font-semibold">
                  <div className="px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-stone-500 border-b border-stone-100">
                    Sort by
                  </div>
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wide flex items-center justify-between transition-colors cursor-pointer ${
                        sortBy === opt.id ? 'bg-[#F5EAF1] font-bold text-[#7A0648]' : 'text-stone-700 hover:bg-stone-100 font-semibold'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#7A0648]" strokeWidth={2} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Clear All in Sticky Toolbar */}
            {activeFiltersCount > 0 && (
              <>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-wider text-[#7A0648] hover:text-[#68043D] underline font-bold cursor-pointer"
                  title="Clear all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear all</span>
                </button>
              </>
            )}

          </div>

          {/* Right: Grid Layout Switchers */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Layout Toggle (1 col vs 2 cols) */}
            <div className="flex items-center sm:hidden border border-stone-300 bg-white">
              <button
                onClick={() => setMobileCols(1)}
                className={`p-1.5 transition-colors cursor-pointer ${mobileCols === 1 ? 'bg-[#7A0648] text-white' : 'text-stone-500 hover:text-[#1E141B]'}`}
                aria-label="1 column mobile view"
              >
                <Square className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setMobileCols(2)}
                className={`p-1.5 transition-colors cursor-pointer ${mobileCols === 2 ? 'bg-[#7A0648] text-white' : 'text-stone-500 hover:text-[#1E141B]'}`}
                aria-label="2 columns mobile view"
              >
                <Grid2X2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Desktop Layout Toggle (2, 3, 4 cols) */}
            <div className="hidden sm:flex items-center border border-stone-300 bg-white">
              <button
                onClick={() => setDesktopCols(2)}
                className={`p-1.5 transition-colors cursor-pointer ${desktopCols === 2 ? 'bg-[#7A0648] text-white' : 'text-stone-500 hover:text-[#1E141B]'}`}
                title="2 columns view"
                aria-label="2 columns desktop view"
              >
                <Grid2X2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setDesktopCols(3)}
                className={`p-1.5 transition-colors cursor-pointer ${desktopCols === 3 ? 'bg-[#7A0648] text-white' : 'text-stone-500 hover:text-[#1E141B]'}`}
                title="3 columns view"
                aria-label="3 columns desktop view"
              >
                <Grid3X3 className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setDesktopCols(4)}
                className={`p-1.5 transition-colors cursor-pointer ${desktopCols === 4 ? 'bg-[#7A0648] text-white' : 'text-stone-500 hover:text-[#1E141B]'}`}
                title="4 columns view"
                aria-label="4 columns desktop view"
              >
                <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${
              // Mobile cols
              mobileCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
            } ${
              // Desktop cols
              desktopCols === 2
                ? 'sm:grid-cols-2'
                : desktopCols === 4
                ? 'sm:grid-cols-3 lg:grid-cols-4'
                : 'sm:grid-cols-3'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-none border border-stone-200 shadow-md text-[#1E141B] font-semibold">
            <h3 className="text-base font-bold text-[#1E141B] uppercase tracking-wider">
              No abayas match your filters
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Try adjusting or clearing your active filters to see all available couture designs.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-6 py-2.5 bg-[#7A0648] hover:bg-[#68043D] text-white text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer border border-[#7A0648]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Facets / Filter Slideout Drawer (Exact BasicAbaya Drawer) */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          filterDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setFilterDrawerOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-in-out text-[#1E141B] font-semibold border-l border-stone-200 ${
            filterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#7A0648] text-white">
            <h2 className="text-sm font-bold tracking-[0.14em] uppercase text-white">
              Filters
            </h2>
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="p-1.5 text-white hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Close filters drawer"
            >
              <X className="w-5 h-5" strokeWidth={1.8} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-200">
            
            {/* Color Accordion */}
            <div className="p-6">
              <button
                onClick={() => toggleAccordion('color')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
              >
                <span>Color {selectedColors.length > 0 && `(${selectedColors.length})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.color ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {openAccordions.color && (
                <div className="pt-4 flex flex-wrap gap-2.5">
                  {COLOR_SWATCHES.map((swatch) => {
                    const isSelected = selectedColors.includes(swatch.name);
                    return (
                      <button
                        key={swatch.name}
                        onClick={() => toggleItem(selectedColors, setSelectedColors, swatch.name)}
                        className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center shrink-0 cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-[#7A0648] ring-offset-2 ring-offset-white scale-110'
                            : 'hover:scale-110'
                        } ${swatch.border ? 'border border-stone-300' : 'border border-black/10'}`}
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                        aria-label={`Filter by ${swatch.name}`}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${swatch.name === 'White' || swatch.name === 'Beige' || swatch.name === 'Silver' ? 'text-black' : 'text-white'}`}
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Silhouette / Cut Accordion */}
            <div className="p-6">
              <button
                onClick={() => toggleAccordion('style')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
              >
                <span>Silhouette / Cut {selectedStyles.length > 0 && `(${selectedStyles.length})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.style ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {openAccordions.style && (
                <div className="pt-3 space-y-2.5">
                  {ABAYA_STYLES.map((style) => {
                    const isChecked = selectedStyles.includes(style.name);
                    return (
                      <label
                        key={style.id}
                        className="flex items-center justify-between text-xs text-stone-700 cursor-pointer py-1 hover:text-[#7A0648] group font-semibold"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{style.name}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedStyles, setSelectedStyles, style.name)}
                          className="w-4 h-4 accent-[#7A0648] cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Craftsmanship / Work Accordion */}
            <div className="p-6">
              <button
                onClick={() => toggleAccordion('work')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
              >
                <span>Craftsmanship / Work {selectedWorks.length > 0 && `(${selectedWorks.length})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.work ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {openAccordions.work && (
                <div className="pt-3 space-y-2.5">
                  {ABAYA_WORKS.map((work) => {
                    const isChecked = selectedWorks.includes(work.name);
                    return (
                      <label
                        key={work.id}
                        className="flex items-center justify-between text-xs text-stone-700 cursor-pointer py-1 hover:text-[#7A0648] group font-semibold"
                      >
                        <span className="capitalize group-hover:translate-x-0.5 transition-transform">{work.name}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(selectedWorks, setSelectedWorks, work.name)}
                          className="w-4 h-4 accent-[#7A0648] cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Size Accordion */}
            <div className="p-6">
              <button
                onClick={() => toggleAccordion('size')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
              >
                <span>Size {selectedSizes.length > 0 && `(${selectedSizes.length})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.size ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {openAccordions.size && (
                <div className="pt-3 grid grid-cols-3 gap-2">
                  {['50', '52', '54', '56', '58', '60', 'Custom'].map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleItem(selectedSizes, setSelectedSizes, size)}
                        className={`py-2 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#7A0648] text-white border-[#7A0648] font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price Accordion */}
            <div className="p-6">
              <button
                onClick={() => toggleAccordion('price')}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
              >
                <span>Price {priceRange < maxPriceLimit && `(≤ ${formatPrice(priceRange)})`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.price ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>

              {openAccordions.price && (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>{formatPrice(minPriceLimit)}</span>
                    <span className="font-bold text-[#7A0648]">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min={minPriceLimit}
                    max={maxPriceLimit}
                    step="5"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#7A0648] cursor-pointer"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-stone-200 bg-[#FAF8F5] flex items-center gap-4">
            <button
              onClick={clearAllFilters}
              className="text-xs uppercase tracking-wider font-bold text-stone-600 hover:text-[#7A0648] underline cursor-pointer"
            >
              Clear all
            </button>
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="flex-1 py-3.5 bg-[#7A0648] text-white hover:bg-[#68043D] text-xs uppercase tracking-[0.14em] font-bold transition-colors cursor-pointer text-center shadow-md border border-[#7A0648]"
            >
              View results ({filteredProducts.length})
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
