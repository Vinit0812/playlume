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
  Gem,
  Cpu,
  Utensils,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PLAYLUME — Multi-Category B2B Wholesale Trading & Distribution",
  description:
    "Direct manufacturer wholesale supplier for Toys, Apparel, Artificial Jewellery, Electronics, Home & Kitchen, and Fashion Accessories across India. Transparent MOQs and fast dispatch.",
};

export default function HomePage() {
  const categories = [
    {
      id: "toys-games",
      name: "Toys & Games",
      icon: Gamepad2,
      tone: "toys",
      toneClass: "tone-toys",
      count: "13 products",
      moq: "20 pcs",
      from: "₹75",
      href: "/category/toys-games",
    },
    {
      id: "clothing-apparel",
      name: "Clothing & Apparel",
      icon: Shirt,
      tone: "clothing",
      toneClass: "tone-clothing",
      count: "9 products",
      moq: "20 pcs",
      from: "₹75",
      href: "/category/clothing-apparel",
    },
    {
      id: "artificial-jewellery",
      name: "Artificial Jewellery",
      icon: Gem,
      tone: "jewellery",
      toneClass: "tone-jewellery",
      count: "8 products",
      moq: "30 pcs",
      from: "₹49",
      href: "/category/artificial-jewellery",
    },
    {
      id: "consumer-electronics",
      name: "Consumer Electronics",
      icon: Cpu,
      tone: "electronics",
      toneClass: "tone-electronics",
      count: "9 products",
      moq: "20 pcs",
      from: "₹49",
      href: "/category/consumer-electronics",
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      icon: Utensils,
      tone: "home",
      toneClass: "tone-home",
      count: "7 products",
      moq: "20 pcs",
      from: "₹99",
      href: "/category/home-kitchen",
    },
    {
      id: "fashion-accessories",
      name: "Fashion Accessories",
      icon: ShoppingBag,
      tone: "fashion",
      toneClass: "tone-fashion",
      count: "6 products",
      moq: "30 pcs",
      from: "₹49",
      href: "/category/fashion-accessories",
    },
  ];

  const featuredProducts: ProductProps[] = [
    {
      id: "t001",
      slug: "lcd-writing-tablet-blue",
      sku: "TOY-101-BLU",
      name: "8.5-inch Digital LCD Drawing Tablet (Blue)",
      category: "Toys & Games",
      categorySlug: "toys-games",
      categoryTone: "toys",
      image: "/products/lcd-writing-tablet-blue.jpg",
      moq: 50,
      price: 75,
      mrp: 199,
      status: "in_stock",
      description: "Reusable pressure-sensitive LCD drawing board with one-touch erase & screen lock.",
    },
    {
      id: "c001",
      slug: "cotton-polo-tshirt-black",
      sku: "CLO-101-BLK",
      name: "100% Combed Cotton Bio-Washed Polo T-Shirt (Black)",
      category: "Clothing & Apparel",
      categorySlug: "clothing-apparel",
      categoryTone: "clothing",
      image: "/products/cotton-polo-tshirt-black.jpg",
      moq: 20,
      price: 149,
      mrp: 399,
      status: "in_stock",
      description: "220 GSM pique knit cotton polo with ribbed collar and double-stitched hem.",
    },
    {
      id: "j001",
      slug: "jhumka-earrings-gold",
      sku: "JWL-101-GLD",
      name: "Traditional Gold-Plated Jhumka Earrings",
      category: "Artificial Jewellery",
      categorySlug: "artificial-jewellery",
      categoryTone: "jewellery",
      image: "/products/jhumka-earrings-gold.jpg",
      moq: 50,
      price: 49,
      mrp: 149,
      status: "in_stock",
      description: "Ethnic micro-gold plated dome jhumkas with pearl bead hangings. Lead & nickel free.",
    },
    {
      id: "e005",
      slug: "wireless-earbuds-tws",
      sku: "ELE-105-TWS",
      name: "True Wireless Stereo (TWS) Bluetooth Earbuds",
      category: "Consumer Electronics",
      categorySlug: "consumer-electronics",
      categoryTone: "electronics",
      image: "/products/wireless-earbuds-tws.jpg",
      moq: 20,
      price: 199,
      mrp: 599,
      status: "in_stock",
      description: "Bluetooth 5.3 earbuds with 24-hour charging case, ENC mic and Type-C fast charging.",
    },
    {
      id: "h001",
      slug: "kitchen-chopper",
      sku: "HOM-101-CHP",
      name: "Multi-Function Manual Kitchen Food Chopper",
      category: "Home & Kitchen",
      categorySlug: "home-kitchen",
      categoryTone: "home",
      image: "/products/kitchen-chopper.jpg",
      moq: 24,
      price: 99,
      mrp: 249,
      status: "in_stock",
      description: "3-blade stainless steel pull-cord chopper with transparent 500ml container.",
    },
    {
      id: "f001",
      slug: "womens-sling-bag-black",
      sku: "FAS-101-BLK",
      name: "Premium PU Leather Women's Crossbody Sling Bag (Black)",
      category: "Fashion Accessories",
      categorySlug: "fashion-accessories",
      categoryTone: "fashion",
      image: "/products/womens-sling-bag-black.jpg",
      moq: 20,
      price: 149,
      mrp: 399,
      status: "in_stock",
      description: "Water-resistant vegan leather crossbody sling bag with adjustable strap and zip pocket.",
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

        {/* 1. Executive Trust Indicators Strip */}
        <section className="bg-white border-b border-line py-7 shadow-xs relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-neutral-900">Direct Factory Sourcing</h4>
                <p className="text-[11px] text-neutral-500">Zero broker markups</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-neutral-900">Tiered Wholesale Rates</h4>
                <p className="text-[11px] text-neutral-500">Higher volume, lower unit rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-neutral-900">100% Quality Checked</h4>
                <p className="text-[11px] text-neutral-500">Master batch QC before transit</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Headset className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-neutral-900">Dedicated B2B Desk</h4>
                <p className="text-[11px] text-neutral-500">Fast quotes &amp; dispatch on WhatsApp</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Merchandise Division Tiles */}
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

        {/* 5. Executive Wholesale Quotation & RFQ Desk */}
        <section className="py-16 px-4 bg-[#141414] text-white border-y border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Pan-India Commercial Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Direct Manufacturer Wholesale Sourcing &amp; RFQ Desk
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Connect directly with our corporate trading desk. Submit your required lot quantities, target city, and GST details to receive an official proforma invoice with volume price slabs within 2 hours.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>GST Invoicing &amp; E-Way Bills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Verified Factory Lead Times</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Master Carton Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct WhatsApp Sourcing Support</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <HeroQuickQuote />
            </div>
          </div>
        </section>

        {/* 6. 5-Step Ordering Workflow */}
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
