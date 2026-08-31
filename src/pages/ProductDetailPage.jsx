import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  ArrowRight,
  Share2,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Layers,
  Sparkle,
  Info,
  Maximize2,
  X,
  Ruler,
  Globe,
  Award,
  Flame,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ABAYA_STYLES, ABAYA_WORKS, ABAYA_SIZES } from '../data/products';
import { formatSingleProductWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

// Standard Abaya Lengths matching basicabaya.com
const ABAYA_LENGTHS = [
  '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
];

export default function ProductDetailPage() {
  const {
    PRODUCTS,
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    showToast,
    currency
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Options state mirroring basicabaya.com
  const [selectedLength, setSelectedLength] = useState('54');
  const [hasButtons, setHasButtons] = useState('No'); // 'No' | 'Yes'
  const [sizeType, setSizeType] = useState('Free size'); // 'Free size' | 'Custom'
  const [customNotes, setCustomNotes] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(product.defaultStyle || ABAYA_STYLES[0].name);
  const [selectedWork, setSelectedWork] = useState(product.defaultWork || ABAYA_WORKS[0].name);

  // Gallery & Purchase states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [showLightboxModal, setShowLightboxModal] = useState(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const buyBoxRef = useRef(null);
  const reviewsSectionRef = useRef(null);

  // Accordion state (Prestige / Basic Abaya layout)
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    sizeChart: false,
    deliveryReturn: false,
    garmentCare: false,
  });

  // Customer Reviews state (Judge.me style)
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Hissa A.',
      location: 'Dubai, UAE',
      rating: 5,
      date: 'Verified Buyer • 3 days ago',
      title: 'Flawless Tafetta Drape',
      comment: 'Love it .. Thanks! The fabric quality is immaculate and the cut is modest yet supremely elegant. The drape flows effortlessly.'
    },
    {
      id: 2,
      author: 'Fatima Z.',
      location: 'Abu Dhabi, UAE',
      rating: 5,
      date: 'Verified Buyer • 1 week ago',
      title: 'As advertised. Supreme Quality',
      comment: 'As advertised. Good quality tafetta and candy crepe lining. Perfect length 54, sleeves are tailored just right.'
    },
    {
      id: 3,
      author: 'Mariam K.',
      location: 'Riyadh, KSA',
      rating: 5,
      date: 'Verified Buyer • 2 weeks ago',
      title: 'Bespoke fit & fast delivery',
      comment: 'Arrived in the signature keepsake box in under 3 days to Riyadh. The stitching detail along the cuffs is pure couture.'
    }
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    setSelectedLength('54');
    setHasButtons('No');
    setSizeType('Free size');
    setCustomNotes('');
    setSelectedStyle(product.defaultStyle || ABAYA_STYLES[0].name);
    setSelectedWork(product.defaultWork || ABAYA_WORKS[0].name);
    if (product?.reviews && Array.isArray(product.reviews) && product.reviews.length > 0) {
      setReviewsList(product.reviews);
    }
    setActiveImageIdx(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Monitor scroll position for mobile sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentColor = product.colors?.[0] || { name: 'Standard', hex: '#1C1C1C' };
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const wishlisted = isWishlisted(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToReviews = () => {
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    const isCustom = sizeType === 'Custom';
    const chosenSizeFormatted = `${sizeType} - Length ${selectedLength}" - Buttons: ${hasButtons}`;
    
    addToCart(
      product,
      currentColor.name,
      currentColor.hex,
      chosenSizeFormatted,
      quantity,
      images[activeImageIdx],
      selectedStyle,
      selectedWork,
      isCustom ? { customDetails: customNotes, length: selectedLength, buttons: hasButtons } : null
    );

    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 2000);
  };

  const handleWhatsAppInstantOrder = () => {
    const isCustom = sizeType === 'Custom';
    const chosenSizeFormatted = `${sizeType} (Length: ${selectedLength}", Buttons: ${hasButtons})`;
    const msg = formatSingleProductWhatsAppMessage({
      product,
      colorName: currentColor.name,
      size: chosenSizeFormatted,
      style: selectedStyle,
      work: selectedWork,
      quantity,
      customMeasurements: isCustom ? { customDetails: customNotes, length: selectedLength, buttons: hasButtons } : null,
      formatPrice
    });
    showToast(`Opening WhatsApp order for "${product.name}"...`);
    openWhatsApp(msg);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    const newEntry = {
      id: Date.now(),
      author: newReviewAuthor,
      location: 'Verified Buyer',
      rating: newReviewRating,
      date: 'Verified Buyer • Just now',
      title: newReviewTitle || 'Exquisite Abaya Quality',
      comment: newReviewComment
    };
    setReviewsList([newEntry, ...reviewsList]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-10 sm:space-y-16 animate-fade-in pb-28 lg:pb-16 text-white">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav className="flex items-center space-x-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/75 overflow-x-auto no-scrollbar py-1">
        <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors shrink-0 cursor-pointer">
          Home
        </button>
        <span className="text-white/40">/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors shrink-0 cursor-pointer">
          Abayas
        </button>
        <span className="text-white/40">/</span>
        <button
          onClick={() => navigateTo('shop', null, null, null, null, selectedStyle || product.defaultStyle)}
          className="hover:text-white transition-colors text-white font-medium shrink-0 cursor-pointer"
        >
          {selectedStyle || product.defaultStyle || 'Abaya'}
        </button>
        <span className="text-white/40">/</span>
        <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* 2. Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PRODUCT GALLERY (Prestige Stacked / Lightbox)                */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
          
          {/* Main Large Image Container */}
          <div className="relative aspect-[3/4] bg-black/15 overflow-hidden shadow-md group">
            <img
              src={images[activeImageIdx] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] cursor-zoom-in"
              onClick={() => setShowLightboxModal(true)}
            />

            {/* Badges Overlay - Only Sale if on discount */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="badge-sale text-[10px] tracking-widest uppercase">
                  Sale
                </span>
              </div>
            )}

            {/* Top Right Quick Actions (Share & Lightbox Zoom & Wishlist) */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
              <button
                onClick={() => setShowLightboxModal(true)}
                className="w-8 h-8 rounded-full bg-white text-[#7A0648] flex items-center justify-center transition-all hover:bg-white/90 shadow-sm cursor-pointer"
                title="Zoom picture"
                aria-label="Zoom image"
              >
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white text-[#7A0648] flex items-center justify-center transition-all hover:bg-white/90 shadow-sm cursor-pointer"
                title="Share product"
                aria-label="Share link"
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  wishlisted
                    ? 'bg-white text-[#7A0648]'
                    : 'bg-white text-[#7A0648] hover:bg-white/90'
                }`}
                title="Save to Wishlist"
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-[#7A0648]' : ''}`} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Carousel Arrow Controls */}
            {images.length > 1 && (
              <div className="sm:hidden absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="w-8 h-8 rounded-none bg-black/60 text-white border border-white/30 flex items-center justify-center pointer-events-auto shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="w-8 h-8 rounded-none bg-black/60 text-white border border-white/30 flex items-center justify-center pointer-events-auto shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Indicator Dots on Mobile */}
            {images.length > 1 && (
              <div className="sm:hidden absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIdx(idx); }}
                    className={`h-1 transition-all ${
                      activeImageIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Multi-angle Thumbnails Carousel */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-white ring-2 ring-white'
                      : 'border-white/25 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: PRODUCT INFO & BUY BOX                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6" ref={buyBoxRef}>
          
          {/* Header & Pricing */}
          <div className="space-y-2 pb-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-white/80">
                {product.category || 'Abaya'} • {selectedStyle || product.defaultStyle}
              </span>
              
              {/* Star Rating Badge */}
              <button
                onClick={scrollToReviews}
                className="flex items-center gap-1.5 text-xs text-white hover:text-white/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" strokeWidth={1} />
                  ))}
                </div>
                <span className="font-semibold">{product.rating || '5.0'}</span>
                <span className="text-white/70 group-hover:underline">({product.reviewsCount || '118'} reviews)</span>
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium uppercase tracking-wider leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-xl sm:text-2xl text-white font-semibold tabular-nums tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-white/60 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPTION 1: LENGTH (INCHES) SELECTOR (basicabaya.com Grid)                  */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider">
              <span className="text-white/80">
                Length: <strong className="text-white font-semibold">{selectedLength}</strong>
              </span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
              {ABAYA_LENGTHS.map((len) => {
                const isSelected = selectedLength === len;
                return (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`py-2 text-center text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#7A0648] border-2 border-white shadow-sm'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                  >
                    {len}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPTION 2: BUTTONS SELECTOR (No / Yes)                                     */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider">
              <span className="text-white/80">
                Buttons: <strong className="text-white font-semibold">{hasButtons}</strong>
              </span>
            </div>
            <div className="flex gap-2">
              {['No', 'Yes'].map((btnOption) => {
                const isSelected = hasButtons === btnOption;
                return (
                  <button
                    key={btnOption}
                    onClick={() => setHasButtons(btnOption)}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#7A0648] border-2 border-white shadow-sm'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                  >
                    {btnOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPTION 3: SIZE / FIT SELECTOR + SIZE CHART LINK                           */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider">
              <span className="text-white/80">
                Size: <strong className="text-white font-semibold">{sizeType}</strong>
              </span>
              <button
                onClick={() => setShowSizeGuideModal(true)}
                className="flex items-center gap-1 text-[11px] text-white hover:underline uppercase tracking-wider font-semibold cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Chart</span>
              </button>
            </div>
            
            <div className="flex gap-2">
              {['Free size', 'Custom'].map((fit) => {
                const isSelected = sizeType === fit;
                return (
                  <button
                    key={fit}
                    onClick={() => setSizeType(fit)}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#7A0648] border-2 border-white shadow-sm'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                  >
                    {fit}
                  </button>
                );
              })}
            </div>

            {/* Custom Sizing Input (shown only if Custom is selected) */}
            {sizeType === 'Custom' && (
              <div className="pt-2 animate-fade-in">
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Enter custom measurements (e.g., Bust, Sleeves, Hip, Length in inches)..."
                  rows={2}
                  className="w-full bg-white/20 text-white placeholder-white/60 text-xs p-2.5 border border-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>
            )}
          </div>

          {/* Social Proof Live Badge */}
          <div className="flex items-center gap-2 text-xs text-white/90 py-1">
            <Flame className="w-4 h-4 text-[#FFD700] fill-[#FFD700] animate-pulse" />
            <span>
              <strong>24 people</strong> have added this product to cart in the past week
            </span>
          </div>

          {/* ========================================================================= */}
          {/* QUANTITY & PRIMARY ACTION BUTTONS                                         */}
          {/* ========================================================================= */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              
              {/* Quantity Counter */}
              <div className="flex items-center border border-white/40 bg-white/10 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-base font-semibold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-base font-semibold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 uppercase text-xs sm:text-sm font-bold tracking-[0.1em] transition-all duration-200 cursor-pointer shadow-md ${
                  isAddedAnimation
                    ? 'bg-emerald-600 text-white border-2 border-emerald-500 scale-[1.01]'
                    : 'bg-white text-[#7A0648] hover:bg-white/90 active:scale-[0.99]'
                }`}
              >
                {isAddedAnimation ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Instant WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppInstantOrder}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 uppercase text-xs sm:text-sm font-semibold tracking-[0.08em] bg-white/20 text-white border border-white/50 hover:bg-white hover:text-[#7A0648] transition-all duration-200 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* ACCORDIONS / DETAILS SECTION                                              */}
          {/* ========================================================================= */}
          <div className="divide-y divide-white/20 border-y border-white/20 pt-2">
            
            {/* 1. Description Accordion */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-white py-1 cursor-pointer"
              >
                <span>Description & Fabric</span>
                {openAccordions.description ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.description && (
                <div className="pt-3 pb-2 space-y-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                  <p>{product.description}</p>
                  <div className="p-3 bg-white/10 border border-white/15 space-y-1.5 text-xs">
                    <p><strong>Fabric:</strong> {product.fabric || 'Tafetta & Candy Crepe'}</p>
                    <p><strong>Garment Care:</strong> Dry Clean recommended</p>
                    <p className="text-white/75 italic">
                      <strong>Note:</strong> Shaila exact color shade might differ slightly from displayed studio lighting.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Size Guide & Measurements Table Accordion */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('sizeChart')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-white py-1 cursor-pointer"
              >
                <span>Size Guide & Measurements</span>
                {openAccordions.sizeChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.sizeChart && (
                <div className="pt-3 pb-2 space-y-3 text-xs text-white/90">
                  <p className="text-[11px] text-white/80">
                    Standard basic abaya measurement chart (all measurements in inches):
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-white/20">
                      <thead className="bg-white/20 uppercase tracking-wider text-[10px] text-white font-semibold">
                        <tr>
                          <th className="p-2 border-b border-white/20">Length (inches)</th>
                          <th className="p-2 border-b border-white/20">Sleeves from neck</th>
                          <th className="p-2 border-b border-white/20">Chest Width</th>
                          <th className="p-2 border-b border-white/20">Height Guide</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/15">
                        <tr>
                          <td className="p-2 font-medium">49 - 51"</td>
                          <td className="p-2">23"</td>
                          <td className="p-2">26 - 27"</td>
                          <td className="p-2">4'10" – 5'0"</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">52 - 53"</td>
                          <td className="p-2">25"</td>
                          <td className="p-2">27"</td>
                          <td className="p-2">5'1" – 5'2"</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">54 - 55"</td>
                          <td className="p-2">26"</td>
                          <td className="p-2">27"</td>
                          <td className="p-2">5'3" – 5'4"</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">56 - 57"</td>
                          <td className="p-2">27"</td>
                          <td className="p-2">28"</td>
                          <td className="p-2">5'5" – 5'6"</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">58 - 60"</td>
                          <td className="p-2">28"</td>
                          <td className="p-2">28"</td>
                          <td className="p-2">5'7" – 5'10"+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Delivery & Returns Accordion */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('deliveryReturn')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-white py-1 cursor-pointer"
              >
                <span>Delivery & Return Policy</span>
                {openAccordions.deliveryReturn ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.deliveryReturn && (
                <div className="pt-3 pb-2 space-y-2 text-xs sm:text-sm text-white/90 leading-relaxed">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white/10 border border-white/15">
                      <p className="font-semibold text-white">🇦🇪 UAE Delivery</p>
                      <p className="text-white/80">Express delivery within 1 - 3 business days.</p>
                    </div>
                    <div className="p-2.5 bg-white/10 border border-white/15">
                      <p className="font-semibold text-white">🌍 Worldwide Shipping</p>
                      <p className="text-white/80">DHL Express delivery in 3 - 7 business days.</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/80 pt-1">
                    Free size abayas can be exchanged within 7 days of delivery. Custom-tailored pieces are made to order and non-refundable.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Garment Care Accordion */}
            <div className="py-3">
              <button
                onClick={() => toggleAccordion('garmentCare')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-white py-1 cursor-pointer"
              >
                <span>Garment Care & Steaming</span>
                {openAccordions.garmentCare ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.garmentCare && (
                <div className="pt-3 pb-2 space-y-2 text-xs text-white/90 leading-relaxed">
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>Dry clean strictly recommended for silk, tafetta, and crepe abayas.</li>
                    <li>Use a vertical garment steamer instead of hot contact iron.</li>
                    <li>Store in breathable garment bags away from direct sunlight.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. REVIEWS SECTION ("Let customers speak for us")                         */}
      {/* ========================================================================= */}
      <section ref={reviewsSectionRef} className="pt-8 sm:pt-14 border-t border-white/20 space-y-8">
        
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80">
            Verified Customer Reviews
          </p>
          <h2 className="text-xl sm:text-3xl font-medium tracking-wider uppercase text-white">
            Let Customers Speak For Us
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 text-sm">
            <div className="flex items-center text-[#FFD700]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" strokeWidth={1} />
              ))}
            </div>
            <span className="font-semibold text-white">5.0 / 5</span>
            <span className="text-white/70">based on {reviewsList.length + 115} reviews</span>
          </div>
        </div>

        {/* Rating Breakdown Bars & Write a Review Action */}
        <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/10 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="w-full sm:w-1/2 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-12 text-white/80">5 star</span>
              <div className="flex-1 h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-white w-[96%]" />
              </div>
              <span className="w-8 text-right font-medium">96%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-white/80">4 star</span>
              <div className="flex-1 h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-white w-[4%]" />
              </div>
              <span className="w-8 text-right font-medium">4%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-white/80">3 star</span>
              <div className="flex-1 h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-white w-[0%]" />
              </div>
              <span className="w-8 text-right font-medium">0%</span>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="py-2.5 px-6 bg-white text-[#7A0648] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-sm"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>
        </div>

        {/* Interactive Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="max-w-2xl mx-auto p-6 bg-white/15 border border-white/30 space-y-4 animate-fade-in">
            <h3 className="text-sm uppercase tracking-wider font-bold text-white text-center">
              Write Your Verified Review
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="cursor-pointer text-[#FFD700]"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReviewRating ? 'fill-[#FFD700]' : 'text-white/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={newReviewAuthor}
                onChange={(e) => setNewReviewAuthor(e.target.value)}
                placeholder="E.g., Hissa Al-Maktoum"
                className="w-full bg-white/20 text-white placeholder-white/60 text-xs p-2.5 border border-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                Review Title
              </label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="E.g., Beautiful flow & fabric"
                className="w-full bg-white/20 text-white placeholder-white/60 text-xs p-2.5 border border-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/80 mb-1">
                Review Content
              </label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your experience with the cut, fabric, and fit..."
                className="w-full bg-white/20 text-white placeholder-white/60 text-xs p-2.5 border border-white/40 focus:outline-none focus:border-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-[#7A0648] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-md"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-5 bg-white/10 border border-white/20 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#FFD700]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" strokeWidth={1} />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/60 uppercase tracking-wider">{rev.date}</span>
                </div>

                <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                  {rev.title}
                </h4>

                <p className="text-xs text-white/85 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">{rev.author}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-white/20 text-white uppercase tracking-wider">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. RELATED PRODUCTS / "YOU MAY ALSO LIKE" SECTION                         */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-14 border-t border-white/20 space-y-6">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80">
            Complementary Pieces
          </p>
          <h2 className="text-xl sm:text-2xl font-medium tracking-wider uppercase text-white">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((relProd) => (
            <ProductCard key={relProd.id} product={relProd} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. STICKY BOTTOM ACTION BAR (Mobile & Tablet)                             */}
      {/* ========================================================================= */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-[#7A0648] border-t border-white/30 p-3 z-40 lg:hidden shadow-2xl flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={images[activeImageIdx] || images[0]}
              alt=""
              className="w-11 h-13 object-cover border border-white/30 shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-semibold uppercase text-white truncate">{product.name}</p>
              <p className="text-xs font-bold text-white tabular-nums">{formatPrice(product.price)}</p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-white text-[#7A0648] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: SIZE CHART DIALOG                                               */}
      {/* ========================================================================= */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#7A0648] border border-white/30 text-white max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSizeGuideModal(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-base uppercase tracking-widest font-bold text-white">
                Abaya Size Guide
              </h3>
              <p className="text-xs text-white/80">
                Find your recommended abaya length based on your overall height.
              </p>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border border-white/25">
                <thead className="bg-white/20 uppercase tracking-wider text-[10px] text-white font-bold">
                  <tr>
                    <th className="p-2.5 border-b border-white/25">Abaya Length</th>
                    <th className="p-2.5 border-b border-white/25">Sleeves from Neck</th>
                    <th className="p-2.5 border-b border-white/25">Chest Width</th>
                    <th className="p-2.5 border-b border-white/25">Recommended Height</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  <tr>
                    <td className="p-2.5 font-bold">49 - 51"</td>
                    <td className="p-2.5">23"</td>
                    <td className="p-2.5">26 - 27"</td>
                    <td className="p-2.5">4'10" – 5'0" (148–152 cm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">52 - 53"</td>
                    <td className="p-2.5">25"</td>
                    <td className="p-2.5">27"</td>
                    <td className="p-2.5">5'1" – 5'2" (153–158 cm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">54 - 55"</td>
                    <td className="p-2.5">26"</td>
                    <td className="p-2.5">27"</td>
                    <td className="p-2.5">5'3" – 5'4" (159–163 cm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">56 - 57"</td>
                    <td className="p-2.5">27"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">5'5" – 5'6" (164–168 cm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">58 - 60"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">5'7" – 5'10"+ (169–178 cm)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-white/10 border border-white/20 text-xs space-y-1">
              <p className="font-semibold text-white">💡 Need a custom tailored fit?</p>
              <p className="text-white/80 text-[11px]">
                Choose <strong>Size: Custom</strong> and specify your exact bust, sleeve, and shoulder measurements in the order notes.
              </p>
            </div>

            <button
              onClick={() => setShowSizeGuideModal(false)}
              className="w-full py-2.5 bg-white text-[#7A0648] font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors cursor-pointer"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: LIGHTBOX FULL IMAGE ZOOM                                        */}
      {/* ========================================================================= */}
      {showLightboxModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setShowLightboxModal(false)}
        >
          <button
            onClick={() => setShowLightboxModal(false)}
            className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImageIdx] || images[0]}
              alt=""
              className="max-h-[85vh] w-auto object-contain shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
