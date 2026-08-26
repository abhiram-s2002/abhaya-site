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
    appliedDiscount,
    discountCodeName,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingDifference,
    promoCode,
    setPromoCode,
    applyPromo,
    removePromo,
    navigateTo,
    showToast
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
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

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromo(promoInput);
    setPromoInput('');
  };

  const handleProceedToWhatsApp = () => {
    if (cart.length === 0) return;

    const message = formatCartWhatsAppMessage({
      cart,
      rawCartSubtotal,
      appliedDiscount,
      discountCodeName,
      cartSubtotal,
      freeShippingThreshold,
      formatPrice
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
      formatPrice
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
        <div className="w-screen max-w-full sm:max-w-md bg-[#fff7fc] text-on-background shadow-2xl flex flex-col justify-between animate-slide-in-right border-l border-surface-container-high pb-safe">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <ShoppingBag className="w-5 h-5 text-royal-violet" />
              <h2 className="font-serif text-lg sm:text-xl font-medium tracking-wide text-primary">Your Shopping Bag</h2>
              <span className="text-[11px] sm:text-xs bg-surface-container-highest px-2 py-0.5 rounded-full font-semibold text-amethyst-soft">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-primary rounded-full hover:bg-surface-container transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content Area */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Free Shipping Progress Meter */}
            <div className="bg-surface-container-low px-4 sm:px-6 py-2.5 sm:py-3 border-b border-surface-container-high/60 text-xs">
              {freeShippingDifference === 0 ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-[11px] sm:text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlocked: <strong>Free Worldwide Express & Keepsake Box!</strong></span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] sm:text-xs text-stone-600">
                    <span>Add <strong>{formatPrice(freeShippingDifference)}</strong> for Free Express</span>
                    <span className="font-semibold text-royal-violet">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-royal-violet rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 divide-y divide-surface-container-high/60">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-surface-container flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.2]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-xl text-stone-800">Your bag is currently empty</p>
                    <p className="text-xs text-stone-500">Discover our luminous silk and airy chiffon drapes.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('shop');
                    }}
                    className="inline-block mt-3 px-6 py-2.5 bg-primary hover:bg-royal-violet text-white text-xs uppercase tracking-widest font-medium rounded transition-colors active:scale-95"
                  >
                    Browse Boutique
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="pt-4 sm:pt-6 first:pt-0 flex gap-3 sm:gap-4">
                    {/* Product Thumbnail */}
                    <div className="w-18 sm:w-20 h-22 sm:h-24 rounded bg-stone-100 overflow-hidden shrink-0 border border-surface-container-highest relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3
                            className="font-serif text-xs sm:text-sm font-medium text-primary hover:text-royal-violet transition-colors cursor-pointer leading-snug"
                            onClick={() => { setIsCartOpen(false); navigateTo('product-detail', item.productId); }}
                          >
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px] sm:text-[11px] text-stone-600">
                          {item.style && (
                            <span className="bg-surface-container px-1.5 py-0.5 rounded text-[10px] font-semibold text-primary">
                              {item.style}
                            </span>
                          )}
                          {item.work && (
                            <span className="bg-royal-violet/10 text-royal-violet px-1.5 py-0.5 rounded text-[10px] font-semibold">
                              {item.work}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10 shrink-0"
                              style={{ backgroundColor: item.hex }}
                            />
                            <span>{item.color}</span>
                          </div>
                          <span>•</span>
                          <span className="truncate max-w-[120px] font-medium">{item.size}</span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-outline-variant/60 rounded bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-primary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="px-2 sm:px-2.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-sans text-xs sm:text-sm font-bold text-primary tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[9px] sm:text-[10px] text-stone-400 font-sans tabular-nums">
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
              <div className="p-4 sm:p-6 border-t border-surface-container-high bg-white space-y-3 sm:space-y-4">
                
                {/* Promo code input */}
                {appliedDiscount > 0 ? (
                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs">
                    <span className="text-emerald-800 font-medium text-[11px] sm:text-xs">✨ Promo: {discountCodeName}</span>
                    <button
                      onClick={removePromo}
                      className="text-stone-500 hover:text-red-600 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. ELEGANCE10)"
                      className="flex-1 px-3 py-1.5 text-xs border border-outline-variant/60 rounded uppercase placeholder:normal-case focus:outline-none focus:border-royal-violet"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-medium rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-1 sm:space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-900">{formatPrice(rawCartSubtotal)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({discountCodeName})</span>
                      <span>-{formatPrice(rawCartSubtotal * appliedDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {rawCartSubtotal >= freeShippingThreshold ? (
                        <span className="text-emerald-700 font-medium uppercase tracking-wider text-[10px] sm:text-[11px]">Free</span>
                      ) : (
                        formatPrice(15)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-sans font-bold text-primary pt-2 border-t border-surface-container-high tabular-nums">
                    <span>Estimated Total</span>
                    <span>
                      {formatPrice(
                        cartSubtotal + (rawCartSubtotal >= freeShippingThreshold ? 0 : 15)
                      )}
                    </span>
                  </div>
                </div>

                {/* Proceed to WhatsApp Button */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleProceedToWhatsApp}
                    className="w-full py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#1AA34F] text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-200 flex items-center justify-center gap-2.5 rounded-lg shadow-lg shadow-emerald-500/25 active:scale-[0.98] group cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 fill-current shrink-0 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Proceed to WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 pt-1">
                    <button
                      onClick={handleCopyOrderText}
                      className="inline-flex items-center gap-1 hover:text-royal-violet transition-colors underline cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Order Text</span>
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-stone-400">Concierge: {WHATSAPP_PHONE_DISPLAY}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-royal-violet" />
                  <span>Direct Atelier Concierge • Hand-Inspected Keepsake Box</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
