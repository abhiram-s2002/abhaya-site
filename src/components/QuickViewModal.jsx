import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, ArrowRight, Scissors } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ABAYA_STYLES, ABAYA_WORKS } from '../data/products';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo
  } = useShop();

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

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(quickViewProduct.defaultStyle || ABAYA_STYLES[0].name);
  const [selectedWork, setSelectedWork] = useState(quickViewProduct.defaultWork || ABAYA_WORKS[0].name);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentColor = quickViewProduct.colors[selectedColorIdx] || quickViewProduct.colors[0];
  const images = quickViewProduct.gallery && quickViewProduct.gallery.length > 0
    ? quickViewProduct.gallery
    : [quickViewProduct.image];

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleColorChange = (idx) => {
    setSelectedColorIdx(idx);
    const colorObj = quickViewProduct.colors[idx];
    if (colorObj && colorObj.imageIndex !== undefined && images[colorObj.imageIndex]) {
      setActiveImageIdx(colorObj.imageIndex);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      quickViewProduct,
      currentColor.name,
      currentColor.hex,
      selectedSize,
      quantity,
      images[activeImageIdx],
      selectedStyle,
      selectedWork
    );
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    navigateTo('product-detail', quickViewProduct.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Box */}
      <div className="relative bg-[#fff7fc] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-surface-container-highest animate-fade-in my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-stone-600 hover:text-primary flex items-center justify-center shadow-md transition-colors active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Gallery (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-6 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-container-high">
            <div className="relative aspect-[3/4] max-h-[320px] md:max-h-none bg-stone-100 rounded-xl overflow-hidden border border-surface-container-highest">
              <img
                src={images[activeImageIdx] || images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 bg-primary text-gold-soft text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded shadow">
                  {quickViewProduct.badge}
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
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-royal-violet ring-1 ring-royal-violet' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Badge */}
            <div className="mt-3 p-2.5 rounded-lg bg-surface-container/60 border border-surface-container-highest flex items-center gap-2 text-[11px] text-stone-600">
              <Scissors className="w-3.5 h-3.5 text-royal-violet shrink-0" />
              <span>3 Bespoke Customization Options Available</span>
            </div>
          </div>

          {/* Right: Info & Selectors (7 cols) */}
          <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-royal-violet">
                    {quickViewProduct.category} Atelier
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">{quickViewProduct.rating}</span>
                  </div>
                </div>

                <h2 className="font-serif text-lg sm:text-2xl font-medium text-primary leading-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-baseline gap-2.5 pt-0.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-primary">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs sm:text-sm text-stone-400 line-through">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Category Style Selector */}
              <div className="space-y-1.5 pt-2 border-t border-surface-container-high">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-800">1. Category Style:</span>
                  <span className="font-medium text-royal-violet">{selectedStyle}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.name)}
                      className={`px-2 py-1.5 text-[11px] font-medium rounded text-left transition-all border leading-tight ${
                        selectedStyle.toLowerCase() === s.name.toLowerCase()
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'bg-white text-stone-700 border-surface-container-highest hover:border-royal-violet'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Work / Craftsmanship Selector */}
              <div className="space-y-1.5 pt-2 border-t border-surface-container-high">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-800">2. Work / Craftsmanship:</span>
                  <span className="font-medium text-royal-violet">{selectedWork}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_WORKS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWork(w.name)}
                      className={`px-2 py-1.5 text-[11px] font-medium rounded text-left transition-all border leading-tight capitalize ${
                        selectedWork.toLowerCase() === w.name.toLowerCase()
                          ? 'bg-royal-violet text-white border-royal-violet shadow-sm font-semibold'
                          : 'bg-white text-stone-700 border-surface-container-highest hover:border-royal-violet'
                      }`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Shade & Size Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-surface-container-high">
                {/* Shade Swatches */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-stone-800">3. Shade:</span>
                    <span className="font-semibold text-stone-600">{currentColor.name}</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                    {quickViewProduct.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(idx)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform border shrink-0 ${
                          selectedColorIdx === idx
                            ? 'ring-2 ring-royal-violet ring-offset-1 scale-110 border-transparent'
                            : 'border-black/10 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColorIdx === idx && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Abaya Sizing */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold text-stone-800">Length / Size:</span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full text-xs py-1.5 px-2 bg-white border border-surface-container-highest rounded font-medium focus:outline-none focus:border-royal-violet"
                  >
                    {quickViewProduct.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-surface-container-high">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    wishlisted
                      ? 'bg-royal-violet text-white border-royal-violet'
                      : 'bg-white text-stone-700 border-surface-container-highest hover:bg-surface-container'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleFullDetail}
                className="w-full text-center text-xs text-amethyst-soft hover:text-royal-violet font-semibold uppercase tracking-wider flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Bespoke Customizer & Fabric Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
