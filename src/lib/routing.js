const PATH_TO_VIEW = {
  '/': 'home',
  '/shop': 'shop',
  '/collections': 'collections',
  '/story': 'story',
  '/contact': 'contact',
  '/offers': 'offers',
  '/terms': 'terms',
  '/refund-policy': 'refund-policy',
  '/admin': 'admin',
};

const VIEW_TO_PATH = {
  home: '/',
  shop: '/shop',
  collections: '/collections',
  story: '/story',
  contact: '/contact',
  offers: '/offers',
  terms: '/terms',
  'refund-policy': '/refund-policy',
  admin: '/admin',
};

export const DEFAULT_FILTERS = {
  category: 'All',
  style: 'All',
  work: 'All',
  color: 'All',
  subcategory: 'All',
  wholesale: 'All',
  tab: 'silhouette',
  wishlist: false,
  q: '',
};

export function parseLocation(pathname, search = '') {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const productMatch = cleanPath.match(/^\/product\/(.+)$/);
  if (productMatch) {
    return {
      view: 'product-detail',
      productId: decodeURIComponent(productMatch[1]),
      filters: parseFilterParams(search),
    };
  }

  return {
    view: PATH_TO_VIEW[cleanPath] || 'home',
    productId: null,
    filters: parseFilterParams(search),
  };
}

export function parseFilterParams(search) {
  const params = new URLSearchParams(typeof search === 'string' ? search : '');
  return {
    category: params.get('category') || DEFAULT_FILTERS.category,
    style: params.get('style') || DEFAULT_FILTERS.style,
    work: params.get('work') || DEFAULT_FILTERS.work,
    color: params.get('color') || DEFAULT_FILTERS.color,
    subcategory: params.get('subcategory') || DEFAULT_FILTERS.subcategory,
    wholesale: params.get('wholesale') || DEFAULT_FILTERS.wholesale,
    tab: params.get('tab') || DEFAULT_FILTERS.tab,
    wishlist: params.get('wishlist') === '1' || params.get('wishlist') === 'true',
    q: params.get('q') || DEFAULT_FILTERS.q,
  };
}

function setOrDelete(params, key, value, emptyValue) {
  if (value == null || value === '' || value === emptyValue) {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }
}

export function buildFilterSearch(filters = {}) {
  const params = new URLSearchParams();
  setOrDelete(params, 'category', filters.category, 'All');
  setOrDelete(params, 'style', filters.style, 'All');
  setOrDelete(params, 'work', filters.work, 'All');
  setOrDelete(params, 'color', filters.color, 'All');
  setOrDelete(params, 'subcategory', filters.subcategory, 'All');
  setOrDelete(params, 'wholesale', filters.wholesale, 'All');
  setOrDelete(params, 'tab', filters.tab, DEFAULT_FILTERS.tab);
  if (filters.wishlist) params.set('wishlist', '1');
  setOrDelete(params, 'q', filters.q, '');
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function pathForView(view, productId = null) {
  if (view === 'product-detail' && productId) {
    return `/product/${encodeURIComponent(productId)}`;
  }
  return VIEW_TO_PATH[view] || '/';
}

export function shouldRedirectLegacyAdmin(search, hash) {
  const params = new URLSearchParams(search || '');
  const hashValue = String(hash || '').replace('#', '');
  return params.get('view') === 'admin' || hashValue === 'admin';
}
