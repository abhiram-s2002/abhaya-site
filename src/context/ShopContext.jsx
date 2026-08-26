import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products';
import {
  fetchProductsFromSupabase,
  upsertProductToSupabase,
  deleteProductFromSupabase,
  seedInitialProductsToSupabase,
  isSupabaseConfigured,
} from '../lib/supabase';

import { fetchAllSiteContent, upsertSiteContent, DEFAULT_CONTENT } from '../lib/cms';

const ShopContext = createContext();

const CURRENCIES = {
  INR: { symbol: "₹", rate: 83.5, name: "INR (₹)", flag: "🇮🇳" },
  USD: { symbol: "$", rate: 1.0, name: "USD ($)", flag: "🇺🇸" },
  AED: { symbol: "AED ", rate: 3.67, name: "AED (د.إ)", flag: "🇦🇪" },
  SAR: { symbol: "SAR ", rate: 3.75, name: "SAR (﷼)", flag: "🇸🇦" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR (€)", flag: "🇪🇺" },
  GBP: { symbol: "£", rate: 0.78, name: "GBP (£)", flag: "🇬🇧" },
};

const DEFAULT_ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

export function ShopProvider({ children }) {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'collections' | 'product-detail' | 'violet-edition' | 'story' | 'contact' | 'admin'
  const [selectedProductId, setSelectedProductId] = useState('midnight-espresso-silk');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedCollectionsTab, setSelectedCollectionsTab] = useState('silhouette');
  const [selectedColorFilter, setSelectedColorFilter] = useState('All');
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('All');
  const [selectedWorkFilter, setSelectedWorkFilter] = useState('All');
  const [wishlistOnlyFilter, setWishlistOnlyFilter] = useState(false);
  
  // Dynamic Products State
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('noor_admin_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return STATIC_PRODUCTS;
  });

  // CMS Site Content State
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('noor_cms_content');
      if (saved) return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
    } catch (_) {}
    return { ...DEFAULT_CONTENT };
  });

  // Admin Edit Mode (on-page visual editing toggle)
  const [isAdminEditMode, setIsAdminEditMode] = useState(false);
  // Which CMS section drawer is open: null | { key, label }
  const [cmsDrawerOpen, setCmsDrawerOpen] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('noor_admin_auth') === 'true';
    } catch (_) {
      return false;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Currency
  const [currency, setCurrency] = useState('INR');

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('noor_cart') || localStorage.getItem('hayat_cart');
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
          image: STATIC_PRODUCTS[0].image,
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
      const saved = localStorage.getItem('noor_wishlist') || localStorage.getItem('hayat_wishlist');
      return saved ? JSON.parse(saved) : ['midnight-espresso-silk', 'royal-violet-silk'];
    } catch {
      return [];
    }
  });

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCodeName, setDiscountCodeName] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Fetch Products from Supabase on mount
  const refreshProducts = useCallback(async () => {
    setIsProductsLoading(true);
    try {
      const { data } = await fetchProductsFromSupabase();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (err) {
      console.warn('Failed to load products:', err);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Fetch CMS site content from Supabase on mount
  const refreshSiteContent = useCallback(async () => {
    try {
      const content = await fetchAllSiteContent();
      setSiteContent(content);
    } catch (err) {
      console.warn('Failed to load site content:', err);
    }
  }, []);

  useEffect(() => {
    refreshSiteContent();
  }, [refreshSiteContent]);

  // Update a single CMS section key (optimistic + Supabase save)
  const updateSiteContent = useCallback(async (key, newContent) => {
    setSiteContent(prev => ({ ...prev, [key]: newContent }));
    await upsertSiteContent(key, newContent);
  }, []);




  // Product CRUD Handlers
  const createProduct = async (newProduct) => {
    // Optimistic local update
    setProducts(prev => [newProduct, ...prev]);
    const result = await upsertProductToSupabase(newProduct);
    if (result.data) {
      setProducts(prev => {
        const filtered = prev.filter(p => p.id !== newProduct.id);
        return [result.data, ...filtered];
      });
    }
    return result;
  };

  const updateProduct = async (id, updatedFields) => {
    let merged = null;
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          merged = { ...p, ...updatedFields };
          return merged;
        }
        return p;
      })
    );
    if (merged) {
      await upsertProductToSupabase(merged);
    }
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    await deleteProductFromSupabase(id);
  };

  const seedCatalog = async () => {
    const result = await seedInitialProductsToSupabase();
    if (result.success) {
      await refreshProducts();
    }
    return result;
  };

  // Admin Auth Handlers
  const loginAdmin = (pin) => {
    if (String(pin).trim() === String(DEFAULT_ADMIN_PIN).trim()) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('noor_admin_auth', 'true');
      } catch (_) {}
      showToast('Admin access granted.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('noor_admin_auth');
    } catch (_) {}
    showToast('Signed out of admin portal.', 'info');
  };

  // Sync Cart & Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('noor_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('noor_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Window scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId]);

  const navigateTo = (view, productId = null, category = null, collectionsTab = null, color = null, style = null, work = null, wishlistOnly = false) => {
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
    setWishlistOnlyFilter(wishlistOnly);
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
    work = null,
    customMeasurements = null
  ) => {
    const resolvedStyle = style || product.defaultStyle || (product.styles && product.styles[0]) || 'Open abaya';
    const resolvedWork = work || product.defaultWork || (product.works && product.works[0]) || 'plain';
    const resolvedColor = colorName || (product.colors && product.colors[0]?.name) || 'Midnight Espresso';
    const resolvedHex = hexCode || (product.colors && product.colors[0]?.hex) || '#2E1C1A';
    const resolvedSize = size || (product.sizes && product.sizes[0]) || 'Size 56 (Length 56")';
    const customTag = customMeasurements ? `-${customMeasurements.height || ''}-${customMeasurements.bust || ''}-${customMeasurements.length || ''}` : '';

    const cartItemId = `${product.id}-${resolvedColor}-${resolvedSize}-${resolvedStyle}-${resolvedWork}${customTag}`;
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
          customMeasurements,
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
      const product = products.find(p => p.id === productId);
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
    } else if (clean === 'VIOLET15') {
      setAppliedDiscount(0.15);
      setDiscountCodeName('VIOLET15 (15% OFF)');
      showToast('15% Royal Violet Edition discount applied!');
      return { success: true, message: '15% discount applied!' };
    } else if (clean === 'NOORVIP' || clean === 'HAYATVIP') {
      setAppliedDiscount(0.20);
      setDiscountCodeName('NOORVIP (20% OFF)');
      showToast('20% NOOR AL DHUHA Atelier VIP discount applied!');
      return { success: true, message: '20% VIP discount applied!' };
    } else {
      showToast('Invalid promo code. Try ELEGANCE10, VIOLET15 or NOORVIP', 'error');
      return { success: false, message: 'Invalid promo code. Try ELEGANCE10, VIOLET15 or NOORVIP' };
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
        // Products dynamic state and alias
        products,
        PRODUCTS: products,
        isProductsLoading,
        createProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        seedCatalog,

        // CMS Site Content
        siteContent,
        updateSiteContent,
        refreshSiteContent,

        // Admin Edit Mode (on-page visual editing)
        isAdminEditMode,
        setIsAdminEditMode,
        cmsDrawerOpen,
        setCmsDrawerOpen,

        // Admin Auth
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,

        // Navigation
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
        wishlistOnlyFilter,
        setWishlistOnlyFilter,

        // Modals
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,

        // Currencies
        currency,
        setCurrency,
        CURRENCIES,
        formatPrice,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        rawCartSubtotal,
        discountAmount,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingDifference,

        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,

        // Promos
        promoCode,
        setPromoCode,
        appliedDiscount,
        discountCodeName,
        applyPromo,
        removePromo,

        // Toasts
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
