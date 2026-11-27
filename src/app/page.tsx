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
import { BLOG_POSTS } from "@/lib/blog-data";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Truck,
  Percent,
  Clock,
  HelpCircle,
  BookOpen,
  Layers,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "V&A Global Sourcing | Multi-Category B2B Wholesale Trading & Distribution India",
  },
  description:
    "Direct manufacturer wholesale supplier for Toys, Apparel, Artificial Jewellery, Electronics, Home & Kitchen, and Fashion Accessories across India. Transparent MOQs and fast dispatch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    title: "V&A Global Sourcing | Multi-Category B2B Wholesale Trading & Distribution India",
    description:
      "Direct factory wholesale sourcing and distribution for retailers, distributors, and bulk purchasers across Gujarat and India.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/banners/toys-games-banner.png",
        width: 1200,
        height: 630,
        alt: "V&A Global Sourcing B2B Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V&A Global Sourcing | B2B Wholesale Trading India",
    description:
      "Direct manufacturer wholesale supplier for Toys, Apparel, Jewellery, Electronics, Home & Kitchen, and Accessories.",
    images: ["/banners/toys-games-banner.png"],
  },
};

const HOMEPAGE_FAQS = [
  {
    question: "What is the Minimum Order Quantity (MOQ) for wholesale orders?",
    answer:
      "Our wholesale MOQs start as low as 20 to 30 units per SKU across most lines, including toys, kitchenware, and apparel. This enables retail store owners and emerging resellers to test consumer demand without heavy working capital lockup. Larger volume tier discounts apply at 50, 100, and 250+ units.",
  },
  {
    question: "Do you supply official GST invoices and E-Way bills for commercial transport?",
    answer:
      "Yes. Every transaction is backed by a 100% compliant GST invoice with applicable HSN codes and an official E-Way bill for seamless interstate check-post transit, enabling your business to claim full Input Tax Credit (ITC).",
  },
  {
    question: "Can business buyers order samples before placing a commercial master carton order?",
    answer:
      "Yes. Verified wholesale buyers can request single-unit sample consignments through our WhatsApp desk or RFQ form to evaluate finish, material density, and packaging quality prior to bulk booking.",
  },
  {
    question: "What are your standard delivery timelines across Gujarat and Pan-India?",
    answer:
      "Orders dispatched from our Gujarat fulfillment centers reach Ahmedabad, Surat, Vadodara, and Rajkot within 24 to 48 hours. Consignments to Mumbai, Pune, Delhi NCR, Bengaluru, and other metro hubs arrive within 3 to 5 business days via express surface freight.",
  },
  {
    question: "What payment terms and transaction methods do you support?",
    answer:
      "We accept corporate RTGS, NEFT, IMPS, UPI, and commercial Letters of Credit (LC). First orders are fulfilled against proforma invoice settlement; established distributors with repeat history can apply for approved trade credit facilities.",
  },
  {
    question: "Can you source products not listed in the public catalogue?",
    answer:
      "Yes. Our direct manufacturing procurement networks in Gujarat, Maharashtra, Tamil Nadu, and international hubs allow custom OEM sourcing and bulk contract manufacturing based on your target specifications and volume.",
  },
];

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

  const recentGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-neutral-text antialiased">
      <FaqJsonLd items={HOMEPAGE_FAQS} />
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

        {/* 4. Strategic Sourcing Advantages for Indian Retailers */}
        <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-1">
                Strategic Sourcing Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                Why Retailers &amp; Distributors Partner with V&amp;A
              </h2>
              <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 mb-3 rounded-full" />
              <p className="text-xs sm:text-sm text-neutral-500">
                Eliminating middlemen layers to deliver true factory pricing, verified MOQs, and dependable freight.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  Gujarat Industrial Corridors &amp; Pan-India Reach
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Headquartered with key warehousing in Ahmedabad, Surat, and Rajkot industrial clusters, coupled with central logistics at Bhiwandi. We supply retailers across Gujarat within 24–48 hours and Pan-India within 3–5 business days.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  Direct Factory Procurement &amp; Zero Middlemen
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  By contracting directly with certified manufacturing facilities, we eliminate 3 to 4 intermediaries. Retailers secure 35% to 55% gross margin headroom, allowing them to compete assertively against online marketplaces.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-4">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  Low Capital Risk &amp; Transparent MOQs
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Start from just 20 to 30 units per line. Small shop owners test new SKUs without locking lakhs in unproven inventory. Automatic volume discount slabs activate at 50, 100, and 250+ units for established distributors.
                </p>
              </div>
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

        {/* 6. Wholesale Sourcing Knowledge Hub (Latest B2B Guides Preview) */}
        <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-1">
                  Industry Knowledge Hub
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  B2B Sourcing Guides &amp; Retail Playbooks
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
              >
                <span>View All 10 Sourcing Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:border-amber-400 transition flex flex-col group"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2">
                    <span className="font-bold text-amber-600 uppercase">
                      {guide.categorySlug.replace("-", " ")}
                    </span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-amber-600 transition mb-2 leading-snug">
                    <Link href={`/blog/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-4">
                    {guide.excerpt}
                  </p>
                  <div className="pt-3 mt-auto border-t border-neutral-200/60 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 text-[11px]">{guide.publishedAt}</span>
                    <Link
                      href={`/blog/${guide.slug}`}
                      className="font-bold text-amber-600 flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Homepage Wholesale Trade FAQs */}
        <section className="py-16 sm:py-20 px-4 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                Wholesale Buyer &amp; Sourcing FAQs
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Essential operational details for retail store owners, resellers, and corporate distributors.
              </p>
            </div>

            <div className="space-y-4">
              {HOMEPAGE_FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs"
                >
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-2 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Registered Buyer CTA Band */}
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
