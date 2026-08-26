import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Layers,
  Palette,
  AlertCircle,
  HelpCircle,
  Scissors
} from 'lucide-react';
import { ABAYA_STYLES, ABAYA_WORKS, ABAYA_SIZES } from '../../data/products';
import { uploadProductImage } from '../../lib/supabase';

const PRESET_CATEGORIES = ['Silk', 'Chiffon', 'Modal Jersey', 'Georgette', 'Crepe', 'Organza', 'Linen'];
const PRESET_BADGES = ['', 'Signature Bestseller', 'Limited Edition', 'New Arrival', 'Staff Pick', 'Artisan Atelier', 'Trending', 'Exclusive'];

const LUXURY_PALETTE_PRESETS = [
  { name: 'Midnight Espresso', hex: '#2E1C1A' },
  { name: 'Royal Violet', hex: '#4A2B5E' },
  { name: 'Plum Noir', hex: '#211126' },
  { name: 'Amethyst Soft', hex: '#7D628A' },
  { name: 'Lavender Mist', hex: '#D4C5DD' },
  { name: 'Dusty Rose', hex: '#C49A99' },
  { name: 'Antique Blush', hex: '#E2C3C1' },
  { name: 'Serene Sage', hex: '#7D8B79' },
  { name: 'Ivory Pearl', hex: '#FBF6EE' },
  { name: 'Oat Cream', hex: '#ECE2D4' },
  { name: 'Charcoal Slate', hex: '#3D3F43' },
  { name: 'Pure Onyx', hex: '#111111' }
];

