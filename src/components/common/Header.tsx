"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Phone,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  ArrowRight,
  ExternalLink,
  Tag,
  Sparkles,
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";

interface CategoryNav {
  id: string;
  name: string;
  slug: string;
  items: string[];
}

const CATEGORY_DATA: CategoryNav[] = [
  {
    id: "toys",
    name: "Toys & Games",
    slug: "toys-games",
    items: [
      "Educational & STEM Kits",
      "Die-Cast Scale Vehicles",
      "Wooden Puzzles & Montessori",
      "Interactive Electronic Toys",
      "Action Figures & Dolls",
      "Board Games & Puzzles",
    ],
  },
  {
    id: "clothing",
    name: "Clothing & Apparel",
    slug: "clothing",
    items: [
      "180 GSM Bio-Washed Plain Tees",
      "Kids Hosiery Nightwear",
      "Men's Combed Cotton Boxers",
      "Heavyweight Winter Fleece",
      "Sports Dry-Fit Activewear",
      "Organic Infant Wear Sets",
    ],
  },
  {
    id: "watches",
    name: "Watches & Horology",
    slug: "watches",
    items: [
      "Minimalist Quartz Dress Watches",
      "Stainless Steel Mesh Straps",
      "Smart Fitness Activity Trackers",
      "Waterproof Chronograph Sports",
      "Corporate Gifting Watch Sets",
      "Dual-Tone Metal Link Watches",
    ],
  },
  {
    id: "electronics",
    name: "Consumer Electronics",
    slug: "electronics",
    items: [
      "GaN Turbo 65W Fast Chargers",
      "TWS Bluetooth 5.3 Earbuds",
      "Portable USB-C Juicer Blenders",
      "Magnetic 10,000mAh Power Banks",
      "Heavy Braided Fast-Charge Cables",
      "Bluetooth Neckband Earphones",
    ],
  },
  {
    id: "home",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    items: [
      "Festive Urlis & Floating Candle Decor",
      "Stainless Insulated Bottles (750ml)",
      "Airtight Kitchen Storage Sets",
      "Non-Stick Induction Cookware",
      "Electric Kettle & Food Warmers",
      "Decorative Diya & Urli Stands",
    ],
  },
  {
    id: "stationery",
    name: "Stationery & Office",
    slug: "stationery",
    items: [
      "Executive Pastel Gel Pens (12 pcs)",
      "A5 Hardbound Ruled Journals",
      "Metal Mesh Desk Organisers",
      "Mathematical Geometry Sets",
      "Correction Tapes & Neon Sticky Notes",
      "Commercial Wholesale School Packs",
    ],
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount, setIsOpen } = useQuoteBasket();

  // Search & category state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Login form state inside modal
  const [loginRole, setLoginRole] = useState<"buyer" | "admin">("buyer");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close category select dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    router.push(`/products?${params.toString()}`);
    setIsCategoryDropdownOpen(false);
  };

  const handleQuickDemoLogin = () => {
    setLoginIdentifier("+91 98250 11223");
    setLoginPassword("buyer2026");
    setLoginFeedback("Verified Commercial Buyer: Ramesh Patel (Patel Retail Enterprises, Surat)");
  };

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === "admin") {
      router.push("/admin/buyers");
      setLoginModalOpen(false);
    } else {
      setLoginFeedback("Authentication successful! Welcome to PLAYLUME Commercial Portal.");
      setTimeout(() => {
        setLoginModalOpen(false);
        router.push("/products");
      }, 900);
    }
  };

  const selectedCategoryLabel =
    selectedCategory === "all"
      ? "All categories"
      : CATEGORY_DATA.find((c) => c.id === selectedCategory)?.name || "All categories";

  return (
    <>
      {/* =========================================================
          TIER 1: MAIN HEADER (CandleMould Style: Dark Charcoal / Black)
          ========================================================= */}
      <header className="bg-[#181818] text-white border-b border-neutral-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* 1. Brand Logo (Candle Mould style: Bold Name + Tagline) */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition transform">
              P
            </div>
            <div className="leading-tight">
              <span className="font-black text-xl sm:text-2xl text-white tracking-tight block">
                PLAYLUME
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-widest block -mt-0.5">
                Wholesale &amp; Trade
              </span>
            </div>
          </Link>

          {/* 2. Integrated Search Bar with "All categories ▾" + Input + Search CTA */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="flex w-full items-stretch rounded-md overflow-hidden bg-white shadow-sm border border-neutral-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20">
                
                {/* Category Dropdown Pill */}
                <div className="relative" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="h-full px-3.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 border-r border-neutral-300 transition shrink-0 select-none cursor-pointer"
                  >
                    <span className="truncate max-w-[125px]">{selectedCategoryLabel}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Options Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-xl border border-neutral-200 py-1.5 z-50 text-neutral-800 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("all");
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-100 font-semibold flex items-center justify-between ${
                          selectedCategory === "all" ? "text-amber-600 bg-amber-50" : ""
                        }`}
                      >
                        <span>All categories</span>
                        {selectedCategory === "all" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div className="h-px bg-neutral-200 my-1" />
                      {CATEGORY_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center justify-between ${
                            selectedCategory === cat.id ? "text-amber-600 font-bold bg-amber-50" : ""
                          }`}
                        >
                          <span>{cat.name}</span>
                          {selectedCategory === cat.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Text Box */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
                />

                {/* Submit Button (Coral/Red Accent like candlemould.in) */}
                <button
                  type="submit"
                  className="px-5 bg-[#e03a3a] hover:bg-[#c92f2f] text-white flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Search catalogue"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* 3. Right Section: New Arrival Ticker, Login & Quote Basket */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Ticker / Promo Text */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                Direct Lot Sourcing
              </span>
              <span className="text-xs text-neutral-200 font-medium">
                New Arrival: Festive Wholesale Lots!
              </span>
            </div>

            {/* Login Link with User Icon */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-2 text-neutral-200 hover:text-white transition py-1 text-xs sm:text-sm font-semibold cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition">
                <User className="w-4 h-4 text-neutral-300 group-hover:text-white" />
              </div>
              <span className="hidden sm:inline">Login</span>
            </button>

            {/* Quote Basket with Counter (Shopping Bag Icon like Candlemould) */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center p-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              aria-label="Open Quote Basket"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (under header for small devices) */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center rounded-md overflow-hidden bg-white shadow-sm border border-neutral-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#e03a3a] hover:bg-[#c92f2f] text-white flex items-center justify-center shrink-0"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* =========================================================
            TIER 2: CATEGORY NAVIGATION BAR (CandleMould Style)
            ========================================================= */}
        <nav className="hidden md:block bg-[#1f1f1f] border-t border-neutral-800 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-neutral-200 py-2">
              
              {/* Category Dropdowns */}
              {CATEGORY_DATA.map((cat) => (
                <li
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaMenu(cat.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded hover:text-white hover:bg-neutral-800 transition"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:rotate-180 transition-transform duration-150" />
                  </Link>

                  {/* Mega Dropdown Menu */}
                  {activeMegaMenu === cat.id && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="bg-[#242424] rounded-lg border border-neutral-700 shadow-2xl p-3 text-neutral-200">
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-700 pb-2 mb-2 flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-neutral-400 lowercase">lots</span>
                        </div>
                        <ul className="space-y-1.5">
                          {cat.items.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/products?search=${encodeURIComponent(item)}&category=${cat.id}`}
                                className="block px-2 py-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-700/60 transition text-[11.5px]"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-neutral-700">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                          >
                            <span>Explore all {cat.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              {/* Clearance Deals */}
              <li>
                <Link
                  href="/products?status=limited"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-amber-400 hover:text-amber-300 hover:bg-neutral-800 transition font-bold"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Clearance Offer</span>
                </Link>
              </li>

              {/* Wholesale - Bulk Buy */}
              <li className="ml-auto">
                <Link
                  href="/become-a-buyer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-black tracking-tight text-xs transition shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Wholesale - Bulk Buy</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1f1f1f] border-t border-neutral-800 px-4 py-4 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-neutral-800">
              Wholesale Lines
            </div>
            <div className="grid grid-cols-1 gap-1 text-sm font-semibold">
              {CATEGORY_DATA.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-neutral-800 text-neutral-200"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/products?status=limited"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded hover:bg-neutral-800 text-amber-400 font-bold"
              >
                Clearance Offer
              </Link>
              <Link
                href="/become-a-buyer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded bg-amber-500 text-stone-950 font-black text-center mt-2 block"
              >
                Register as Wholesale Buyer
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          LOGIN MODAL (CandleMould & PLAYLUME B2B Trade Login)
          ========================================================= */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#181818] text-white p-5 flex items-center justify-between border-b border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    P
                  </span>
                  <h3 className="text-base font-black tracking-tight text-white">
                    PLAYLUME B2B Portal
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Access commercial pricing slabs and track wholesale dispatches
                </p>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 bg-neutral-100 p-1.5 border-b border-neutral-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLoginRole("buyer")}
                className={`py-2 text-center rounded-lg transition ${
                  loginRole === "buyer"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-neutral-500 hover:text-stone-900"
                }`}
              >
                Commercial Buyer
              </button>
              <button
                type="button"
                onClick={() => setLoginRole("admin")}
                className={`py-2 text-center rounded-lg transition ${
                  loginRole === "admin"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-neutral-500 hover:text-stone-900"
                }`}
              >
                Wholesale Staff / Admin
              </button>
            </div>

            {/* Login Form Body */}
            <div className="p-6">
              {loginFeedback && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{loginFeedback}</span>
                </div>
              )}

              <form onSubmit={handlePerformLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    {loginRole === "buyer" ? "Trade Mobile or Email" : "Staff Username / ID"}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={
                      loginRole === "buyer" ? "e.g. +91 98250 11223" : "admin@playlume.in"
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Password or Trade PIN
                    </label>
                    {loginRole === "buyer" && (
                      <button
                        type="button"
                        onClick={handleQuickDemoLogin}
                        className="text-[11px] font-bold text-amber-600 hover:underline"
                      >
                        ⚡ 1-Click Demo Fill
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#181818] hover:bg-black text-amber-400 font-black text-sm uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>
                    {loginRole === "buyer" ? "Sign In to Buyer Portal" : "Enter Admin Management Console"}
                  </span>
                </button>
              </form>

              {/* Links & Register Prompt */}
              <div className="mt-5 pt-4 border-t border-neutral-200 text-center text-xs space-y-2">
                <p className="text-neutral-600">
                  New to PLAYLUME Wholesale?{" "}
                  <Link
                    href="/become-a-buyer"
                    onClick={() => setLoginModalOpen(false)}
                    className="font-bold text-amber-600 hover:underline"
                  >
                    Register as a Commercial Buyer
                  </Link>
                </p>
                <div className="flex items-center justify-center gap-3 text-neutral-400 text-[11px]">
                  <span>GST Verification</span>
                  <span>•</span>
                  <span>Proforma Invoicing</span>
                  <span>•</span>
                  <span>Dispatch Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
