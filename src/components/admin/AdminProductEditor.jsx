import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Palette,
  AlertCircle,
  Scissors,
  Eye,
  Layers,
  Save,
  CheckCircle2,
  Globe,
  Tag,
  DollarSign,
  Info,
  ExternalLink,
  Star
} from 'lucide-react';
import { ABAYA_STYLES, ABAYA_WORKS, ABAYA_SIZES } from '../../data/products';
import { uploadProductImage } from '../../lib/supabase';
import { useShop } from '../../context/ShopContext';

const PRESET_CATEGORIES = ['Abaya', 'Open abaya', 'Closed cut', 'Kimono or kaftan', 'Butterfly or farasha', 'umbrella cut or Flare', '2 piece abaya (with inner)', 'Coat abaya'];
const PRESET_BADGES = ['', 'Signature Bestseller', 'Limited Edition', 'Staff Pick', 'Artisan Atelier', 'Trending', 'Exclusive'];

const LUXURY_PALETTE_PRESETS = [
  { name: 'Midnight Espresso', hex: '#2E1C1A' },
  { name: 'Royal Violet', hex: '#982476' },
  { name: 'Plum Noir', hex: '#260A22' },
  { name: 'Amethyst Soft', hex: '#C76AA9' },
  { name: 'Lavender Mist', hex: '#D4C5DD' },
  { name: 'Dusty Rose', hex: '#C49A99' },
  { name: 'Antique Blush', hex: '#E2C3C1' },
  { name: 'Serene Sage', hex: '#7D8B79' },
  { name: 'Ivory Pearl', hex: '#FBF6EE' },
  { name: 'Oat Cream', hex: '#ECE2D4' },
  { name: 'Charcoal Slate', hex: '#3D3F43' },
  { name: 'Pure Onyx', hex: '#111111' }
];

