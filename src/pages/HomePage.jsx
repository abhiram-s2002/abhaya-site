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
  'Open abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw',
  'Closed cut':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCM9j8LFvsTmyHWo5yGhiGKS4opH62nBHZu4Lnul0WiG75kp7G1fV5dduJL4yYrG6_QYii5EqU5qDdmPAZiVayTHk_MHdZUS1PFH7Vmu_PQ9NkTiImB1yySXaGzznzAIt50MMuSleDfR4BGxIDRWpxTH8KdOc8n4QYbwkzpgvIpNykc3t2HhuojjULBjDgRwn0AHkSBSCprFC4hYTmO1dhYVgvdl_4PWcpnE9_BIc9Mbcupjf6jLWTvZA',
  'Kimono or kaftan':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6VCCXcrsIQMHcP3Y2cwPwjMw26HSpdXZRpo1lY76HCdTo-vZ5b4M8do6PcZ7DqQvXu3-GlMe2pgswNgngMTx9SsTOZ72uI6VKzR9AO30LImVq-vABf8hOJGP7ROTu8ggWAFYVzo2IbWQV-aYchjycdwCWyhodCmGPBoTo_aAcIjMZuF8wfHjLz_fQt_sGTpPBO2Ddgqm5H07QGTDc4ZBfNS_nT9uyWZncjWeLoA1KPl20JxdlmW11w',
  'Butterfly or farasha':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBYEamtzjpK7ME6SNcwB_Dm777cIG9hjrlL-HktMD3xXRRagPMwnPzQ6iQe0viQ-TzLh4QmpxHcu3NVanxe3hDnC2QRxOeS2lYJYUCj57wjk6s6zQPxuGfRymUJvAtpdqSxQyOCVxYVVXZeKjX1PtHzUwTdxLxRFkQ-uy0Wkdt9PLVSix-WW_Yhj9Q-7vckCUPA1NjfPSGWo1RpBTx4655Eg32yHhxICDT7wKDiG-eqw4hPAEADpyQ5vA',
  'umbrella cut or Flare':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZVub0VhEbfZ42RjVHsOuVG7wBCgHLelkGY6dOel_gT0hCj9B2RVezHENmxJ_Y2puqMuVud0p4ezu2BAO-tDYec2p7u7R0BrlAnxqF8-sj5o6hzp952ZimvWdQMJ27T2bnI0izDnupYarV-4dSCuZNTV4ZI5LIGSBrB7x8UtRvKe2pzAHzOircRZsc5QdPR8BNHP9tTFY1_m7T5pjTpfYw7dLDbvqK7NRWpybaJqeALvz9q6tLOqfhTQ',
  '2 piece abaya (with inner)':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnqkoPTiUDviPUgD5wOYrSVBgUqgYocEhMRfjaPR0AEGQLNSU0reQ8ubR7uxH960qrPF_FqZly7nHa6M1eLYxa5g-5swQgYvy9Z47DR5Ph3pItsJjdCgLs1rkJOUsw_YtUrEPMsYWIosdqamteTBxBFcTP3dxNNOMXvIUzzwnK72cUnoROgWljIfcYMCZlhKDCFJZAJAexcU4FPc2ghiwZ4a4GWa-zXbuRhhx6hDiAwUFdTToqcj62cg',
  'Coat abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxkyIqLmyOOOYWe4t17RXa7iRSCynbDrN6ywtJPf_xfaZiQGiTrejAu_Y_jqoa5NK9NtZTqNASt0n7GYiMTOvuZi_xPbW_YEfybM1GEZ94_QdPMo5CXKUwTJqQtTsaGYducUj0ebdjb6CCa_VJ7nazh54quuGFSOALMq9e9LVwMVGfLN3NthKYvgJjKK8pxisrSBk20C56m3SqGRkW9HmYuXUcCRYBR5w0nTDqakaeh2oYXKWKIq1UA',
};

