import React, { useState } from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    navigateTo,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentColor = product.colors?.[selectedColorIndex] || product.colors?.[0] || { name: 'Standard', hex: '#1c1c1c' };
  
  // Image handling
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const primaryImage = currentColor.imageIndex !== undefined && gallery[currentColor.imageIndex]
    ? gallery[currentColor.imageIndex]
    : gallery[0] || product.image;
    
  const secondaryImage = gallery.length > 1
    ? (currentColor.imageIndex !== undefined && gallery[(currentColor.imageIndex + 1) % gallery.length] ? gallery[(currentColor.imageIndex + 1) % gallery.length] : gallery[1])
    : primaryImage;

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group flex flex-col bg-white text-center transition-all duration-300 relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box (Aspect Tall / 3:4) */}
      <div
        className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ease-out ${
            isHovered && secondaryImage !== primaryImage ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Hover Image */}
        {secondaryImage && secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} - view 2`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#1C1C1C] text-white text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-medium px-2 py-0.5 shadow-sm">
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#E32C2B] text-white text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-medium px-2 py-0.5 shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-[#1C1C1C] text-white'
              : 'bg-white/80 backdrop-blur-xs text-[#1C1C1C] hover:bg-white hover:scale-105 shadow-xs'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} strokeWidth={1.5} />
        </button>

        {/* Quick Add / Choose options Button (+) Floating bottom-right */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white border border-[#E5E5E5] flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 group/btn"
          title="Choose options"
          aria-label="Choose options"
        >
          <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" strokeWidth={1.75} />
        </button>
      </div>

      {/* Product Card Details (Centered, BasicAbaya style) */}
      <div className="pt-3 pb-2 px-1 flex flex-col items-center justify-center space-y-1.5 bg-white">
        
        {/* Title */}
        <h3
          className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#1C1C1C] uppercase tracking-[0.04em] hover:opacity-75 transition-opacity cursor-pointer line-clamp-1 leading-snug px-1 text-center"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>

        {/* Price display: From AED 300.00 */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] sm:text-[13px] text-[#1C1C1C]">
          <span className="text-[#707070] text-[11px] font-normal">From</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[#8E8E8E] line-through tabular-nums text-[11px]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-semibold tabular-nums tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Star Rating Badge */}
        <div className="flex items-center justify-center gap-1 pt-0.5">
          <div className="flex items-center text-[#1C1C1C]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-[#1C1C1C] text-[#1C1C1C]" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[10px] text-[#707070] tracking-wider">
            ({Number(product.rating || 5.0).toFixed(1)})
          </span>
        </div>

      </div>
    </div>
  );
}


