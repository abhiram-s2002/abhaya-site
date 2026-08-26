import { supabase, isSupabaseConfigured } from './supabase';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT CONTENT — used if Supabase/localStorage are empty so site never breaks
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_CONTENT = {
  announcement: {
    enabled: true,
    leftText: 'Complimentary Silk Gift Box on Orders $150+',
    centerBadge: 'The Violet Edition:',
    centerText: 'Limited Mulberry Silk & Amethyst Drapes',
    rightBadge: 'Worldwide Express',
    thresholdAmount: 150,
  },

  hero_slides: [
    {
      id: 1,
      badge: 'NEW ARRIVAL',
      title: 'Midnight Espresso Silk',
      description: 'Iridescent 100% Grade 6A mulberry silk, a whisper of pure haute couture on your skin.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g',
      cta: 'SHOP NOW',
      productId: 'midnight-espresso-silk',
    },
    {
      id: 2,
      badge: 'AUTUMN / WINTER EDITION',
      title: 'Royal Amethyst Chiffon',
      description: 'Bold, regal tones woven from Japanese pebble georgette for effortless everyday luxury.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Sf1dgvSxQEdIcuInSxcRUwW6B-nBrZnNrAlOjxmNSTXEgqHvgbTWfGWkg5QYKVY0d9lsnGmuQwBuPf3yXH71nFMwMaVjxwvCixfo4u7HOgAOx-Z-drovy_YH-5MOgACvt0Pwe1icr3mK9M_bxXtmzzaUPFW_vyPfmx1GGDVrW_F2AgYUY40fBuNWPQElc5LbqXQuB_wLdkClmmrvrK6lHW6RI2zefAzNng6DUsYCen2Ggb06fdIVoA',
      cta: 'EXPLORE COLLECTION',
      productId: 'royal-violet-silk',
    },
    {
      id: 3,
      badge: 'SIGNATURE BESPOKE',
      title: 'Austrian Modal Jersey',
      description: 'Cloud-soft micro-modal weave that stays flawlessly in place without undercaps or pins.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkdZL0iJiKpH_RGkCIR3KLu-FRwu0VNrwd0AKjbEC4LKeHX81c_gdKTa-2u50NIw6c-dk9UQ8TRmm6yQbZjQgiuwIUEEBUp9SCT7pU4TIddCWVvd0w4wOIz4ajtmoc3h3NpKqeI5t9diUWGGVfWCntFu7hYs6yRdpT2QuyTJlISHeDi11u6Nxth4Z0XBlgtoUTQyhGy2lgNyNAECYG-szSx1NYT-9CsllGhOybxhSgFYV5PtfVnL0aWA',
      cta: 'DISCOVER MODAL',
      productId: 'sage-haven-modal',
    },
  ],

  testimonials: [
    {
      id: 1,
      review: 'I am continually amazed by how majestic these bespoke abayas drape once worn. The pure silk Farasha with delicate stonework is pure perfection, and I received non-stop compliments at every event.',
      author: 'Sarah Al-Mansoor',
      location: 'Dubai',
    },
    {
      id: 2,
      review: 'The Austrian Modal Jersey Abaya in Kimono cut has completely elevated my wardrobe. Incredibly breathable, fluid movement, and the packaging feels like opening high jewellery.',
      author: 'Priya Nair',
      location: 'London',
    },
    {
      id: 3,
      review: 'NOOR AL DHUHA Atelier brings true Parisian and Milanese haute couture standards to modest fashion. From the magnetic keepsake box to the pure mulberry silk sheen, it is unmatched.',
      author: 'Tania Rahman',
      location: 'Toronto',
    },
  ],

  newsletter: {
    badge: 'EXCLUSIVE ATELIER ACCESS',
    title: 'Receive Editorial Privileges & First Access',
    subtitle: 'Sign up for private capsule lookbooks, secret archive previews, and bespoke styling advice.',
    ctaText: 'Subscribe',
  },

  features_section: [
    {
      id: 1,
      badge: 'EXCLUSIVE PRIVILEGE',
      badgeColor: 'text-royal-violet',
      title: 'Complimentary Silk Keepsake Box',
      description: 'Signature presentation box with every creation',
      link: 'offers',
    },
    {
      id: 2,
      badge: 'COMPLIMENTARY ACCESSORY',
      badgeColor: 'text-emerald-700',
      title: 'Matching Shayla & Silk Keepsake Box',
      description: 'Included complimentary with every abaya creation',
      link: 'shop',
    },
    {
      id: 3,
      badge: 'BESPOKE CONCIERGE',
      badgeColor: 'text-secondary',
      title: 'Personal Styling & Sizing',
      description: 'Consult with our master atelier stylist',
      link: 'contact',
    },
  ],

  story_page: {
    tagline: 'Heritage & Manifesto',
    headline: 'The House of NOOR AL DHUHA',
    subheading: 'Founded on the belief that modesty should never ask for compromise in luxury, quality, or architectural beauty.',
    genesis_label: 'The Genesis',
    genesis_title: 'Crafted in Reverence of Detail',
    genesis_paragraphs: [
      'For decades, modest fashion was forced to choose between synthetic polyester blends that slipped and snagged, or heavy fabrics that suffocated. We sought to re-imagine the bespoke abaya and modest silhouette as a piece of haute couture sculpture.',
      'We spent three years testing over 40 distinct silk weights before settling on our proprietary 19-Momme Grade 6A Mulberry Silk—which features a luminous, fluid face and a micro-textured matte reverse weave that eliminates slippage without pins.',
    ],
    stat1_value: '100%',
    stat1_label: 'Grade 6A Long-Fiber Mulberry Silk',
    stat2_value: '0%',
    stat2_label: 'Synthetic Plastic Fillers or Harsh Chemicals',
    pillars_label: 'Guiding Principles',
    pillars_title: 'The Four Pillars of NOOR AL DHUHA',
    pillars: [
      { icon: 'sparkles', title: 'Organic Fiber Purity', description: 'We use organic Mulberry silk and FSC-certified Austrian TENCEL™ modal that nurture hair and skin naturally.' },
      { icon: 'feather', title: 'Architectural Drape', description: 'Precision edge rolls and balanced weights ensure effortless hold without bunching or collapsing.' },
      { icon: 'shield', title: 'Hypoallergenic Safety', description: 'No chemical bonding agents, no formaldehyde finishing, no synthetic plasticizers — safe for the most sensitive skin.' },
      { icon: 'globe', title: 'Artisan Handcraft', description: 'Each piece is finished by hand in our certified atelier using traditional embroidery and couture stitching methods.' },
    ],
  },

  contact_info: {
    phone: '+91 95442 36858',
    whatsapp_url: 'https://wa.me/919544236858',
    email: 'atelier@nooraldhuha.com',
    address: 'NOOR AL DHUHA Atelier, Luxury Apparel District, India',
    hours: 'Mon – Sat, 9:00 AM – 8:00 PM GST',
    faqs: [
      {
        q: 'What is Grade 6A Mulberry Silk and why is it superior?',
        a: 'Grade 6A represents the pinnacle of raw silk quality, woven from long, unbroken natural mulberry fibers. It provides unmatched featherlight drape, natural temperature regulation, hypoallergenic touch, and hair protection without slipping.',
      },
      {
        q: 'How do I care for and wash my silk & chiffon hijabs?',
        a: 'We recommend gentle hand washing in cool water with pH-neutral silk wash or delicate detergent. Lay flat on a clean towel to air dry out of direct sunlight. Use a low-temperature silk iron or garment steamer.',
      },
      {
        q: 'What are your international delivery times & shipping rates?',
        a: 'We provide complimentary worldwide express shipping on orders over $150. Domestic UAE & GCC delivery takes 1-2 business days. UK, EU, US, and international express deliveries take 3-5 business days via DHL/FedEx.',
      },
      {
        q: 'What is your exchange and return policy?',
        a: 'We offer hassle-free 14-day returns and exchanges for all unworn garments in their original keepsake packaging with security ribbon intact.',
      },
    ],
  },

  offers_page: [
    {
      id: 'welcome10',
      code: 'ELEGANCE10',
      badge: 'WELCOME OFFER',
      title: '10% Off Your First Atelier Order',
      description: 'Experience pure Grade 6A mulberry silk and bespoke modest silhouettes with an exclusive introductory privilege.',
      discount: '10% OFF',
      minSpend: 'No Minimum',
      expires: 'Ongoing',
      category: 'All',
      color: 'from-[#4A2B5E] to-[#2E1C1A]',
      accentBg: 'bg-royal-violet/10 text-royal-violet border-royal-violet/20',
    },
    {
      id: 'vip20',
      code: 'NOORVIP',
      badge: 'VIP PATRON TIER',
      title: '20% Off Luxury Silk Bundles & Ensembles',
      description: 'Enjoy elevated savings on any order of 3 or more handcrafted creations. Includes complimentary bespoke gift packaging.',
      discount: '20% OFF',
      minSpend: 'Orders above $150',
      expires: 'Valid this week',
      category: 'Silk',
      color: 'from-[#670A1E] to-[#40121C]',
      accentBg: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      id: 'violet15',
      code: 'VIOLET15',
      badge: 'LIMITED EDITION',
      title: '15% Off The Royal Violet Edition Lookbook',
      description: 'Exclusive seasonal access to our signature Royal Amethyst and Deep Plum silk chiffon collections.',
      discount: '15% OFF',
      minSpend: 'Select Violet items',
      expires: 'Limited Stock',
      category: 'Violet Edition',
      color: 'from-[#502C63] to-[#24132B]',
      accentBg: 'bg-amethyst-soft/10 text-royal-violet border-amethyst-soft/30',
    },
  ],

  footer_content: {
    copyright: '© 2024 NOOR AL DHUHA. ALL RIGHTS RESERVED.',
    brand_name: 'NOOR AL DHUHA',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Section metadata for Admin CMS panel display
// ─────────────────────────────────────────────────────────────────────────────
export const CMS_SECTIONS = [
  { key: 'announcement', label: 'Announcement Bar', section: 'global', icon: '📢', description: 'Top promo bar text, badge, and gift threshold' },
  { key: 'hero_slides', label: 'Hero Carousel', section: 'home', icon: '🖼️', description: 'Homepage hero slides: images, titles, badges, CTAs' },
  { key: 'features_section', label: 'Features Banner', section: 'home', icon: '✨', description: 'Three feature/promo cards below the hero' },
  { key: 'testimonials', label: 'Testimonials', section: 'home', icon: '💬', description: 'Customer review carousel on the homepage' },
  { key: 'newsletter', label: 'Newsletter Section', section: 'home', icon: '📧', description: 'VIP newsletter section title and subtitle' },
  { key: 'story_page', label: 'Our Story Page', section: 'story', icon: '📖', description: 'Heritage manifesto, paragraphs, pillars of excellence' },
  { key: 'contact_info', label: 'Contact & FAQs', section: 'contact', icon: '📞', description: 'Phone, WhatsApp, email, address, hours, FAQ Q&As' },
  { key: 'offers_page', label: 'Atelier Privileges', section: 'offers', icon: '🎁', description: 'Curated privileges, packaging, and services' },
  { key: 'footer_content', label: 'Footer', section: 'global', icon: '🔗', description: 'Copyright text and brand name' },
];

const LS_KEY = 'noor_cms_content';

// ─────────────────────────────────────────────────────────────────────────────
// Fetch all site content (Supabase → localStorage → defaults)
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAllSiteContent() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, content');

      if (!error && data && data.length > 0) {
        const result = {};
        for (const row of data) {
          result[row.key] = row.content;
        }
        // Merge with defaults to guarantee all keys exist
        const merged = mergeWithDefaults(result);
        try { localStorage.setItem(LS_KEY, JSON.stringify(merged)); } catch (_) {}
        return merged;
      }
    } catch (err) {
      console.warn('CMS fetch error:', err);
    }
  }

  // Fallback: localStorage
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return mergeWithDefaults(JSON.parse(saved));
  } catch (_) {}

  return { ...DEFAULT_CONTENT };
}

