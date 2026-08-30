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

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(product.defaultStyle || ABAYA_STYLES[0].name);
  const [selectedWork, setSelectedWork] = useState(product.defaultWork || ABAYA_WORKS[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [customMeasurements, setCustomMeasurements] = useState({ height: '', bust: '', length: '' });
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const wishlisted = isWishlisted(product.id);

  const handleColorChange = (idx) => {
    setSelectedColorIdx(idx);
    const colorObj = product.colors[idx];
    if (colorObj && colorObj.imageIndex !== undefined && images[colorObj.imageIndex]) {
      setActiveImageIdx(colorObj.imageIndex);
    }
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
      <div className="relative bg-white rounded-none max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-[#E5E5E5] animate-fade-in my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-none bg-white text-[#1C1C1C] border border-[#E5E5E5] hover:border-[#1C1C1C] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Gallery (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-6 bg-[#FAFAFA] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E5E5]">
            <div className="relative aspect-[3/4] max-h-[320px] md:max-h-none bg-white rounded-none overflow-hidden border border-[#E5E5E5]">
              <img
                src={images[activeImageIdx] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="badge-custom absolute top-3 left-3">
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
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-none overflow-hidden border transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-[#1C1C1C] ring-1 ring-[#1C1C1C]' : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Badge */}
            <div className="mt-3 p-2.5 bg-white border border-[#E5E5E5] flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#707070]">
              <Scissors className="w-3.5 h-3.5 text-[#1C1C1C] shrink-0" strokeWidth={1.5} />
              <span>Bespoke Customization Options Available</span>
            </div>
          </div>

          {/* Right: Info & Selectors (7 cols) */}
          <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-white">
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium text-[#707070]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#1C1C1C] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#1C1C1C] text-[#1C1C1C]" strokeWidth={1} />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-xl font-medium uppercase tracking-wider text-[#1C1C1C] leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2.5 pt-0.5">
                  <span className="text-lg sm:text-xl font-semibold text-[#1C1C1C] tabular-nums tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-[#8E8E8E] line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Category Style Selector */}
              <div className="space-y-1.5 pt-2 border-t border-[#E5E5E5]">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="font-medium text-[#707070]">1. Style:</span>
                  <span className="font-semibold text-[#1C1C1C]">{selectedStyle}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStyle(s.name)}
                      className={`px-2.5 py-2 text-[11px] uppercase tracking-wide font-medium rounded-none text-left transition-all border leading-tight ${
                        selectedStyle.toLowerCase() === s.name.toLowerCase()
                          ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                          : 'bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#1C1C1C]'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Work Selector */}
              <div className="space-y-1.5 pt-2 border-t border-[#E5E5E5]">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="font-medium text-[#707070]">2. Work:</span>
                  <span className="font-semibold text-[#1C1C1C]">{selectedWork}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ABAYA_WORKS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWork(w.name)}
                      className={`px-2.5 py-2 text-[11px] uppercase tracking-wide font-medium rounded-none text-left transition-all border leading-tight capitalize ${
                        selectedWork.toLowerCase() === w.name.toLowerCase()
                          ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                          : 'bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#1C1C1C]'
                      }`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Shade & Size Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5E5E5]">
                {/* Shade Swatches */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs uppercase tracking-wider">
                    <span className="font-medium text-[#707070]">3. Shade:</span>
                    <span className="font-semibold text-[#1C1C1C]">{currentColor.name}</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(idx)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform border shrink-0 ${
                          selectedColorIdx === idx
                            ? 'ring-1 ring-[#1C1C1C] ring-offset-1 scale-110 border-transparent'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColorIdx === idx && (
                          <Check className="w-3 h-3 text-white drop-shadow-sm" strokeWidth={2} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Abaya Sizing */}
                <div className="space-y-1.5">
                  <span className="block text-xs uppercase tracking-wider font-medium text-[#707070]">Length / Size:</span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full text-xs py-2 px-2.5 bg-white border border-[#E5E5E5] rounded-none font-medium focus:outline-none focus:border-[#1C1C1C] uppercase"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedSize.toLowerCase().includes('custom') && (
                <div className="p-2.5 bg-[#FAFAFA] rounded-none border border-[#E5E5E5] space-y-1.5 animate-fade-in text-[11px]">
                  <div className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[#1C1C1C]">
                    <Scissors className="w-3 h-3" strokeWidth={1.5} />
                    <span>Custom Measurements:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <input
                      type="text"
                      placeholder="Height (e.g. 164cm)"
                      value={customMeasurements.height}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, height: e.target.value }))}
                      className="bg-white border border-[#E5E5E5] rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-[#1C1C1C]"
                    />
                    <input
                      type="text"
                      placeholder="Bust (e.g. 38in)"
                      value={customMeasurements.bust}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, bust: e.target.value }))}
                      className="bg-white border border-[#E5E5E5] rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-[#1C1C1C]"
                    />
                    <input
                      type="text"
                      placeholder="Length (e.g. 56in)"
                      value={customMeasurements.length}
                      onChange={(e) => setCustomMeasurements(prev => ({ ...prev, length: e.target.value }))}
                      className="bg-white border border-[#E5E5E5] rounded-none px-2 py-1 text-[11px] focus:outline-none focus:border-[#1C1C1C]"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-[#E5E5E5]">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border rounded-none transition-colors ${
                    wishlisted
                      ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                      : 'bg-white text-[#1C1C1C] border-[#E5E5E5] hover:border-[#1C1C1C]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} strokeWidth={1.5} />
                </button>
              </div>

              <button
                onClick={handleFullDetail}
                className="w-full text-center text-xs text-[#707070] hover:text-[#1C1C1C] font-medium uppercase tracking-wider flex items-center justify-center gap-1 py-1"
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

