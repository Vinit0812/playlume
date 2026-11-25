"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Check,
  Layers,
  ArrowRight,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";

interface BannerProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  moq: number;
  specs: string;
  collection: "urli" | "electronics" | "apparel";
  accentColor?: string;
  imageBg: string;
  patternType: "urli-lotus" | "urli-cylinder" | "urli-hammered" | "urli-diya" | "urli-bucket" | "urli-mandala" | "gadget-charger" | "apparel-tee";
}

const URLI_COLLECTION: BannerProduct[] = [
  {
    id: "url-01",
    sku: "URL-101",
    name: "Golden Touch Lotus Urli",
    category: "Home & Kitchen",
    price: 42,
    mrp: 120,
    moq: 50,
    specs: "Diameter 12 cm • Height 3 cm",
    collection: "urli",
    imageBg: "from-amber-700 via-amber-800 to-amber-950",
    patternType: "urli-lotus",
  },
  {
    id: "url-02",
    sku: "URL-102",
    name: "Imperial Lotus Urli (CD11801)",
    category: "Home & Kitchen",
    price: 39,
    mrp: 99,
    moq: 60,
    specs: "Diameter 14 cm • 5 Petals",
    collection: "urli",
    imageBg: "from-amber-600 via-yellow-700 to-amber-900",
    patternType: "urli-lotus",
  },
  {
    id: "url-03",
    sku: "URL-103",
    name: "Hammered Round Small Urli",
    category: "Home & Kitchen",
    price: 43,
    mrp: 110,
    moq: 50,
    specs: "Hand-hammered • Brass finish",
    collection: "urli",
    imageBg: "from-amber-700 via-yellow-800 to-stone-900",
    patternType: "urli-hammered",
  },
  {
    id: "url-04",
    sku: "URL-104",
    name: "Hammered Ball Type Urli",
    category: "Home & Kitchen",
    price: 47,
    mrp: 130,
    moq: 40,
    specs: "Deep bowl • Floating flower rim",
    collection: "urli",
    imageBg: "from-yellow-700 via-amber-800 to-stone-900",
    patternType: "urli-hammered",
  },
  {
    id: "url-05",
    sku: "URL-105",
    name: "Plain Cylinder Metal Urli",
    category: "Home & Kitchen",
    price: 44,
    mrp: 115,
    moq: 40,
    specs: "Sleek spun brass • Smooth polish",
    collection: "urli",
    imageBg: "from-amber-600 via-stone-800 to-stone-950",
    patternType: "urli-cylinder",
  },
  {
    id: "url-06",
    sku: "URL-106",
    name: "Lotus Bowl Urli Deluxe",
    category: "Home & Kitchen",
    price: 45,
    mrp: 125,
    moq: 35,
    specs: "Fluted rim • Lacquered golden sheen",
    collection: "urli",
    imageBg: "from-yellow-600 via-amber-700 to-stone-950",
    patternType: "urli-lotus",
  },
  {
    id: "url-07",
    sku: "URL-107",
    name: "Lotus Diya Urli with Stand",
    category: "Home & Kitchen",
    price: 22,
    mrp: 65,
    moq: 100,
    specs: "Centre diya well • Festive edition",
    collection: "urli",
    imageBg: "from-amber-700 via-stone-800 to-black",
    patternType: "urli-diya",
  },
  {
    id: "url-08",
    sku: "URL-108",
    name: "Royal Elephant Diya Urli Stand",
    category: "Home & Kitchen",
    price: 75,
    mrp: 220,
    moq: 25,
    specs: "Carved base legs • Heavy brass look",
    collection: "urli",
    imageBg: "from-amber-800 via-amber-950 to-stone-950",
    patternType: "urli-diya",
  },
  {
    id: "url-09",
    sku: "URL-109",
    name: "Bucket Urli (CD13815)",
    category: "Home & Kitchen",
    price: 31,
    mrp: 85,
    moq: 60,
    specs: "Mini bucket style with handle",
    collection: "urli",
    imageBg: "from-yellow-700 via-amber-900 to-black",
    patternType: "urli-bucket",
  },
  {
    id: "url-10",
    sku: "URL-110",
    name: "Hammered 4-Inch Bowl Urli",
    category: "Home & Kitchen",
    price: 53,
    mrp: 140,
    moq: 40,
    specs: "4 Inch width • Floating candle rim",
    collection: "urli",
    imageBg: "from-amber-700 via-yellow-900 to-stone-900",
    patternType: "urli-hammered",
  },
  {
    id: "url-11",
    sku: "URL-111",
    name: "Square Lotus Flower Urli",
    category: "Home & Kitchen",
    price: 51,
    mrp: 145,
    moq: 35,
    specs: "Square geometry • 4 Corner diyas",
    collection: "urli",
    imageBg: "from-amber-600 via-stone-900 to-black",
    patternType: "urli-mandala",
  },
  {
    id: "url-12",
    sku: "URL-112",
    name: "Mandala Print Gold Urli",
    category: "Home & Kitchen",
    price: 44,
    mrp: 120,
    moq: 45,
    specs: "Laser engraved mandala motif",
    collection: "urli",
    imageBg: "from-yellow-700 via-amber-800 to-stone-950",
    patternType: "urli-mandala",
  },
];

