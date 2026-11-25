import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import DynamicHeroSlider from "@/components/home/DynamicHeroSlider";
import HeroQuickQuote from "@/components/home/HeroQuickQuote";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Tag,
  Headset,
  Factory,
  Layers,
  Gamepad2,
  Shirt,
  Watch,
  Cpu,
  Utensils,
  Pencil,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PLAYLUME — Multi-Category B2B Wholesale Trading & Distribution",
  description:
    "Direct manufacturer wholesale supplier for Toys, Apparel, Watches, Electronics, Home & Kitchen, and Stationery across India. Transparent MOQs and fast dispatch.",
};

export default function HomePage() {
  const categories = [
    {
      id: "toys",
      name: "Toys & Games",
      icon: Gamepad2,
      tone: "toys",
      toneClass: "tone-toys",
      count: "12 products",
      moq: "50 pcs",
      from: "₹70",
      href: "/category/toys-games",
    },
    {
      id: "clothing",
      name: "Clothing & Apparel",
      icon: Shirt,
      tone: "clothing",
      toneClass: "tone-clothing",
      count: "16 products",
      moq: "30 pcs",
      from: "₹140",
      href: "/category/clothing",
    },
    {
      id: "watches",
      name: "Watches & Horology",
      icon: Watch,
      tone: "watches",
      toneClass: "tone-watches",
      count: "10 products",
      moq: "25 pcs",
      from: "₹180",
      href: "/category/watches",
    },
    {
      id: "electronics",
      name: "Consumer Electronics",
      icon: Cpu,
      tone: "electronics",
      toneClass: "tone-electronics",
      count: "14 products",
      moq: "20 pcs",
      from: "₹220",
      href: "/category/electronics",
    },
    {
      id: "home",
      name: "Home & Kitchen",
      icon: Utensils,
      tone: "home",
      toneClass: "tone-home",
      count: "18 products",
      moq: "24 pcs",
      from: "₹95",
      href: "/category/home-kitchen",
    },
    {
      id: "stationery",
      name: "Office & Stationery",
      icon: Pencil,
      tone: "stationery",
      toneClass: "tone-stationery",
      count: "15 products",
      moq: "100 pcs",
      from: "₹25",
      href: "/category/stationery",
    },
  ];

  const featuredProducts: ProductProps[] = [
    {
      id: "p001",
      sku: "TOY-101",
      name: '8.5-inch Digital LCD Drawing Tablet with Stylus',
      category: "Toys & Games",
      categorySlug: "toys-games",
      categoryTone: "toys",
      moq: 50,
      price: 75,
      mrp: 199,
      status: "in_stock",
      description: "Reusable LCD drawing pad with lock button to save work. Popular school-season item.",
    },
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
      id: "p023",
      sku: "HOM-122",
      name: "Stainless Steel Insulated Water Bottle 750 ml",
      category: "Home & Kitchen",
      categorySlug: "home-kitchen",
      categoryTone: "home",
      moq: 40,
      price: 180,
      mrp: 499,
      status: "in_stock",
      description: "Double-wall vacuum insulated, 12-hour hot / 24-hour cold.",
    },
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
  ];

  const steps = [
    { title: "Browse Products", desc: "Pick items across 6 categories with MOQs shown upfront." },
    { title: "Build Quote Basket", desc: "Add lots to your basket and share your trade requirements." },
    { title: "Get Official Quotation", desc: "Receive proforma invoice with exact GST & freight terms." },
    { title: "Confirm Order", desc: "Approve tax invoice and settle payment via bank transfer." },
    { title: "Rapid Pan-India Dispatch", desc: "Inspected master cartons ship directly to your warehouse." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-neutral-text antialiased">
      <Header />

      <main className="flex-1">
        {/* Dynamic Homepage Hero Slider (Configurable from Admin Console) */}
        <DynamicHeroSlider />

        {/* 1. Hero Section (Deep Teal with Dot Matrix) */}
        <section className="hero-matrix py-16 lg:py-24 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-white/20 bg-white/5 text-brand-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-400"></span>
                Multi-Category Wholesale Trading Enterprise
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[44px] font-black tracking-tight leading-[1.15]">
                Connecting manufacturers,{" "}
                <em className="not-italic text-accent-400">retailers &amp; distributors.</em>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                One consolidated supplier for toys, clothing, watches, electronics, home &amp; kitchen, and stationery. Direct bulk sourcing for B2B buyers with transparent MOQs and fast dispatch.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition"
                >
                  <span>Request a Quote</span>
                </Link>
              </div>

              {/* 3 Hero Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-10 border-t border-white/15 text-left">
                <div>
                  <strong className="block text-xl sm:text-2xl font-black text-white">6 Categories</strong>
                  <span className="text-xs text-brand-200">Unified Sourcing</span>
                </div>
                <div>
                  <strong className="block text-xl sm:text-2xl font-black text-white">MOQ from 20 pcs</strong>
                  <span className="text-xs text-brand-200">Low Entry Quantities</span>
                </div>
                <div>
                  <strong className="block text-xl sm:text-2xl font-black text-white">Pan-India</strong>
                  <span className="text-xs text-brand-200">Logistics Network</span>
                </div>
              </div>
            </div>

            {/* Hero Quick Quote Form Card */}
            <div className="w-full">
              <HeroQuickQuote />
            </div>
          </div>
        </section>

        {/* 2. Trust Indicators Strip */}
        <section className="bg-white border-b border-line py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Factory className="w-8 h-8 text-brand-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-neutral-text">Direct Sourcing</h4>
                <p className="text-[11px] text-neutral-muted">Verified factory pricing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-8 h-8 text-brand-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-neutral-text">Tiered Wholesale Rates</h4>
                <p className="text-[11px] text-neutral-muted">Higher quantity, lower rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-neutral-text">Quality Checked</h4>
                <p className="text-[11px] text-neutral-muted">Batch QC before dispatch</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Headset className="w-8 h-8 text-brand-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-neutral-text">Dedicated B2B Desk</h4>
                <p className="text-[11px] text-neutral-muted">Fast quotes on WhatsApp</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Merchandise Division Tiles */}
        <section className="py-16 px-4 bg-surface-2 border-b border-line">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 block mb-1">
                  One Supplier • Multiple Lines
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
                  Wholesale Product Categories
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-brand-700 hover:text-brand-900 transition flex items-center gap-1"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.id}
                    href={c.href}
                    className="bg-white border border-line rounded-2xl p-5 flex flex-col justify-between hover:border-brand-500 hover:shadow-md hover:-translate-y-0.5 transition group"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.toneClass} mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-extrabold text-sm text-neutral-text group-hover:text-brand-700 transition">
                        {c.name}
                      </h3>
                      <span className="text-[11px] text-neutral-muted block mt-1">
                        {c.count} • MOQ {c.moq}
                      </span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-brand-700">From {c.from}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Trending Wholesale Deals */}
        <section className="py-16 px-4 bg-surface border-b border-line">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-700 block mb-1">
                  High Demand Lots
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
                  Trending Wholesale Deals
                </h2>
                <p className="text-xs text-neutral-muted mt-1">
                  Fast-moving commercial lots our retailers and distributors reorder most often.
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-brand-700 hover:text-brand-900 transition flex items-center gap-1"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. 5-Step Ordering Workflow */}
        <section className="py-16 px-4 bg-surface-2 border-b border-line">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 block mb-1">
                Transparent &amp; Reliable
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-950 tracking-tight">
                How Wholesale Ordering Works
              </h2>
              <p className="text-xs text-neutral-muted mt-1">
                Engineered for business buyers without the confusion of a consumer retail checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((st, i) => (
                <div
                  key={st.title}
                  className="bg-white border border-line rounded-2xl p-5 shadow-xs relative"
                >
                  <div
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mb-3 ${
                      i === 4 ? "bg-accent-400 text-brand-950" : "bg-brand-700 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h4 className="font-extrabold text-xs text-neutral-text mb-1">{st.title}</h4>
                  <p className="text-[11px] text-neutral-muted leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Registered Buyer CTA Band */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto bg-brand-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-400 text-brand-950">
                For Retailers &amp; Resellers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Become a Registered PLAYLUME Buyer
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Get early access to factory stock releases, preferential volume tier pricing, and customized master packaging support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/become-a-buyer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-extrabold text-xs uppercase tracking-wider transition shadow-md"
              >
                <span>Register as Buyer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition"
              >
                <span>About Us</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
