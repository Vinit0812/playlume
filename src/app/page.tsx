import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import DynamicHeroSlider from "@/components/home/DynamicHeroSlider";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroQuickQuote from "@/components/home/HeroQuickQuote";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Tag,
  Headset,
  Factory,
  CheckCircle2,
  TrendingUp,
  FileText,
  Truck,
  Building2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PLAYLUME — Multi-Category B2B Wholesale Trading & Distribution",
  description:
    "Direct manufacturer wholesale supplier for Toys, Apparel, Artificial Jewellery, Electronics, Home & Kitchen, and Fashion Accessories across India. Transparent MOQs and fast dispatch.",
};

export default function HomePage() {
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
    {
      id: "j003",
      slug: "kundan-necklace-set",
      sku: "JWL-103-KDN",
      name: "Traditional Kundan Choker Necklace Set with Earrings",
      category: "Artificial Jewellery",
      categorySlug: "artificial-jewellery",
      categoryTone: "jewellery",
      image: "/products/kundan-necklace-set.jpg",
      moq: 15,
      price: 199,
      mrp: 599,
      status: "in_stock",
      description: "Handcrafted Kundan stone choker necklace with matching dangling earrings and drawstring closure.",
    },
    {
      id: "e006",
      slug: "fast-charger-25w",
      sku: "ELE-106-CHG",
      name: "GaN 25W PD Fast Charging Power Adapter",
      category: "Consumer Electronics",
      categorySlug: "consumer-electronics",
      categoryTone: "electronics",
      image: "/products/fast-charger-25w.jpg",
      moq: 30,
      price: 89,
      mrp: 249,
      status: "in_stock",
      description: "BIS certified 25W Type-C Power Delivery wall charger with multi-layer surge protection.",
    },
    {
      id: "t004",
      slug: "montessori-stacking-wooden",
      sku: "TOY-104-WOD",
      name: "Natural Pine Wood Montessori Stacking Toy Set",
      category: "Toys & Games",
      categorySlug: "toys-games",
      categoryTone: "toys",
      image: "/products/montessori-stacking-wooden.jpg",
      moq: 25,
      price: 129,
      mrp: 299,
      status: "in_stock",
      description: "Eco-friendly non-toxic water-painted geometric rainbow sorting and stacking tower for toddlers.",
    },
  ];

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

        {/* 1. Executive Trust Indicators Strip */}
        <section className="bg-white border-b border-slate-200/80 py-6 sm:py-7 shadow-2xs relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-neutral-900">Direct Factory Sourcing</h4>
                <p className="text-[11px] text-neutral-500">Zero intermediary markups</p>
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

        {/* 2. Top Wholesale Categories Carousel (Matching User Reference Image) */}
        <CategoryCarousel />

        {/* 3. Trending Wholesale Deals (Candlemould style with Save XX% badges) */}
        <section className="py-14 sm:py-18 px-4 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>High Demand Commercial Lots • Up to 67% Retail Margins</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  Trending Wholesale Deals
                </h2>
                <p className="text-xs text-neutral-500 mt-1 max-w-xl">
                  Fast-moving commercial inventory curated for verified retail showrooms, stockists, and wholesale distributors across India.
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition flex items-center gap-1 group shrink-0"
              >
                <span>Browse Full Wholesale Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Executive Wholesale Quotation & RFQ Desk */}
        <section className="py-16 px-4 bg-[#141414] text-white border-y border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
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

        {/* 5. 5-Step Ordering Workflow */}
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

        {/* 6. Registered Buyer CTA Band */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto bg-[#141414] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-3 max-w-xl relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                For Retailers &amp; Resellers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Become a Registered PLAYLUME Buyer
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
