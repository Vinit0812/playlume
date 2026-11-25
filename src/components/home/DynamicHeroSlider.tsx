"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Package,
  Layers,
  Flame,
  Cpu,
  Shirt,
} from "lucide-react";
import { StoredBanner } from "@/lib/local-storage";

const FALLBACK_BANNERS: StoredBanner[] = [
  {
    id: 1,
    title: "NIRAL INDUSTRIES • ELEGANT URLI & FESTIVE COLLECTION",
    subtitle:
      "Original Collection Designs | Metal Urlis & Diya Decor | Direct Factory Wholesale Sourcing with Pan-India Dispatch",
    badge: "Festive Wholesale Lots • From ₹22/- Only",
    division: "Home & Festive Decor",
    ctaText: "Explore Urli Collection",
    ctaLink: "/products?category=home",
    position: "Hero Main",
    status: "active",
    bgColor: "from-[#141414] via-[#1c1712] to-[#141414]",
    accentColor: "#f59e0b",
    highlightItems: [
      { name: "Lotus Golden Touch Up", price: "₹42/- only" },
      { name: "Lotus Diya Urli with Stand", price: "₹22/- only" },
      { name: "Hammered Ball Type Urli", price: "₹47/- only" },
      { name: "Royal Elephant Diya Urli", price: "₹75/- only" },
    ],
    impressionCount: 14820,
    clickCount: 1940,
  },
  {
    id: 2,
    title: "NEXT-GEN GAN 65W FAST CHARGING & AUDIO WHOLESALE",
    subtitle:
      "Master Carton Factory Rates for Super-Stockists & Retail Electronics Chains | Full Warranty & BIS Certified",
    badge: "Direct Factory Lots • MOQ 20 pcs • Rapid Dispatch",
    division: "Consumer Electronics",
    ctaText: "View Electronics Catalogue",
    ctaLink: "/products?category=electronics",
    position: "Hero Main",
    status: "active",
    bgColor: "from-[#141414] via-[#121922] to-[#141414]",
    accentColor: "#38bdf8",
    highlightItems: [
      { name: "GaN Turbo 65W Hub", price: "₹220/- only" },
      { name: "TWS Wireless Earbuds 5.3", price: "₹180/- only" },
      { name: "10,000mAh Magnetic Bank", price: "₹410/- only" },
      { name: "Portable USB-C Juicer", price: "₹340/- only" },
    ],
    impressionCount: 9420,
    clickCount: 1420,
  },
  {
    id: 3,
    title: "180 GSM BIO-WASHED COMBED COTTON APPAREL",
    subtitle:
      "Export Quality Pre-Shrunk Single Jersey Knits | Ready Dispatch Across India | Ideal for Screen Printing & Retail",
    badge: "Premium Combed Cotton • From ₹140/- Only",
    division: "Clothing & Apparel",
    ctaText: "Explore Apparel Lots",
    ctaLink: "/products?category=clothing",
    position: "Hero Main",
    status: "active",
    bgColor: "from-[#141414] via-[#191520] to-[#141414]",
    accentColor: "#f43f5e",
    highlightItems: [
      { name: "Bio-Washed Plain Tees", price: "₹145/- only" },
      { name: "Kids Nightwear Sets", price: "₹180/- only" },
      { name: "Combed Cotton Boxers", price: "₹190/- only" },
      { name: "Winter Fleece Hoodies", price: "₹390/- only" },
    ],
    impressionCount: 8120,
    clickCount: 980,
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const activeBanner = banners[currentIndex] || banners[0];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#141414] text-white border-b border-neutral-800 shadow-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient with Smooth Color Transition */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${activeBanner.bgColor} transition-all duration-700 ease-in-out opacity-90`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/60 pointer-events-none" />

      {/* Decorative Gold Top & Bottom Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* =========================================================
              LEFT COLUMN: HERO HEADLINE, BADGES, AND CTAS
              ========================================================= */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Promotional Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-xs font-black tracking-wide text-amber-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{activeBanner.badge || "Verified Wholesale Offer"}</span>
            </div>

            {/* Headline Title with Rich Luxury Gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.12] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-200 drop-shadow-sm">
              {activeBanner.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              {activeBanner.subtitle}
            </p>

            {/* Wholesale Trade Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified MOQs</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>GST Invoicing</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Package className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pan-India Dispatch</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={activeBanner.ctaLink}
                className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{activeBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition backdrop-blur-xs cursor-pointer"
              >
                <span>Request Custom Lot Quote</span>
              </Link>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: FEATURED LOT PREVIEW TILES (4 Grid Cards)
              ========================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-700/60 p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black tracking-wider uppercase text-amber-400">
                    {activeBanner.division}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-semibold">
                  Featured Wholesale Lots
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {(
                  activeBanner.highlightItems || [
                    { name: "Lot Specimen 1", price: "₹42/- only" },
                    { name: "Lot Specimen 2", price: "₹22/- only" },
                    { name: "Lot Specimen 3", price: "₹47/- only" },
                    { name: "Lot Specimen 4", price: "₹75/- only" },
                  ]
                ).map((item, idx) => (
                  <Link
                    key={idx}
                    href={activeBanner.ctaLink}
                    className="p-3 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 hover:border-amber-400/60 transition group flex flex-col justify-between h-28"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-neutral-200 group-hover:text-white line-clamp-2 leading-snug">
                        {item.name}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10.5px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-xs">
                        {item.price}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                <span>Configurable in Admin Dashboard</span>
                <Link
                  href="/admin/banners"
                  className="text-amber-400 hover:text-amber-300 font-bold text-[10.5px] flex items-center gap-1"
                >
                  <span>Manage Banners</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SLIDER CONTROLS & INDICATOR DOTS
            ========================================================= */}
        <div className="flex items-center justify-between pt-6 sm:pt-8 mt-4 border-t border-white/10">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {banners.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-amber-400 shadow-md shadow-amber-500/40"
                    : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-lg bg-neutral-900/70 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-lg bg-neutral-900/70 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Next banner"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