export default function CandleStyleHeroBanner() {
  const { addItem, setIsOpen } = useQuoteBasket();
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddProduct = (p: BannerProduct) => {
    addItem({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
      categoryTone: "home",
      price: p.price,
      mrp: p.mrp,
      moq: p.moq,
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="relative w-full bg-[#1c0c06] text-white overflow-hidden border-b border-amber-900/60 select-none shadow-xl">
      {/* Decorative Golden Ambient Lighting & Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-[#190904] to-[#0d0402] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10">
        
        {/* =========================================================
            BANNER HEADER (Matches Candlemould.in / Niral Urli style)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NIRAL INDUSTRIES • PLAYLUME WHOLESALE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-[38px] font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 uppercase leading-tight drop-shadow-sm">
            ELEGANT URLI COLLECTION
          </h2>

          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-300 font-medium mt-2 flex-wrap">
            <span>Original Collection Designs</span>
            <span className="text-amber-500">•</span>
            <span>Metal Urlis</span>
            <span className="text-amber-500">•</span>
            <span>Floating Candle Decor</span>
            <span className="text-amber-500">•</span>
            <span className="text-amber-400 font-bold">Factory-Direct MOQs</span>
          </div>
        </div>

        {/* =========================================================
            CAROUSEL CONTROLS & PRODUCT GRID
            ========================================================= */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-12 sm:w-11 sm:h-16 rounded-r-lg bg-black/70 hover:bg-black/90 text-amber-400 border border-amber-500/40 flex items-center justify-center backdrop-blur-xs transition shadow-xl cursor-pointer"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-12 sm:w-11 sm:h-16 rounded-l-lg bg-black/70 hover:bg-black/90 text-amber-400 border border-amber-500/40 flex items-center justify-center backdrop-blur-xs transition shadow-xl cursor-pointer"
            aria-label="Next items"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Product Items Horizontal Scroll Track / Multi-Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-2 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {URLI_COLLECTION.map((product) => {
              const isAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="w-[170px] sm:w-[200px] shrink-0 snap-start bg-[#2a140d]/90 rounded-xl border border-amber-500/30 overflow-hidden shadow-lg hover:border-amber-400 transition-all duration-200 flex flex-col justify-between group/card"
                >
                  {/* Top Card Label */}
                  <div className="bg-gradient-to-r from-amber-950 to-stone-900 px-2.5 py-1.5 border-b border-amber-900/60 flex items-center justify-between">
                    <span className="text-[10.5px] font-bold text-amber-300 truncate">
                      {product.name}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      {product.sku}
                    </span>
                  </div>

                  {/* Visual Render / Urli Image Simulation (Golden Diya & Metal Aesthetic) */}
                  <div className={`relative h-28 sm:h-32 bg-gradient-to-b ${product.imageBg} p-3 flex flex-col items-center justify-center text-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-black/40" />

                    {/* Decorative Geometric Diya / Urli Motif */}
                    <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-yellow-300/30 via-amber-500/20 to-black/60 shadow-inner flex flex-col items-center justify-center group-hover/card:scale-110 transition transform duration-300">
                      <Flame className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
                      <div className="text-[8px] font-serif font-black text-amber-200 uppercase tracking-tighter mt-0.5">
                        Urli Brass
                      </div>
                    </div>

                    {/* Gold Price Tag Sticker (Exact candlemould.in sticker pill) */}
                    <div className="absolute bottom-2 right-2 z-10">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 text-[10px] sm:text-[11px] font-black shadow-md border border-amber-200">
                        ₹{product.price}/- only
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Details & Quick Quote CTA */}
                  <div className="p-2.5 bg-[#200e08] flex flex-col gap-1.5 border-t border-amber-900/40">
                    <div className="flex items-center justify-between text-[10px] text-neutral-300">
                      <span>MOQ: <strong className="text-amber-400">{product.moq} pcs</strong></span>
                      <span className="line-through text-neutral-500">₹{product.mrp}</span>
                    </div>
                    <div className="text-[9.5px] text-neutral-400 truncate">
                      {product.specs}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddProduct(product)}
                      className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Basket</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM CALLOUT BUTTON (Exact Pill Button from Screenshot)
            EXPLORE THE FULL COLLECTION - www.candlemould.in / products
            ========================================================= */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex flex-col items-center px-8 sm:px-12 py-3 rounded-full bg-gradient-to-r from-[#801416] via-[#a31a1d] to-[#801416] hover:from-[#9c191c] hover:to-[#9c191c] text-white border-2 border-amber-400/80 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_28px_rgba(217,119,6,0.5)] transition transform hover:-translate-y-0.5 cursor-pointer group"
          >
            <span className="text-sm sm:text-base font-black tracking-wider uppercase text-amber-200 group-hover:text-white transition">
              EXPLORE THE FULL COLLECTION
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-amber-300/80 tracking-wide mt-0.5">
              www.playlume.in/products
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