export default function AdminProductModal({
  isOpen,
  onClose,
  product = null,
  onSave
}) {
  const isEditing = Boolean(product && product.id);

  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Silk');
  const [customCategory, setCustomCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVioletEdition, setIsVioletEdition] = useState(false);
  const [stockCount, setStockCount] = useState(10);
  
  // Media State
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Colors State
  const [colors, setColors] = useState([
    { name: 'Midnight Espresso', hex: '#2E1C1A', imageIndex: 0 }
  ]);

  // Silhouettes / Styles State
  const [styles, setStyles] = useState(ABAYA_STYLES.map(s => s.name));
  const [defaultStyle, setDefaultStyle] = useState(ABAYA_STYLES[0].name);

  // Works / Craftsmanship State
  const [works, setWorks] = useState(ABAYA_WORKS.map(w => w.name));
  const [defaultWork, setDefaultWork] = useState(ABAYA_WORKS[0].name);

  // Sizes State
  const [sizes, setSizes] = useState(ABAYA_SIZES.map(s => s.label));

  // Descriptions State
  const [description, setDescription] = useState('');
  const [fabricDetails, setFabricDetails] = useState('');
  const [stylingAdvice, setStylingAdvice] = useState('');
  const [careInstructions, setCareInstructions] = useState('');

  // UI Tabs inside modal
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'media' | 'variants' | 'editorial'
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form on product change
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSubtitle(product.subtitle || '');
      setPrice(product.price !== undefined ? String(product.price) : '');
      setOriginalPrice(product.originalPrice ? String(product.originalPrice) : '');
      if (PRESET_CATEGORIES.includes(product.category)) {
        setCategory(product.category);
        setCustomCategory('');
      } else {
        setCategory('Other');
        setCustomCategory(product.category || '');
      }
      setBadge(product.badge || '');
      setIsFeatured(Boolean(product.isFeatured));
      setIsVioletEdition(Boolean(product.isVioletEdition));
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
      // Reset to pristine defaults
      setName('');
      setSubtitle('');
      setPrice('180');
      setOriginalPrice('');
      setCategory('Silk');
      setCustomCategory('');
      setBadge('New Arrival');
      setIsFeatured(false);
      setIsVioletEdition(false);
      setStockCount(12);
      setImage('https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw');
      setGallery([
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw'
      ]);
      setColors([
        { name: 'Midnight Espresso', hex: '#2E1C1A', imageIndex: 0 },
        { name: 'Royal Violet', hex: '#4A2B5E', imageIndex: 0 }
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
    setActiveTab('basic');
    setErrorMessage('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Handle Main Hero Image Upload
  const handleMainImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    setErrorMessage('');
    try {
      const { url, error } = await uploadProductImage(file, 'hero');
      if (error && !url) {
        setErrorMessage(`Image upload warning: ${error}`);
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

  // Color Swatch Handlers
  const addColorSwatch = () => {
    setColors(prev => [
      ...prev,
      { name: 'New Shade', hex: '#4A2B5E', imageIndex: 0 }
    ]);
  };

  const updateColorSwatch = (index, field, value) => {
    setColors(prev =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const removeColorSwatch = (index) => {
    if (colors.length <= 1) return;
    setColors(prev => prev.filter((_, i) => i !== index));
  };

  // Style Toggle
  const toggleStyle = (styleName) => {
    if (styles.includes(styleName)) {
      if (styles.length > 1) {
        setStyles(styles.filter(s => s !== styleName));
        if (defaultStyle === styleName) {
          const remaining = styles.filter(s => s !== styleName);
          setDefaultStyle(remaining[0] || 'Open abaya');
        }
      }
    } else {
      setStyles([...styles, styleName]);
    }
  };

  // Work Toggle
  const toggleWork = (workName) => {
    if (works.includes(workName)) {
      if (works.length > 1) {
        setWorks(works.filter(w => w !== workName));
        if (defaultWork === workName) {
          const remaining = works.filter(w => w !== workName);
          setDefaultWork(remaining[0] || 'plain');
        }
      }
    } else {
      setWorks([...works, workName]);
    }
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

  // Save Submission
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Product title is required.');
      setActiveTab('basic');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage('Please enter a valid price.');
      setActiveTab('basic');
      return;
    }
    if (!image) {
      setErrorMessage('Please upload or provide a primary product image.');
      setActiveTab('media');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    // Generate unique slug id if new
    const finalCategory = category === 'Other' ? (customCategory.trim() || 'Silk') : category;
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
      category: finalCategory,
      badge: badge.trim(),
      rating: product?.rating || 5.0,
      reviewsCount: product?.reviewsCount || 0,
      isFeatured,
      isVioletEdition,
      defaultStyle,
      defaultWork,
      styles,
      works,
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
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#fff7fc] rounded-2xl w-full max-w-4xl shadow-2xl border border-secondary/20 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-white border-b border-surface-container-highest flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-royal-violet">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
              <span>{isEditing ? 'Bespoke Item Editor' : 'New Haute Couture Creation'}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-primary font-medium">
              {isEditing ? `Edit: ${name || 'Product'}` : 'Create New Abaya Listing'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-surface-container-highest bg-[#fff9fd] px-6 gap-2 sm:gap-6 overflow-x-auto shrink-0">
          {[
            { id: 'basic', label: '1. Basic Info & Pricing' },
            { id: 'media', label: '2. Images & Gallery' },
            { id: 'variants', label: '3. Shades, Cuts & Craft' },
            { id: 'editorial', label: '4. Editorial & Care' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-royal-violet text-royal-violet font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Midnight Espresso Silk Abaya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Pure Mulberry Silk | Hand-Rolled Hems"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Price (USD / Base) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-stone-500 font-serif">$</span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="1"
                      placeholder="185"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm font-medium"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500">Auto-converts to INR (₹), AED, SAR, EUR, GBP in customer view.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Original Price (Optional for Discount Strikethrough)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-stone-500 font-serif">$</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="240"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Fabric Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm font-medium"
                  >
                    {PRESET_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>

                {category === 'Other' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Custom Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Velvet Jacquard"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Editorial Badge (Optional)
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm"
                  >
                    {PRESET_BADGES.map(b => (
                      <option key={b} value={b}>{b ? b : 'None (No badge)'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="10"
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-sm"
                  />
                </div>
              </div>

              {/* Badges & Special Features */}
              <div className="p-4 rounded-xl bg-white border border-secondary/20 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                  Promotions & Capsule Flags
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-surface-container hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-royal-violet rounded focus:ring-royal-violet"
                    />
                    <div>
                      <div className="text-xs font-semibold text-primary">Featured on Homepage</div>
                      <div className="text-[11px] text-stone-500">Showcases in Top Picks & Hero Sections</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-surface-container hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={isVioletEdition}
                      onChange={(e) => setIsVioletEdition(e.target.checked)}
                      className="w-4 h-4 text-royal-violet rounded focus:ring-royal-violet"
                    />
                    <div>
                      <div className="text-xs font-semibold text-royal-violet">The Violet Edition Capsule</div>
                      <div className="text-[11px] text-stone-500">Appears in dedicated Violet Edition lookbook</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMAGES & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in">
              {/* Primary Image Upload */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Primary Hero Image *</h3>
                    <p className="text-xs text-stone-500">The main image displayed across catalog and product cards</p>
                  </div>
                  {isUploadingImage && <span className="text-xs text-royal-violet animate-pulse font-medium">Uploading to Supabase...</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 aspect-[3/4] rounded-xl bg-surface-container overflow-hidden border border-secondary/20 relative group flex items-center justify-center">
                    {image ? (
                      <img src={image} alt="Hero preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4 text-stone-400">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <span className="text-xs">No image selected</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8 space-y-3">
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-royal-violet/40 rounded-xl hover:bg-royal-violet/5 cursor-pointer transition-colors text-center">
                      <Upload className="w-6 h-6 text-royal-violet mb-2" />
                      <span className="text-xs font-semibold text-primary">Click to upload photo to Supabase Storage</span>
                      <span className="text-[10px] text-stone-500 mt-1">Supports PNG, JPG, WEBP up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="space-y-1">
                      <span className="text-[11px] font-medium text-stone-600">Or Paste Direct Image URL:</span>
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
                        className="w-full px-3.5 py-2 rounded-lg border border-secondary/30 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Multi-Angle Gallery & Lookbook</h3>
                    <p className="text-xs text-stone-500">Additional angles, craftsmanship closeups, and drape photos</p>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-royal-violet/10 hover:bg-royal-violet/20 text-royal-violet text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5">
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
                  <p className="text-xs text-royal-violet animate-pulse font-medium">Uploading gallery images...</p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {gallery.map((url, idx) => (
                    <div key={idx} className="relative aspect-[3/4] rounded-xl bg-surface-container overflow-hidden border border-secondary/20 group">
                      <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <span className="text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded self-start">
                          Index #{idx}
                        </span>
                        
                        <div className="flex items-center justify-between gap-1">
                          {image !== url && (
                            <button
                              type="button"
                              onClick={() => setAsMainImage(url)}
                              className="text-[10px] bg-white text-primary px-2 py-1 rounded font-medium shadow hover:bg-stone-100"
                            >
                              Make Hero
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="p-1 rounded bg-red-600 text-white hover:bg-red-700 ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {image === url && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-royal-violet text-white text-[9px] font-semibold uppercase tracking-wider shadow">
                          Main Hero
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHADES, CUTS & CRAFT */}
          {activeTab === 'variants' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Color Swatches Builder */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <Palette className="w-4 h-4 text-royal-violet" />
                      <span>Color Swatches & Linked Angle</span>
                    </h3>
                    <p className="text-xs text-stone-500">Define color shades and tie each to an image gallery index</p>
                  </div>
                  <button
                    type="button"
                    onClick={addColorSwatch}
                    className="px-3 py-1.5 rounded-lg bg-royal-violet text-white text-xs font-medium hover:bg-royal-violet/90 transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Shade</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {colors.map((color, idx) => (
                    <div key={idx} className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border border-black/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      
                      <div className="flex-1 min-w-[140px]">
                        <input
                          type="text"
                          placeholder="Color Name (e.g. Royal Violet)"
                          value={color.name}
                          onChange={(e) => updateColorSwatch(idx, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-secondary/30 bg-white text-xs font-medium"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) => updateColorSwatch(idx, 'hex', e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={color.hex}
                          onChange={(e) => updateColorSwatch(idx, 'hex', e.target.value)}
                          className="w-20 px-2 py-1.5 rounded-lg border border-secondary/30 bg-white text-xs font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-stone-500 whitespace-nowrap">Gallery Index:</span>
                        <select
                          value={color.imageIndex ?? 0}
                          onChange={(e) => updateColorSwatch(idx, 'imageIndex', Number(e.target.value))}
                          className="px-2.5 py-1.5 rounded-lg border border-secondary/30 bg-white text-xs"
                        >
                          {gallery.map((_, gIdx) => (
                            <option key={gIdx} value={gIdx}>Angle #{gIdx}</option>
                          ))}
                        </select>
                      </div>

                      {colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColorSwatch(idx)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Preset Palette Palette */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Quick Preset Luxury Palette:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {LUXURY_PALETTE_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setColors(prev => [
                            ...prev,
                            { name: preset.name, hex: preset.hex, imageIndex: 0 }
                          ]);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-secondary/20 bg-white hover:bg-surface-container text-[11px] text-stone-700 transition-colors"
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: preset.hex }} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Silhouettes / Styles Selector */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-royal-violet" />
                    <span>Silhouettes / Cut Options</span>
                  </h3>
                  <span className="text-xs text-stone-500">Default: <strong className="text-primary">{defaultStyle}</strong></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ABAYA_STYLES.map((style) => {
                    const isSelected = styles.includes(style.name);
                    const isDefault = defaultStyle === style.name;
                    return (
                      <div
                        key={style.id}
                        onClick={() => toggleStyle(style.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-royal-violet bg-royal-violet/5'
                            : 'border-surface-container opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-primary">{style.name}</div>
                          <div className="text-[10px] text-stone-500">{style.tag}</div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDefaultStyle(style.name);
                              }}
                              className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                                isDefault ? 'bg-royal-violet text-white' : 'bg-surface-container text-stone-600'
                              }`}
                            >
                              {isDefault ? 'Default' : 'Set Default'}
                            </button>
                            <Check className="w-4 h-4 text-royal-violet" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Craftsmanship / Works Selector */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-accent" />
                    <span>Craftsmanship / Artisan Work Options</span>
                  </h3>
                  <span className="text-xs text-stone-500">Default: <strong className="text-primary">{defaultWork}</strong></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ABAYA_WORKS.map((work) => {
                    const isSelected = works.includes(work.name);
                    const isDefault = defaultWork === work.name;
                    return (
                      <div
                        key={work.id}
                        onClick={() => toggleWork(work.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-gold-accent bg-gold-accent/5'
                            : 'border-surface-container opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-primary">{work.name}</div>
                          <div className="text-[10px] text-stone-500">{work.tag}</div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDefaultWork(work.name);
                              }}
                              className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                                isDefault ? 'bg-gold-accent text-primary' : 'bg-surface-container text-stone-600'
                              }`}
                            >
                              {isDefault ? 'Default' : 'Set Default'}
                            </button>
                            <Check className="w-4 h-4 text-gold-accent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sizes Selector */}
              <div className="p-5 rounded-2xl bg-white border border-secondary/20 space-y-3">
                <h3 className="text-sm font-semibold text-primary">Abaya Lengths & Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {ABAYA_SIZES.map((size) => {
                    const isSelected = sizes.includes(size.label);
                    return (
                      <button
                        key={size.size}
                        type="button"
                        onClick={() => toggleSize(size.label)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-surface-container-low text-stone-600 border-surface-container'
                        }`}
                      >
                        {size.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDITORIAL & CARE */}
          {activeTab === 'editorial' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Product Narrative & Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="An ode to quiet luxury. Handcrafted from luminous pure mulberry silk with masterfully tailored cuts..."
                  className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Fabric Details & Density
                </label>
                <textarea
                  rows={2}
                  value={fabricDetails}
                  onChange={(e) => setFabricDetails(e.target.value)}
                  placeholder="100% Grade 6A Organic Mulberry Silk. 19 Momme density for high opacity..."
                  className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Styling & Atelier Advice
                </label>
                <textarea
                  rows={2}
                  value={stylingAdvice}
                  onChange={(e) => setStylingAdvice(e.target.value)}
                  placeholder="Pairs impeccably with tailored inner slips, silk wraps, and pearl jewelry..."
                  className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Care Instructions
                </label>
                <textarea
                  rows={2}
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  placeholder="Dry clean or gentle hand wash cold with pH-neutral silk detergent. Lay flat on dry towel..."
                  className="w-full px-4 py-2.5 rounded-xl border border-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-royal-violet/30 text-xs sm:text-sm leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-secondary/30 hover:bg-surface-container text-stone-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'media') setActiveTab('basic');
                    if (activeTab === 'variants') setActiveTab('media');
                    if (activeTab === 'editorial') setActiveTab('variants');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-stone-700 text-xs font-medium"
                >
                  Previous Step
                </button>
              )}

              {activeTab !== 'editorial' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'basic') setActiveTab('media');
                    else if (activeTab === 'media') setActiveTab('variants');
                    else if (activeTab === 'variants') setActiveTab('editorial');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-royal-violet text-white text-xs font-semibold hover:bg-royal-violet/90 transition-colors shadow"
                >
                  Next Step &rarr;
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary via-royal-violet to-primary text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-all shadow-luxury flex items-center gap-2"
                >
                  {isSaving ? (
                    <span>Saving to Supabase...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-gold-soft" />
                      <span>{isEditing ? 'Save Changes' : 'Publish Abaya'}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
