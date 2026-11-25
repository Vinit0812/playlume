"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import { Search, Filter, Layers, ArrowRight, Package, CheckCircle2 } from "lucide-react";

const ALL_PRODUCTS: ProductProps[] = [
  // Toys & Games
  {
    id: "p001",
    sku: "TOY-101",
    name: "8.5-inch Digital LCD Drawing Tablet with Stylus",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 50,
    price: 75,
    mrp: 199,
    status: "in_stock",
    description: "Reusable LCD drawing pad with lock button to save work. Popular school-season item.",
  },
  {
    id: "p002",
    sku: "TOY-102",
    name: "Remote Control Stunt Car with Rechargeable Battery",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 24,
    price: 420,
    mrp: 999,
    status: "in_stock",
    description: "2.4GHz RC car with 360° flips and LED headlights.",
  },
  {
    id: "p003",
    sku: "TOY-103",
    name: "Wooden Alphabet & Number Puzzle Board",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 40,
    price: 95,
    mrp: 249,
    status: "in_stock",
    description: "Colour-coded wooden puzzle for toddlers, non-toxic water-based paint.",
  },
  {
    id: "p004",
    sku: "TOY-104",
    name: "Magnetic Building Tiles STEM Set (64 pcs)",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 30,
    price: 380,
    mrp: 999,
    status: "in_stock",
    description: "STEM magnetic tiles in 6 colours with storage bag.",
  },

  // Clothing & Apparel
  {
    id: "p007",
    sku: "CLO-106",
    name: "180 GSM Bio-Washed Combed Cotton Plain T-Shirts",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 30,
    price: 145,
    mrp: 399,
    status: "in_stock",
    description: "Round-neck plain tees, pre-shrunk and bio-washed. Ideal for printing and retail.",
  },
  {
    id: "p008",
    sku: "CLO-107",
    name: "Kids Cotton Hosiery Night Suit Set (Ages 2-10)",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 30,
    price: 180,
    mrp: 499,
    status: "in_stock",
    description: "Printed top and pyjama set for ages 2–10.",
  },
  {
    id: "p009",
    sku: "CLO-108",
    name: "Men's Combed Cotton Boxer Shorts (Pack of 3)",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 40,
    price: 140,
    mrp: 399,
    status: "in_stock",
    description: "Elastic waistband, breathable cotton, assorted prints.",
  },
  {
    id: "p010",
    sku: "CLO-109",
    name: "Fleece Winter Zipper Hoodie — Unisex",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 20,
    price: 390,
    mrp: 999,
    status: "limited",
    description: "280 GSM fleece with kangaroo pockets.",
  },

  // Watches & Horology
  {
    id: "p013",
    sku: "WAT-112",
    name: "Ultra-Thin Minimalist Quartz Chronograph Watch",
    category: "Watches & Horology",
    categorySlug: "watches",
    categoryTone: "watches",
    moq: 25,
    price: 185,
    mrp: 599,
    status: "enquiry",
    description: "Slim 7mm case with stainless steel back and mesh strap.",
  },
  {
    id: "p014",
    sku: "WAT-113",
    name: "Digital Sports Watch with Backlight & 50m Water Resistance",
    category: "Watches & Horology",
    categorySlug: "watches",
    categoryTone: "watches",
    moq: 25,
    price: 180,
    mrp: 549,
    status: "in_stock",
    description: "50 m water resistant, alarm, and stopwatch timer.",
  },
  {
    id: "p015",
    sku: "WAT-114",
    name: "AMOLED Smart Fitness Calling Watch (BT 5.3)",
    category: "Watches & Horology",
    categorySlug: "watches",
    categoryTone: "watches",
    moq: 20,
    price: 780,
    mrp: 2499,
    status: "in_stock",
    description: "Bluetooth calling, heart-rate and SpO2 tracking, 7-day battery.",
  },

  // Consumer Electronics
  {
    id: "p018",
    sku: "ELE-117",
    name: "Portable High-Speed Rechargeable Electric Blender",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 20,
    price: 260,
    mrp: 699,
    status: "in_stock",
    description: "6-blade 380 ml juicer bottle with USB charging.",
  },
  {
    id: "p019",
    sku: "ELE-118",
    name: "20W USB-C GaN Fast Charger with Braided Cable",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 40,
    price: 220,
    mrp: 599,
    status: "in_stock",
    description: "PD fast charging adapter, BIS certified.",
  },
  {
    id: "p020",
    sku: "ELE-119",
    name: "Wireless Bluetooth Neckband Earphones (30h Playback)",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 30,
    price: 290,
    mrp: 999,
    status: "in_stock",
    description: "30-hour playback with magnetic earbuds.",
  },

  // Home & Kitchen
  {
    id: "p023",
    sku: "HOM-122",
    name: "Stainless Steel Insulated Water Bottle 750 ml",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 40,
    price: 180,
    mrp: 499,
    status: "in_stock",
    description: "Double-wall vacuum insulated, 12-hour hot / 24-hour cold.",
  },
  {
    id: "p024",
    sku: "HOM-123",
    name: "Airtight Kitchen Container Set (7 pcs)",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 40,
    price: 210,
    mrp: 549,
    status: "in_stock",
    description: "BPA-free kitchen storage containers.",
  },
  {
    id: "p025",
    sku: "HOM-124",
    name: "Non-Stick Tawa 28 cm with Induction Bottom",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 24,
    price: 320,
    mrp: 899,
    status: "in_stock",
    description: "Gas and induction compatible, 3-layer granite coating.",
  },
  {
    id: "p031",
    sku: "URL-101",
    name: "Golden Touch Lotus Urli (CD11801)",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 50,
    price: 42,
    mrp: 120,
    status: "in_stock",
    description: "Brass finish decorative lotus urli for floating flowers and tea lights.",
  },
  {
    id: "p032",
    sku: "URL-103",
    name: "Hammered Round Small Urli",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 50,
    price: 43,
    mrp: 110,
    status: "in_stock",
    description: "Hand-hammered brass finish metal urli for festive events and institutional decor.",
  },
  {
    id: "p033",
    sku: "URL-107",
    name: "Lotus Diya Urli with Center Well",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 100,
    price: 22,
    mrp: 65,
    status: "in_stock",
    description: "Traditional diya urli for floating candles and oil lamps.",
  },
  {
    id: "p034",
    sku: "URL-108",
    name: "Royal Elephant Diya Urli Stand",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 25,
    price: 75,
    mrp: 220,
    status: "in_stock",
    description: "Intricately cast brass elephant stand with multi-tier floating bowl.",
  },

  // Office & Stationery
  {
    id: "p028",
    sku: "STA-127",
    name: "Gel Pens Set of 12 — Pastel Executive Ink",
    category: "Office & Stationery",
    categorySlug: "stationery",
    categoryTone: "stationery",
    moq: 100,
    price: 25,
    mrp: 99,
    status: "in_stock",
    description: "0.5 mm smooth-flow pens in a zip pouch.",
  },
  {
    id: "p029",
    sku: "STA-128",
    name: "A5 Hardbound Ruled Journal Notebook 200 Pages",
    category: "Office & Stationery",
    categorySlug: "stationery",
    categoryTone: "stationery",
    moq: 100,
    price: 55,
    mrp: 149,
    status: "in_stock",
    description: "70 GSM paper, sewn binding, satin ribbon bookmark.",
  },
  {
    id: "p030",
    sku: "STA-129",
    name: "Executive Desk Organiser with Mesh Pen Stand",
    category: "Office & Stationery",
    categorySlug: "stationery",
    categoryTone: "stationery",
    moq: 50,
    price: 110,
    mrp: 299,
    status: "limited",
    description: "Multi-compartment powder-coated metal mesh organiser.",
  },
];

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    const st = searchParams.get("status");
    if (cat) setSelectedCategory(cat);
    if (q) setSearch(q);
    if (st) setSelectedStatus(st);
  }, [searchParams]);

  const categoriesList = [
    { id: "all", name: "All Merchandise Lines", count: ALL_PRODUCTS.length },
    { id: "toys", name: "Toys & Games", count: 4 },
    { id: "clothing", name: "Clothing & Apparel", count: 4 },
    { id: "watches", name: "Watches & Horology", count: 3 },
    { id: "electronics", name: "Consumer Electronics", count: 3 },
    { id: "home", name: "Home & Kitchen", count: 7 },
    { id: "stationery", name: "Office & Stationery", count: 3 },
  ];

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.categorySlug === selectedCategory;
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "moq_asc") return a.moq - b.moq;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface-2 text-neutral-text antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Page Head */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" /> Institutional Inventory
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
              Commercial Wholesale Product Catalogue
            </h1>
            <p className="text-xs text-neutral-muted mt-1">
              Verified MOQ brackets, factory-direct tier pricing, and instant Quote Basket aggregation.
            </p>
          </div>

          <div className="text-xs font-bold text-neutral-muted bg-white px-3.5 py-2 rounded-xl border border-line shadow-xs">
            Showing <strong className="text-brand-900">{filtered.length}</strong> of {ALL_PRODUCTS.length} lots
          </div>
        </div>

        {/* Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          
          {/* Left Filters Sidebar */}
          <aside className="bg-white border border-line rounded-2xl p-5 shadow-xs space-y-6 lg:sticky lg:top-24">
            {/* Search */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-2">
                Search Catalogue
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SKU, title, or keywords..."
                  className="w-full pl-9 pr-3 py-2 bg-surface-2 border border-line-strong rounded-xl text-xs font-medium text-neutral-text focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-muted mb-2.5">
                Merchandise Division
              </h3>
              <div className="space-y-1">
                {categoriesList.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
                      selectedCategory === c.id
                        ? "bg-brand-100 text-brand-900 font-bold"
                        : "text-neutral-text hover:bg-brand-50"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[11px] text-neutral-muted">({c.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-4 border-t border-line">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-muted mb-2.5">
                Stock Status
              </h3>
              <div className="space-y-1">
                {[
                  { id: "all", label: "All Availability" },
                  { id: "in_stock", label: "Ready Stock Only" },
                  { id: "limited", label: "Limited Lot" },
                  { id: "enquiry", label: "Enquiry Only" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStatus(st.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition ${
                      selectedStatus === st.id
                        ? "bg-brand-100 text-brand-900 font-bold"
                        : "text-neutral-text hover:bg-brand-50"
                    }`}
                  >
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sorter */}
            <div className="pt-4 border-t border-line">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-2">
                Sort Pricing &amp; MOQ
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2 text-xs font-bold text-neutral-text focus:outline-none focus:border-brand-500"
              >
                <option value="featured">Featured Lots</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="moq_asc">MOQ: Low to High</option>
              </select>
            </div>
          </aside>

          {/* Right Products Grid */}
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <div className="bg-white border border-line rounded-2xl p-16 text-center text-neutral-muted space-y-3">
                <Package className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-sm text-neutral-text">No wholesale lots found</h3>
                <p className="text-xs">Try clearing search filters or selecting another merchandise division.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                    setSearch("");
                  }}
                  className="px-4 py-2 bg-brand-700 text-white rounded-xl text-xs font-bold hover:bg-brand-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-2 flex items-center justify-center p-8">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-brand-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-neutral-600">Loading wholesale catalogue...</p>
          </div>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
