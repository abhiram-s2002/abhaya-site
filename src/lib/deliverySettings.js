import { supabase, isSupabaseConfigured } from './supabase';

const LS_KEY = 'noor_delivery_settings';
const SETTINGS_KEY = 'delivery_settings';

export const DEFAULT_DELIVERY_SETTINGS = {
  arab: { freeDeliveryThreshold: 150, deliveryFee: 17 },
  india: { freeDeliveryThreshold: 3500, deliveryFee: 400 },
};

function normalizeSettings(value) {
  const arab = value?.arab || {};
  const india = value?.india || {};
  return {
    arab: {
      freeDeliveryThreshold: Number(arab.freeDeliveryThreshold ?? DEFAULT_DELIVERY_SETTINGS.arab.freeDeliveryThreshold),
      deliveryFee: Number(arab.deliveryFee ?? DEFAULT_DELIVERY_SETTINGS.arab.deliveryFee),
    },
    india: {
      freeDeliveryThreshold: Number(india.freeDeliveryThreshold ?? DEFAULT_DELIVERY_SETTINGS.india.freeDeliveryThreshold),
      deliveryFee: Number(india.deliveryFee ?? DEFAULT_DELIVERY_SETTINGS.india.deliveryFee),
    },
  };
}

/**
 * Fetch delivery settings from Supabase app_settings table.
 * Falls back to localStorage then defaults.
 */
export async function fetchDeliverySettings() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', SETTINGS_KEY)
        .single();

      if (!error && data?.value) {
        const val = normalizeSettings(data.value);
        try { localStorage.setItem(LS_KEY, JSON.stringify(val)); } catch (_) {}
        return val;
      }
    } catch (err) {
      console.warn('deliverySettings fetch error:', err);
    }
  }

  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved !== null) return normalizeSettings(JSON.parse(saved));
  } catch (_) {}

  return { ...DEFAULT_DELIVERY_SETTINGS };
}

/**
 * Persist delivery settings to Supabase app_settings table and localStorage.
 */
export async function setDeliverySettingsRemote(settings) {
  const normalized = normalizeSettings(settings);
  try { localStorage.setItem(LS_KEY, JSON.stringify(normalized)); } catch (_) {}

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert(
          { key: SETTINGS_KEY, value: normalized, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
      if (error) throw error;
    } catch (err) {
      console.warn('deliverySettings upsert error:', err);
    }
  }

  return normalized;
}

/**
 * Compute shipping fee in the active region's display currency.
 */
export function computeShippingFee(cartSubtotal, activeRegion, deliverySettings) {
  const regionSettings = deliverySettings?.[activeRegion] || DEFAULT_DELIVERY_SETTINGS[activeRegion];
  if (!regionSettings) return 0;
  return cartSubtotal >= regionSettings.freeDeliveryThreshold ? 0 : regionSettings.deliveryFee;
}

/**
 * Cart subtotal is already in the active region's display currency.
 */
export function getRegionSubtotal(cartSubtotal) {
  return cartSubtotal;
}
