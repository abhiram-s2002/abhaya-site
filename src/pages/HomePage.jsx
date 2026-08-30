import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles, ArrowRight, ShieldCheck, Truck, Gift, Check, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import EditableSection from '../components/cms/EditableSection';

export default function HomePage() {
  const { PRODUCTS, navigateTo, addToCart, formatPrice, showToast, siteContent } = useShop();

  // ── Hero Carousel — loaded from CMS (falls back to defaults in siteContent) ──
  const heroSlides = siteContent?.hero_slides || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(heroSlides.length, 1));
    }, 6500);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // "The Crowd's Favourites" Horizontal Scroll state
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleFavoritesScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  const scrollFavorites = (direction) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // ── Testimonials — from CMS ──
  const testimonials = siteContent?.testimonials || [];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);


  const handleQuickAdd = (e, product) => {

    e.stopPropagation();
    addToCart(
      product,
      product.colors?.[0]?.name || 'Midnight Espresso',
      product.colors?.[0]?.hex || '#2E1C1A',
      product.sizes?.[0] || 'Size 56 (Length 56")',
      1,
      product.image,
      product.defaultStyle,
      product.defaultWork
    );
  };



  return (
    <div className="bg-neutral-white text-primary font-sans antialiased overflow-x-hidden selection:bg-royal-violet selection:text-white">

      {/* 1. Hero Editorial Carousel */}
      <EditableSection cmsKey="hero_slides" label="Hero Carousel">
        <section className="relative w-full bg-surface-container-low overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="relative w-full shrink-0">
                <div className="flex flex-col md:flex-row w-full h-[85vh] min-h-[580px]">

                  {/* Visual Half */}
                  <div className="absolute inset-0 z-0 md:relative md:w-1/2 md:h-full pointer-events-none overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-top"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent md:hidden" />
                  </div>

                  {/* Content Half */}
                  <div className="relative z-10 flex flex-col justify-end md:justify-center w-full md:w-1/2 min-w-0 p-6 pb-12 md:px-12 lg:px-16 xl:px-24 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-none">
                    <span className="text-xs md:text-sm font-sans tracking-[0.25em] font-bold text-secondary uppercase mb-3 drop-shadow-sm">
                      {slide.badge}
                    </span>
                    <h1 className="text-white md:text-primary font-serif text-4xl sm:text-5xl md:text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[1.08] mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-white/90 md:text-primary/75 font-sans text-sm md:text-base mb-8 max-w-md leading-relaxed">
                      {slide.description}
                    </p>
                    <button
                      onClick={() => navigateTo('shop', slide.productId)}
                      className="bg-white text-primary md:bg-primary md:text-white px-8 py-3.5 font-sans font-bold uppercase tracking-widest text-xs sm:text-sm w-fit transition-all hover:bg-white/90 md:hover:bg-royal-violet active:scale-95 shadow-md cursor-pointer"
                    >
                      {slide.cta}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators / Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 md:justify-end md:right-16 md:left-auto md:translate-x-0">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`cursor-pointer h-1.5 transition-all duration-300 rounded-full ${
                  currentSlide === i
                    ? 'w-8 bg-white md:bg-primary'
                    : 'w-2 bg-white/50 md:bg-primary/30 hover:bg-primary/60'
                }`}
              />
            ))}
          </div>
        </section>
      </EditableSection>





      {/* 4. "Find Your Finish" Asymmetrical Collections Grid */}
      <section className="py-16 md:py-28 bg-neutral-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-medium tracking-tight mb-4">
              Find Your Finish
            </h2>
            <div className="flex items-center justify-center max-w-xs sm:max-w-sm mx-auto">
              <div className="h-px bg-primary/30 grow" />
              <span className="mx-4 text-primary font-sans text-xs tracking-[0.25em] font-bold uppercase">
                Curated Collections
              </span>
              <div className="h-px bg-primary/30 grow" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

            {/* Big Asymmetric Featured Tile: 2x2 */}
            <div
              onClick={() => navigateTo('shop', null, 'Silk')}
              className="group relative overflow-hidden bg-secondary/10 rounded-xl col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g"
                alt="Mulberry Silk Collection"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full text-white">
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] font-bold uppercase text-secondary block mb-1">
                  ATELIER SIGNATURE
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium mb-2">
                  Pure Mulberry Silk
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans max-w-sm hidden sm:block">
                  Grade 6A raw silk spun for ethereal drape, featherlight weight, and lustrous sheen.
                </p>
              </div>
            </div>

            {/* Tile 2: Everyday Chiffon */}
            <div
              onClick={() => navigateTo('shop', null, 'Chiffon')}
              className="group relative overflow-hidden bg-secondary/10 rounded-xl col-span-1 aspect-square cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkdZL0iJiKpH_RGkCIR3KLu-FRwu0VNrwd0AKjbEC4LKeHX81c_gdKTa-2u50NIw6c-dk9UQ8TRmm6yQbZjQgiuwIUEEBUp9SCT7pU4TIddCWVvd0w4wOIz4ajtmoc3h3NpKqeI5t9diUWGGVfWCntFu7hYs6yRdpT2QuyTJlISHeDi11u6Nxth4Z0XBlgtoUTQyhGy2lgNyNAECYG-szSx1NYT-9CsllGhOybxhSgFYV5PtfVnL0aWA"
                alt="Everyday Chiffon"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full text-white">
                <h3 className="font-serif text-lg sm:text-2xl font-medium">Everyday Chiffon</h3>
              </div>
            </div>

            {/* Tile 3: Modal Jersey */}
            <div
              onClick={() => navigateTo('shop', null, 'Modal Jersey')}
              className="group relative overflow-hidden bg-secondary/10 rounded-xl col-span-1 aspect-square cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6VCCXcrsIQMHcP3Y2cwPwjMw26HSpdXZRpo1lY76HCdTo-vZ5b4M8do6PcZ7DqQvXu3-GlMe2pgswNgngMTx9SsTOZ72uI6VKzR9AO30LImVq-vABf8hOJGP7ROTu8ggWAFYVzo2IbWpQV-aYchjycdwCWyhodCmGPBoTo_aAcIjMZuF8wfHjLz_fQt_sGTpPBO2Ddgqm5H07QGTDc4ZBfNS_nT9uyWZncjWeLoA1KPl20JxdlmW11w"
                alt="Modal Jersey"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full text-white">
                <h3 className="font-serif text-lg sm:text-2xl font-medium">Cloud Modal Jersey</h3>
              </div>
            </div>

            {/* Tile 4: Violet Edition */}
            <div
              onClick={() => navigateTo('violet-edition')}
              className="group relative overflow-hidden bg-secondary/10 rounded-xl col-span-2 md:col-span-3 aspect-[2/1] sm:aspect-[2.5/1] cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Sf1dgvSxQEdIcuInSxcRUwW6B-nBrZnNrAlOjxmNSTXEgqHvgbTWfGWkg5QYKVY0d9lsnGmuQwBuPf3yXH71nFMwMaVjxwvCixfo4u7HOgAOx-Z-drovy_YH-5MOgACvt0Pwe1icr3mK9M_bxXtmzzaUPFW_vyPfmx1GGDVrW_F2AgYUY40fBuNWPQElc5LbqXQuB_wLdkClmmrvrK6lHW6RI2zefAzNng6DUsYCen2Ggb06fdIVoA"
                alt="The Royal Violet Edition"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center text-white max-w-lg">
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] font-bold uppercase text-secondary mb-1">
                  EXCLUSIVE CAPSULE
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-medium mb-2">
                  The Royal Violet Edition
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans mb-4 hidden sm:block">
                  A regal palette of deep plum, amethyst, and lavender silk weaves designed for milestone evenings.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-secondary group-hover:underline">
                  <span>Explore Lookbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. "Voices of Adornment" Testimonials Carousel */}
      <EditableSection cmsKey="testimonials" label="Testimonials">
        <section className="py-20 md:py-32 bg-neutral-white relative overflow-hidden flex flex-col items-center">
          {/* Giant quotation background mark */}
          <div
            className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22rem] md:text-[35rem] text-secondary/10 font-serif leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </div>

          {testimonials.length > 0 && (
            <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center px-4 sm:px-8 text-center">
              <p className="font-sans text-xs sm:text-sm text-secondary uppercase tracking-[0.25em] mb-3 font-bold">
                What our patrons say
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium mb-10 md:mb-14">
                Voices of Adornment
              </h2>

              <div className="min-h-[140px] flex flex-col justify-center items-center">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-primary leading-relaxed sm:leading-relaxed text-center mb-6">
                  "{testimonials[activeTestimonial]?.review}"
                </p>
                <p className="font-sans text-secondary text-sm tracking-[0.2em] uppercase font-semibold">
                  — {testimonials[activeTestimonial]?.author} ({testimonials[activeTestimonial]?.location})
                </p>
              </div>

              {/* Testimonial Indicator Dots */}
              <div className="flex items-center justify-center gap-2.5 mt-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Testimonial slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      activeTestimonial === i
                        ? 'w-3.5 h-3.5 bg-primary'
                        : 'w-2 h-2 bg-primary/30 hover:bg-primary/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </EditableSection>



    </div>
  );
}
