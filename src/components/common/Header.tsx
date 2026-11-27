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
  Flame,
  Package,
  BookOpen,
} from "lucide-react";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { MASTER_PRODUCTS, MasterProduct } from "@/lib/products-data";

interface CategoryNav {
  id: string;
  name: string;
  slug: string;
  accent: string;
  bannerImage?: string;
  items: { name: string; slug: string; image?: string }[];
}

const CATEGORY_DATA: CategoryNav[] = [
  {
    id: "toys-games",
    name: "Toys & Games",
    slug: "toys-games",
    accent: "text-orange-400",
    bannerImage: "/category-banners/banner-toys.png",
    items: [
      { name: "Educational & Learning Toys", slug: "educational-learning-toys", image: "/products/toys/lcd-tablet/blue-front.png" },
      { name: "Soft Toys & Plush", slug: "soft-toys-plush", image: "/products/toys/plush-unicorn/pink-30cm-front.png" },
      { name: "Outdoor & Ride-on Toys", slug: "outdoor-ride-on-toys", image: "/products/toys/kick-scooter/blue-front.png" },
      { name: "RC & Remote Control Toys", slug: "rc-remote-control-toys", image: "/products/toys/rc-drift-car/black/01_black_front_without_packaging.png" },
      { name: "Baby & Toddler Toys", slug: "baby-toddler-toys", image: "/products/toys/baby-rattles/blue/01_blue_front_set_without_packaging.png" },
    ],
  },
  {
    id: "clothing-apparel",
    name: "Clothing & Apparel",
    slug: "clothing-apparel",
    accent: "text-blue-400",
    bannerImage: "/category-banners/banner-clothing.png",
    items: [
      { name: "Men's Clothing", slug: "mens-clothing", image: "/products/clothing/polo-tshirts/blue/01_blue_front_without_packaging.png" },
      { name: "Women's Clothing", slug: "womens-clothing", image: "/products/clothing/printed-kurtis/cotton-navy-floral/01_front_without_packaging.png" },
      { name: "Kids Clothing", slug: "kids-clothing", image: "/products/clothing/boys-tshirts/pack-of-2/01_front_product_view.png" },
    ],
  },
  {
    id: "artificial-jewellery",
    name: "Artificial Jewellery",
    slug: "artificial-jewellery",
    accent: "text-purple-400",
    bannerImage: "/category-banners/banner-jewellery.png",
    items: [
      { name: "Earrings", slug: "earrings", image: "/products/jewellery/jhumka-earrings/blue/01_blue_front_without_packaging.png" },
      { name: "Necklace Sets", slug: "necklace-sets", image: "/products/jewellery/oxidised-necklace/blue/01_blue_front_display_without_packaging.png" },
      { name: "Jewellery Sets (Combo)", slug: "jewellery-sets-combo", image: "/products/jewellery/necklace-earrings-combo/blue/01_blue_bust_display_without_packaging.png" },
      { name: "Bangles, Bracelets & Rings", slug: "bangles-bracelets-rings", image: "/products/jewellery/bangles-kadas/blue/01_blue_front_display_without_packaging.png" },
    ],
  },
  {
    id: "consumer-electronics",
    name: "Consumer Electronics",
    slug: "consumer-electronics",
    accent: "text-cyan-400",
    bannerImage: "/category-banners/banner-electronics.png",
    items: [
      { name: "Mobile Accessories", slug: "mobile-accessories", image: "/products/electronics/phone-stands/desktop-holder/01_front_without_packaging.png" },
      { name: "Audio", slug: "audio", image: "/products/electronics/wireless-earbuds/black/01_black_front_without_packaging.png" },
      { name: "Power & Charging", slug: "power-charging", image: "/products/electronics/power-banks-10000/black/01_front_without_packaging.png" },
    ],
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    accent: "text-red-400",
    bannerImage: "/category-banners/banner-home.png",
    items: [
      { name: "Kitchen Tools & Gadgets", slug: "kitchen-tools-gadgets", image: "/products/home/choppers-cutters/manual-chopper/01_front_without_packaging.png" },
      { name: "Storage & Organisation", slug: "storage-organisation", image: "/products/home/storage-containers/set-of-3/01_set_3_front_without_packaging.png" },
      { name: "Drinkware", slug: "drinkware", image: "/products/home/steel-bottles/500ml/01_500ml_front_without_packaging.png" },
      { name: "Home Decor", slug: "home-decor", image: "/products/home/led-lights/fairy-lights/01_fairy_lights_front_without_packaging.png" },
    ],
  },
  {
    id: "fashion-accessories",
    name: "Fashion Accessories",
    slug: "fashion-accessories",
    accent: "text-pink-400",
    bannerImage: "/category-banners/banner-fashion.png",
    items: [
      { name: "Bags & Handbags", slug: "bags-handbags", image: "/products/fashion/sling-bags/black-quilted/01_front_without_packaging.png" },
      { name: "Wallets & Belts", slug: "wallets-belts", image: "/products/fashion/womens-wallets/black/01_front_without_packaging.png" },
      { name: "Hair Accessories", slug: "hair-accessories", image: "/products/fashion/hair-clips/pearl-bow/01_front_without_packaging.png" },
      { name: "Other Accessories", slug: "other-accessories", image: "/products/fashion/sunglasses/black-wayfarer/01_black_wayfarer_front_without_packaging.png" },
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
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Login form state inside modal
  const [loginRole, setLoginRole] = useState<"buyer" | "admin">("buyer");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Live autocomplete results (selectedCategory now stores slug like "toys-games")
  const autocompleteResults = searchQuery.trim()
    ? MASTER_PRODUCTS.filter((p) => {
        const matchesCategory =
          selectedCategory === "all" || p.categorySlug === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesText =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          (p.variantItems && p.variantItems.some((v) => v.label.toLowerCase().includes(q) || Object.values(v.attributes).some((attr) => attr.toLowerCase().includes(q)))) ||
          (p.variants && p.variants.some((v) => v.value.toLowerCase().includes(q)));
        return matchesCategory && matchesText;
      }).slice(0, 5)
    : [];

  // Close category select dropdown & search autocomplete on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
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
      setLoginFeedback("Authentication successful! Welcome to V&A Global Sourcing Portal.");
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
          
          {/* 1. Brand Logo (V&A Global Sourcing) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-sm tracking-tighter shadow-md group-hover:scale-105 transition transform">
              V&amp;A
            </div>
            <div className="leading-tight">
              <span className="font-black text-lg sm:text-xl text-white tracking-tight block">
                V&amp;A GLOBAL SOURCING
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest block -mt-0.5">
                Wholesale &amp; Trade
              </span>
            </div>
          </Link>

          {/* 2. Integrated Search Bar with "All categories ▾" + Input + Search CTA (Dark Pill matching reference) */}
          <div className="flex-1 max-w-2xl hidden md:block relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="flex w-full items-center rounded-full overflow-hidden bg-[#242424]/90 shadow-inner border border-neutral-700/80 focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 px-2 py-1">
                
                {/* Category Dropdown Pill */}
                <div className="relative shrink-0" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="h-8 px-3 text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition select-none cursor-pointer"
                  >
                    <span className="truncate max-w-[125px]">{selectedCategoryLabel}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Options Menu */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#1f1f1f] rounded-xl shadow-2xl border border-neutral-700 py-1.5 z-50 text-neutral-200 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("all");
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-800 font-semibold flex items-center justify-between ${
                          selectedCategory === "all" ? "text-amber-400 bg-neutral-800/60" : ""
                        }`}
                      >
                        <span>All categories</span>
                        {selectedCategory === "all" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div className="h-px bg-neutral-700 my-1" />
                      {CATEGORY_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-neutral-800 flex items-center justify-between ${
                            selectedCategory === cat.id ? "text-amber-400 font-bold bg-neutral-800/60" : ""
                          }`}
                        >
                          <span>{cat.name}</span>
                          {selectedCategory === cat.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="h-4 w-px bg-neutral-700 shrink-0 mx-1" />

                {/* Input Text Box */}
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSearchDropdown(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  placeholder="What are you looking for?"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 bg-transparent focus:outline-none"
                />

                {/* Submit Button (Amber/Bronze Circular Button matching reference) */}
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#94743c] to-[#604822] hover:from-[#aa8749] hover:to-[#73572a] text-amber-100 flex items-center justify-center transition cursor-pointer shrink-0 shadow-md"
                  aria-label="Search catalogue"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Live Autocomplete Results Dropdown */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 text-neutral-900 animate-in fade-in duration-100">
                <div className="p-2 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <span>Wholesale Lots Matching &ldquo;{searchQuery}&rdquo;</span>
                  <span className="text-amber-600 font-black">{autocompleteResults.length} found</span>
                </div>

                {autocompleteResults.length > 0 ? (
                  <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                    {autocompleteResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="p-3 hover:bg-amber-50/60 transition flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <Flame className="w-5 h-5 text-amber-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-500 mt-0.5">
                              <span className="font-mono font-semibold">{item.sku}</span>
                              <span>•</span>
                              <span>{item.category}</span>
                              <span>•</span>
                              <span className="text-neutral-700 font-bold">MOQ: {item.moq} pcs</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-[#e03a3a] block">
                            Rs. {item.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-neutral-400 line-through">
                            Rs. {item.mrp.toFixed(2)}
                          </span>
                        </div>
                      </Link>
                    ))}

                    <div className="p-2.5 bg-neutral-50 text-center">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
                      >
                        View all results in wholesale catalogue →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-500">
                    <p className="font-bold text-neutral-700">No matching wholesale lots found</p>
                    <p className="text-[11px] mt-1">Try searching by keyword like &ldquo;urli&rdquo;, &ldquo;cotton&rdquo;, &ldquo;charger&rdquo;, or &ldquo;watch&rdquo;</p>
                  </div>
                )}
              </div>
            )}
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

        {/* Mobile Search Bar (under header for small devices - Dark Pill matching reference) */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center rounded-full overflow-hidden bg-[#242424]/90 border border-neutral-700/80 px-2 py-1 shadow-inner focus-within:border-amber-500/80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full px-3 py-1.5 text-xs text-neutral-100 placeholder:text-neutral-500 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#94743c] to-[#604822] text-amber-100 flex items-center justify-center shrink-0 shadow-sm"
              aria-label="Search catalogue"
            >
              <Search className="w-3.5 h-3.5" />
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
                    <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="bg-[#1c1c1c]/95 backdrop-blur-md rounded-xl border border-neutral-700/80 shadow-2xl p-3 text-neutral-200">
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-neutral-700/60 pb-2 mb-2 flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-neutral-400 font-normal lowercase">lots</span>
                        </div>
                        <ul className="space-y-1">
                          {cat.items.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/category/${cat.slug}?sub=${item.slug}`}
                                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition text-[12px] group/item"
                              >
                                <span className="font-medium group-hover/item:text-amber-300 transition-colors">{item.name}</span>
                                {item.image && (
                                  <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-700/60 overflow-hidden shrink-0 ml-2 p-0.5 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                  </div>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2.5 pt-2 border-t border-neutral-700/60">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="flex items-center justify-between w-full text-[11.5px] font-bold text-amber-400 hover:text-amber-300 px-1 py-0.5 group/explore"
                          >
                            <span>Explore all {cat.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/explore:translate-x-0.5 transition-transform" />
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

              {/* Sourcing Guides / Blog */}
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition font-semibold"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sourcing Guides</span>
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
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded hover:bg-neutral-800 text-neutral-200 font-semibold"
              >
                Sourcing Guides
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
                    V&amp;A
                  </span>
                  <h3 className="text-base font-black tracking-tight text-white">
                    V&amp;A Global Sourcing Portal
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
                      loginRole === "buyer" ? "e.g. +91 98250 11223" : "admin@vaglobalsourcing.com"
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
                  New to V&amp;A Global Sourcing Wholesale?{" "}
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