export default function AdminProductEditor({
  product = null,
  onSave,
  onCancel
}) {
  const { formatPrice, selectedMarket: userMarket } = useShop();
  const isEditing = Boolean(product && product.id);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('180');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Abaya');
  const [customCategory, setCustomCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [targetRegion, setTargetRegion] = useState('all'); // 'all' | 'india' | 'arab'
  const [rating, setRating] = useState('5.0');
  const [reviewsCount, setReviewsCount] = useState('0');
  const [stockCount, setStockCount] = useState(12);

  // Media State
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Colors State
  const [colors, setColors] = useState([
    { name: 'Midnight Espresso', hex: '#2E1C1A', imageIndex: 0 },
    { name: 'Royal Violet', hex: '#982476', imageIndex: 0 }
  ]);

  // Silhouettes / Styles State
  const [styles, setStyles] = useState(ABAYA_STYLES.map(s => s.name));
  const [defaultStyle, setDefaultStyle] = useState('Open abaya');

  // Works / Craftsmanship State
  const [works, setWorks] = useState(ABAYA_WORKS.map(w => w.name));
  const [defaultWork, setDefaultWork] = useState('plain');

  // Sizes State
  const [sizes, setSizes] = useState(ABAYA_SIZES.map(s => s.label));

  // Descriptions State
  const [description, setDescription] = useState('');
  const [fabricDetails, setFabricDetails] = useState('');
  const [stylingAdvice, setStylingAdvice] = useState('');
  const [careInstructions, setCareInstructions] = useState('');

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Active section scroll tracking
  const [activeSection, setActiveSection] = useState('identity');

  // Initialize or populate form
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (product) {
      setName(product.name || '');
      setSubtitle(product.subtitle || '');
      setPrice(product.price !== undefined ? String(product.price) : '');
      setOriginalPrice(product.originalPrice ? String(product.originalPrice) : '');
      setCategory(product.category || 'Abaya');
      setCustomCategory('');
      setBadge(product.badge || '');
      setTargetRegion(product.targetRegion || 'all');
      setRating(product.rating !== undefined ? String(product.rating) : '5.0');
      setReviewsCount(product.reviewsCount !== undefined ? String(product.reviewsCount) : '0');
      setStockCount(product.stockCount ?? 10);
      setImage(product.image || '');
      setGallery(Array.isArray(product.gallery) && product.gallery.length > 0 ? product.gallery : (product.image ? [product.image] : []));
      setColors(Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : [{ name: 'Midnight Espresso', hex: '#2E1C1A', imageIndex: 0 }]);
      setStyles(Array.isArray(product.styles) && product.styles.length > 0 ? product.styles : ABAYA_STYLES.map(s => s.name));
      setDefaultStyle(product.defaultStyle || ABAYA_STYLES[0].name);
      setWorks(Array.isArray(product.works) && product.works.length > 0 ? product.works : ABAYA_WORKS.map(w => w.name));
      setDefaultWork(product.defaultWork || ABAYA_WORKS[0].name);
      setSizes(Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ABAYA_SIZES.map(s => s.label));
      setDescription(product.description || '');
      setFabricDetails(product.fabricDetails || '');
      setStylingAdvice(product.stylingAdvice || '');
      setCareInstructions(product.careInstructions || '');
    } else {
      // Pristine defaults for new abaya
      setName('');
      setSubtitle('');
      setPrice('180');
      setOriginalPrice('');
      setCategory('Abaya');
      setCustomCategory('');
      setBadge('');
      setTargetRegion('all');
      setRating('5.0');
      setReviewsCount('0');
      setStockCount(12);
      setImage('https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw');
      setGallery([
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw'
      ]);
      setColors([
        { name: 'Midnight Espresso', hex: '#2E1C1A', imageIndex: 0 },
        { name: 'Royal Violet', hex: '#982476', imageIndex: 0 }
      ]);
      setStyles(ABAYA_STYLES.map(s => s.name));
      setDefaultStyle('Open abaya');
      setWorks(ABAYA_WORKS.map(w => w.name));
      setDefaultWork('plain');
      setSizes(ABAYA_SIZES.map(s => s.label));
      setDescription('Handcrafted from fine luxury grade fabric with master tailoring and quiet elegance.');
      setFabricDetails('100% Grade 6A Pure Mulberry Silk. Non-slip internal weave.');
      setStylingAdvice('Pairs gracefully with coordinating luxury slips and silk wraps.');
      setCareInstructions('Dry clean or delicate cold hand wash with neutral detergent.');
    }
  }, [product]);

  // Handle Main Hero Image Upload
  const handleMainImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    setErrorMessage('');
    try {
      const { url, error } = await uploadProductImage(file, 'hero');
      if (error && !url) {
        setErrorMessage(`Image upload notice: ${error}`);
      }
      if (url) {
        setImage(url);
        if (!gallery.includes(url)) {
          setGallery(prev => [url, ...prev]);
        }
      }
    } catch (err) {
      setErrorMessage('Failed to upload image.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle Additional Gallery Image Upload
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsUploadingGallery(true);
    try {
      for (const file of files) {
        const { url } = await uploadProductImage(file, 'gallery');
        if (url) {
          setGallery(prev => [...prev, url]);
        }
      }
    } catch (err) {
      setErrorMessage('Some gallery images could not be uploaded.');
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setGallery(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const setAsMainImage = (url) => {
    setImage(url);
  };



  // Size Toggle
  const toggleSize = (sizeLabel) => {
    if (sizes.includes(sizeLabel)) {
      if (sizes.length > 1) {
        setSizes(sizes.filter(s => s !== sizeLabel));
      }
    } else {
      setSizes([...sizes, sizeLabel]);
    }
  };

  // Custom Size Handlers
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [showCustomSizeManager, setShowCustomSizeManager] = useState(false);

  const handleAddCustomSize = (e) => {
    if (e) e.preventDefault();
    const trimmed = customSizeInput.trim();
    if (!trimmed) return;
    if (!sizes.includes(trimmed)) {
      setSizes(prev => [...prev, trimmed]);
    }
    setCustomSizeInput('');
  };

  const handleAddPresetCustomSize = (customLabel) => {
    if (!sizes.includes(customLabel)) {
      setSizes(prev => [...prev, customLabel]);
    }
  };

  const removeSize = (sizeToRemove) => {
    if (sizes.length <= 1) return;
    setSizes(prev => prev.filter(s => s !== sizeToRemove));
  };

  // Save Submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Product title is required.');
      scrollToSection('identity');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage('Please enter a valid base price.');
      scrollToSection('pricing');
      return;
    }
    if (!image) {
      setErrorMessage('Please provide or upload a primary hero image.');
      scrollToSection('media');
      return;
    }
    if (!defaultStyle) {
      setErrorMessage('Please select a Category Style for the abaya.');
      scrollToSection('identity');
      return;
    }
    if (!defaultWork) {
      setErrorMessage('Please select a Craftsmanship Work for the abaya.');
      scrollToSection('identity');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    const slugId = isEditing
      ? product.id
      : name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    const productPayload = {
      id: slugId,
      name: name.trim(),
      subtitle: subtitle.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category.trim() || 'Abaya',
      badge: badge.trim(),
      targetRegion: targetRegion || 'all',
      rating: Number(rating) || 5.0,
      reviewsCount: Number(reviewsCount) || 0,
      defaultStyle,
      defaultWork,
      styles: styles.length > 0 ? styles : [defaultStyle],
      works: works.length > 0 ? works : [defaultWork],
      image,
      gallery: gallery.length > 0 ? gallery : [image],
      colors,
      sizes,
      stockCount: Number(stockCount) || 10,
      description: description.trim(),
      fabricDetails: fabricDetails.trim(),
      stylingAdvice: stylingAdvice.trim(),
      careInstructions: careInstructions.trim()
    };

    try {
      await onSave(productPayload);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save product listing.');
      setIsSaving(false);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Calculate preview prices
  const numPrice = Number(price) || 0;
  const numOrigPrice = Number(originalPrice) || 0;
  const inrPrice = Math.round(numPrice * 83);
  const inrOrig = numOrigPrice ? Math.round(numOrigPrice * 83) : null;
  const aedPrice = Math.round(numPrice * 3.67);
  const aedOrig = numOrigPrice ? Math.round(numOrigPrice * 3.67) : null;

  return (
    <div className="min-h-screen bg-[#fff7fc] pb-24 animate-fade-in text-on-background">
      
      {/* ── Sticky Top Action Bar ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-secondary/20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Back Link & Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onCancel}
              type="button"
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-secondary/30 bg-stone-50 hover:bg-surface-container text-stone-700 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Return to Product Catalog"
            >
              <ArrowLeft className="w-4 h-4 text-royal-violet" />
              <span className="hidden sm:inline">Back to Catalog</span>
            </button>

            <div className="h-5 w-px bg-stone-200 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-royal-violet flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-accent" />
                  {isEditing ? 'Atelier Studio • Item Editor' : 'Atelier Studio • New Creation'}
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-stone-900 truncate max-w-[280px] sm:max-w-md">
                {name || (isEditing ? 'Untitled Abaya' : 'New Abaya Creation')}
              </h1>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              Discard
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary via-royal-violet to-primary text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-all shadow-luxury flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-gold-soft" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Abaya'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── Sub Navigation Section Tabs ── */}
      <div className="bg-white border-b border-surface-container-highest shadow-2xs sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-2.5 text-xs font-semibold">
          {[
            { id: 'identity', label: '1. Style & Work' },
            { id: 'pricing', label: '2. Pricing & Market' },
            { id: 'media', label: '3. Photography Studio' },
            { id: 'sizes', label: '4. Sizing & Lengths' },
            { id: 'details', label: '5. Fabric & Care' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-royal-violet text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-surface-container'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Studio Layout ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm flex items-center gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}
            
            {/* 1. Basic Identity, Category Style & Work */}
            <div id="identity" className="bg-white rounded-3xl p-6 sm:p-7 border border-secondary/20 shadow-subtle space-y-6">
              <div className="border-b border-surface-container-highest pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-900">Abaya Identity, Category Style & Work</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Creation Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Abaya name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-sm font-semibold text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Pure Mulberry Silk | Hand-Rolled Hems"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm text-stone-800"
                  />
                </div>

                {/* 2 Main Classifications: Category Style & Work */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* Category Style (Silhouette) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Category Style *
                    </label>
                    <select
                      value={defaultStyle}
                      onChange={(e) => {
                        const newStyle = e.target.value;
                        setDefaultStyle(newStyle);
                        setStyles([newStyle]);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm font-bold text-stone-900 cursor-pointer"
                    >
                      {ABAYA_STYLES.map(style => (
                        <option key={style.id} value={style.name}>
                          {style.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Craftsmanship / Work */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Craftsmanship / Work *
                    </label>
                    <select
                      value={defaultWork}
                      onChange={(e) => {
                        const newWork = e.target.value;
                        setDefaultWork(newWork);
                        setWorks([newWork]);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm font-bold text-stone-900 cursor-pointer"
                    >
                      {ABAYA_WORKS.map(work => (
                        <option key={work.id} value={work.name}>
                          {work.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Editorial Badge
                    </label>
                    <select
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm text-stone-800"
                    >
                      {PRESET_BADGES.map(b => (
                        <option key={b} value={b}>{b ? b : 'None (No badge)'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Stock Inventory (Pieces)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stockCount}
                      onChange={(e) => setStockCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Rating & Reviews Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Star Rating (1.0 – 5.0)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      placeholder="5.0"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm font-semibold text-stone-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Reviews Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={reviewsCount}
                      onChange={(e) => setReviewsCount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm font-semibold text-stone-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Pricing & Regional Audience */}
            <div id="pricing" className="bg-white rounded-3xl p-6 sm:p-7 border border-secondary/20 shadow-subtle space-y-6">
              <div className="border-b border-surface-container-highest pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-900">Pricing & Regional Market</h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Base Retail Price (USD $) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-stone-500 font-serif">$</span>
                      <input
                        type="number"
                        required
                        min="1"
                        step="1"
                        placeholder="185"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-sm font-bold text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Original Strikethrough Price (USD $)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-stone-500 font-serif">$</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="240"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-sm text-stone-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Auto converted currency helper pill */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                    <span>Auto Converted Rates:</span>
                  </span>
                  <div className="flex items-center gap-3 text-stone-700 font-mono font-medium">
                    <span>INR ₹{inrPrice.toLocaleString()} {inrOrig ? <del className="text-stone-400">₹{inrOrig.toLocaleString()}</del> : ''}</span>
                    <span>•</span>
                    <span>AED {aedPrice.toLocaleString()} {aedOrig ? <del className="text-stone-400">AED {aedOrig.toLocaleString()}</del> : ''}</span>
                  </div>
                </div>

                {/* Target Audience Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Target Audience / Regional Display Rule *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setTargetRegion('all')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        targetRegion === 'all'
                          ? 'border-royal-violet bg-royal-violet/5 ring-2 ring-royal-violet/20 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-stone-900">Global / All Markets</span>
                      {targetRegion === 'all' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-royal-violet bg-royal-violet/15 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetRegion('india')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        targetRegion === 'india'
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-stone-900">India (INR ₹)</span>
                      {targetRegion === 'india' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetRegion('arab')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        targetRegion === 'arab'
                          ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-stone-900">Arab / UAE (AED)</span>
                      {targetRegion === 'arab' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Photography & Multi-Angle Gallery */}
            <div id="media" className="bg-white rounded-3xl p-6 sm:p-7 border border-secondary/20 shadow-subtle space-y-6">
              <div className="border-b border-surface-container-highest pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-900">Photography & Gallery</h2>
              </div>

              {/* Primary Hero Image Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Primary Hero Portrait *
                  </label>
                  {isUploadingImage && (
                    <span className="text-xs text-royal-violet font-semibold animate-pulse">
                      Uploading to Supabase...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-4 aspect-[3/4] rounded-2xl bg-surface-container overflow-hidden border-2 border-dashed border-secondary/40 relative flex items-center justify-center group shadow-inner">
                    {image ? (
                      <>
                        <img src={image} alt="Hero portrait" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-royal-violet text-white text-[9px] font-bold uppercase tracking-wider shadow">
                          Main Hero
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 text-stone-400">
                        <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40 text-stone-500" />
                        <span className="text-xs font-medium">No photo selected</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8 space-y-3">
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-royal-violet/40 hover:border-royal-violet bg-royal-violet/5 hover:bg-royal-violet/10 rounded-2xl cursor-pointer transition-all text-center group">
                      <Upload className="w-8 h-8 text-royal-violet mb-2 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="text-xs font-bold text-stone-900">Upload High-Res Photo to Cloud</span>
                      <span className="text-[11px] text-stone-500 mt-0.5">Direct to Supabase Storage (PNG, JPG, WEBP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-stone-600">Or Direct Image URL:</span>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                          if (!gallery.includes(e.target.value)) {
                            setGallery(prev => [e.target.value, ...prev]);
                          }
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-secondary/30 bg-[#fff9fd] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Angles Grid */}
              <div className="pt-4 border-t border-surface-container-highest space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Multi-Angle Lookbook Gallery ({gallery.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">Back drape, silhouette details, and craftsmanship closeups</p>
                  </div>

                  <label className="px-3.5 py-1.5 rounded-xl bg-royal-violet text-white text-xs font-bold cursor-pointer hover:bg-royal-violet/90 transition-colors flex items-center gap-1.5 shadow-2xs">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Angles</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {isUploadingGallery && (
                  <p className="text-xs text-royal-violet animate-pulse font-semibold">
                    Uploading angle photos to cloud...
                  </p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {gallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-[3/4] rounded-2xl bg-surface-container overflow-hidden border border-secondary/20 group shadow-2xs">
                      <img src={url} alt={`Gallery angle ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                        <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded self-start">
                          Index #{idx}
                        </span>

                        <div className="flex items-center justify-between gap-1.5">
                          {image !== url && (
                            <button
                              type="button"
                              onClick={() => setAsMainImage(url)}
                              className="text-[10px] bg-white text-stone-900 px-2 py-1 rounded-md font-bold shadow hover:bg-stone-100"
                            >
                              Make Hero
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="p-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 ml-auto"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {image === url && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-royal-violet text-white text-[9px] font-bold uppercase tracking-wider shadow">
                          Hero
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Sizes & Custom Fit */}
            <div id="sizes" className="bg-white rounded-3xl p-6 sm:p-7 border border-secondary/20 shadow-subtle space-y-6">
              <div className="border-b border-surface-container-highest pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-900">Abaya Lengths & Sizing</h2>
              </div>

              {/* Sizes & Custom Tailored Fit Studio */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Available Lengths & Sizing Range ({sizes.length} active)
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      if (!sizes.includes('Custom Tailored Fit')) {
                        toggleSize('Custom Tailored Fit');
                      }
                      setShowCustomSizeManager(!showCustomSizeManager);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      sizes.includes('Custom Tailored Fit') || showCustomSizeManager
                        ? 'bg-royal-violet/15 text-royal-violet border border-royal-violet/30'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>✨ {sizes.includes('Custom Tailored Fit') || showCustomSizeManager ? 'Custom Sizing Active' : '+ Custom Fit'}</span>
                  </button>
                </div>

                {/* Standard Size Buttons */}
                <div className="flex flex-wrap gap-2">
                  {ABAYA_SIZES.map((size) => {
                    const isSelected = sizes.includes(size.label);
                    const isCustomBtn = size.size === 'Custom' || size.label.includes('Custom');
                    return (
                      <button
                        key={size.size}
                        type="button"
                        onClick={() => {
                          toggleSize(size.label);
                          if (isCustomBtn && !sizes.includes(size.label)) {
                            setShowCustomSizeManager(true);
                          }
                        }}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? isCustomBtn
                              ? 'bg-gradient-to-r from-royal-violet to-[#982476] text-white border-royal-violet shadow-xs'
                              : 'bg-primary text-white border-primary shadow-xs'
                            : isCustomBtn
                              ? 'bg-[#fff0f7] text-[#982476] border-[#982476]/30 hover:bg-[#ffe5f2]'
                              : 'bg-white text-stone-700 border-surface-container hover:bg-stone-50'
                        }`}
                      >
                        {isCustomBtn && <Sparkles className="w-3.5 h-3.5 text-gold-accent" />}
                        <span>{size.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white/90 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Sizing Panel (Visible when Custom Tailored Fit is selected or manager toggled) */}
                {(sizes.includes('Custom Tailored Fit') || showCustomSizeManager || sizes.some(s => !ABAYA_SIZES.some(std => std.label === s))) && (
                  <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#fff4fc] to-[#fff9fd] border-2 border-royal-violet/30 shadow-subtle space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-royal-violet">
                        Custom Tailored Fit & Bespoke Sizing
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-royal-violet/10 text-royal-violet text-[10px] font-bold uppercase tracking-wider border border-royal-violet/20">
                        Bespoke Sizing Mode
                      </span>
                    </div>

                    {/* Custom Size Input Form */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Type custom size (e.g. Size 50 (Length 50&quot;), Size 62 (Tall), Bespoke Made-to-Measure)..."
                          value={customSizeInput}
                          onChange={(e) => setCustomSizeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomSize();
                            }
                          }}
                          className="w-full px-4 py-2.5 rounded-xl border border-royal-violet/30 bg-white text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-royal-violet/40 placeholder:font-normal placeholder:text-stone-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCustomSize}
                        disabled={!customSizeInput.trim()}
                        className="px-4 py-2.5 rounded-xl bg-royal-violet text-white text-xs font-bold hover:bg-royal-violet/90 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Custom Size</span>
                      </button>
                    </div>

                    {/* Quick Preset Custom Sizes */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Quick Add Custom Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Size 48 (Length 48")',
                          'Size 50 (Length 50")',
                          'Size 62 (Length 62")',
                          'Size 64 (Length 64")',
                          'Petite Custom Fit',
                          'Tall Custom Fit (62"+)',
                          'Bespoke Made-to-Measure'
                        ].map((presetSize) => (
                          <button
                            key={presetSize}
                            type="button"
                            onClick={() => handleAddPresetCustomSize(presetSize)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer flex items-center gap-1 ${
                              sizes.includes(presetSize)
                                ? 'bg-royal-violet/10 text-royal-violet border-royal-violet/30 font-bold'
                                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-2xs'
                            }`}
                          >
                            <Plus className="w-3 h-3 text-royal-violet" />
                            <span>{presetSize}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Configured Sizes Matrix */}
                    <div className="pt-2 border-t border-royal-violet/15 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Active Sizing Options on Product Page:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sizes.map((s, sIdx) => {
                          const isCustomEntry = !ABAYA_SIZES.some(std => std.label === s);
                          return (
                            <span
                              key={sIdx}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold shadow-2xs ${
                                isCustomEntry
                                  ? 'bg-[#831862] text-white'
                                  : 'bg-white text-stone-800 border border-stone-200'
                              }`}
                            >
                              <span>{s}</span>
                              <button
                                type="button"
                                onClick={() => removeSize(s)}
                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/20 text-stone-400 hover:text-white transition-colors ml-0.5 cursor-pointer"
                                title={`Remove ${s}`}
                              >
                                &times;
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Helpful Note */}
                    <div className="p-3 rounded-xl bg-white/80 border border-royal-violet/20 flex items-start gap-2 text-[11px] text-stone-600">
                      <Info className="w-4 h-4 text-royal-violet shrink-0 mt-0.5" />
                      <span>
                        When <strong>Custom Tailored Fit</strong> is active, clients on the product page will be prompted with the bespoke measurement calculator (Bust, Length, Sleeve & Shoulder inputs).
                      </span>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* 4. Narrative & Care */}
            <div id="editorial" className="bg-white rounded-3xl p-6 sm:p-7 border border-secondary/20 shadow-subtle space-y-6">
              <div className="border-b border-surface-container-highest pb-4">
                <h2 className="font-serif text-lg font-bold text-stone-900">Product Details & Care</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Product Narrative & Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="An ode to quiet luxury. Handcrafted from luminous pure mulberry silk with masterfully tailored cuts..."
                    className="w-full px-4 py-3 rounded-2xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm leading-relaxed text-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Fabric Details & Density
                  </label>
                  <textarea
                    rows={2}
                    value={fabricDetails}
                    onChange={(e) => setFabricDetails(e.target.value)}
                    placeholder="100% Grade 6A Organic Mulberry Silk. 19 Momme density for high opacity..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm leading-relaxed text-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Styling & Atelier Advice
                  </label>
                  <textarea
                    rows={2}
                    value={stylingAdvice}
                    onChange={(e) => setStylingAdvice(e.target.value)}
                    placeholder="Pairs Users with tailored inner slips, silk wraps, and pearl jewelry..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm leading-relaxed text-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Garment Care Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    placeholder="Dry clean or gentle hand wash cold with pH-neutral silk detergent. Lay flat on dry towel..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-secondary/30 bg-[#fff9fd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/40 text-xs sm:text-sm leading-relaxed text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-3 rounded-2xl border border-secondary/30 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                ← Return to Catalog
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary via-royal-violet to-primary text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-luxury flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing Abaya...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-gold-soft" />
                    <span>{isEditing ? 'Save Changes' : 'Publish Abaya to Catalog'}</span>
                  </>
                )}
              </button>
            </div>

      </div>

    </div>
  );
}
