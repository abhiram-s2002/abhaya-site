import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatCartWhatsAppMessage, openWhatsApp, WHATSAPP_PHONE_DISPLAY } from '../utils/whatsapp';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    rawCartSubtotal,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingDifference,
    navigateTo,
    showToast,
    userLocation
  } = useShop();

  const [copied, setCopied] = useState(false);

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToWhatsApp = () => {
    if (cart.length === 0) return;

    const message = formatCartWhatsAppMessage({
      cart,
      rawCartSubtotal,
      cartSubtotal,
      freeShippingThreshold,
      formatPrice,
      userLocation
    });

    showToast('Opening WhatsApp with your bespoke order details...');
    openWhatsApp(message);
  };

  const handleCopyOrderText = () => {
    if (cart.length === 0) return;

    const message = formatCartWhatsAppMessage({
      cart,
      rawCartSubtotal,
      appliedDiscount,
      discountCodeName,
      cartSubtotal,
      freeShippingThreshold,
      formatPrice,
      userLocation
    });

    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      showToast('Order summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      showToast('Unable to copy order text', 'error');
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-[#C85DA9] text-white shadow-2xl flex flex-col justify-between animate-slide-in-right border-l border-white/20 pb-safe">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-[#C85DA9]">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <ShoppingBag className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
              <h2 className="text-sm sm:text-base font-medium tracking-wider text-white uppercase">Your Shopping Bag</h2>
              <span className="text-[10px] sm:text-[11px] bg-white text-[#2D143D] px-2 py-0.5 rounded-none font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-white hover:text-white/70 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Content Area */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">

            {/* Items List */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-3.5 sm:p-5 space-y-3.5 divide-y divide-white/20">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-none bg-white/10 flex items-center justify-center text-white">
                    <ShoppingBag className="w-7 h-7" strokeWidth={1.25} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base uppercase tracking-wider font-medium text-white">Your bag is currently empty</p>
                    <p className="text-xs text-white/80">Explore our luxury abayas and seasonal collections.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('shop');
                    }}
                    className="btn-primary inline-block mt-3 !bg-white !text-[#2D143D] hover:!bg-[#2D143D] hover:!text-white border border-white"
                  >
                    Explore Boutique
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="pt-3.5 first:pt-0 flex items-center gap-3 w-full min-w-0">
                    {/* Product Thumbnail with fixed constraints */}
                    <div
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-none bg-white/10 overflow-hidden shrink-0 border border-white/20 relative shadow-sm cursor-pointer"
                      onClick={() => { setIsCartOpen(false); navigateTo('product-detail', item.productId); }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-1.5">
                          <h3
                            className="text-xs sm:text-[13px] uppercase tracking-wide font-medium text-white hover:text-white/80 transition-colors cursor-pointer leading-tight truncate"
                            onClick={() => { setIsCartOpen(false); navigateTo('product-detail', item.productId); }}
                            title={item.name}
                          >
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/70 hover:text-red-200 transition-colors p-0.5 shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] uppercase text-white/85">
                          {item.style && (
                            <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-none font-medium truncate max-w-[140px]">
                              {item.style}
                            </span>
                          )}
                          <span className="bg-white/10 text-white px-1.5 py-0.5 rounded-none font-medium truncate max-w-[160px]">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 gap-2">
                        <div className="flex items-center border border-white/30 rounded-none bg-[#B84E99] text-white shrink-0">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-white hover:text-white/70 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <span className="px-1.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-white hover:text-white/70 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-semibold text-white tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[9px] text-white/70 tabular-nums">
                              {formatPrice(item.price)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & WhatsApp Order Controls */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-white/20 bg-[#B84E99] space-y-3 text-white">
                
                {/* Pricing Breakdown */}
                <div className="space-y-1 text-xs text-white/90 uppercase tracking-wide">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{formatPrice(rawCartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <span>Estimated Shipping</span>
                      {userLocation?.country && (
                        <span className="text-[10px] text-white bg-white/20 px-1.5 py-0.5 rounded-none border border-white/25 inline-flex items-center gap-1 font-medium">
                          <span>{userLocation.flag}</span>
                          <span className="truncate max-w-[80px]">{userLocation.countryCode === 'IN' ? 'India' : userLocation.country}</span>
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-white">
                      {formatPrice(15)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/20 tabular-nums">
                    <span>Estimated Total</span>
                    <span>
                      {formatPrice(cartSubtotal + 15)}
                    </span>
                  </div>
                </div>

                {/* Proceed to WhatsApp Button */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleProceedToWhatsApp}
                    className="w-full py-3.5 bg-white hover:bg-white/90 text-[#C85DA9] text-xs uppercase tracking-[0.14em] font-bold transition-all duration-200 flex items-center justify-center gap-2.5 rounded-none active:scale-[0.99] group cursor-pointer shadow-xl border border-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current shrink-0 text-[#C85DA9]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Proceed to WhatsApp Checkout</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-white/80 px-1 pt-1">
                    <button
                      onClick={handleCopyOrderText}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors underline cursor-pointer uppercase tracking-wider text-[10px]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-white" strokeWidth={1.5} />
                          <span className="text-white font-medium">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" strokeWidth={1.5} />
                          <span>Copy Order Text</span>
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-white/80 uppercase tracking-wider">Concierge: {WHATSAPP_PHONE_DISPLAY}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-white/80 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                  <span>Bespoke Atelier • Handcrafted Quality</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
