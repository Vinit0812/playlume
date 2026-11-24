import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import {
  Filter,
  Search,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  Shirt,
  Watch,
  Cpu,
  Home,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Wholesale Product Catalogue — PLAYLUME",
  description: "Browse certified wholesale inventory across Toys, Apparel, Watches, Electronics, Home & Kitchen, and Stationery with MOQ brackets and commercial pricing.",
};

const SAMPLE_PRODUCTS = [
  {
    slug: "lcd-writing-tablet-8-5",
    sku: "PL-TAB-85",
    title: "8.5\" Digital LCD Drawing & Writing Board with Stylus",
    category: "Toys & Educational",
    categorySlug: "toys-games",
    moq: 50,
    indicativePrice: 75,
    retailPrice: 199,
    margin: "62% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "Pressure sensitive stylus • One-touch erase • Battery included (CR2025)",
  },
  {
    slug: "stem-magnetic-blocks-set",
    sku: "PL-TOY-MAG",
    title: "64-Piece 3D STEM Educational Magnetic Building Tiles",
    category: "Toys & Educational",
    categorySlug: "toys-games",
    moq: 40,
    indicativePrice: 320,
    retailPrice: 899,
    margin: "64% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "ABS non-toxic food-grade plastic • Ultrasonic welding • BIS standard compliant",
  },
  {
    slug: "analog-quartz-mesh-watch",
    sku: "PL-WTC-01",
    title: "Ultra-Thin Minimalist Analog Quartz Watch (Steel Mesh Strap)",
    category: "Watches & Horology",
    categorySlug: "watches",
    moq: 25,
    indicativePrice: 185,
    retailPrice: 599,
    margin: "69% Retail Margin",
    availability: "enquiry_only",
    statusText: "Enquiry Only",
    spec: "Japanese quartz movement • Hardlex mineral glass • 3ATM water resistance",
  },
  {
    slug: "military-dual-display-sport-watch",
    sku: "PL-WTC-02",
    title: "Heavy-Duty Dual Display Digital & Analog Tactical Sport Watch",
    category: "Watches & Horology",
    categorySlug: "watches",
    moq: 20,
    indicativePrice: 240,
    retailPrice: 799,
    margin: "70% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "LED backlight • Alarm, Stopwatch & Calendar • Shock resistant resin casing",
  },
  {
    slug: "cotton-crewneck-tshirt-180gsm",
    sku: "PL-TEX-180",
    title: "180 GSM Bio-Washed Combed Cotton Plain Crewneck T-Shirts",
    category: "Apparel & Textiles",
    categorySlug: "clothing",
    moq: 30,
    indicativePrice: 145,
    retailPrice: 499,
    margin: "71% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "100% Super-combed cotton • Pre-shrunk & color-fast • Sizes S to XXL",
  },
  {
    slug: "oversized-drop-shoulder-hoodie",
    sku: "PL-TEX-HOD",
    title: "320 GSM Heavyweight Fleece Oversized Streetwear Hoodie",
    category: "Apparel & Textiles",
    categorySlug: "clothing",
    moq: 25,
    indicativePrice: 380,
    retailPrice: 1199,
    margin: "68% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "Cotton-poly blend fleece • Kangaroo front pocket • Double-lined drawstring hood",
  },
  {
    slug: "portable-usb-rechargeable-blender",
    sku: "PL-KIT-BLD",
    title: "6-Blade USB Rechargeable High-Speed Portable Fruit Blender (380ml)",
    category: "Home & Kitchenware",
    categorySlug: "home-kitchen",
    moq: 20,
    indicativePrice: 260,
    retailPrice: 699,
    margin: "63% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "304 Stainless steel blades • 2000mAh battery • Magnetic induction safety switch",
  },
  {
    slug: "wireless-anc-bluetooth-earbuds",
    sku: "PL-ELE-TWS",
    title: "TWS Wireless Earbuds with Active Environmental Noise Cancelling",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    moq: 30,
    indicativePrice: 310,
    retailPrice: 999,
    margin: "69% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "Bluetooth 5.3 chip • 32hr battery with case • Type-C fast charge support",
  },
  {
    slug: "retractable-gel-pens-box-50",
    sku: "PL-STN-GEL",
    title: "0.5mm Smooth-Flow Retractable Quick-Dry Gel Pens (Box of 50)",
    category: "Office & Stationery",
    categorySlug: "stationery",
    moq: 100,
    indicativePrice: 22,
    retailPrice: 60,
    margin: "63% Retail Margin",
    availability: "available",
    statusText: "In Stock",
    spec: "Japanese pigment ink • Tungsten carbide ball tip • Ergonomic rubberized grip",
  },
];

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string; availability?: string; q?: string };
}) {
  const selectedCat = searchParams?.category;
  const selectedAvail = searchParams?.availability;
  const searchQuery = searchParams?.q?.toLowerCase() || "";

  const filtered = SAMPLE_PRODUCTS.filter((item) => {
    if (selectedCat && item.categorySlug !== selectedCat) return false;
    if (selectedAvail && item.availability !== selectedAvail) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery) && !item.sku.toLowerCase().includes(searchQuery)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Header Ribbon */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Commercial Wholesale Catalogue</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">Multi-Category Product Inventory</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select lots with verified MOQs, indicative tier pricing, and direct wholesale quotation desk.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-600/30 shrink-0"
          >
            <span>Request Custom RFQ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-950 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  Filter Catalogue
                </span>
                {(selectedCat || selectedAvail || searchQuery) && (
                  <Link href="/products" className="text-[11px] font-semibold text-blue-600 hover:underline">
                    Reset
                  </Link>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-2.5">Merchandise Division</h3>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <Link
                      href="/products"
                      className={`block px-3 py-1.5 rounded-lg transition ${
                        !selectedCat ? "bg-slate-950 text-white font-bold" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      All Merchandise Lines
                    </Link>
                  </li>
                  {CATEGORIES_FEATURED.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/products?category=${c.slug}${selectedAvail ? `&availability=${selectedAvail}` : ""}`}
                        className={`block px-3 py-1.5 rounded-lg transition ${
                          selectedCat === c.slug
                            ? "bg-slate-950 text-white font-bold"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 mb-2.5">Procurement Status</h3>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <Link
                      href={`/products?availability=available${selectedCat ? `&category=${selectedCat}` : ""}`}
                      className={`block px-3 py-1.5 rounded-lg transition ${
                        selectedAvail === "available"
                          ? "bg-slate-950 text-white font-bold"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      In Stock / Ready Dispatch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/products?availability=enquiry_only${selectedCat ? `&category=${selectedCat}` : ""}`}
                      className={`block px-3 py-1.5 rounded-lg transition ${
                        selectedAvail === "enquiry_only"
                          ? "bg-slate-950 text-white font-bold"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Available on RFQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Direct Support */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-blue-900 block">Looking for Custom Batches?</span>
                  <p className="text-[10px] text-blue-700 mt-1">We source bespoke specifications directly with manufacturing partners.</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20PLAYLUME%2C%20I%20need%20a%20custom%20sourcing%20inquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2.5 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                  >
                    Direct Inquiry
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 space-y-6">
            
            {/* Top Bar inside Grid */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-500">
                Displaying <strong className="text-slate-900">{filtered.length}</strong> wholesale product lots
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <form action="/products" method="GET" className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder="Search SKU or product..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  {selectedCat && <input type="hidden" name="category" value={selectedCat} />}
                </form>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">No wholesale lots match your criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your filters or send a general commercial enquiry and we will check factory availability.
                </p>
                <Link
                  href="/enquiry"
                  className="inline-block mt-4 bg-slate-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  Submit General Sourcing RFQ
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((item) => (
                  <div
                    key={item.sku}
                    className="bg-white rounded-2xl border border-slate-200 p-4 hover:-translate-y-1 transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group"
                  >
                    <div>
                      {/* Placeholder Card Image Area */}
                      <div className="relative bg-slate-50 rounded-xl h-40 flex flex-col items-center justify-center border border-slate-100 p-4 mb-3">
                        <span className="text-slate-300 group-hover:text-blue-500 transition font-black text-2xl">
                          {item.sku.split("-")[1]}
                        </span>
                        <span className="absolute top-2.5 left-2.5 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
                          {item.sku}
                        </span>
                        <span
                          className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded border ${
                            item.availability === "available"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {item.statusText}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">{item.category}</div>
                      <Link href={`/product/${item.slug}`} className="block">
                        <h3 className="font-bold text-slate-950 text-sm mt-1 leading-snug hover:text-blue-600 transition">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.spec}</p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-slate-500">Min Order Qty:</span>
                          <span className="font-bold text-slate-900">{item.moq} Pieces</span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-slate-500">Indicative Wholesale:</span>
                          <span className="font-black text-slate-950 text-base">
                            ₹{item.indicativePrice} <span className="text-[10px] font-normal text-slate-400">/pc</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-between pt-0.5">
                          <span>Retail Target: ₹{item.retailPrice}</span>
                          <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                            {item.margin}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition text-center"
                      >
                        View Details
                      </Link>
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                          `Hello PLAYLUME, I want to confirm price and availability for ${item.title} (${item.sku}), MOQ: ${item.moq} pcs.`
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
            )}

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
