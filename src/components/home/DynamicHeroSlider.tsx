"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { StoredBanner } from "@/lib/local-storage";

const FALLBACK_BANNERS: StoredBanner[] = [
  {
    id: 1,
    title: "NIRAL INDUSTRIES • TRENDING CHRISTMAS COLLECTION",
    subtitle: "Original Collection Designs | Festive Candle Moulds & Decor | Direct Factory Sourcing",
    badge: "Festive Wholesale Sourcing • Rapid Dispatch",
    division: "Home & Festive Decor",
    ctaText: "Shop Festive Moulds",
    ctaLink: "/products?category=home",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/christmas-banner.jpg",
    bgColor: "from-[#141414] via-[#1c1712] to-[#141414]",
    accentColor: "#f59e0b",
    impressionCount: 16820,
    clickCount: 2340,
  },
  {
    id: 2,
    title: "NIRAL INDUSTRIES • ELEGANT URLI & FESTIVE COLLECTION",
    subtitle: "Original Collection Designs | Metal Urlis & Diya Decor | Direct Factory Wholesale Sourcing",
    badge: "Festive Wholesale Lots • From ₹22/- Only",
    division: "Home & Festive Decor",
    ctaText: "Explore Urli Collection",
    ctaLink: "/products?category=home",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/urli-collection-banner.jpg",
    bgColor: "from-[#141414] via-[#1c1712] to-[#141414]",
    accentColor: "#f59e0b",
    impressionCount: 14820,
    clickCount: 1940,
  },
  {
    id: 3,
    title: "NEXT-GEN GAN 65W FAST CHARGING & ELECTRONICS WHOLESALE",
    subtitle: "Master Carton Factory Rates for Super-Stockists & Retail Chains | BIS Certified",
    badge: "Direct Factory Lots • MOQ 20 pcs • Rapid Dispatch",
    division: "Consumer Electronics",
    ctaText: "View Electronics Catalogue",
    ctaLink: "/products?category=electronics",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/electronics-wholesale-banner.jpg",
    bgColor: "from-[#141414] via-[#121922] to-[#141414]",
    accentColor: "#38bdf8",
    impressionCount: 11420,
    clickCount: 1720,
  },
];

export default function DynamicHeroSlider() {
  const [banners, setBanners] = useState<StoredBanner[]>(FALLBACK_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        if (data.success && Array.isArray(data.banners)) {
          const activeOnly = data.banners.filter(
            (b: StoredBanner) => b.status === "active"
          );
          if (activeOnly.length > 0) {
            setBanners(activeOnly);
          }
        }
      } catch (e) {
        // Fallback already loaded
      }
    }
    fetchBanners();
  }, []);

  // Auto-scroll slides
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length, isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const activeBanner = banners[currentIndex] || banners[0];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#141414] text-white border-b border-neutral-800 shadow-xl select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Gold Top Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-20" />

      {/* Main Banner Slide Container */}
      <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] md:aspect-[3.2/1] min-h-[220px] max-h-[460px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <Link
          href={activeBanner.ctaLink || "/products"}
          className="relative w-full h-full block cursor-pointer transition-opacity duration-500 ease-in-out"
          title={activeBanner.title}
        >
          {activeBanner.imageUrl ? (
            /* ====================================================
               1. GRAPHIC ADVERTISING BANNER (100% CLEAN IMAGE)
               ==================================================== */
            <div className="w-full h-full relative">
              <img
                key={activeBanner.id + "-" + currentIndex}
                src={activeBanner.imageUrl}
                alt={activeBanner.title}
                className="w-full h-full object-cover object-center animate-in fade-in duration-500"
              />
              {/* Subtle hover sheen */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300 pointer-events-none" />
            </div>
          ) : (
            /* ====================================================
               2. FALLBACK TYPOGRAPHIC ADVERTISING BANNER
               ==================================================== */
            <div
              className={`w-full h-full bg-gradient-to-r ${activeBanner.bgColor || "from-[#141414] via-[#1c1712] to-[#141414]"} flex items-center justify-center px-6 sm:px-12 text-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
                {activeBanner.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-3 h-3" />
                    {activeBanner.badge}
                  </span>
                )}
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  {activeBanner.title}
                </h2>
                {activeBanner.subtitle && (
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto line-clamp-2">
                    {activeBanner.subtitle}
                  </p>
                )}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider transition shadow-lg">
                    <span>{activeBanner.ctaText || "Explore Collection"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </Link>

        {/* Previous Navigation Button */}
        {banners.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-amber-400/60 flex items-center justify-center transition opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-xs"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Navigation Button */}
        {banners.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-amber-400/60 flex items-center justify-center transition opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-xs"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Slide Indicator Dots / Navigation Bar */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
              {banners.map((b, idx) => (
                <button
                  key={b.id || idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-amber-400 shadow-sm shadow-amber-500/50"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Gold Bottom Hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent z-20" />
    </section>
  );
}
