import React from 'react';
import { Sparkles, Copy, Check, Tag, Gift, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';

export default function OffersPage() {
  const { navigateTo, applyPromo, showToast, formatPrice, siteContent } = useShop();
  const [copiedCode, setCopiedCode] = React.useState(null);

  // Offers from CMS (falls back to siteContent defaults)
  const offers = Array.isArray(siteContent?.offers_page) && siteContent.offers_page.length > 0
    ? siteContent.offers_page
    : [];

  const bundleDeals = [
    {
      title: 'The Modest Wardrobe Capsule',
      subtitle: 'Buy 2 Hijabs, Get 1 Artisan Silk Scrunchie & Magnetic Pin Set Free',
      tag: 'COMPLIMENTARY GIFT',
      actionText: 'Shop Silk Collection',
      category: 'Silk'
    },
    {
      title: 'Everyday Chiffon Tri-Pack',
      subtitle: 'Curate any 3 Japanese Pebble Georgette Hijabs for a Flat Special Price',
      tag: 'BUNDLE SAVING',
      actionText: 'Shop Chiffon',
      category: 'Chiffon'
    },
    {
      title: 'Complimentary Worldwide Express Delivery',
      subtitle: 'On all curated orders exceeding $150 with luxury magnetic gift box included',
      tag: 'FREE SHIPPING',
      actionText: 'Explore Catalog',
      category: 'All'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyPromo(code);
    showToast(`Code "${code}" copied & applied to your cart!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <EditableSection cmsKey="offers_page" label="Offers & Promo Codes">
    <div className="min-h-screen bg-neutral-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-sans font-bold uppercase tracking-widest text-primary">
          <Sparkles className="w-3.5 h-3.5 text-royal-violet" />
          <span>Exclusive Privileges</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-medium tracking-tight">
          Offers & Promotions
        </h1>
        <p className="text-xs sm:text-sm text-primary/70 font-sans max-w-lg mx-auto leading-relaxed">
          Explore curated boutique privileges, bundle savings, and coupon codes for your luxury modest wardrobe.
        </p>
      </div>

      {/* Main Promo Coupon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="relative rounded-2xl border border-primary/15 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* Top decorative gradient bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${offer.color}`} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${offer.accentBg}`}>
                  {offer.badge}
                </span>
                <span className="font-serif text-2xl font-bold text-primary">
                  {offer.discount}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-medium text-primary mb-1">
                  {offer.title}
                </h3>
                <p className="text-xs text-primary/70 font-sans leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-2 border-t border-primary/10 flex items-center justify-between text-[11px] text-primary/60 font-sans">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-royal-violet" />
                  {offer.minSpend}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-royal-violet" />
                  {offer.expires}
                </span>
              </div>
            </div>

            {/* Bottom Code Copy Action */}
            <div className="mt-6 pt-4 border-t border-dashed border-primary/20 space-y-3">
              <div className="flex items-center justify-between bg-surface-container rounded-lg p-2 border border-primary/10">
                <div className="font-mono text-xs font-bold text-primary tracking-wider pl-2">
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-royal-violet text-white text-[11px] font-sans font-bold uppercase tracking-wider rounded transition-all active:scale-95 cursor-pointer"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => navigateTo('shop', null, offer.category === 'All' ? null : offer.category)}
                className="w-full flex items-center justify-center gap-1 text-[11px] font-sans font-semibold text-primary hover:text-royal-violet transition-colors pt-1 cursor-pointer"
              >
                <span>Shop Qualified Creations</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Bundle & Gifting Highlights */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-medium">
            Curated Gifting & Wardrobe Bundles
          </h2>
          <p className="text-xs text-primary/60 font-sans">
            Automatic privileges applied dynamically at checkout
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundleDeals.map((deal, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-primary/10 bg-[#f4ede3] p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-widest text-primary bg-white/80 px-2.5 py-1 rounded-full border border-primary/10">
                  {deal.tag}
                </span>
                <h3 className="font-serif text-lg font-medium text-primary">
                  {deal.title}
                </h3>
                <p className="text-xs text-primary/70 font-sans leading-relaxed">
                  {deal.subtitle}
                </p>
              </div>

              <button
                onClick={() => navigateTo('shop', null, deal.category === 'All' ? null : deal.category)}
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <span>{deal.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="rounded-2xl bg-primary text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-medium">
            The Atelier Quality Assurance
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-sans max-w-xl leading-relaxed">
            Every garment is handcrafted with Grade 6A pure mulberry silk and OEKO-TEX® certified fabrics. Complimentary signature keepsake box on all orders.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-neutral-white text-primary hover:bg-white text-xs font-sans font-bold uppercase tracking-widest rounded transition-all shrink-0 active:scale-95 cursor-pointer shadow-md"
        >
          EXPLORE CATALOG
        </button>
      </div>

    </div>
    </EditableSection>
  );
}
