"use client";

import React from "react";

export interface CategoryStudioBannerProps {
  categorySlug: string;
  categoryName: string;
  description?: string;
  startingRate?: string;
  standardMoq?: string;
  availableLots?: number | string;
}

interface BannerPreset {
  title: string;
  description: string;
  startingRate: string;
  standardMoq: string;
  defaultLots: number;
  visualPath: string;
}

const CATEGORY_PRESETS: Record<string, BannerPreset> = {
  "fashion-accessories": {
    title: "Fashion Accessories",
    description: "Bags, Purses, Wallets, Hair Accessories & Lifestyle. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹22",
    standardMoq: "30 pcs",
    defaultLots: 38,
    visualPath: "/category-banners/fashion-accessories-visual@2x.png",
  },
  "clothing-apparel": {
    title: "Clothing & Apparel",
    description: "Men's, Women's & Kids Fashion. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹95",
    standardMoq: "25 pcs",
    defaultLots: 15,
    visualPath: "/category-banners/clothing-apparel-visual@2x.png",
  },
  "artificial-jewellery": {
    title: "Artificial Jewellery",
    description: "Earrings, Necklaces, Bangles & Combo Sets. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹39",
    standardMoq: "30 pcs",
    defaultLots: 15,
    visualPath: "/category-banners/artificial-jewellery-visual@2x.png",
  },
  "toys-games": {
    title: "Toys & Games",
    description: "Educational, Plush, Outdoor, RC & Baby Toys. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹75",
    standardMoq: "10 pcs",
    defaultLots: 15,
    visualPath: "/category-banners/toys-games-visual@2x.png",
  },
  "consumer-electronics": {
    title: "Consumer Electronics",
    description: "Fast Chargers, TWS Earbuds, Power Banks, Audio & Cables. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹49",
    standardMoq: "20 pcs",
    defaultLots: 24,
    visualPath: "/category-banners/consumer-electronics-visual@2x.png",
  },
  "home-kitchen": {
    title: "Home & Kitchen",
    description: "Kitchenware, Storage Containers, Water Bottles, Choppers & Organisers. Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: "₹99",
    standardMoq: "20 pcs",
    defaultLots: 22,
    visualPath: "/category-banners/home-kitchen-visual@2x.png",
  },
};

export default function CategoryStudioBanner({
  categorySlug,
  categoryName,
  description,
  startingRate,
  standardMoq,
  availableLots,
}: CategoryStudioBannerProps) {
  const preset = CATEGORY_PRESETS[categorySlug] || {
    title: categoryName,
    description: description || "Direct factory wholesale rates with pan-India distribution and verified MOQs.",
    startingRate: startingRate || "₹49",
    standardMoq: standardMoq || "20 pcs",
    defaultLots: typeof availableLots === "number" ? availableLots : 20,
    visualPath: `/category-banners/${categorySlug}-visual@2x.png`,
  };

  const displayTitle = preset.title || categoryName;
  const displayDescription = description || preset.description;
  const displayRate = startingRate || preset.startingRate;
  const displayMoq = standardMoq || preset.standardMoq;
  const displayLots = availableLots !== undefined ? availableLots : preset.defaultLots;

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e8ded1] bg-gradient-to-r from-[#fdf8f4] via-[#f7eee4] to-[#f0e2d4] shadow-sm mb-6">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Subtle architectural wall grid */}
        <svg
          className="absolute right-0 top-0 h-full w-2/3 opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="studio-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#c9b8a3"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#studio-grid)" />
        </svg>

        {/* Studio Sun / Arch Motif */}
        <div className="absolute right-12 -top-16 w-80 h-80 rounded-full bg-gradient-to-b from-[#f5dfc6]/40 to-transparent pointer-events-none" />
        <div className="absolute right-32 top-8 w-48 h-48 rounded-full border-[18px] border-[#eedac2]/50 pointer-events-none" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between min-h-[222px]">
        {/* Left Typography & Stats Column */}
        <div className="flex-1 py-6 sm:py-8 px-6 sm:px-10 lg:pl-12 lg:pr-6 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#b45309] bg-[#faedd9]/90 border border-[#f0c38f]/80 shadow-xs mb-3">
            <span>COMMERCIAL MERCHANDISE DIVISION</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-neutral-900 tracking-tight leading-tight mb-2.5">
            {displayTitle}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-[13px] md:text-sm text-neutral-600 leading-relaxed max-w-xl mb-5 sm:mb-6">
            {displayDescription}
          </p>

          {/* 3 Razor-Sharp Stat Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="bg-white/95 backdrop-blur-xs border border-white/80 rounded-full px-3.5 py-1.5 text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-medium inline-flex items-center gap-1.5">
              <span>Starting Rate:</span>
              <strong className="text-[#b45309] font-black">{displayRate}</strong>
            </div>

            <div className="bg-white/95 backdrop-blur-xs border border-white/80 rounded-full px-3.5 py-1.5 text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-medium inline-flex items-center gap-1.5">
              <span>Standard MOQ:</span>
              <strong className="text-neutral-900 font-bold">{displayMoq}</strong>
            </div>

            <div className="bg-white/95 backdrop-blur-xs border border-white/80 rounded-full px-3.5 py-1.5 text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-medium inline-flex items-center gap-1.5">
              <span>Available Lots:</span>
              <strong className="text-neutral-900 font-bold">{displayLots}</strong>
            </div>
          </div>
        </div>

        {/* Right Studio Visual Column */}
        <div className="relative md:w-1/2 lg:w-[48%] h-44 sm:h-52 md:h-60 lg:h-64 flex items-center justify-end overflow-hidden self-end md:self-center pr-0 sm:pr-2">
          <div className="relative w-full h-full flex items-center justify-end">
            <img
              src={preset.visualPath}
              alt={`${displayTitle} studio products`}
              className="h-full w-auto max-w-full object-contain object-right drop-shadow-sm select-none pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 12%, black 28%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 12%, black 28%)",
              }}
              onError={(e) => {
                // Fallback to 1x visual if 2x not loaded
                const target = e.currentTarget;
                if (target.src.includes("@2x")) {
                  target.src = target.src.replace("@2x", "");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