const WORK_IMAGES = {
  'Embroidery Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpGHDV5eQMWi71D4mWI7voUd6mXcXo_PTliCl6CQhvIaRrMlarXpn-r-525bSjOEkrsbyu3U7zZ3JfTBvpB1PziSsHKFHFWb1xFFEQtM58gz89WscIgS3NH2jdY_eFZxTxxxrRFRGKiDDZH_8lWjYSE3li5ix01zdBOA6n6y2CzPMacxyx_52_efpx2AoC7zECpL3lIaGkhpz1fdqaUX_xVKePZtVBnB94cljTFvCuTw-g707mRks_g',
  'Handwork Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1pd9NiCkfaDXafhb_-Uh3AA4XfN_AwnHEOOx0x2g2ngtcqCTGLjvTaBkKb-K-NzQCG24IEz1UecYCkOoBZQCz8Noq1fcMtAEZXyLpJZs8oZaOU9p5FhAShjG20FoGotY7Q5RtZ_fkUFk2HiRAkqY7a_y5R8pdolKPAtOtdjB3HFdhHKgY2Vfkv8U7Mfjej74-_slJxvP0a9gXoTwEPOLi7mSF52g0Nz5NZjvjyQzAgbD45y67GOUWkw',
  'Stonework Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBYEamtzjpK7ME6SNcwB_Dm777cIG9hjrlL-HktMD3xXRRagPMwnPzQ6iQe0viQ-TzLh4QmpxHcu3NVanxe3hDnC2QRxOeS2lYJYUCj57wjk6s6zQPxuGfRymUJvAtpdqSxQyOCVxYVVXZeKjX1PtHzUwTdxLxRFkQ-uy0Wkdt9PLVSix-WW_Yhj9Q-7vckCUPA1NjfPSGWo1RpBTx4655Eg32yHhxICDT7wKDiG-eqw4hPAEADpyQ5vA',
  'Threadwork Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6VCCXcrsIQMHcP3Y2cwPwjMw26HSpdXZRpo1lY76HCdTo-vZ5b4M8do6PcZ7DqQvXu3-GlMe2pgswNgngMTx9SsTOZ72uI6VKzR9AO30LImVq-vABf8hOJGP7ROTu8ggWAFYVzo2IbWQV-aYchjycdwCWyhodCmGPBoTo_aAcIjMZuF8wfHjLz_fQt_sGTpPBO2Ddgqm5H07QGTDc4ZBfNS_nT9uyWZncjWeLoA1KPl20JxdlmW11w',
  'Printed Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZVub0VhEbfZ42RjVHsOuVG7wBCgHLelkGY6dOel_gT0hCj9B2RVezHENmxJ_Y2puqMuVud0p4ezu2BAO-tDYec2p7u7R0BrlAnxqF8-sj5o6hzp952ZimvWdQMJ27T2bnI0izDnupYarV-4dSCuZNTV4ZI5LIGSBrB7x8UtRvKe2pzAHzOircRZsc5QdPR8BNHP9tTFY1_m7T5pjTpfYw7dLDbvqK7NRWpybaJqeALvz9q6tLOqfhTQ',
  'Lace Work Abaya':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCnqkoPTiUDviPUgD5wOYrSVBgUqgYocEhMRfjaPR0AEGQLNSU0reQ8ubR7uxH960qrPF_FqZly7nHa6M1eLYxa5g-5swQgYvy9Z47DR5Ph3pItsJjdCgLs1rkJOUsw_YtUrEPMsYWIosdqamteTBxBFcTP3dxNNOMXvIUzzwnK72cUnoROgWljIfcYMCZlhKDCFJZAJAexcU4FPc2ghiwZ4a4GWa-zXbuRhhx6hDiAwUFdTToqcj62cg',
  'plain':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC62Pubod6uVtguy05UptSBB8reu4JabPY0PwbiPYPXlEDpfoyvWWm_LbQNVVa2vA_XcMhrFIIBFxe-w0OoW5jrkDOfsMuBpdvFb1KE8yOvQP3elB3A6xfTzLB8rTL6U3551DMCeA9q2oMYmOIJbZpUDr1DlrwerOph-ZxGnsRCoO8TEijtBJqZUIeWwRen9k_MtD_Br7xdakBcNQjnRMRcXfgOBFn60si3c_yt84p0f1dKFD9kqRq06g',
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
    <div className="bg-white text-primary font-sans antialiased overflow-x-hidden">

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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content over image — bottom-left */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16 lg:p-20 max-w-2xl">
                    {slide.badge && (
                      <span className="inline-block w-fit text-[10px] sm:text-xs font-sans tracking-[0.25em] font-bold text-white/80 uppercase mb-2 sm:mb-3">
                        {slide.badge}
                      </span>
                    )}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.1] mb-3 sm:mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-white/80 font-sans text-sm sm:text-base max-w-md leading-relaxed mb-6 sm:mb-8 drop-shadow-sm">
                      {slide.description}
                    </p>
                    <button
                      onClick={() => navigateTo('shop', slide.productId)}
                      className="cursor-pointer w-fit bg-white text-primary px-8 sm:px-10 py-3 sm:py-3.5 font-sans font-bold uppercase tracking-[0.15em] text-xs sm:text-sm transition-all duration-300 hover:bg-primary hover:text-white active:scale-95 shadow-lg"
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
                className="cursor-pointer absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="cursor-pointer absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
                  className={`cursor-pointer h-[3px] transition-all duration-500 rounded-full ${
                    currentSlide === i
                      ? 'w-10 bg-white'
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
      <section id="shop-by-collection" className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Section Title */}
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-primary font-medium tracking-tight mb-3">
              Shop by Collection
            </h2>
            <div className="w-16 h-[2px] bg-primary/30 mx-auto" />
          </div>

          {/* ── SUB-SECTION: By Style ── */}
          <div className="mb-16 sm:mb-24">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary font-medium">
                  By Style
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1 tracking-wide">
                  Discover abayas by silhouette
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.12em] text-primary hover:text-royal-violet transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={STYLE_IMAGES[styleName]}
                      alt={styleName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  {/* Card Label */}
                  <h4 className="font-sans text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.08em] text-center group-hover:text-royal-violet transition-colors duration-300">
                    {styleName}
                  </h4>
                </div>
              ))}
            </div>
          </div>


          {/* ── SUB-SECTION: By Work ── */}
          <div>
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary font-medium">
                  By Work
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1 tracking-wide">
                  Explore artisan craftsmanship
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.12em] text-primary hover:text-royal-violet transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={WORK_IMAGES[workName]}
                      alt={workName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  {/* Card Label */}
                  <h4 className="font-sans text-xs sm:text-sm font-semibold text-primary uppercase tracking-[0.08em] text-center group-hover:text-royal-violet transition-colors duration-300 capitalize">
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
      <section id="new-arrivals" className="py-14 sm:py-20 md:py-28 bg-[#faf8f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-primary font-medium tracking-tight mb-1">
                New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-sans tracking-wide">
                Our latest bespoke creations
              </p>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.12em] text-primary hover:text-royal-violet transition-colors"
            >
              <span className="hidden sm:inline">View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
