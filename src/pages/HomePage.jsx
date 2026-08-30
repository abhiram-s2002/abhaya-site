import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import EditableSection from '../components/cms/EditableSection';

/* ──────────────────────────────────────────────
   Image maps for Style & Work collection cards
   (re-using existing product / collection images)
   ────────────────────────────────────────────── */
const STYLE_IMAGES = {
  'Open abaya':              '/collection-images/style_open_abaya.jpg',
  'Closed cut':              '/collection-images/style_closed_cut.jpg',
  'Kimono or kaftan':        '/collection-images/style_kimono_kaftan.jpg',
  'Butterfly or farasha':    '/collection-images/style_butterfly_farasha.jpg',
  'umbrella cut or Flare':   '/collection-images/style_umbrella_flare.jpg',
  '2 piece abaya (with inner)': '/collection-images/style_two_piece.jpg',
  'Coat abaya':              '/collection-images/style_coat_abaya.jpg',
};

const WORK_IMAGES = {
  'Embroidery Abaya':        '/collection-images/work_embroidery.jpg',
  'Handwork Abaya':          '/collection-images/work_handwork.jpg',
  'Stonework Abaya':         '/collection-images/work_stonework.jpg',
  'Threadwork Abaya':        '/collection-images/work_threadwork.jpg',
  'Printed Abaya':           '/collection-images/work_printed.jpg',
  'Lace Work Abaya':         '/collection-images/work_lacework.jpg',
  'plain':                   '/collection-images/work_plain.jpg',
};

const STYLES_LIST = [
  'Open abaya',
  'Closed cut',
  'Kimono or kaftan',
  'Butterfly or farasha',
  'umbrella cut or Flare',
  '2 piece abaya (with inner)',
  'Coat abaya',
];

const WORKS_LIST = [
  'Embroidery Abaya',
  'Handwork Abaya',
  'Stonework Abaya',
  'Threadwork Abaya',
  'Printed Abaya',
  'Lace Work Abaya',
  'plain',
];

export default function HomePage() {
  const { PRODUCTS, navigateTo, formatPrice, siteContent } = useShop();

  // ── Hero Carousel ──
  const heroSlides = siteContent?.hero_slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () =>
    setCurrentSlide((p) => (p + 1) % heroSlides.length);

  // ── New Arrivals — first 8 products ──
  const newArrivals = PRODUCTS.slice(0, 8);

  return (
    <div className="bg-white text-[#1C1C1C] font-sans antialiased overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO / SHOP NOW
          ═══════════════════════════════════════════════ */}
      <EditableSection cmsKey="hero_slides" label="Hero Carousel">
        <section id="hero-shop-now" className="relative w-full overflow-hidden">
          {/* Slides */}
          <div
            className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, i) => (
              <div key={slide.id} className="relative w-full shrink-0">
                {/* Full-width image */}
                <div className="relative w-full h-[75vh] sm:h-[82vh] md:h-[88vh] min-h-[480px] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Content over image — bottom-left */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 lg:p-20 max-w-2xl">
                    {slide.badge && (
                      <span className="inline-block w-fit text-[10px] sm:text-xs tracking-[0.2em] font-medium text-white/90 uppercase mb-2">
                        {slide.badge}
                      </span>
                    )}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl text-white font-medium uppercase tracking-[0.06em] leading-[1.15] mb-3 drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="text-white/90 text-xs sm:text-sm max-w-md leading-relaxed mb-6 drop-shadow-sm font-normal">
                      {slide.description}
                    </p>
                    <button
                      onClick={() => navigateTo('shop', slide.productId)}
                      className="btn-primary w-fit !bg-white !text-[#1C1C1C] hover:!bg-[#1C1C1C] hover:!text-white border border-white"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {heroSlides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="cursor-pointer absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/30 backdrop-blur-md hover:bg-white text-black rounded-none flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={nextSlide}
                className="cursor-pointer absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/30 backdrop-blur-md hover:bg-white text-black rounded-none flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Slide indicators */}
          {heroSlides.length > 1 && (
            <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`cursor-pointer h-[2px] transition-all duration-300 ${
                    currentSlide === i
                      ? 'w-8 bg-white'
                      : 'w-3 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </section>
      </EditableSection>


      {/* ═══════════════════════════════════════════════
          SECTION 2 — SHOP BY COLLECTION
          ═══════════════════════════════════════════════ */}
      <section id="shop-by-collection" className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1C1C1C] font-medium uppercase tracking-[0.06em] mb-2">
              Shop by Collection
            </h2>
            <div className="w-12 h-[1px] bg-[#1C1C1C] mx-auto" />
          </div>

          {/* ── SUB-SECTION: By Style ── */}
          <div className="mb-14 sm:mb-20">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl text-[#1C1C1C] font-medium uppercase tracking-wider">
                  By Silhouette & Style
                </h3>
                <p className="text-xs text-[#707070] mt-0.5 tracking-wide">
                  Tailored cuts from open drapes to kimono silhouettes
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="cursor-pointer hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] hover:text-[#707070] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {STYLES_LIST.map((styleName) => (
                <div
                  key={styleName}
                  onClick={() => navigateTo('shop', null, null, null, null, styleName)}
                  className="group cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] border border-[#E5E5E5] group-hover:border-[#1C1C1C] transition-colors mb-2.5">
                    <img
                      src={STYLE_IMAGES[styleName]}
                      alt={styleName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  {/* Card Label */}
                  <h4 className="text-xs sm:text-[13px] font-medium text-[#1C1C1C] uppercase tracking-wider text-center group-hover:text-[#707070] transition-colors duration-200">
                    {styleName}
                  </h4>
                </div>
              ))}
            </div>
          </div>


          {/* ── SUB-SECTION: By Work ── */}
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl text-[#1C1C1C] font-medium uppercase tracking-wider">
                  By Craftsmanship & Work
                </h3>
                <p className="text-xs text-[#707070] mt-0.5 tracking-wide">
                  Artisanal embroidery, stonework, and thread detailing
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="cursor-pointer hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] hover:text-[#707070] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {WORKS_LIST.map((workName) => (
                <div
                  key={workName}
                  onClick={() => navigateTo('shop', null, null, null, null, null, workName)}
                  className="group cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] border border-[#E5E5E5] group-hover:border-[#1C1C1C] transition-colors mb-2.5">
                    <img
                      src={WORK_IMAGES[workName]}
                      alt={workName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  {/* Card Label */}
                  <h4 className="text-xs sm:text-[13px] font-medium text-[#1C1C1C] uppercase tracking-wider text-center group-hover:text-[#707070] transition-colors duration-200 capitalize">
                    {workName}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SECTION 3 — NEW ARRIVALS
          ═══════════════════════════════════════════════ */}
      <section id="new-arrivals" className="py-14 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-[#1C1C1C] font-medium uppercase tracking-[0.06em] mb-0.5">
                New Arrivals
              </h2>
              <p className="text-xs text-[#707070] tracking-wide uppercase">
                Explore our latest boutique releases
              </p>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] hover:text-[#707070] transition-colors"
            >
              <span className="hidden sm:inline">View All</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
