import { supabase, isSupabaseConfigured } from './supabase';

const LS_KEY = 'noor_admin_enabled';
const SETTINGS_KEY = 'admin_enabled';

/**
 * Fetch the admin_enabled flag from Supabase app_settings table.
 * Falls back to localStorage then defaults to true.
 */
export async function fetchAdminEnabled() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', SETTINGS_KEY)
        .single();

      if (!error && data) {
        const val = data.value?.enabled ?? true;
        try { localStorage.setItem(LS_KEY, JSON.stringify(val)); } catch (_) {}
        return val;
      }
    } catch (err) {
      console.warn('adminSettings fetch error:', err);
    }
  }

  // Fallback: localStorage
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved !== null) return JSON.parse(saved);
  } catch (_) {}

  return true; // default ON
}

/**
 * Persist the admin_enabled flag to Supabase app_settings table and localStorage.
 */
export async function setAdminEnabledRemote(enabled) {
  // Always update localStorage immediately
  try { localStorage.setItem(LS_KEY, JSON.stringify(enabled)); } catch (_) {}

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert(
          { key: SETTINGS_KEY, value: { enabled }, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
      if (error) throw error;
    } catch (err) {
      console.warn('adminSettings upsert error:', err);
    }
  }
}
