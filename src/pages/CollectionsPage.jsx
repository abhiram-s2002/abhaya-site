import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ArrowRight,
  Check,
  Filter,
  X,
  Star,
  ShieldCheck,
  Shirt,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

// Local Assets matching the exact reference design
import openAbayaImg from '../assets/explore/open-abaya.jpg';
import closedCutImg from '../assets/explore/silhouette_closed_cut_1786950775902.jpg';
import kimonoKaftanImg from '../assets/explore/silhouette_kimono_kaftan_1786951078768.jpg';
import butterflyCutImg from '../assets/explore/silhouette_butterfly_cut_1786951741883.jpg';

import craftEmbroideryImg from '../assets/explore/craft_embroidery.jpg';
import craftHandworkImg from '../assets/explore/craft_handwork.jpg';
import craftStoneworkImg from '../assets/explore/craft_stonework.jpg';

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
    navigateTo,
    formatPrice
  } = useShop();

  // Active Filter States
  const [activeSilhouette, setActiveSilhouette] = useState('All');
  const [activeCraftsmanship, setActiveCraftsmanship] = useState('All');
  const [activeFabricFilter, setActiveFabricFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Sync external filters if passed via context
  useEffect(() => {
    if (selectedStyleFilter && selectedStyleFilter !== 'All') {
      setActiveSilhouette(selectedStyleFilter);
    }
  }, [selectedStyleFilter]);

  useEffect(() => {
    if (selectedWorkFilter && selectedWorkFilter !== 'All') {
      setActiveCraftsmanship(selectedWorkFilter);
    }
  }, [selectedWorkFilter]);

  useEffect(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'All') {
      setActiveFabricFilter(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  // 1. Explore by Silhouette Cards Data (Exact Screenshot items)
  const SILHOUETTE_CARDS = [
    {
      id: 'open-abaya',
      title: 'OPEN ABAYA',
      filterValue: 'Open abaya',
      image: openAbayaImg,
      description: 'Classic front-open silhouette designed for effortless layering & fluid movement.'
    },
    {
      id: 'closed-cut',
      title: 'CLOSED CUT',
      filterValue: 'Closed cut',
      image: closedCutImg,
      description: 'Traditional full-length continuous modest cut with seamless tailored lines.'
    },
    {
      id: 'kimono-kaftan',
      title: 'KIMONO & KAFTAN',
      filterValue: 'Kimono or kaftan',
      image: kimonoKaftanImg,
      description: 'Relaxed wide-sleeved drape offering contemporary royal elegance.'
    },
    {
      id: 'butterfly-cut',
      title: 'BUTTERFLY CUT',
      filterValue: 'Butterfly or farasha',
      image: butterflyCutImg,
      description: 'Sweeping winged farasha drape with regal volume and ceremonial presence.'
    }
  ];

  // 2. Explore by Craftsmanship Cards Data (Exact Screenshot items)
  const CRAFTSMANSHIP_CARDS = [
    {
      id: 'embroidery-abaya',
      title: 'EMBROIDERY ABAYA',
      filterValue: 'Embroidery Abaya',
      image: craftEmbroideryImg,
      description: 'Intricate artisanal floral and geometric needlework along cuffs and collar.'
    },
    {
      id: 'handwork-abaya',
      title: 'HANDWORK ABAYA',
      filterValue: 'Handwork Abaya',
      image: craftHandworkImg,
      description: 'Bespoke handcrafted zardozi embroidery with delicate micro-crystals and beads.'
    },
    {
      id: 'stonework-abaya',
      title: 'STONEWORK ABAYA',
      filterValue: 'Stonework Abaya',
      image: craftStoneworkImg,
      description: 'High-clarity light-reflecting crystals and stone embellishments for grand occasions.'
    }
  ];

  // Filtered Products for Live Product Grid
  const displayedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Silhouette Filter
      if (activeSilhouette !== 'All') {
        const matchesStyle =
          product.defaultStyle?.toLowerCase() === activeSilhouette.toLowerCase() ||
          product.styles?.some(s => s.toLowerCase() === activeSilhouette.toLowerCase());
        if (!matchesStyle) return false;
      }

      // Craftsmanship Filter
      if (activeCraftsmanship !== 'All') {
        const matchesWork =
          product.defaultWork?.toLowerCase() === activeCraftsmanship.toLowerCase() ||
          product.works?.some(w => w.toLowerCase() === activeCraftsmanship.toLowerCase());
        if (!matchesWork) return false;
      }

      // Fabric Filter
      if (activeFabricFilter !== 'All') {
        if (product.category !== activeFabricFilter) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [PRODUCTS, activeSilhouette, activeCraftsmanship, activeFabricFilter, sortBy]);

  const handleSilhouetteClick = (filterVal) => {
    if (activeSilhouette === filterVal) {
      setActiveSilhouette('All');
      setSelectedStyleFilter('All');
    } else {
      setActiveSilhouette(filterVal);
      setSelectedStyleFilter(filterVal);
      // Smooth scroll to catalog view
      const elem = document.getElementById('curated-catalog-view');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCraftsmanshipClick = (filterVal) => {
    if (activeCraftsmanship === filterVal) {
      setActiveCraftsmanship('All');
      setSelectedWorkFilter('All');
    } else {
      setActiveCraftsmanship(filterVal);
      setSelectedWorkFilter(filterVal);
      // Smooth scroll to catalog view
      const elem = document.getElementById('curated-catalog-view');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const resetAllFilters = () => {
    setActiveSilhouette('All');
    setActiveCraftsmanship('All');
    setActiveFabricFilter('All');
    setSelectedStyleFilter('All');
    setSelectedWorkFilter('All');
    setSelectedCategoryFilter('All');
    setSelectedColorFilter('All');
  };

  const isAnyFilterActive =
    activeSilhouette !== 'All' ||
    activeCraftsmanship !== 'All' ||
    activeFabricFilter !== 'All';

  return (
    <div className="min-h-screen bg-[#fff7fc] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-20 animate-fade-in pb-32">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (Exact Screenshot Style) */}
      {/* ========================================================================= */}
      <section className="text-center space-y-3.5 pt-4 sm:pt-8 max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2E1C1A] font-medium tracking-tight">
          Explore Collections
        </h1>
        
        <p className="text-xs sm:text-sm md:text-[15px] text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto px-4">
          Discover our curated selection of luxury abayas, categorized by distinctive silhouettes and exquisite craftsmanship.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: EXPLORE BY SILHOUETTE (Exact Screenshot 4-Column Grid) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        {/* Section Heading with subtle underline */}
        <div className="border-b border-stone-200/80 pb-2.5">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2E1C1A] font-normal tracking-tight">
            Explore by Silhouette
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {SILHOUETTE_CARDS.map((card) => {
            const isSelected = activeSilhouette === card.filterValue;
            return (
              <div
                key={card.id}
                onClick={() => handleSilhouetteClick(card.filterValue)}
                className={`group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden cursor-pointer transition-all duration-500 bg-stone-100 shadow-xs hover:shadow-xl ${
                  isSelected ? 'ring-3 ring-royal-violet shadow-lg' : ''
                }`}
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay at bottom for clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300" />

                {/* Selected Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-royal-violet text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
                    Selected
                  </div>
                )}

                {/* Text Label on bottom-left matching reference screenshot */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] drop-shadow-sm group-hover:text-gold-accent transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: EXPLORE BY CRAFTSMANSHIP (Exact Screenshot 3-Column Grid) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        {/* Section Heading with subtle underline */}
        <div className="border-b border-stone-200/80 pb-2.5">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2E1C1A] font-normal tracking-tight">
            Explore by Craftsmanship
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {CRAFTSMANSHIP_CARDS.map((card) => {
            const isSelected = activeCraftsmanship === card.filterValue;
            return (
              <div
                key={card.id}
                onClick={() => handleCraftsmanshipClick(card.filterValue)}
                className="group cursor-pointer space-y-3"
              >
                {/* Image Container */}
                <div
                  className={`relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden bg-stone-100 transition-all duration-500 shadow-xs hover:shadow-xl ${
                    isSelected ? 'ring-3 ring-royal-violet shadow-lg' : ''
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

                  {isSelected && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-royal-violet text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
                      Selected
                    </div>
                  )}
                </div>

                {/* Text Label Below Image (Exact Screenshot format) */}
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#2E1C1A] group-hover:text-royal-violet transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATED CATALOG VIEW (Interactive live product browsing) */}
      {/* ========================================================================= */}
      <section id="curated-catalog-view" className="pt-8 border-t border-stone-200/80 space-y-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2E1C1A]">
              Curated Selection
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {displayedProducts.length} luxury bespoke abayas
            </p>
          </div>

          {/* Quick Filter Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {isAnyFilterActive && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}

            {/* Quick Fabric Tabs */}
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs">
              {['All', 'Silk', 'Georgette', 'Chiffon', 'Modal Jersey'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFabricFilter(f)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeFabricFilter === f
                      ? 'bg-white text-stone-900 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {f === 'Modal Jersey' ? 'Modal' : f}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Badges */}
        {isAnyFilterActive && (
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-stone-400 font-semibold uppercase text-[10px] tracking-wider">
              Active:
            </span>
            {activeSilhouette !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-royal-violet/40 text-royal-violet font-semibold shadow-xs">
                Silhouette: {activeSilhouette}
                <button
                  onClick={() => {
                    setActiveSilhouette('All');
                    setSelectedStyleFilter('All');
                  }}
                  className="cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 hover:text-red-600 transition-colors" />
                </button>
              </span>
            )}
            {activeCraftsmanship !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-royal-violet/40 text-royal-violet font-semibold shadow-xs">
                Craftsmanship: {activeCraftsmanship}
                <button
                  onClick={() => {
                    setActiveCraftsmanship('All');
                    setSelectedWorkFilter('All');
                  }}
                  className="cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 hover:text-red-600 transition-colors" />
                </button>
              </span>
            )}
            {activeFabricFilter !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-300 text-stone-800 font-medium shadow-xs">
                Fabric: {activeFabricFilter}
                <button
                  onClick={() => setActiveFabricFilter('All')}
                  className="cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 hover:text-stone-900 transition-colors" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
            <p className="font-serif text-lg text-stone-800">
              No matching abayas found in this filter combination.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-royal-violet transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 5. LUXURY ATELIER GUARANTEE BANNER */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 bg-[#f5ecdf]/50 border border-[#e5d6c5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <ShieldCheck className="w-6 h-6 text-royal-violet shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              100% Certified Mulberry Silk
            </h4>
            <p className="text-[11px] text-stone-500">
              Grade 6A Oeko-Tex certified organic filaments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <Shirt className="w-6 h-6 text-royal-violet shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Bespoke Silhouettes & Works
            </h4>
            <p className="text-[11px] text-stone-500">
              7 signature cuts tailored to your height & preference
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <Star className="w-6 h-6 text-gold-accent shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              5,000+ Five-Star Reviews
            </h4>
            <p className="text-[11px] text-stone-500">
              Free tracked DHL worldwide delivery on all orders
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
