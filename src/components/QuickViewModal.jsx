import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, ArrowRight, Scissors } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ABAYA_STYLES, ABAYA_WORKS } from '../data/products';

function QuickViewModalContent({ product, onClose }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo
  } = useShop();

  const [selectedStyle, setSelectedStyle] = useState(product.defaultStyle || ABAYA_STYLES[0].name);
  const [selectedWork, setSelectedWork] = useState(product.defaultWork || ABAYA_WORKS[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Size 54 (54")');
  const [customMeasurements, setCustomMeasurements] = useState({ height: '', bust: '', length: '' });
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : (product.image ? [product.image] : []);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    const isCustom = selectedSize.toLowerCase().includes('custom');
    addToCart(
      product,
      'Standard',
      '#1c1c1c',
      selectedSize,
      quantity,
      images[activeImageIdx],
      selectedStyle,
      selectedWork,
      isCustom ? customMeasurements : null
    );
    onClose();
  };

  const handleFullDetail = () => {
    navigateTo('product-detail', product.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-[#68043D] text-white rounded-none max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-white/20 animate-fade-in my-auto font-semibold">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-none bg-white text-[#7A0648] border border-white hover:bg-white/90 flex items-center justify-center transition-colors cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={1.8} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Gallery (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-6 bg-[#580233] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/20">
            <div className="relative aspect-[3/4] max-h-[320px] md:max-h-none bg-black/10 rounded-none overflow-hidden shadow-sm">
              <img
                src={images[activeImageIdx] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="badge-custom absolute top-3 left-3 bg-[#E32C2B] text-white text-[9px] px-2 py-0.5 uppercase tracking-wider font-bold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 pt-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-none overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      activeImageIdx === idx ? 'border-white ring-2 ring-white' : 'border-white/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Badge */}
            <div className="mt-3 p-2.5 bg-white/10 border border-white/20 flex items-center gap-2 text-[11px] uppercase tracking-wide text-white">
              <Scissors className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={1.5} />
              <span className="font-semibold">Bespoke Customization Options Available</span>
            </div>
          </div>

          {/* Right: Info & Selectors (7 cols) */}
          <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-[#68043D] text-white font-semibold">
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-white/90">
                    {product.category || 'Abaya'} • {selectedStyle}
                  </span>
                  <div className="flex items-center gap-1 text-[#FFD700] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" strokeWidth={1} />
                    <span className="font-bold text-white">{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2.5 pt-0.5">
                  <span className="text-lg sm:text-xl font-bold text-white tabular-nums tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-white/70 line-through tabular-nums font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Category Style Selector */}
              <div className="space-y-1.5 pt-2 border-t border-white/20">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="font-semibold text-white/90">1. Style:</span>
                  <span className="font-bold text-white">{selectedStyle}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.name)}
                      className={`px-2.5 py-2 text-[11px] uppercase tracking-wide font-semibold rounded-none text-left transition-all border leading-tight cursor-pointer ${
                        selectedStyle.toLowerCase() === s.name.toLowerCase()
                          ? 'bg-white text-[#7A0648] border-white shadow-sm font-bold'
                          : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Work Selector */}
              <div className="space-y-1.5 pt-2 border-t border-white/20">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="font-semibold text-white/90">2. Work:</span>
                  <span className="font-bold text-white">{selectedWork}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_WORKS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWork(w.name)}
                      className={`px-2.5 py-2 text-[11px] uppercase tracking-wide font-semibold rounded-none text-left transition-all border leading-tight capitalize cursor-pointer ${
                        selectedWork.toLowerCase() === w.name.toLowerCase()
                          ? 'bg-white text-[#7A0648] border-white shadow-sm font-bold'
                          : 'bg-white/15 text-white border-white/25 hover:bg-white/25'
                      }`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Abaya Length & Sizing */}
              <div className="space-y-1.5 pt-2 border-t border-white/20">
                <span className="block text-xs uppercase tracking-wider font-semibold text-white/90">3. Length / Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full text-xs py-2 px-2.5 bg-[#580233] border border-white/30 rounded-none font-bold focus:outline-none focus:border-white uppercase text-white cursor-pointer"
                >
                  {(product.sizes || []).map((s) => (
                    <option key={s} value={s} className="bg-[#68043D] text-white font-semibold">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSize.toLowerCase().includes('custom') && (
                <div className="p-2.5 bg-white/10 rounded-none border border-white/20 space-y-1.5 animate-fade-in text-[11px]">
                  <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-white">
                    <Scissors className="w-3 h-3" strokeWidth={1.5} />
                    <span>Custom Measurements:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <input
                      type="text"
                      placeholder="Height (e.g. 164cm)"
                      value={customMeasurements.height}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, height: e.target.value }))}
                      className="bg-[#580233] border border-white/30 text-white placeholder-white/70 font-semibold rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-white"
                    />
                    <input
                      type="text"
                      placeholder="Bust (e.g. 38in)"
                      value={customMeasurements.bust}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, bust: e.target.value }))}
                      className="bg-[#580233] border border-white/30 text-white placeholder-white/70 font-semibold rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-white"
                    />
                    <input
                      type="text"
                      placeholder="Length (e.g. 56in)"
                      value={customMeasurements.length}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, length: e.target.value }))}
                      className="bg-[#580233] border border-white/30 text-white placeholder-white/70 font-semibold rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-white/20">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-white hover:bg-white/90 text-[#7A0648] text-xs uppercase tracking-[0.14em] font-bold transition-colors flex items-center justify-center gap-2 border border-white shadow-xl cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#7A0648]" strokeWidth={1.5} />
                  <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border rounded-none transition-colors cursor-pointer ${
                    wishlisted
                      ? 'bg-white text-[#7A0648] border-white shadow-sm'
                      : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#7A0648] text-[#7A0648]' : ''}`} strokeWidth={1.5} />
                </button>
              </div>

              <button
                onClick={handleFullDetail}
                className="w-full text-center text-xs text-white hover:text-white/80 font-bold uppercase tracking-wider flex items-center justify-center gap-1 py-1 cursor-pointer"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useShop();

  // Prevent background scroll when quick view modal is open
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  return (
    <QuickViewModalContent
      product={quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
    />
  );
}

