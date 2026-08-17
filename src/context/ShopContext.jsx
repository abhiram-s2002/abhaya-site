import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

const CURRENCIES = {
  INR: { symbol: "₹", rate: 83.5, name: "INR (₹)", flag: "🇮🇳" },
  USD: { symbol: "$", rate: 1.0, name: "USD ($)", flag: "🇺🇸" },
  AED: { symbol: "AED ", rate: 3.67, name: "AED (د.إ)", flag: "🇦🇪" },
  SAR: { symbol: "SAR ", rate: 3.75, name: "SAR (﷼)", flag: "🇸🇦" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR (€)", flag: "🇪🇺" },
  GBP: { symbol: "£", rate: 0.78, name: "GBP (£)", flag: "🇬🇧" },
};

export function ShopProvider({ children }) {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'collections' | 'product-detail' | 'violet-edition' | 'story' | 'contact'
  const [selectedProductId, setSelectedProductId] = useState('midnight-espresso-silk');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedCollectionsTab, setSelectedCollectionsTab] = useState('silhouette'); // 'silhouette' | 'craftsmanship' | 'fabric' | 'collection' | 'color' | 'all'
  const [selectedColorFilter, setSelectedColorFilter] = useState('All');
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('All');
  const [selectedWorkFilter, setSelectedWorkFilter] = useState('All');
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Currency (Default to INR or USD)
  const [currency, setCurrency] = useState('INR');

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hayat_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'midnight-espresso-silk-Midnight Espresso-Size 56 (Length 56")-Open abaya-Handwork Abaya',
          productId: 'midnight-espresso-silk',
          name: 'Midnight Espresso Silk Abaya',
          price: 185,
          color: 'Midnight Espresso',
          hex: '#2E1C1A',
          size: 'Size 56 (Length 56")',
          style: 'Open abaya',
          work: 'Handwork Abaya',
          image: PRODUCTS[0].image,
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('hayat_wishlist');
      return saved ? JSON.parse(saved) : ['midnight-espresso-silk', 'royal-violet-silk'];
    } catch {
      return [];
    }
  });

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [discountCodeName, setDiscountCodeName] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('hayat_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hayat_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Window scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const navigateTo = (view, productId = null, category = null, collectionsTab = null, color = null, style = null, work = null) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    if (category) {
      setSelectedCategoryFilter(category);
    }
    if (collectionsTab) {
      setSelectedCollectionsTab(collectionsTab);
    }
    if (color) {
      setSelectedColorFilter(color);
    }
    if (style) {
      setSelectedStyleFilter(style);
    }
    if (work) {
      setSelectedWorkFilter(work);
    }
    setCurrentView(view);
    setIsSearchOpen(false);
  };

  const addToCart = (
    product,
    colorName,
    hexCode,
    size,
    quantity = 1,
    imageOverride = null,
    style = null,
    work = null
  ) => {
    const resolvedStyle = style || product.defaultStyle || (product.styles && product.styles[0]) || 'Open abaya';
    const resolvedWork = work || product.defaultWork || (product.works && product.works[0]) || 'plain';
    const resolvedColor = colorName || product.colors[0].name;
    const resolvedHex = hexCode || product.colors[0].hex;
    const resolvedSize = size || product.sizes[0];

    const cartItemId = `${product.id}-${resolvedColor}-${resolvedSize}-${resolvedStyle}-${resolvedWork}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          color: resolvedColor,
          hex: resolvedHex,
          size: resolvedSize,
          style: resolvedStyle,
          work: resolvedWork,
          image: imageOverride || product.image,
          quantity
        }
      ];
    });
    showToast(`Added "${product.name}" (${resolvedStyle} • ${resolvedWork}) to your luxury bag.`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCodeName('');
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find(p => p.id === productId);
      const name = product ? product.name : 'Item';
      if (exists) {
        showToast(`Removed "${name}" from Wishlist.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved "${name}" to your Wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ELEGANCE10') {
      setAppliedDiscount(0.10);
      setDiscountCodeName('ELEGANCE10 (10% OFF)');
      showToast('10% VIP Elegance discount applied!');
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'HAYATVIP') {
      setAppliedDiscount(0.20);
      setDiscountCodeName('HAYATVIP (20% OFF)');
      showToast('20% HAYAT Atelier VIP discount applied!');
      return { success: true, message: '20% VIP discount applied!' };
    } else {
      showToast('Invalid promo code. Try ELEGANCE10 or HAYATVIP', 'error');
      return { success: false, message: 'Invalid promo code. Try ELEGANCE10 or HAYATVIP' };
    }
  };

  const removePromo = () => {
    setAppliedDiscount(0);
    setDiscountCodeName('');
    setPromoCode('');
    showToast('Promo code removed.', 'info');
  };

  // Price formatting helper with currency conversion
  const formatPrice = (usdPrice) => {
    const info = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = (usdPrice * info.rate).toFixed(0);
    return `${info.symbol}${converted}`;
  };

  const rawCartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = rawCartSubtotal * appliedDiscount;
  const cartSubtotal = rawCartSubtotal - discountAmount;
  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, Math.round((rawCartSubtotal / freeShippingThreshold) * 100));
  const freeShippingDifference = Math.max(0, freeShippingThreshold - rawCartSubtotal);

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        currentView,
        setCurrentView,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedCollectionsTab,
        setSelectedCollectionsTab,
        selectedColorFilter,
        setSelectedColorFilter,
        selectedStyleFilter,
        setSelectedStyleFilter,
        selectedWorkFilter,
        setSelectedWorkFilter,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        currency,
        setCurrency,
        CURRENCIES,
        formatPrice,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        promoCode,
        setPromoCode,
        appliedDiscount,
        discountCodeName,
        applyPromo,
        removePromo,
        rawCartSubtotal,
        discountAmount,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingDifference,
        toasts,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
