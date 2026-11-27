import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import DynamicHeroSlider from "@/components/home/DynamicHeroSlider";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroQuickQuote from "@/components/home/HeroQuickQuote";
import ProductCard from "@/components/common/ProductCard";
import { MASTER_PRODUCTS, MasterProduct } from "@/lib/products-data";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "V&A Global Sourcing — Multi-Category B2B Wholesale Trading & Distribution",
  description:
    "Direct manufacturer wholesale supplier for Toys, Apparel, Artificial Jewellery, Electronics, Home & Kitchen, and Fashion Accessories across India. Transparent MOQs and fast dispatch.",
};

export default function HomePage() {
  // Top 6 real high-demand commercial lots from catalog with verified product photography
  const featuredProducts = [
    MASTER_PRODUCTS.find((p) => p.categorySlug === "toys-games" && p.image?.endsWith(".png")),
    MASTER_PRODUCTS.find((p) => p.categorySlug === "clothing-apparel" && p.image?.endsWith(".png")),
    MASTER_PRODUCTS.find((p) => p.categorySlug === "artificial-jewellery" && p.image?.endsWith(".png")),
    MASTER_PRODUCTS.find((p) => p.categorySlug === "consumer-electronics" && p.image?.endsWith(".png")),
    MASTER_PRODUCTS.find((p) => p.categorySlug === "home-kitchen" && p.image?.endsWith(".png")),
    MASTER_PRODUCTS.find((p) => p.categorySlug === "fashion-accessories" && p.image?.endsWith(".png")),
  ].filter((p): p is MasterProduct => Boolean(p));

  const steps = [
    { title: "Browse Wholesale Lots", desc: "Select verified merchandise lines with factory transparent MOQs shown upfront." },
    { title: "Build RFQ Basket", desc: "Add lots to your commercial basket and input your expected delivery timelines." },
    { title: "Official Proforma Invoice", desc: "Receive transparent rate slab calculations with exact GST and interstate freight terms." },
    { title: "Confirm & Settle", desc: "Verify billing legal entity, approve proforma, and settle via corporate RTGS / NEFT." },
    { title: "Rapid Master Carton Dispatch", desc: "100% QC checked cartons dispatch directly from central logistics hubs across India." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-neutral-text antialiased">
      <Header />

      <main className="flex-1">
        {/* Dynamic Homepage Hero Slider (Configurable from Admin Console) */}
        <DynamicHeroSlider />

        {/* 1. Top Wholesale Categories Carousel (Centered Header, Clean Layout) */}
        <CategoryCarousel />

        {/* 2. Trending Wholesale Deals (Centered Header, Save XX% Badges) */}
        <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            {/* Centered Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                Trending Wholesale Deals
              </h2>
              <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 mb-3 rounded-full" />
              <p className="text-xs sm:text-sm text-neutral-500">
                Fast-moving commercial lots our retailers and distributors reorder most often.
              </p>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Centered Browse CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-sm hover:shadow cursor-pointer"
              >
                <span>Browse Full Wholesale Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Executive Wholesale Quotation & RFQ Desk */}
        <section className="py-16 px-4 bg-[#141414] text-white border-y border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-5 text-left">
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

        {/* 4. 5-Step Ordering Workflow */}
        <section className="py-16 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
                Transparent &amp; Reliable
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                How Wholesale Ordering Works
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Engineered for business buyers without the confusion of a consumer retail checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((st, i) => (
                <div
                  key={st.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative hover:border-amber-400 hover:shadow-md transition"
                >
                  <div
                    className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center mb-3 ${
                      i === 4 ? "bg-amber-400 text-stone-950" : "bg-[#141414] text-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h4 className="font-extrabold text-xs text-neutral-900 mb-1">{st.title}</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Registered Buyer CTA Band */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto bg-[#141414] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-3 max-w-xl relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                For Retailers &amp; Resellers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Become a Registered V&amp;A Global Sourcing Buyer
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Get early access to factory stock releases, preferential volume tier pricing, and customized master packaging support with dedicated WhatsApp account manager.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 relative z-10">
              <Link
                href="/become-a-buyer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                <span>Register as Buyer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition cursor-pointer"
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
