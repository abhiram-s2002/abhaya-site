import React from 'react';
import { Sparkles, Gift, ArrowRight, ShieldCheck, Truck, Package, HeartHandshake, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';

export default function OffersPage() {
  const { navigateTo, formatPrice } = useShop();

  const privileges = [
    {
      id: 1,
      badge: 'SIGNATURE PACKAGING',
      badgeColor: 'text-royal-violet border-royal-violet/20 bg-royal-violet/10',
      title: 'Complimentary Silk Keepsake Box',
      description: 'Every abaya is enveloped in archival tissue and presented inside our signature magnetic gift box with satin ribbon.',
      highlight: 'Included with Every Order',
      actionText: 'Explore Catalog',
      category: 'All',
      icon: Gift
    },
    {
      id: 2,
      badge: 'ACCESSORY GIFT',
      badgeColor: 'text-emerald-700 border-emerald-700/20 bg-emerald-700/10',
      title: 'Coordinated Artisan Shayla',
      description: 'Receive a tone-matched, ultra-soft luxury shayla carefully selected by our stylist to complement your chosen piece.',
      highlight: 'Complimentary Inclusion',
      actionText: 'Shop Silk Collection',
      category: 'Silk',
      icon: Sparkles
    },
    {
      id: 3,
      badge: 'EXPRESS LOGISTICS',
      badgeColor: 'text-secondary border-secondary/20 bg-secondary/10',
      title: 'Worldwide Express Delivery',
      description: 'Priority courier dispatch via DHL & FedEx express to over 120 countries worldwide with real-time tracking.',
      highlight: 'Direct Courier Dispatch',
      actionText: 'Shop All Creations',
      category: 'All',
      icon: Truck
    }
  ];

  const bundleDeals = [
    {
      title: 'The Modest Wardrobe Capsule',
      subtitle: 'Curate 2 Haute Couture Abayas to receive an artisan silk scrunchie and magnetic pin set complimentary.',
      tag: 'COMPLIMENTARY GIFT',
      actionText: 'Shop Silk Collection',
      category: 'Silk'
    },
    {
      title: 'Everyday Georgette Collection',
      subtitle: 'Explore our breathable Japanese pebble georgette abayas designed for lightweight all-day elegance.',
      tag: 'CURATED ESSENTIALS',
      actionText: 'Shop Georgette',
      category: 'Georgette'
    },
    {
      title: 'Bespoke Custom Measurements',
      subtitle: 'Provide your custom height, bust, and length measurements during checkout for flawless silhouette tailoring.',
      tag: 'MADE-TO-MEASURE',
      actionText: 'Explore Bespoke Sizing',
      category: 'All'
    }
  ];

  return (
    <EditableSection cmsKey="offers_page" label="Atelier Privileges">
      <div className="min-h-screen bg-[#FAF8F5] pt-8 sm:pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in text-[#1E141B] font-semibold">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-[#F5EAF1] border border-[#7A0648]/30 text-xs font-sans font-bold uppercase tracking-widest text-[#7A0648]">
            <Sparkles className="w-3.5 h-3.5 text-[#7A0648]" />
            <span>Atelier Privileges</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E141B] font-bold tracking-tight">
            Privileges & Services
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-lg mx-auto leading-relaxed">
            Discover the thoughtful touches, complimentary packaging, and couture services included with every NOOR AL DHUHA creation.
          </p>
        </div>

        {/* Main Privilege Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {privileges.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="relative rounded-none border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-none border border-[#7A0648]/30 bg-[#F5EAF1] text-[#7A0648]">
                      {item.badge}
                    </span>
                    <div className="w-8 h-8 rounded-none bg-[#F5EAF1] flex items-center justify-center text-[#7A0648]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1E141B] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.highlight}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => navigateTo('shop', null, item.category === 'All' ? null : item.category)}
                    className="w-full py-2.5 px-4 bg-[#7A0648] hover:bg-[#68043D] text-white rounded-none font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer border border-[#7A0648]"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle & Gifting Highlights */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E141B] font-bold">
              Curated Wardrobe Sets & Services
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Handcrafted for seamless coordination and modesty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundleDeals.map((deal, idx) => (
              <div
                key={idx}
                className="rounded-none border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-widest text-[#7A0648] bg-[#F5EAF1] px-2.5 py-1 rounded-none border border-[#7A0648]/20">
                    {deal.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1E141B]">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    {deal.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('shop', null, deal.category === 'All' ? null : deal.category)}
                  className="w-full py-2.5 px-4 bg-[#7A0648] hover:bg-[#68043D] text-white rounded-none font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95 cursor-pointer border border-[#7A0648]"
                >
                  <span>{deal.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Guarantee Banner (Violet Accent Look) */}
        <div className="rounded-none bg-[#7A0648] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-[#68043D]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              The Atelier Quality Assurance
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium max-w-xl leading-relaxed">
              Every garment is handcrafted with Grade 6A pure mulberry silk and OEKO-TEX® certified fabrics. Complimentary signature keepsake box on all orders.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-white text-[#7A0648] hover:bg-stone-100 text-xs font-sans font-bold uppercase tracking-widest rounded-none transition-all shrink-0 active:scale-95 cursor-pointer shadow-md border border-white"
          >
            EXPLORE CATALOG
          </button>
        </div>

      </div>
    </EditableSection>
  );
}
