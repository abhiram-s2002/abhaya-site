/**
 * IP Geolocation Utility using GeoJS (https://www.geojs.io/)
 * Free, HTTPS supported, CORS enabled, no API key required.
 */

// Mapping of Country Code to Emoji Flag
export function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Map Country Code to store's supported currency
export function getSuggestedCurrency(countryCode) {
  const code = (countryCode || '').toUpperCase();

  if (code === 'IN') return 'INR';
  if (code === 'AE') return 'AED';
  if (['SA', 'QA', 'KW', 'BH', 'OM'].includes(code)) return 'SAR';
  if (code === 'GB') return 'GBP';
  if ([
    'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 
    'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'SE', 'DK', 'PL', 'NO', 'CH'
  ].includes(code)) {
    return 'EUR';
  }
  
  return 'USD'; // Default global currency
}

/**
 * Fetch visitor's country and location details via GeoJS.
 * Results are cached in sessionStorage to prevent redundant network requests.
 */
export async function detectUserLocation() {
  const CACHE_KEY = 'noor_geo_location';

  // Check session cache first
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (_) {}

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch('https://get.geojs.io/v1/ip/geo.json', {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GeoJS request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    const countryCode = data.country_code || 'IN';
    const country = data.country || 'India';
    const city = data.city || '';
    const region = data.region || '';
    const ip = data.ip || '';
    const flag = getCountryFlag(countryCode);
    const suggestedCurrency = getSuggestedCurrency(countryCode);

    const geoResult = {
      country,
      countryCode,
      city,
      region,
      ip,
      flag,
      suggestedCurrency,
      isDetected: true
    };

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(geoResult));
    } catch (_) {}

    return geoResult;
  } catch (error) {
    console.warn('GeoJS IP detection note:', error?.message || error);
    // Graceful fallback
    return {
      country: 'India',
      countryCode: 'IN',
      city: '',
      region: '',
      ip: '',
      flag: '🇮🇳',
      suggestedCurrency: 'INR',
      isDetected: false
    };
  }
}
