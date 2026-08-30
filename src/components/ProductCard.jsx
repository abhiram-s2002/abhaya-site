import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentImage = product.gallery && product.gallery[currentColor.imageIndex]
    ? product.gallery[currentColor.imageIndex]
    : product.image;

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(
      product,
      currentColor.name,
      currentColor.hex,
      product.sizes[0],
      1,
      currentImage,
      product.defaultStyle,
      product.defaultWork
    );
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-none overflow-hidden border border-[#E5E5E5] hover:border-[#1C1C1C] transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Box */}
      <div
        className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="badge-custom">
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="badge-sale">
              Sale
            </span>
          )}
          {product.stockCount <= 5 && (
            <span className="inline-flex items-center bg-[#F4EBE2] text-[#8C6D52] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-none">
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-[#1C1C1C] text-white'
              : 'bg-white/90 text-[#1C1C1C] hover:bg-white hover:scale-105'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} strokeWidth={1.5} />
        </button>

        {/* Mobile Quick Add Floating Button (Visible on mobile) */}
        <button
          onClick={handleQuickAdd}
          className="lg:hidden absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-none bg-[#1C1C1C] text-white flex items-center justify-center shadow transition-transform active:scale-95"
          title="Add to Bag"
          aria-label="Add to Bag"
        >
          <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>

        {/* Desktop Hover Action Overlay */}
        <div
          className={`hidden lg:flex absolute inset-x-2.5 bottom-2.5 gap-2 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 bg-white text-[#1C1C1C] border border-[#1C1C1C] text-[11px] uppercase tracking-wider font-medium rounded-none hover:bg-[#1C1C1C] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2.5 bg-[#1C1C1C] text-white hover:bg-black text-[11px] rounded-none flex items-center justify-center transition-colors"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
        
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#707070]">
            <span className="uppercase tracking-widest font-medium text-[#707070]">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[#1C1C1C]">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#1C1C1C] text-[#1C1C1C]" strokeWidth={1} />
              <span className="font-semibold text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            className="text-xs sm:text-[13px] font-medium text-[#1C1C1C] uppercase tracking-wider hover:text-[#707070] transition-colors cursor-pointer line-clamp-1 leading-snug"
            onClick={handleCardClick}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 text-[10px] text-[#707070] uppercase tracking-wide">
            <span className="font-normal">{product.defaultStyle || 'Open abaya'}</span>
            <span>•</span>
            <span className="capitalize">{product.defaultWork || 'plain'}</span>
          </div>
        </div>

        {/* Swatches and Price Row */}
        <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between gap-1">
          
          {/* Color Swatches */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-all border shrink-0 ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-[#1C1C1C] ring-offset-1 scale-110 border-transparent'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select ${c.name} shade`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1.5 shrink-0">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-[#8E8E8E] line-through tabular-nums hidden xs:inline">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs sm:text-[13px] font-semibold text-[#1C1C1C] tabular-nums tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

