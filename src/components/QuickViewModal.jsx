import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

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
      images[activeImageIdx]
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
      <div className="relative bg-[#fff7fc] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-surface-container-highest animate-fade-in my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-stone-600 hover:text-primary flex items-center justify-center shadow-md transition-colors active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-container-high">
            <div className="relative aspect-[3/4] max-h-[300px] sm:max-h-none bg-stone-100 rounded-xl overflow-hidden border border-surface-container-highest">
              <img
                src={images[activeImageIdx] || images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 bg-primary text-gold-soft text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded">
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
          </div>

          {/* Right: Info & Actions */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-amethyst-soft">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">{quickViewProduct.rating}</span>
                  </div>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-medium text-primary leading-tight">
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

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Shade Selector */}
              <div className="space-y-2 pt-2 border-t border-surface-container-high">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-stone-700">Selected Shade:</span>
                  <span className="font-semibold text-royal-violet">{currentColor.name}</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(idx)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform border shrink-0 ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-royal-violet ring-offset-2 scale-110 border-transparent'
                          : 'border-black/10 hover:scale-105 active:scale-95'
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

              {/* Size Selector */}
              <div className="space-y-1.5">
                <span className="block text-xs font-medium text-stone-700">Dimensions:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-2 text-xs font-medium rounded text-left transition-colors border ${
                        selectedSize === s
                          ? 'bg-primary text-white border-primary shadow-sm font-semibold'
                          : 'bg-white text-stone-700 border-surface-container-highest hover:border-royal-violet'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-3 border-t border-surface-container-high">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 sm:py-3.5 bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 sm:p-3.5 rounded-lg border transition-colors ${
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
                <span>View Full Product Details & Fabric Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