// ─────────────────────────────────────────────────────────────────────────────
// Save a single content key to Supabase (upsert)
// ─────────────────────────────────────────────────────────────────────────────
export async function upsertSiteContent(key, content) {
  const section = CMS_SECTIONS.find(s => s.key === key)?.section || 'global';
  const label = CMS_SECTIONS.find(s => s.key === key)?.label || key;

  const payload = {
    key,
    section,
    label,
    content,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert(payload, { onConflict: 'key' });
      if (error) throw error;
    } catch (err) {
      console.warn('CMS upsert error, saving locally:', err);
    }
  }

  // Always update localStorage as well
  try {
    const saved = localStorage.getItem(LS_KEY);
    const existing = saved ? JSON.parse(saved) : { ...DEFAULT_CONTENT };
    existing[key] = content;
    localStorage.setItem(LS_KEY, JSON.stringify(existing));
  } catch (_) {}

  return { key, content };
}

// ─────────────────────────────────────────────────────────────────────────────
// Merge fetched data with defaults (defaults fill any missing keys/fields)
// ─────────────────────────────────────────────────────────────────────────────
function mergeWithDefaults(fetched) {
  const result = {};
  for (const key of Object.keys(DEFAULT_CONTENT)) {
    if (fetched[key] !== undefined) {
      // For arrays, prefer fetched if non-empty
      if (Array.isArray(DEFAULT_CONTENT[key])) {
        result[key] = Array.isArray(fetched[key]) && fetched[key].length > 0
          ? fetched[key]
          : DEFAULT_CONTENT[key];
      } else {
        result[key] = { ...DEFAULT_CONTENT[key], ...fetched[key] };
      }
    } else {
      result[key] = DEFAULT_CONTENT[key];
    }
  }
  return result;
}
