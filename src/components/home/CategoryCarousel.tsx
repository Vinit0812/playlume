"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CategoryCardData {
  id: string;
  name: string;
  slug: string;
  image: string;
  tag: string;
  tagColor?: string;
  bottomTag?: string;
  count: string;
  moq: string;
  from: string;
  href: string;
}

const CATEGORIES: CategoryCardData[] = [
  {
    id: "toys-games",
    name: "Toys & Games",
    slug: "toys-games",
    image: "/categories/cat-toys.png",
    tag: "Trending",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    bottomTag: "Best for Bazaars",
    count: "13 products",
    moq: "20 pcs",
    from: "₹75",
    href: "/category/toys-games",
  },
  {
    id: "clothing-apparel",
    name: "Clothing & Apparel",
    slug: "clothing-apparel",
    image: "/categories/cat-clothing.png",
    tag: "High Margin",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    bottomTag: "Retail Essential",
    count: "9 products",
    moq: "20 pcs",
    from: "₹75",
    href: "/category/clothing-apparel",
  },
  {
    id: "artificial-jewellery",
    name: "Artificial Jewellery",
    slug: "artificial-jewellery",
    image: "/categories/cat-jewellery.png",
    tag: "New Collection",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    bottomTag: "Festive High Demand",
    count: "8 products",
    moq: "30 pcs",
    from: "₹49",
    href: "/category/artificial-jewellery",
  },
  {
    id: "consumer-electronics",
    name: "Consumer Electronics",
    slug: "consumer-electronics",
    image: "/categories/cat-electronics.png",
    tag: "Fast Selling",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    bottomTag: "Daily Fast Moving",
    count: "9 products",
    moq: "20 pcs",
    from: "₹49",
    href: "/category/consumer-electronics",
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "/categories/cat-home.png",
    tag: "Direct Factory",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bottomTag: "Kitchen Essentials",
    count: "7 products",
    moq: "20 pcs",
    from: "₹99",
    href: "/category/home-kitchen",
  },
  {
    id: "fashion-accessories",
    name: "Fashion Accessories",
    slug: "fashion-accessories",
    image: "/categories/cat-fashion.png",
    tag: "Top Rated",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    bottomTag: "Lifestyle Trend",
    count: "6 products",
    moq: "30 pcs",
    from: "₹49",
    href: "/category/fashion-accessories",
  },
];

export default function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-18 px-4 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto">
        {/* Centered Professional Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            Top Wholesale Categories
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Carousel Container with Floating Controls */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            className="hidden sm:flex absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-amber-600 hover:border-amber-400 items-center justify-center transition shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next categories"
            className="hidden sm:flex absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-amber-600 hover:border-amber-400 items-center justify-center transition shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] lg:w-[calc(16.666%-13.5px)] bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer"
              >
                {/* Card Top: Photography Cluster Artwork */}
                <div>
                  <div className="w-full h-24 sm:h-28 rounded-xl bg-slate-50/80 p-2 flex items-center justify-center mb-3 overflow-hidden border border-slate-100 group-hover:bg-amber-50/40 transition">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Tag Pill (Trending, High Margin, etc.) */}
                  <div className="mb-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border tracking-wide shadow-2xs ${
                        c.tagColor || "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {c.tag}
                    </span>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-amber-600 transition leading-snug">
                    {c.name}
                  </h3>

                  {/* Product Count & MOQ */}
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {c.count} • MOQ {c.moq}
                  </p>

                  {/* Bottom Tag Badge (Best for Bazaars, Retail Essential, etc.) */}
                  {c.bottomTag && (
                    <div className="mt-2.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {c.bottomTag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Price & Action Arrow Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Starting</span>
                    <span className="font-black text-sm text-neutral-900">{c.from}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-stone-950 flex items-center justify-center transition shadow-2xs group-hover:scale-110">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Centered Explore Link */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-900 hover:text-white border border-slate-300 text-neutral-800 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <span>Explore All Wholesale Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
