import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    navigateTo
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);

  // Image handling
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const primaryImage = gallery[0] || product.image;
  const secondaryImage = gallery.length > 1 ? gallery[1] : primaryImage;

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  return (
    <div
      className="group flex flex-col bg-transparent text-center transition-all duration-300 relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box (Aspect Tall / 3:4) */}
      <div
        className="relative aspect-[3/4] bg-[#68043D] overflow-hidden cursor-pointer shadow-sm border border-white/10"
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

        {/* Badges (Top Left) - Only Sale if on discount */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="bg-[#E32C2B] text-white text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-bold px-2 py-0.5 shadow-sm">
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Product Card Details (Centered) */}
      <div className="pt-3 pb-2 px-1 flex flex-col items-center justify-center space-y-1 bg-transparent">
        
        {/* Title */}
        <h3
          className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-white uppercase tracking-[0.04em] hover:text-white/80 transition-opacity cursor-pointer line-clamp-1 leading-snug px-1 text-center"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>

        {/* Price display: From AED 300.00 */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] sm:text-[13px] text-white">
          <span className="text-white/80 text-[11px] font-medium">From</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-white/60 line-through tabular-nums text-[11px]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-bold tabular-nums tracking-tight text-white">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Star Rating Badge */}
        <div className="flex items-center justify-center gap-1 pt-0.5">
          <div className="flex items-center text-[#FFD700]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700]" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[10px] text-white/90 tracking-wider font-semibold">
            ({Number(product.rating || 5.0).toFixed(1)})
          </span>
        </div>

      </div>
    </div>
  );
}


