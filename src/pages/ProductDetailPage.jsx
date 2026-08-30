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
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ABAYA_STYLES, ABAYA_WORKS, ABAYA_SIZES } from '../data/products';
import { formatSingleProductWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function ProductDetailPage() {
  const {
    PRODUCTS,
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    showToast
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(product.defaultStyle || ABAYA_STYLES[0].name);
  const [selectedWork, setSelectedWork] = useState(product.defaultWork || ABAYA_WORKS[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const buyBoxRef = useRef(null);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    customization: true,
    fabric: false,
    styling: false,
    care: false,
    shipping: false,
  });

  // Review submission state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Amina B. (London)',
      rating: 5,
      date: 'Verified Buyer • 4 days ago',
      title: 'Bespoke fit in Butterfly cut with Stonework',
      comment: 'I ordered the Royal Violet with Farasha cut and Stonework. The drape flows like liquid silk and the crystals catch the ambient light so elegantly without being loud.'
    },
    {
      id: 2,
      author: 'Fatima Z. (Dubai)',
      rating: 5,
      date: 'Verified Buyer • 2 weeks ago',
      title: '2-Piece set with inner is unmatched luxury',
      comment: 'Arrived in the signature violet keepsake box. The 2-piece open cut with matching slip is effortlessly chic for formal events. Ordering the Espresso shade next.'
    }
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    setSelectedColorIdx(0);
    setSelectedStyle(product.defaultStyle || ABAYA_STYLES[0].name);
    setSelectedWork(product.defaultWork || ABAYA_WORKS[0].name);
    setSelectedSize(product.sizes[0]);
    setActiveImageIdx(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Monitor scroll position for mobile sticky purchase bar
  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 120);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const wishlisted = isWishlisted(product.id);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleColorChange = (idx) => {
    setSelectedColorIdx(idx);
    const colorObj = product.colors[idx];
    if (colorObj && colorObj.imageIndex !== undefined && images[colorObj.imageIndex]) {
      setActiveImageIdx(colorObj.imageIndex);
    }
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const [customMeasurements, setCustomMeasurements] = useState({ height: '', bust: '', length: '' });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    const isCustom = selectedSize.toLowerCase().includes('custom');
    addToCart(
      product,
      currentColor.name,
      currentColor.hex,
      selectedSize,
      quantity,
      images[activeImageIdx],
      selectedStyle,
      selectedWork,
      isCustom ? customMeasurements : null
    );
  };

  const handleWhatsAppInstantOrder = () => {
    const isCustom = selectedSize.toLowerCase().includes('custom');
    const msg = formatSingleProductWhatsAppMessage({
      product,
      colorName: currentColor.name,
      size: selectedSize,
      style: selectedStyle,
      work: selectedWork,
      quantity,
      customMeasurements: isCustom ? customMeasurements : null,
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
      rating: newReviewRating,
      date: 'Verified Buyer • Just now',
      title: newReviewTitle || 'Magnificent bespoke quality',
      comment: newReviewComment
    };
    setReviewsList([newEntry, ...reviewsList]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Thank you! Your verified review has been published.');
  };

  const currentStyleObj = ABAYA_STYLES.find(s => s.name.toLowerCase() === selectedStyle.toLowerCase()) || ABAYA_STYLES[0];
  const currentWorkObj = ABAYA_WORKS.find(w => w.name.toLowerCase() === selectedWork.toLowerCase()) || ABAYA_WORKS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-10 sm:space-y-16 animate-fade-in pb-28 lg:pb-16 text-white">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/80 overflow-x-auto no-scrollbar py-1">
        <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors shrink-0 cursor-pointer">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors shrink-0 cursor-pointer">
          Abaya Boutique
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', null, product.category)}
          className="hover:text-white transition-colors text-white font-medium shrink-0 cursor-pointer"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-white font-bold truncate max-w-[150px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Gallery Column (Desktop: 6 cols) */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4 lg:sticky lg:top-24">
          
          {/* Main Large Image Display */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-black/10 rounded-none overflow-hidden border border-white/20 shadow-md">
            <img
              src={images[activeImageIdx] || images[0]}
              alt={`${product.name} - ${currentColor.name}`}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.badge && (
                <span className="badge-custom">
                  {product.badge}
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="badge-sale bg-[#E32C2B] text-white text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold">
                  Sale
                </span>
              )}
            </div>

            {/* Top Right Actions */}
            <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 flex items-center gap-1.5 z-10">
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white text-[#2D143D] flex items-center justify-center transition-colors hover:bg-white/90 shadow-sm cursor-pointer"
                title="Share piece"
                aria-label="Share link"
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  wishlisted
                    ? 'bg-[#2D143D] text-white'
                    : 'bg-white text-[#2D143D] hover:bg-white/90'
                }`}
                title="Save to Wishlist"
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Carousel Arrow Controls */}
            {images.length > 1 && (
              <div className="sm:hidden absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                <button
                  onClick={prevImage}
                  className="w-8 h-8 rounded-none bg-[#D975BD]/90 text-white border border-white/40 flex items-center justify-center pointer-events-auto shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 text-white" strokeWidth={2} />
                </button>
                <button
                  onClick={nextImage}
                  className="w-8 h-8 rounded-none bg-[#D975BD]/90 text-white border border-white/40 flex items-center justify-center pointer-events-auto shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 text-white" strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Indicator Dots on Mobile */}
            {images.length > 1 && (
              <div className="sm:hidden absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-1 transition-all ${
                      activeImageIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Multi-angle Thumbnails Carousel */}
          {images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-none overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-white ring-2 ring-white'
                      : 'border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Value Points */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-white/90 uppercase tracking-wider">
            <div className="flex items-center gap-2 p-2.5 bg-[#C85DA9] border border-white/20">
              <Truck className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
              <span>Complimentary Express ($150+)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-[#C85DA9] border border-white/20">
              <Sparkles className="w-4 h-4 text-white shrink-0" strokeWidth={1.5} />
              <span>Bespoke Keepsake Box</span>
            </div>
          </div>

        </div>

        {/* Product Details & Purchase Actions Column (Desktop: 6 cols) */}
        <div className="lg:col-span-6 space-y-5" ref={buyBoxRef}>
          
          {/* Header & Pricing */}
          <div className="space-y-2 pb-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-white/80">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#FFD700] text-xs">
                <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" strokeWidth={1} />
                <span className="font-semibold text-white">{product.rating}</span>
                <span className="text-white/70">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium uppercase tracking-wider leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-white/80 tracking-wider uppercase font-normal">
              {product.subtitle}
            </p>

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

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* ========================================================================= */}
          {/* OPTION 1: CATEGORY STYLE / SILHOUETTE CUT */}
          {/* ========================================================================= */}
          <div className="space-y-2 bg-[#C85DA9] p-4 rounded-none border border-white/20 text-white">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider">
              <span className="font-semibold text-white">1. Category:</span>
              <span className="font-medium text-white bg-white/20 px-2 py-0.5 border border-white/25">
                {selectedStyle}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {ABAYA_STYLES.map((styleObj) => {
                const isSelected = selectedStyle.toLowerCase() === styleObj.name.toLowerCase();
                return (
                  <button
                    key={styleObj.id}
                    onClick={() => setSelectedStyle(styleObj.name)}
                    className={`p-2.5 text-left rounded-none transition-all border flex flex-col justify-between min-h-[58px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#2D143D] text-white border-[#2D143D] shadow-sm font-bold'
                        : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs uppercase tracking-wide font-medium leading-tight">{styleObj.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={2} />}
                    </div>
                    <span className={`text-[9px] uppercase tracking-wider font-normal mt-1 ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                      {styleObj.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPTION 2: WORK */}
          {/* ========================================================================= */}
          <div className="space-y-2 bg-[#C85DA9] p-4 rounded-none border border-white/20 text-white">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider">
              <span className="font-semibold text-white">2. Work:</span>
              <span className="font-medium text-white bg-white/20 px-2 py-0.5 border border-white/25">
                {selectedWork}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {ABAYA_WORKS.map((workObj) => {
                const isSelected = selectedWork.toLowerCase() === workObj.name.toLowerCase();
                return (
                  <button
                    key={workObj.id}
                    onClick={() => setSelectedWork(workObj.name)}
                    className={`p-2.5 text-left rounded-none transition-all border flex flex-col justify-between min-h-[58px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#2D143D] text-white border-[#2D143D] shadow-sm font-bold'
                        : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs uppercase tracking-wide font-medium leading-tight capitalize">{workObj.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={2} />}
                    </div>
                    <span className={`text-[9px] uppercase tracking-wider font-normal mt-1 ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                      {workObj.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OPTION 3: ABAYA SIZE & LENGTH + COLOR SWATCHES */}
          {/* ========================================================================= */}
          <div className="space-y-4 bg-[#C85DA9] p-4 rounded-none border border-white/20 text-white">
            
            {/* Color Swatches */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs uppercase tracking-wider">
                <span className="font-semibold text-white">3. Color Shade:</span>
                <span className="text-white/80">
                  <strong className="text-white font-semibold">{currentColor.name}</strong>
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border shrink-0 cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#C85DA9] scale-110 border-transparent'
                        : 'border-white/30 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColorIdx === idx && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow" strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing & Length Options */}
            <div className="space-y-2 pt-2 border-t border-white/20">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                <span className="font-medium text-white/80">Abaya Length / Size:</span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-white hover:underline text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3 h-3" strokeWidth={1.5} />
                  <span>Size Reference</span>
                </button>
              </div>

              {showSizeGuide && (
                <div className="p-3 bg-white/10 rounded-none border border-white/20 text-[11px] text-white/90 space-y-1 animate-fade-in uppercase tracking-wide">
                  <div className="font-bold text-white">Standard Length Reference:</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[10px]">
                    <div>• Size 52: Height 5'0" – 5'2"</div>
                    <div>• Size 54: Height 5'3" – 5'4"</div>
                    <div>• Size 56: Height 5'5" – 5'6"</div>
                    <div>• Size 58: Height 5'7" – 5'8"</div>
                    <div>• Size 60: Height 5'9"+</div>
                    <div>• Custom: Tailored dimensions</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-2 text-xs font-medium rounded-none text-center transition-all border uppercase tracking-wider cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#2D143D] text-white border-[#2D143D] shadow-sm font-bold'
                        : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {selectedSize.toLowerCase().includes('custom') && (
                <div className="p-3.5 bg-white/10 rounded-none border border-white/20 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                    <Scissors className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Enter Custom Measurements:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-medium text-white/80 mb-1">Height (e.g. 164cm)</label>
                      <input
                        type="text"
                        value={customMeasurements.height}
                        onChange={(e) => setCustomMeasurements(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="e.g. 164 cm"
                        className="w-full bg-[#B84E99] border border-white/30 text-white placeholder-white/60 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-medium text-white/80 mb-1">Bust (e.g. 38")</label>
                      <input
                        type="text"
                        value={customMeasurements.bust}
                        onChange={(e) => setCustomMeasurements(prev => ({ ...prev, bust: e.target.value }))}
                        placeholder="e.g. 38 inches"
                        className="w-full bg-[#B84E99] border border-white/30 text-white placeholder-white/60 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-medium text-white/80 mb-1">Length (e.g. 56")</label>
                      <input
                        type="text"
                        value={customMeasurements.length}
                        onChange={(e) => setCustomMeasurements(prev => ({ ...prev, length: e.target.value }))}
                        placeholder="e.g. 56 inches"
                        className="w-full bg-[#B84E99] border border-white/30 text-white placeholder-white/60 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-2.5 pt-2">
            <div className="flex gap-3">
              
              {/* Quantity counter */}
              <div className="flex items-center border border-white/30 rounded-none bg-[#C85DA9] px-2 py-2 text-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-white hover:text-white/70 px-2 font-medium text-base cursor-pointer"
                >
                  -
                </button>
                <span className="w-7 text-center text-xs font-semibold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-white hover:text-white/70 px-2 font-medium text-base cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2 !bg-[#2D143D] hover:!bg-[#1A0924] !text-white border border-white/20 shadow-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
              </button>

            </div>

            {/* Direct WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppInstantOrder}
              className="btn-secondary w-full flex items-center justify-center gap-2 !bg-white !text-[#2D143D] hover:!bg-white/90 border border-white shadow-md cursor-pointer font-bold"
            >
              <svg className="w-4 h-4 fill-current shrink-0 text-[#2D143D]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Instant WhatsApp Inquiry & Order</span>
            </button>
          </div>

          {/* Collapsible Accordions */}
          <div className="space-y-2.5 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/20">
            
            {/* Accordion 1: Fabric */}
            <div className="border border-white/20 rounded-none bg-[#C85DA9] overflow-hidden text-white">
              <button
                onClick={() => toggleAccordion('fabric')}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  Fabric & Master Tailoring
                </span>
                {openAccordions.fabric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.fabric && (
                <div className="px-4 sm:px-5 pb-4 text-xs text-white/90 leading-relaxed border-t border-white/20 pt-3 space-y-2">
                  <p>{product.fabricDetails}</p>
                  <p className="text-[11px] text-white/80">
                    • Certified Oeko-Tex Standard 100 non-toxic dyes.<br />
                    • Artisanal French seam finishes and reinforced modest cuts.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Styling */}
            <div className="border border-white/20 rounded-none bg-[#C85DA9] overflow-hidden text-white">
              <button
                onClick={() => toggleAccordion('styling')}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-white" />
                  Silhouette & Styling Advice
                </span>
                {openAccordions.styling ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.styling && (
                <div className="px-4 sm:px-5 pb-4 text-xs text-white/90 leading-relaxed border-t border-white/20 pt-3">
                  <p>{product.stylingAdvice}</p>
                </div>
              )}
            </div>

            {/* Accordion 3: Care */}
            <div className="border border-white/20 rounded-none bg-[#C85DA9] overflow-hidden text-white">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                  Longevity & Garment Care
                </span>
                {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.care && (
                <div className="px-4 sm:px-5 pb-4 text-xs text-white/90 leading-relaxed border-t border-white/20 pt-3">
                  <p>{product.careInstructions}</p>
                </div>
              )}
            </div>

            {/* Accordion 4: Shipping */}
            <div className="border border-white/20 rounded-none bg-[#C85DA9] overflow-hidden text-white">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-white" />
                  Packaging & Global Delivery
                </span>
                {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.shipping && (
                <div className="px-4 sm:px-5 pb-4 text-xs text-white/90 leading-relaxed border-t border-white/20 pt-3 space-y-1.5">
                  <p>
                    Every NOOR AL DHUHA Abaya arrives carefully hand-folded in acid-free tissue paper and enclosed inside our signature embossed violet keepsake box with bespoke satin ribbon.
                  </p>
                  <p className="text-[11px] text-white/80">
                    • Dispatch: 24–48 hours via DHL Express Worldwide.<br />
                    • Returns: 30 days complimentary exchange privilege.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Customer Reviews & Feedback Section */}
      {/* Customer Reviews & Feedback Section */}
      <section className="bg-[#C85DA9] rounded-none p-5 sm:p-10 lg:p-12 border border-white/20 shadow-md space-y-6 sm:space-y-8 text-white">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4 sm:pb-6">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-white/80">
              Patron Testimonials
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium uppercase tracking-wider">
              Verified Client Reviews
            </h3>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-[#2D143D] hover:bg-white/90 text-xs uppercase tracking-wider font-bold rounded-none transition-colors active:scale-95 self-start sm:self-auto cursor-pointer shadow-sm"
          >
            {showReviewForm ? 'Cancel Review' : 'Write A Review'}
          </button>
        </div>

        {/* Review Submission Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="p-4 sm:p-6 bg-[#B84E99] rounded-none border border-white/20 space-y-4 animate-fade-in text-white">
            <h4 className="text-base sm:text-lg text-white font-medium uppercase tracking-wide">Share Your Experience with {product.name}</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Layla M."
                  className="w-full px-3 py-2 text-xs bg-white text-[#2D143D] border border-white/30 rounded-none focus:outline-none focus:border-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white text-[#2D143D] border border-white/30 rounded-none focus:outline-none focus:border-white font-medium cursor-pointer"
                >
                  <option value={5}>⭐️⭐️⭐️⭐️⭐️ (5 - Extraordinary)</option>
                  <option value={4}>⭐️⭐️⭐️⭐️ (4 - Very Good)</option>
                  <option value={3}>⭐️⭐️⭐️ (3 - Average)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 mb-1">Headline</label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Incredible liquid drape and custom cut"
                className="w-full px-3 py-2 text-xs bg-white text-[#2D143D] border border-white/30 rounded-none focus:outline-none focus:border-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 mb-1">Your Detailed Review</label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your thoughts on the cut silhouette, craftsmanship, silk weight, fit..."
                className="w-full px-3 py-2 text-xs bg-white text-[#2D143D] border border-white/30 rounded-none focus:outline-none focus:border-white font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2D143D] hover:bg-[#1A0924] text-white text-xs uppercase tracking-widest font-bold rounded-none transition-colors active:scale-95 cursor-pointer shadow-md"
            >
              Submit Verified Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="p-4 sm:p-6 rounded-none bg-[#B84E99] border border-white/20 space-y-2.5 sm:space-y-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[#FFD700]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/70 font-medium">{rev.date}</span>
              </div>
              <h5 className="text-sm sm:text-base text-white font-semibold uppercase tracking-wide">{rev.title}</h5>
              <p className="text-xs text-white/90 leading-relaxed italic">"{rev.comment}"</p>
              <div className="pt-1.5 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>{rev.author}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Related Products 2-Column Mobile Grid */}
      <section className="space-y-4 sm:space-y-8 pt-4 sm:pt-8 border-t border-white/20">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-white/80">
              Curated Harmonies
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium mt-0.5 uppercase tracking-wider">
              Complete Your Wardrobe
            </h3>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-white hover:text-white/80 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky Mobile Purchase Bar (Visible on mobile when scrolled past main buy box) */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-[#C85DA9]/95 backdrop-blur-md border-t border-white/20 px-4 py-2.5 shadow-xl animate-fade-in text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={images[activeImageIdx] || images[0]}
                alt=""
                className="w-10 h-12 object-cover rounded-none bg-black/10 shrink-0 border border-white/20"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-white truncate uppercase">{product.name}</h4>
                <p className="text-[10px] text-white/80 truncate">{selectedStyle} • {selectedWork}</p>
                <p className="text-xs font-bold text-white">{formatPrice(product.price * quantity)}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-4 py-2.5 bg-[#2D143D] hover:bg-[#1A0924] active:scale-95 text-white text-xs uppercase tracking-wider font-bold rounded-none shadow-md flex items-center gap-1.5 shrink-0 border border-white/20 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
