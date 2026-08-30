import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Copy,
  Eye,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Database,
  CloudCheck,
  LogOut,
  Lock,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  List,
  ShieldCheck,
  Check,
  RefreshCw,
  Palette,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Settings2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { CMS_SECTIONS } from '../lib/cms';
import AdminProductEditor from '../components/admin/AdminProductEditor';
import AdminOrdersTab from '../components/admin/AdminOrdersTab';
import brandLogo from '../assets/logo.png';

export default function AdminPage() {
  const {
    products,
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    seedCatalog,
    formatPrice,
    navigateTo,
    showToast,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    siteContent,
    setCmsDrawerOpen,
    isAdminEditMode,
    setIsAdminEditMode,
    adminEnabled,
    setAdminEnabledRemote,
  } = useShop();

  const baseProducts = allProducts && allProducts.length > 0 ? allProducts : products;

  // Admin Login State
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Section
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'cms' | 'settings'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [isTogglingAdmin, setIsTogglingAdmin] = useState(false);

  // Product Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMarketFilter, setSelectedMarketFilter] = useState('all'); // 'all' | 'india' | 'arab' | 'both'
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'low' | 'out'
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [violetOnly, setVioletOnly] = useState(false);

  // Full-page Editor State
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Handle PIN Login
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (!success) {
      setLoginError('Incorrect administrative PIN. (Default: 1234)');
    } else {
      setLoginError('');
      setPinInput('');
    }
  };

  // Metrics Calculations
  const stats = useMemo(() => {
    const total = baseProducts.length;
    const silkCount = baseProducts.filter(p => p.category === 'Silk').length;
    const chiffonCount = baseProducts.filter(p => p.category === 'Chiffon').length;
    const modalCount = baseProducts.filter(p => p.category === 'Modal Jersey').length;
    const georgetteCount = baseProducts.filter(p => p.category === 'Georgette').length;
    const featuredCount = baseProducts.filter(p => p.isFeatured).length;
    const violetCount = baseProducts.filter(p => p.isVioletEdition).length;
    const lowStockCount = baseProducts.filter(p => (p.stockCount ?? 10) <= 5 && (p.stockCount ?? 10) > 0).length;
    const outOfStockCount = baseProducts.filter(p => (p.stockCount ?? 10) === 0).length;

    return {
      total,
      silkCount,
      chiffonCount,
      modalCount,
      georgetteCount,
      featuredCount,
      violetCount,
      lowStockCount,
      outOfStockCount
    };
  }, [baseProducts]);

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return baseProducts.filter(p => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q));

      // Category
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

      // Market / Region Filter
      let matchesMarket = true;
      if (selectedMarketFilter === 'india') {
        matchesMarket = p.targetRegion === 'india';
      } else if (selectedMarketFilter === 'arab') {
        matchesMarket = p.targetRegion === 'arab';
      } else if (selectedMarketFilter === 'both') {
        matchesMarket = p.targetRegion === 'all' || !p.targetRegion;
      }

      // Stock
      const stock = p.stockCount ?? 10;
      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = stock <= 5 && stock > 0;
      if (stockFilter === 'out') matchesStock = stock === 0;

      // Featured / Violet
      const matchesFeatured = !featuredOnly || p.isFeatured;
      const matchesViolet = !violetOnly || p.isVioletEdition;

      return matchesSearch && matchesCategory && matchesMarket && matchesStock && matchesFeatured && matchesViolet;
    });
  }, [baseProducts, searchQuery, selectedCategory, selectedMarketFilter, stockFilter, featuredOnly, violetOnly]);

  // Categories list for filter pills
  const categories = useMemo(() => {
    const set = new Set(baseProducts.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [baseProducts]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsProductEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateProduct = async (product) => {
    const duplicated = {
      ...product,
      id: `${product.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${product.name} (Copy)`,
      isFeatured: false
    };
    await createProduct(duplicated);
    showToast(`Created duplicate copy of "${product.name}".`);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    setDeleteConfirmId(null);
    showToast('Product listing removed.');
  };

  const handleToggleFeatured = async (product, e) => {
    e.stopPropagation();
    await updateProduct(product.id, { isFeatured: !product.isFeatured });
    showToast(`Updated "${product.name}" featured status.`);
  };

  const handleToggleViolet = async (product, e) => {
    e.stopPropagation();
    await updateProduct(product.id, { isVioletEdition: !product.isVioletEdition });
    showToast(`Updated "${product.name}" Violet Edition status.`);
  };

  const handleSeedCatalog = async () => {
    if (!window.confirm('This will seed the default haute couture catalog into Supabase. Proceed?')) {
      return;
    }
    setIsSeeding(true);
    try {
      const result = await seedCatalog();
      if (result.success) {
        showToast(`Catalog seeded successfully with ${result.count} items.`);
      } else {
        showToast(`Seeding failed: ${result.error}`, 'error');
      }
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveProductModal = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      showToast(`Updated "${productData.name}" successfully.`);
    } else {
      await createProduct(productData);
      showToast(`Published "${productData.name}" to catalog.`);
    }
    setIsProductEditorOpen(false);
    setEditingProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin is not logged in, render the luxury login gate
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-secondary/20 space-y-6 text-center">
          
          <div className="flex justify-center">
            <img
              src={brandLogo}
              alt="NOOR AL DHUHA Logo"
              className="h-20 sm:h-24 w-auto object-contain mx-auto drop-shadow-md"
            />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-royal-violet">
              Atelier Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-primary font-medium">
              Admin Portal
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Please authenticate to access product inventory, Supabase database, and bespoke order operations.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Security PIN Code
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter 4-digit PIN (default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-center font-mono text-lg tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary via-royal-violet to-primary text-white text-xs font-semibold uppercase tracking-widest hover:opacity-95 transition-all shadow-luxury flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 text-gold-soft" />
            </button>
          </form>

          <div className="pt-4 border-t border-surface-container text-[11px] text-stone-400">
            Protected by Supabase Row-Level Security & Atelier Key
          </div>
        </div>
      </div>
    );
  }

  // If currently in full-page Abaya Editor Studio (creating or editing)
  if (isProductEditorOpen) {
    return (
      <AdminProductEditor
        product={editingProduct}
        onSave={handleSaveProductModal}
        onCancel={() => {
          setIsProductEditorOpen(false);
          setEditingProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:py-12 space-y-8 animate-fade-in">
      
      {/* Top Banner & Supabase Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-secondary/20 shadow-luxury">
        <div className="flex items-center gap-4">
          <img
            src={brandLogo}
            alt="NOOR AL DHUHA"
            className="h-14 sm:h-16 w-auto object-contain shrink-0 drop-shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-violet/10 border border-royal-violet/20 text-royal-violet text-[10px] uppercase tracking-[0.2em] font-semibold">
                <Sparkles className="w-3 h-3 text-gold-accent" />
                <span>Atelier Control Center</span>
              </div>
              
              {/* Supabase Connection Badge */}
              {isSupabaseConfigured ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Supabase Live Cloud</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold" title="Add VITE_SUPABASE_URL in .env to connect to live Supabase">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Local Active Storage (Cloud Ready)</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-primary font-medium">
              Luxury Abaya & Catalog Management
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Publish haute couture creations, upload high-resolution photography, and manage customer orders.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSeedCatalog}
            disabled={isSeeding}
            className="px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] hover:bg-surface-container text-xs font-semibold text-stone-700 flex items-center gap-2 transition-colors"
            title="Seed default 6 haute couture items to Supabase"
          >
            <Database className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : 'text-royal-violet'}`} />
            <span>{isSeeding ? 'Seeding...' : 'Seed Catalog'}</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-royal-violet to-primary text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-all shadow-luxury flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-gold-soft" />
            <span>Add New Abaya</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2.5 rounded-xl border border-secondary/20 hover:bg-red-50 hover:text-red-600 text-stone-500 transition-colors"
            title="Sign out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle space-y-1">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">Total Abayas</div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">{stats.total}</div>
          <div className="text-[11px] text-stone-400">Active catalog items</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle space-y-1">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">Pure Silk & Georgette</div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-royal-violet">{stats.silkCount + stats.georgetteCount}</div>
          <div className="text-[11px] text-stone-400">Haute couture fabrics</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle space-y-1">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">Violet Edition</div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#982476]">{stats.violetCount}</div>
          <div className="text-[11px] text-stone-400">Signature capsule items</div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle space-y-1">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">Inventory Status</div>
          <div className={`font-serif text-2xl sm:text-3xl font-bold ${stats.outOfStockCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            {stats.outOfStockCount > 0 ? `${stats.outOfStockCount} Out` : `${stats.total} Ready`}
          </div>
          <div className="text-[11px] text-stone-400">{stats.lowStockCount} items low stock</div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex border-b border-surface-container-highest gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-sm font-serif font-medium border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'products'
              ? 'border-royal-violet text-royal-violet font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-serif font-medium border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'orders'
              ? 'border-royal-violet text-royal-violet font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Client Inquiries & Order Tracking</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`pb-3 text-sm font-serif font-medium border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'cms'
              ? 'border-yellow-500 text-yellow-700 font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>🎨 Content Management ({CMS_SECTIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 text-sm font-serif font-medium border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'settings'
              ? 'border-stone-700 text-stone-900 font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>Site Settings</span>
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Controls Bar: Search, Category Pills, View Mode */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-secondary/20 shadow-subtle space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search abayas by name, category, badge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-secondary/30 bg-[#fff9fd] text-xs focus:outline-none focus:ring-2 focus:ring-royal-violet/30"
                />
              </div>

              {/* View Switcher & Filters */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    featuredOnly
                      ? 'bg-royal-violet text-white border-royal-violet'
                      : 'border-secondary/30 text-stone-600 hover:bg-surface-container'
                  }`}
                >
                  Featured Only
                </button>

                <button
                  onClick={() => setVioletOnly(!violetOnly)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                    violetOnly
                      ? 'bg-[#982476] text-white border-[#982476]'
                      : 'border-secondary/30 text-stone-600 hover:bg-surface-container'
                  }`}
                >
                  Violet Edition Only
                </button>

                <div className="flex items-center border border-secondary/30 rounded-xl p-0.5 bg-[#fff9fd]">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'table' ? 'bg-royal-violet text-white' : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'cards' ? 'bg-royal-violet text-white' : 'text-stone-500 hover:text-stone-800'
                    }`}
                    title="Cards View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Market & Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-container-highest">
              {/* Market pills */}
              <div className="flex items-center gap-1.5 bg-surface-container/60 p-1 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-2">Market:</span>
                {[
                  { id: 'all', label: 'All', icon: '🌐' },
                  { id: 'india', label: 'India', icon: '🇮🇳' },
                  { id: 'arab', label: 'Arab / UAE', icon: '🇦🇪' },
                  { id: 'both', label: 'Both', icon: '✨' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMarketFilter(m.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      selectedMarketFilter === m.id
                        ? 'bg-white text-primary shadow-xs ring-1 ring-black/5 font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface-container text-stone-600 hover:bg-surface-container-high'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Items Rendering */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-secondary/20 space-y-4">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg text-primary font-medium">No Products Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No items matched your current search filters. Try clearing your search query or add a new piece.
              </p>
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-royal-violet text-white text-xs font-semibold shadow hover:bg-royal-violet/90"
              >
                + Add Abaya Now
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div className="bg-white rounded-2xl border border-secondary/20 shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fff9fd] border-b border-surface-container-highest text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Abaya Creation</th>
                      <th className="py-3.5 px-4">Category & Badge</th>
                      <th className="py-3.5 px-4">Target Market</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4 text-center">Featured</th>
                      <th className="py-3.5 px-4 text-center">Violet Edition</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-highest">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#fff7fc]/60 transition-colors">
                        
                        {/* Thumbnail & Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-16 rounded-lg object-cover border border-secondary/20 shrink-0 bg-surface-container"
                            />
                            <div>
                              <div className="font-serif font-medium text-sm text-primary">{p.name}</div>
                              <div className="text-[11px] text-stone-500 truncate max-w-xs">{p.subtitle || '100% Luxury Weave'}</div>
                              <div className="flex items-center gap-1 mt-1">
                                {(p.colors || []).slice(0, 4).map((c, i) => (
                                  <span
                                    key={i}
                                    title={c.name}
                                    className="w-3 h-3 rounded-full border border-black/10 inline-block shadow-inner"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                ))}
                                {(p.colors || []).length > 4 && (
                                  <span className="text-[9px] text-stone-400">+{p.colors.length - 4}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Badge */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container text-stone-700 font-medium">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="block mt-1 text-[10px] text-royal-violet font-semibold">
                              {p.badge}
                            </span>
                          )}
                          <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-700">
                            <span className="font-semibold">★ {Number(p.rating || 5.0).toFixed(1)}</span>
                            <span className="text-stone-400">({p.reviewsCount || 0})</span>
                          </div>
                        </td>

                        {/* Target Market */}
                        <td className="py-3.5 px-4">
                          {p.targetRegion === 'india' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/50">
                              <span>🇮🇳</span>
                              <span>India</span>
                            </span>
                          ) : p.targetRegion === 'arab' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200/50">
                              <span>🇦🇪</span>
                              <span>Arab / UAE</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[11px] font-semibold border border-purple-200/50">
                              <span>🌐</span>
                              <span>Both</span>
                            </span>
                          )}
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-medium">
                          <div className="font-sans text-sm font-bold text-primary tabular-nums">{formatPrice(p.price)}</div>
                          {p.originalPrice && (
                            <div className="text-[10px] text-stone-400 line-through font-sans tabular-nums">
                              {formatPrice(p.originalPrice)}
                            </div>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                            (p.stockCount ?? 10) === 0
                              ? 'bg-red-50 text-red-700'
                              : (p.stockCount ?? 10) <= 5
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {p.stockCount ?? 10} in stock
                          </span>
                        </td>

                        {/* Featured Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => handleToggleFeatured(p, e)}
                            className={`w-6 h-6 rounded-full inline-flex items-center justify-center transition-colors ${
                              p.isFeatured ? 'bg-royal-violet text-white' : 'bg-surface-container text-stone-400 hover:text-stone-600'
                            }`}
                            title="Toggle Homepage Featured"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* Violet Edition Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => handleToggleViolet(p, e)}
                            className={`w-6 h-6 rounded-full inline-flex items-center justify-center transition-colors ${
                              p.isVioletEdition ? 'bg-[#982476] text-white' : 'bg-surface-container text-stone-400 hover:text-stone-600'
                            }`}
                            title="Toggle Violet Edition"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => navigateTo('product-detail', p.id)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-surface-container transition-colors"
                              title="View in Customer Store"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDuplicateProduct(p)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-royal-violet hover:bg-royal-violet/10 transition-colors"
                              title="Duplicate Listing"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-royal-violet hover:bg-royal-violet/10 transition-colors"
                              title="Edit Abaya"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {deleteConfirmId === p.id ? (
                              <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                                <button
                                  onClick={() => handleDelete(p.id)}
                                  className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-semibold"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-1 text-stone-500 text-[10px]"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(p.id)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Abaya"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Cards View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl overflow-hidden border border-secondary/20 shadow-subtle hover:shadow-luxury transition-all flex flex-col"
                >
                  <div className="aspect-[3/4] relative bg-surface-container overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    
                    {p.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-royal-violet/90 backdrop-blur-md text-white text-[10px] font-semibold">
                        {p.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 flex gap-1">
                      {p.isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-royal-violet text-white text-[9px] font-semibold">
                          Featured
                        </span>
                      )}
                      {p.isVioletEdition && (
                        <span className="px-2 py-0.5 rounded bg-[#982476] text-white text-[9px] font-semibold">
                          Violet Capsule
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] uppercase font-semibold text-royal-violet tracking-wider">
                            {p.category}
                          </span>
                          {p.targetRegion === 'india' ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold border border-emerald-200">
                              🇮🇳 India
                            </span>
                          ) : p.targetRegion === 'arab' ? (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[9px] font-bold border border-amber-200">
                              🇦🇪 Arab / UAE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 text-[9px] font-bold border border-purple-200">
                              🌐 Both
                            </span>
                          )}
                        </div>
                        <span className="font-serif font-bold text-sm text-primary">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <h3 className="font-serif text-base text-primary font-medium">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold shrink-0">
                          <span>★ {Number(p.rating || 5.0).toFixed(1)}</span>
                          <span className="text-stone-400 font-normal">({p.reviewsCount || 0})</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        {p.stockCount ?? 10} pieces available
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="px-3 py-1 rounded-lg bg-surface-container hover:bg-royal-violet hover:text-white text-stone-700 text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDuplicateProduct(p)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-royal-violet"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB CONTENT: ORDERS & TRACKING */}
      {activeTab === 'orders' && (
        <AdminOrdersTab formatPrice={formatPrice} showToast={showToast} />
      )}

      {/* TAB CONTENT: CMS CONTENT MANAGEMENT */}
      {activeTab === 'cms' && (
        <div className="space-y-6 animate-fade-in">

          {/* CMS Header */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-yellow-600" />
                <h2 className="font-serif text-xl font-medium text-stone-800">Visual Content Management</h2>
              </div>
              <p className="text-xs text-stone-500 max-w-lg">
                Edit any section of your website here. All changes are saved to Supabase instantly and reflected live for all visitors.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdminEditMode(!isAdminEditMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isAdminEditMode
                    ? 'bg-yellow-400 text-yellow-900 shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-yellow-100'
                }`}
              >
                <span>{isAdminEditMode ? '✏️ Edit Mode: ON' : 'Edit Mode: OFF'}</span>
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Site</span>
              </button>
            </div>
          </div>

          {/* CMS Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CMS_SECTIONS.map((section) => (
              <div
                key={section.key}
                className="bg-white rounded-2xl border border-secondary/20 shadow-subtle p-5 flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <h3 className="font-serif text-base font-medium text-stone-800">{section.label}</h3>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">{section.section}</span>
                      </div>
                    </div>
                    {isSupabaseConfigured && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" title="Synced to Supabase" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{section.description}</p>
                </div>

                <button
                  onClick={() => setCmsDrawerOpen({ key: section.key, label: section.label })}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#180516] to-[#982476] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Edit2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Edit {section.label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-800">
            <span className="text-lg shrink-0">ℹ️</span>
            <div>
              <strong className="font-semibold">How it works:</strong> Click "Edit" on any section to open the visual editor. Changes are saved to Supabase and go live immediately — no deployment needed. Enable <strong>Edit Mode</strong> to see edit buttons directly on the live website as you browse.
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fade-in">

          {/* Settings Header */}
          <div className="bg-white border border-secondary/20 rounded-2xl p-6 shadow-subtle">
            <div className="flex items-center gap-3 mb-1">
              <Settings2 className="w-5 h-5 text-stone-600" />
              <h2 className="font-serif text-xl font-medium text-stone-800">Site Settings</h2>
            </div>
            <p className="text-xs text-stone-500">
              Control global site behaviours. Changes are persisted to the Supabase <code className="font-mono bg-stone-100 px-1 rounded">app_settings</code> table and take effect immediately.
            </p>
          </div>

          {/* Admin Panel Visibility Toggle Card */}
          <div className="bg-white border border-secondary/20 rounded-2xl p-6 shadow-subtle space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-royal-violet" />
                  <h3 className="font-serif text-base font-semibold text-stone-800">Admin Panel Visibility</h3>
                </div>
                <p className="text-xs text-stone-500 max-w-md">
                  When <strong>ON</strong>, the Admin button appears in the navbar and the Admin portal is accessible to authorised staff.
                  Turn <strong>OFF</strong> to hide all admin entry points from the public-facing site.
                </p>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
                  adminEnabled
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${adminEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  {adminEnabled ? 'Admin Access: Enabled' : 'Admin Access: Hidden'}
                </div>
              </div>

              {/* Big Toggle Switch */}
              <button
                onClick={async () => {
                  setIsTogglingAdmin(true);
                  const next = !adminEnabled;
                  await setAdminEnabledRemote(next);
                  showToast(
                    next
                      ? 'Admin panel enabled — navbar button is now visible.'
                      : 'Admin panel hidden — admin button removed from navbar.',
                    next ? 'success' : 'info'
                  );
                  setIsTogglingAdmin(false);
                }}
                disabled={isTogglingAdmin}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                  adminEnabled
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'border-red-300 bg-red-50 text-red-800 hover:bg-red-100'
                } ${isTogglingAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                title={adminEnabled ? 'Click to hide Admin from navbar' : 'Click to show Admin in navbar'}
              >
                {adminEnabled ? (
                  <ToggleRight className="w-8 h-8 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-red-400" />
                )}
                <span>{isTogglingAdmin ? 'Saving…' : adminEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Info box */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 space-y-1">
              <p>📌 <strong>Note:</strong> Turning admin OFF only hides the navbar button — this settings page remains accessible to already-logged-in admins.</p>
              <p>🔒 The Supabase <code className="font-mono bg-stone-100 px-1 rounded">app_settings</code> table stores this flag. Run the SQL snippet in your Supabase dashboard if the table does not yet exist.</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
