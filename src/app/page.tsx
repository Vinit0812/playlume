import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import HeroQuickQuote from "@/components/home/HeroQuickQuote";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  TrendingUp,
  Truck,
  Layers,
  Gamepad2,
  Shirt,
  Watch,
  Cpu,
  Home,
  PenTool,
  CheckCircle,
  MessageSquare,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PLAYLUME — Multi-Category B2B Wholesale Trading & Distribution",
  description:
    "Institutional wholesale trading enterprise supplying Toys, Apparel, Watches, Electronics, Home & Kitchen, and Stationery to retailers and commercial distributors.",
};

export default function HomePage() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Gamepad2":
        return <Gamepad2 className="w-6 h-6" />;
      case "Shirt":
        return <Shirt className="w-6 h-6" />;
      case "Watch":
        return <Watch className="w-6 h-6" />;
      case "Cpu":
        return <Cpu className="w-6 h-6" />;
      case "Home":
        return <Home className="w-6 h-6" />;
      case "PenTool":
        return <PenTool className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  const trendingProducts = [
    {
      sku: "SKU: PL-TAB-85",
      title: "8.5\" Digital LCD Drawing & Writing Board with Stylus",
      category: "Toys & Educational",
      categorySlug: "toys-games",
      moq: "50 Pieces",
      wholesalePrice: "₹75",
      retailPrice: "₹199",
      margin: "62% Retail Margin",
      status: "In Stock",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <Gamepad2 className="w-16 h-16 text-slate-300 group-hover:text-blue-500 transition" />,
    },
    {
      sku: "SKU: PL-WTC-01",
      title: "Minimalist Slim Analog Quartz Watch with Mesh Strap",
      category: "Watches & Horology",
      categorySlug: "watches",
      moq: "25 Pieces",
      wholesalePrice: "₹185",
      retailPrice: "₹599",
      margin: "69% Retail Margin",
      status: "Enquiry Only",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Watch className="w-16 h-16 text-slate-300 group-hover:text-amber-500 transition" />,
    },
    {
      sku: "SKU: PL-TEX-180",
      title: "180 GSM Bio-Washed Combed Cotton Crewneck T-Shirt",
      category: "Apparel & Textiles",
      categorySlug: "clothing",
      moq: "30 Pieces",
      wholesalePrice: "₹145",
      retailPrice: "₹499",
      margin: "71% Retail Margin",
      status: "In Stock",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <Shirt className="w-16 h-16 text-slate-300 group-hover:text-indigo-500 transition" />,
    },
    {
      sku: "SKU: PL-KIT-BLD",
      title: "USB Rechargeable High-Speed Portable Fruit Blender",
      category: "Home & Kitchenware",
      categorySlug: "home-kitchen",
      moq: "20 Pieces",
      wholesalePrice: "₹260",
      retailPrice: "₹699",
      margin: "63% Retail Margin",
      status: "In Stock",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <Home className="w-16 h-16 text-slate-300 group-hover:text-rose-500 transition" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1">
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-16 lg:py-24 px-4 relative overflow-hidden border-b border-slate-800">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Authority Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Multi-Category Wholesale Trading House</span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-300 font-semibold">Tier-1 Manufacturer Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Wholesale Supply Chain <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Engineered for Businesses.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Bridging verified manufacturers with wholesalers, retail chains, and commercial distributors. Sourcing across 6 core merchandise divisions with consolidated billing, flexible MOQs, and certified quality assurance.
              </p>

              {/* CTA Action Cluster */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold tracking-wide transition shadow-lg shadow-blue-600/30"
                >
                  <span>Explore Wholesale Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/become-a-buyer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold transition"
                >
                  <span>Register as Commercial Buyer</span>
                </Link>
              </div>

              {/* Metric Anchors */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-2xl font-extrabold text-white">6 Divisions</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Toys, Tech, Textiles +</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-amber-400">Low MOQ</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">From 20–50 pcs</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-blue-400">Pan-India</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Logistics & Freight</div>
                </div>
              </div>
            </div>

            {/* Right Column: Institutional RFQ (Request for Quotation) Card */}
            <div className="lg:col-span-5">
              <HeroQuickQuote />
            </div>
          </div>
        </section>

        {/* ==================== 2. ASSURANCE STRIP ==================== */}
        <section className="bg-white border-b border-slate-200 py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Direct Factory Supply</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Direct contracts with vetted factories eliminating broker fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Quality Assurance</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Systematic pre-dispatch batch checks to eliminate defect risks.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Tiered Margin Pricing</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Volume slab discounts offering 40%–70% retail gross margins.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Commercial Fulfillment</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">GST compliant e-way billing and door delivery across all Indian pin codes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. MERCHANDISE DIVISIONS ==================== */}
        <section id="categories" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Enterprise Sourcing Portfolio</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Multi-Category Product Divisions</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Consolidate multiple merchandise lines through one reliable trading partner.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition">
              <span>View Complete Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES_FEATURED.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-400 hover:-translate-y-1 transition duration-200 shadow-sm hover:shadow-md cursor-pointer group text-center flex flex-col justify-between"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{cat.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.subhead}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">MOQ {cat.moq}</span>
                  <span className="font-bold text-slate-900">{cat.startingPrice}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ==================== 4. TRENDING WHOLESALE LOTS ==================== */}
        <section id="trending" className="py-16 px-4 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Active Procurement Batches</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Featured Wholesale Opportunities</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Verified stock ready for immediate dispatch or back-to-back contract supply.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Availability:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Inventory
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <div
                  key={product.sku}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:-translate-y-1 transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative bg-slate-50 rounded-xl h-44 flex flex-col items-center justify-center border border-slate-100 p-4 mb-3">
                      {product.icon}
                      <span className="absolute top-2.5 left-2.5 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
                        {product.sku}
                      </span>
                      <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded border ${product.statusColor}`}>
                        {product.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">{product.category}</div>
                    <h3 className="font-bold text-slate-950 text-sm mt-1 leading-snug">{product.title}</h3>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-500">Min Order Qty:</span>
                        <span className="font-bold text-slate-900">{product.moq}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-500">Indicative Wholesale:</span>
                        <span className="font-black text-slate-950 text-base">
                          {product.wholesalePrice} <span className="text-[10px] font-normal text-slate-400">/pc</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-between pt-0.5">
                        <span>Suggested Retail: {product.retailPrice}</span>
                        <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                          {product.margin}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/enquiry?product=${encodeURIComponent(product.title)}&moq=${encodeURIComponent(product.moq)}`}
                      className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition text-center"
                    >
                      Request Quote
                    </Link>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                        `Hello PLAYLUME, I am interested in wholesale pricing for ${product.title} (${product.sku}), MOQ: ${product.moq}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. SOURCING WORKFLOW ==================== */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Frictionless Commercial Trade</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Five-Step Sourcing Workflow</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              No complicated retail checkout carts. Pure wholesale inquiry, formal commercial quotation, verified inspection, and reliable dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Catalogue Discovery",
                desc: "Browse multi-category wholesale inventory with indicative price brackets & MOQs.",
              },
              {
                step: "02",
                title: "Submit RFQ",
                desc: "Specify required units, destination location, and any custom packaging needs.",
              },
              {
                step: "03",
                title: "Formal Quotation",
                desc: "Receive a detailed proforma quotation with GST tax schedule and freight terms.",
              },
              {
                step: "04",
                title: "Trade Confirmation",
                desc: "Lock in commercial order and finalize payment terms securely.",
              },
              {
                step: "05",
                title: "Commercial Dispatch",
                desc: "Inspected consignment shipped with live transport tracking directly to your premises.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:-translate-y-1 transition duration-200 shadow-sm relative"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${
                    idx === 4 ? "bg-blue-600 text-white" : "bg-slate-950 text-amber-400"
                  } font-black text-xs flex items-center justify-center mx-auto mb-3.5 shadow-sm`}
                >
                  {item.step}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 6. BUYER NETWORK ONBOARDING ==================== */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Commercial Buyer Network
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                  Partner with PLAYLUME as an Authorized Wholesale Buyer
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Gain preferential volume allocations, advance alerts on new seasonal lots, dedicated account representative support, and flexible commercial credit review.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
                <Link
                  href="/become-a-buyer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition shadow-lg shadow-blue-600/30"
                >
                  <span>Register Commercial Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20PLAYLUME%2C%20I%20am%20interested%20in%20joining%20the%20buyer%20network.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  <span>Speak with Trade Desk</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
