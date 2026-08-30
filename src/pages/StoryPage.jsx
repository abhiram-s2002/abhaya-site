import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Feather,
  Globe,
  CheckCircle2,
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
  Check,
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
  const paragraphs = Array.isArray(s.genesis_paragraphs) ? s.genesis_paragraphs : [];
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
    <div className="space-y-12 sm:space-y-20 pb-20 sm:pb-24 animate-fade-in">

      {/* 1. Header Banner */}
      <EditableSection cmsKey="story_page" label="Our Story Page">
        <section className="bg-primary text-white py-14 sm:py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal-violet/30 via-primary to-primary opacity-60 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-gold-soft border border-white/10">
              <Sparkles className="w-3 h-3 text-gold-soft" />
              {s.tagline || 'Heritage & Manifesto'}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
              {s.headline || 'The House of NOOR AL DHUHA'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-base font-light max-w-xl mx-auto leading-relaxed px-2">
              {s.subheading || '"Noor in Every Thread, Wear It with Pride."'}
            </p>
          </div>
        </section>
      </EditableSection>

      {/* 2. ABOUT US & The Genesis Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12">
          
          {/* About Us Lead Hero Block */}
          <div className="rounded-2xl sm:rounded-3xl bg-surface-container-low border border-surface-container-high/80 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
                {s.about_label || 'About Us'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium leading-tight">
                {s.about_title || 'Elegance, Precision & Accessible Luxury'}
              </h2>
              <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                {s.about_text || 'At NOOR AL DHUHA, we bring you premium-quality abayas and hijabs at accessible prices. Designed with elegance and crafted with precision, our collections are trusted by both individual retail customers and wholesale partners across the region.'}
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-gold-soft font-serif italic text-xs sm:text-sm font-medium shadow-sm">
                  <span>"{s.motto || 'Noor in Every Thread, Wear It with Pride.'}"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Origin Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
                {s.genesis_label || 'The Genesis'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium leading-tight">
                {s.genesis_title || 'Crafted in Reverence of Detail'}
              </h2>
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  {para}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                  <span className="font-serif text-xl sm:text-2xl text-primary font-bold">{s.stat1_value || '100%'}</span>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-medium">{s.stat1_label || 'Grade 6A Long-Fiber Mulberry Silk'}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-surface-container-highest">
                  <span className="font-serif text-xl sm:text-2xl text-primary font-bold">{s.stat2_value || '0%'}</span>
                  <p className="text-[11px] sm:text-xs text-stone-600 font-medium">{s.stat2_label || 'Synthetic Plastic Fillers or Harsh Chemicals'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-surface-container-highest">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g"
                alt="NOOR AL DHUHA Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHAT WE DO Section */}
      <section className="bg-surface-container-low py-12 sm:py-20 border-y border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              {s.what_we_do_label || 'What We Do'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              {s.what_we_do_title || 'Tailored Excellence from Atelier to Wardrobe'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const Icon = ICON_MAP[srv.icon] || Scissors;
              return (
                <div
                  key={idx}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-surface-container-highest shadow-sm hover:shadow-md transition-all duration-300 space-y-4 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-royal-violet/10 text-royal-violet flex items-center justify-center group-hover:bg-primary group-hover:text-gold-soft transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-primary font-medium leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {srv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. MISSION & VISION Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
            {s.mission_label || 'Mission & Vision'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
            Our Purpose & Path Forward
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Mission Card */}
          <div className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-primary via-[#210D2C] to-primary text-white border border-white/10 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-gold-soft">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-soft block">
              Core Purpose
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              {s.mission_title || 'Our Mission'}
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {s.mission_text || 'To empower women through stylish, comfortable, and modest clothing while delivering exceptional quality, affordability, and outstanding customer service.'}
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-white border border-surface-container-highest shadow-xl space-y-4 text-primary">
            <div className="w-12 h-12 rounded-xl bg-royal-violet/10 border border-royal-violet/20 flex items-center justify-center text-royal-violet">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-royal-violet block">
              Long-Term Horizon
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-primary">
              {s.vision_title || 'Our Vision'}
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {s.vision_text || 'To become a leading, trusted abaya and modest fashion brand across the UAE and international markets—celebrated for timeless style, superior craftsmanship, and customer satisfaction.'}
            </p>
          </div>

        </div>
      </section>

      {/* 5. Meet Our Co-Founders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#C85DA9] via-[#D975BD] to-[#C85DA9] text-white border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-12">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Founders Portrait Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-accent/40 via-white/30 to-gold-soft/30 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10">
                  <img
                    src={foundersImageSrc}
                    alt="Kamarunnisa & Rafique - Founders & Visionaries"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C85DA9]/90 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6">
                    <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-xl p-3 text-center">
                      <p className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
                        Kamarunnisa & Rafique
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/80 uppercase tracking-widest font-sans font-medium">
                        Founders & Visionaries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Founders Story & Vision Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-gold-soft text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold backdrop-blur-xs">
                <Users className="w-3.5 h-3.5 text-gold-soft" />
                <span>{s.founders_label || 'Meet Our Co-Founders'}</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                  {s.founders_names || 'Kamarunnisa & Rafique'}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-gold-accent" />
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-gold-soft/90">
                    {s.founders_role || 'Founders & Visionaries'}
                  </p>
                </div>
              </div>

              {/* Bio Narrative */}
              <p className="text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                {s.founders_bio || 'For Kamarunnisa K A and Rafique M U, abayas are more than just garments—they are an expression of pride, grace, and tradition. With years of dedication to Islamic fashion, they set out to make timeless, modern designs reachable to every woman. By combining premium craftsmanship with honest, reasonable pricing, they continue to inspire confidence and bring elegant modest fashion into everyday life.'}
              </p>

              {/* Pull Quote Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md relative space-y-2">
                <Quote className="w-5 h-5 text-gold-soft/60" />
                <p className="font-serif text-sm sm:text-base text-white/95 italic leading-relaxed">
                  "{s.founders_quote || 'Abayas are more than just garments—they are an expression of pride, grace, and tradition.'}"
                </p>
                <p className="text-[11px] text-stone-400 font-sans tracking-wide pt-1">
                  — Kamarunnisa K A & Rafique M U
                </p>
              </div>

              {/* Highlights 3-column micro grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-3.5 h-3.5 text-gold-soft" />
                    <h4 className="text-xs font-semibold text-white tracking-wide">Heritage & Pride</h4>
                  </div>
                  <p className="text-[11px] text-stone-300 font-light leading-snug">
                    Rooted in timeless Islamic modest traditions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Gem className="w-3.5 h-3.5 text-gold-soft" />
                    <h4 className="text-xs font-semibold text-white tracking-wide">Master Craft</h4>
                  </div>
                  <p className="text-[11px] text-stone-300 font-light leading-snug">
                    Artisan tailoring and pure organic fabrics.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-3.5 h-3.5 text-gold-soft" />
                    <h4 className="text-xs font-semibold text-white tracking-wide">Honest Luxury</h4>
                  </div>
                  <p className="text-[11px] text-stone-300 font-light leading-snug">
                    Couture design made reachable to every woman.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Four Pillars of Excellence */}
      <section className="bg-surface-container-low py-12 sm:py-20 border-y border-surface-container-high/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-royal-violet">
              {s.pillars_label || 'Guiding Principles'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              {s.pillars_title || 'The Four Pillars of NOOR AL DHUHA'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = ICON_MAP[pillar.icon] || Sparkles;
              return (
                <div key={idx} className="p-5 sm:p-6 rounded-xl bg-white border border-surface-container-highest shadow-sm space-y-2.5 sm:space-y-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-royal-violet/10 text-royal-violet flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-primary font-medium">{pillar.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium">
            Experience Pure Atelier Luxury
          </h2>
          <p className="text-xs sm:text-sm text-white/75 font-sans max-w-lg mx-auto leading-relaxed">
            Every creation is an intimate collaboration between our master artisans and your individual vision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3 rounded-xl bg-white text-primary font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Explore Catalog
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-8 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2 justify-center"
            >
              <span>Bespoke Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
