import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Feather,
  Globe,
  ArrowRight,
  Quote,
  Gem,
  Award,
  Users,
  Target,
  Eye,
  Scissors,
  Layers,
  Store,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';
import defaultFoundersImg from '../assets/founders.png';

const ICON_MAP = {
  sparkles: Sparkles,
  feather: Feather,
  shield: ShieldCheck,
  globe: Globe,
  heart: Heart,
  scissors: Scissors,
  layers: Layers,
  store: Store,
  target: Target,
  eye: Eye,
};

export default function StoryPage() {
  const { navigateTo, siteContent } = useShop();
  const s = siteContent?.story_page || {};

  const pillars = Array.isArray(s.pillars) ? s.pillars : [];
  const services = Array.isArray(s.services) ? s.services : [
    {
      icon: 'scissors',
      title: 'Bespoke Design & Craftsmanship',
      description: 'Designing and tailoring modern, high-quality abayas and modest wear.',
    },
    {
      icon: 'layers',
      title: 'Curated Contemporary Fashion',
      description: 'Offering a versatile stock of on-trend, comfortable, and elegant styles for everyday and special occasions.',
    },
    {
      icon: 'store',
      title: 'Wholesale & Retail Services',
      description: 'Providing flexible purchasing options for individual shoppers, boutique retailers, and bulk buyers across the UAE and beyond.',
    },
  ];
  const foundersImageSrc = s.founders_image || defaultFoundersImg;

  return (
    <div className="bg-[#FAF8F5] text-[#1E141B] font-sans antialiased overflow-x-hidden font-semibold">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — PAGE HEADER (Violet Signature Top)
          ═══════════════════════════════════════════════ */}
      <EditableSection cmsKey="story_page" label="Our Story Header">
        <section id="story-header" className="py-12 sm:py-16 bg-[#7A0648] text-center border-b border-stone-200 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <span className="inline-block text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#FFF0A0] uppercase">
              {s.tagline || 'Heritage & Manifesto'}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-white font-bold uppercase tracking-[0.06em] leading-tight">
              {s.headline || 'The House of NOOR AL DHUHA'}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-semibold">
              {s.subheading || '"Noor in Every Thread, Wear It with Pride."'}
            </p>
          </div>
        </section>
      </EditableSection>


      {/* ═══════════════════════════════════════════════
          SECTION 2 — ABOUT US
          ═══════════════════════════════════════════════ */}
      <section id="about-us" className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* About Us Lead Highlight Box */}
          <div className="bg-white border border-stone-200 p-8 sm:p-12 shadow-md text-center space-y-4">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#7A0648] uppercase block">
              {s.about_label || 'About Us'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em] leading-tight">
              {s.about_title || 'Elegance, Precision & Accessible Luxury'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto">
              {s.about_text || 'At NOOR AL DHUHA, we bring you premium-quality abayas and hijabs at accessible prices. Designed with elegance and crafted with precision, our collections are trusted by both individual retail customers and wholesale partners across the region.'}
            </p>
            <div className="pt-2">
              <div className="inline-block bg-[#F5EAF1] text-[#7A0648] border border-[#7A0648]/20 px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs">
                "{s.motto || 'Noor in Every Thread, Wear It with Pride.'}"
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 3 — WHAT WE DO
          ═══════════════════════════════════════════════ */}
      <section id="what-we-do" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#7A0648] uppercase mb-2 block">
              {s.what_we_do_label || 'What We Do'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em]">
              {s.what_we_do_title || 'Tailored Excellence from Atelier to Wardrobe'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {services.map((srv, idx) => {
              const Icon = ICON_MAP[srv.icon] || Scissors;
              return (
                <div
                  key={idx}
                  className="group p-6 sm:p-8 bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#7A0648]/40 transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 bg-[#F5EAF1] text-[#7A0648] flex items-center justify-center group-hover:bg-[#7A0648] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1E141B] uppercase tracking-wider">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                    {srv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 4 — MISSION & VISION
          ═══════════════════════════════════════════════ */}
      <section id="mission-vision" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#7A0648] uppercase mb-2 block">
              {s.mission_label || 'Mission & Vision'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em]">
              Our Purpose & Path Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Mission Card */}
            <div className="p-8 sm:p-10 bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-[#F5EAF1] text-[#7A0648] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#7A0648] block">
                Core Purpose
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1E141B]">
                {s.mission_title || 'Our Mission'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                {s.mission_text || 'To empower women through stylish, comfortable, and modest clothing while delivering exceptional quality, affordability, and outstanding customer service.'}
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-[#F5EAF1] text-[#7A0648] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#7A0648] block">
                Long-Term Horizon
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.06em] text-[#1E141B]">
                {s.vision_title || 'Our Vision'}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                {s.vision_text || 'To become a leading, trusted abaya and modest fashion brand across the UAE and international markets—celebrated for timeless style, superior craftsmanship, and customer satisfaction.'}
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 5 — MEET OUR CO-FOUNDERS
          ═══════════════════════════════════════════════ */}
      <section id="co-founders" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Founders Portrait Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
                <div className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                  <img
                    src={foundersImageSrc}
                    alt="Rafique & Kamarunnisa - Founders & Visionaries"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6">
                    <div className="backdrop-blur-md bg-black/40 border border-white/20 p-3 text-center">
                      <p className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                        {s.founders_names || 'Rafique & Kamarunnisa'}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#FFF0A0] uppercase tracking-widest font-bold">
                        {s.founders_role || 'Founders & Visionaries'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Founders Story & Vision Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#7A0648] uppercase mb-1 block">
                  {s.founders_label || 'Meet Our Co-Founders'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em]">
                  {s.founders_names || 'Rafique & Kamarunnisa'}
                </h2>
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] font-bold text-[#7A0648] mt-1">
                  {s.founders_role || 'Founders & Visionaries'}
                </p>
              </div>

              {/* Bio Narrative */}
              <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                {s.founders_bio || 'For Rafique M U and Kamarunnisa K A, abayas are more than just garments—they are an expression of pride, grace, and tradition. With years of dedication to Islamic fashion, they set out to make timeless, modern designs reachable to every woman. By combining premium craftsmanship with honest, reasonable pricing, they continue to inspire confidence and bring elegant modest fashion into everyday life.'}
              </p>

              {/* Pull Quote Card */}
              <div className="p-4 sm:p-5 bg-white border border-stone-200 shadow-sm relative space-y-2">
                <Quote className="w-5 h-5 text-[#7A0648]" />
                <p className="text-sm sm:text-base text-[#1E141B] italic leading-relaxed font-medium">
                  "{s.founders_quote || 'Abayas are more than just garments—they are an expression of pride, grace, and tradition.'}"
                </p>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider font-bold pt-1">
                  — Rafique M U & Kamarunnisa K A
                </p>
              </div>

              {/* Highlights 3-column micro grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#7A0648]" />
                    <h4 className="text-xs font-bold text-[#1E141B] uppercase tracking-wider">Heritage & Pride</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug font-medium">
                    Rooted in timeless Islamic modest traditions.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Gem className="w-3.5 h-3.5 text-[#7A0648]" />
                    <h4 className="text-xs font-bold text-[#1E141B] uppercase tracking-wider">Master Craft</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug font-medium">
                    Artisan tailoring and pure organic fabrics.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-3.5 h-3.5 text-[#7A0648]" />
                    <h4 className="text-xs font-bold text-[#1E141B] uppercase tracking-wider">Honest Luxury</h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug font-medium">
                    Couture design made reachable to every woman.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 6 — GUIDING PRINCIPLES / FOUR PILLARS
          ═══════════════════════════════════════════════ */}
      <section id="guiding-principles" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Section Title */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#7A0648] uppercase mb-2 block">
              {s.pillars_label || 'Guiding Principles'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1E141B] font-bold uppercase tracking-[0.06em]">
              {s.pillars_title || 'The Four Pillars of NOOR AL DHUHA'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = ICON_MAP[pillar.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white border border-stone-200 shadow-xs space-y-3 hover:border-[#7A0648]/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#F5EAF1] text-[#7A0648] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1E141B]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 7 — CALL TO ACTION (Violet Signature Bottom)
          ═══════════════════════════════════════════════ */}
      <section id="story-cta" className="py-16 sm:py-24 bg-[#7A0648] text-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#FFF0A0] uppercase block">
            Experience Noor Al Dhuha
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold uppercase tracking-[0.06em]">
            Experience Pure Atelier Luxury
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto leading-relaxed pb-4 font-medium">
            Every creation is an intimate collaboration between our master artisans and your individual vision.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center justify-center bg-white text-[#7A0648] hover:bg-white/90 uppercase tracking-[0.18em] font-bold text-xs py-3.5 px-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-none border border-white"
            >
              Explore Catalog
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center justify-center bg-transparent text-white hover:bg-white hover:text-[#7A0648] uppercase tracking-[0.18em] font-bold text-xs py-3.5 px-8 transition-all duration-300 cursor-pointer rounded-none border border-white"
            >
              Bespoke Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
