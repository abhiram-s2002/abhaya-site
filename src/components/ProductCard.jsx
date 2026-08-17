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
      currentImage
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
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-surface-container-highest/80 shadow-subtle hover:shadow-luxury transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Box */}
      <div
        className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-primary/90 backdrop-blur-sm text-gold-soft text-[8px] sm:text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-sm">
              {product.badge}
            </span>
          )}
          {product.stockCount <= 5 && (
            <span className="bg-amber-800/90 backdrop-blur-sm text-white text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded shadow-sm">
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            wishlisted
              ? 'bg-royal-violet text-white scale-105'
              : 'bg-white/85 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-royal-violet active:scale-95'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Mobile Quick Add Floating Button (Visible on mobile) */}
        <button
          onClick={handleQuickAdd}
          className="lg:hidden absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-primary/90 hover:bg-royal-violet active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform backdrop-blur-sm"
          title="Add to Bag"
          aria-label="Add to Bag"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {/* Desktop Hover Action Overlay */}
        <div
          className={`hidden lg:flex absolute inset-x-3 bottom-3 gap-2 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur-sm hover:bg-white text-stone-800 text-[11px] uppercase tracking-wider font-semibold rounded shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2.5 bg-primary hover:bg-royal-violet text-white text-[11px] rounded shadow-md flex items-center justify-center transition-colors"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 bg-white">
        
        <div className="space-y-1 sm:space-y-1.5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500">
            <span className="uppercase tracking-widest font-semibold text-amethyst-soft">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-600">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            className="font-serif text-sm sm:text-base font-medium text-primary group-hover:text-royal-violet transition-colors cursor-pointer line-clamp-1 leading-snug"
            onClick={handleCardClick}
          >
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1 hidden sm:block">
            {product.subtitle}
          </p>
        </div>

        {/* Swatches and Price Row */}
        <div className="pt-1.5 sm:pt-2 border-t border-surface-container flex items-center justify-between gap-1">
          
          {/* Color Swatches */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all border shrink-0 ${
                  selectedColorIndex === idx
                    ? 'ring-2 ring-royal-violet ring-offset-1 scale-110 border-transparent'
                    : 'border-black/10 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select ${c.name} shade`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1 sm:space-x-1.5 shrink-0">
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through hidden xs:inline">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-serif text-xs sm:text-sm font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

