import { createClient } from '@supabase/supabase-js';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products.js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

// Check if valid credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')
);

// Initialize Supabase client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

const STORAGE_BUCKET = 'product-images';
const LOCAL_STORAGE_PRODUCTS_KEY = 'noor_admin_products';
const LOCAL_STORAGE_ORDERS_KEY = 'noor_admin_orders';

/**
 * Format raw database row to UI product model
 */
export function formatProductFromDB(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || 'Untitled Abaya',
    subtitle: row.subtitle || '',
    price: Number(row.price) || 0,
    originalPrice: row.original_price ? Number(row.original_price) : null,
    category: row.category || 'Abaya',
    badge: row.badge || '',
    targetRegion: row.target_region || 'all',
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 0,
    isVioletEdition: Boolean(row.is_violet_edition),
    defaultStyle: row.default_style || 'Open abaya',
    defaultWork: row.default_work || 'plain',
    styles: Array.isArray(row.styles) ? row.styles : [],
    works: Array.isArray(row.works) ? row.works : [],
    image: row.image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : (row.image ? [row.image] : []),
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    description: row.description || '',
    fabricDetails: row.fabric_details || '',
    stylingAdvice: row.styling_advice || '',
    careInstructions: row.care_instructions || '',
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  };
}

/**
 * Format UI product model to database row
 */
export function formatProductForDB(product) {
  return {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle || '',
    price: Number(product.price) || 0,
    original_price: product.originalPrice ? Number(product.originalPrice) : null,
    category: product.category || 'Abaya',
    badge: product.badge || null,
    target_region: product.targetRegion || 'all',
    rating: Number(product.rating) || 5.0,
    reviews_count: Number(product.reviewsCount) || 0,
    is_violet_edition: Boolean(product.isVioletEdition),
    default_style: product.defaultStyle || 'Open abaya',
    default_work: product.defaultWork || 'plain',
    styles: product.styles || [],
    works: product.works || [],
    image: product.image,
    gallery: product.gallery || [],
    sizes: product.sizes || [],
    description: product.description || '',
    fabric_details: product.fabricDetails || '',
    styling_advice: product.stylingAdvice || '',
    care_instructions: product.careInstructions || '',
    reviews: product.reviews || [],
    updated_at: new Date().toISOString()
  };
}

/**
 * Fetch all products from Supabase (or fallback to local cache/defaults)
 */
export async function fetchProductsFromSupabase() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, falling back to local data:', error.message);
      } else if (data && data.length > 0) {
        const formatted = data.map(formatProductFromDB);
        // Cache to localStorage for fast initial reloads
        try {
          localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(formatted));
        } catch (_) {}
        return { data: formatted, source: 'supabase', error: null };
      }
    } catch (err) {
      console.warn('Network/Supabase error:', err);
    }
  }

  // Fallback to local storage or bundled curated items
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { data: parsed, source: 'localStorage', error: null };
      }
    }
  } catch (_) {}

  return { data: DEFAULT_PRODUCTS, source: 'default', error: null };
}

/**
 * Insert or Update a product in Supabase
 */
export async function upsertProductToSupabase(product) {
  const dbPayload = formatProductForDB(product);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(dbPayload, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      return { data: formatProductFromDB(data), error: null };
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      // Update local storage as well
      saveProductLocally(product);
      return { data: product, error: err.message };
    }
  }

  // Local fallback
  saveProductLocally(product);
  return { data: product, error: null };
}

/**
 * Delete a product from Supabase
 */
export async function deleteProductFromSupabase(productId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting from Supabase:', err);
    }
  }

  deleteProductLocally(productId);
  return { success: true };
}

/**
 * Upload an image to Supabase Storage (or convert to base64 data URL for preview/fallback)
 */
export async function uploadProductImage(file, subFolder = 'general') {
  if (!file) return { url: null, error: 'No file provided' };

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `products/${subFolder}/${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.warn('Supabase storage upload failed, using local blob/data URL:', uploadError.message);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          return { url: publicUrlData.publicUrl, error: null };
        }
      }
    } catch (err) {
      console.warn('Error during storage upload:', err);
    }
  }

  // Fallback to local data URL reader
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ url: reader.result, error: null });
    reader.onerror = (err) => resolve({ url: null, error: err });
    reader.readAsDataURL(file);
  });
}

/**
 * Seed initial catalog to Supabase
 */
export async function seedInitialProductsToSupabase() {
  const productsToSeed = DEFAULT_PRODUCTS.map(formatProductForDB);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(productsToSeed, { onConflict: 'id' })
        .select();

      if (error) throw error;
      return { success: true, count: data?.length || productsToSeed.length, error: null };
    } catch (err) {
      return { success: false, count: 0, error: err.message };
    }
  }

  // Local storage seed
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return { success: true, count: DEFAULT_PRODUCTS.length, error: null };
  } catch (err) {
    return { success: false, count: 0, error: err.message };
  }
}

/**
 * Helper to save product to localStorage
 */
function saveProductLocally(product) {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    let list = saved ? JSON.parse(saved) : [...DEFAULT_PRODUCTS];
    const index = list.findIndex(p => p.id === product.id);
    if (index >= 0) {
      list[index] = product;
    } else {
      list.unshift(product);
    }
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(list));
  } catch (_) {}
}

/**
 * Helper to delete product from localStorage
 */
function deleteProductLocally(productId) {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    let list = saved ? JSON.parse(saved) : [...DEFAULT_PRODUCTS];
    list = list.filter(p => p.id !== productId);
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(list));
  } catch (_) {}
}

/**
 * Fetch orders from Supabase or local storage
 */
export async function fetchOrdersFromSupabase() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { data, error: null };
      }
    } catch (err) {
      console.warn('Orders fetch error:', err);
    }
  }

  // Return local stored or default sample order
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (saved) return { data: JSON.parse(saved), error: null };
  } catch (_) {}

  const defaultOrders = [
    {
      id: '#ABH-88421',
      customer_name: 'Sarah Al-Mansoor',
      email: 'sarah.mansoor@example.com',
      phone: '+971 50 123 4567',
      delivery_address: 'Villa 14, Jumeirah 2, Dubai, UAE',
      carrier: 'DHL Express Luxury Courier',
      tracking_number: 'DHL-EX-994820194US',
      status: 'In Transit via Express Courier',
      total_amount: 395,
      items: [
        { name: 'Midnight Espresso Silk Abaya', price: 185, quantity: 1, style: 'Open abaya', work: 'Handwork Abaya' },
        { name: 'Royal Violet Mulberry Silk Abaya', price: 210, quantity: 1, style: 'Butterfly or farasha', work: 'Stonework Abaya' }
      ],
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  return { data: defaultOrders, error: null };
}

/**
 * Update order in Supabase
 */
export async function upsertOrderToSupabase(order) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .upsert(order, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error('Error saving order to Supabase:', err);
    }
  }

  // Local storage update
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    let list = saved ? JSON.parse(saved) : [];
    const idx = list.findIndex(o => o.id === order.id);
    if (idx >= 0) list[idx] = order;
    else list.unshift(order);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(list));
  } catch (_) {}

  return { data: order, error: null };
}
