"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import { Search, Filter, Layers, ArrowRight, Package, CheckCircle2 } from "lucide-react";
import { MASTER_PRODUCTS } from "@/lib/products-data";

const ALL_PRODUCTS = MASTER_PRODUCTS;

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
    {
      id: "toys-games",
      name: "Toys & Games",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "toys-games").length,
    },
    {
      id: "clothing-apparel",
      name: "Clothing & Apparel",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "clothing-apparel").length,
    },
    {
      id: "artificial-jewellery",
      name: "Artificial Jewellery",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "artificial-jewellery").length,
    },
    {
      id: "consumer-electronics",
      name: "Consumer Electronics",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "consumer-electronics").length,
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "home-kitchen").length,
    },
    {
      id: "fashion-accessories",
      name: "Fashion Accessories",
      count: ALL_PRODUCTS.filter((p) => p.categorySlug === "fashion-accessories").length,
    },
  ];

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.categorySlug === selectedCategory ||
      (selectedCategory === "toys" && p.categorySlug === "toys-games") ||
      (selectedCategory === "clothing" && p.categorySlug === "clothing-apparel") ||
      (selectedCategory === "jewellery" && p.categorySlug === "artificial-jewellery") ||
      (selectedCategory === "electronics" && p.categorySlug === "consumer-electronics") ||
      (selectedCategory === "home" && p.categorySlug === "home-kitchen") ||
      (selectedCategory === "fashion" && p.categorySlug === "fashion-accessories");
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.variantItems && p.variantItems.some((v) => v.label.toLowerCase().includes(q) || Object.values(v.attributes).some((attr) => attr.toLowerCase().includes(q)))) ||
      (p.variants && p.variants.some((v) => v.value.toLowerCase().includes(q))) ||
      (p.description && p.description.toLowerCase().includes(q));
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
