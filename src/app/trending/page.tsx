import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, Flame, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Trending Wholesale Deals & Fast-Moving Lots — PLAYLUME",
  description: "High-demand wholesale lots with verified margins for Indian retailers and distributors.",
};

export default function TrendingPage() {
  const deals = [
    {
      sku: "PL-TAB-85",
      title: "8.5\" Digital LCD Drawing & Writing Board with Stylus",
      category: "Toys & Educational",
      slug: "lcd-writing-tablet-8-5",
      moq: "50 Pieces",
      wholesale: "₹75/pc",
      retail: "₹199/pc",
      margin: "62% Margin",
      status: "In Stock — 1,200 pcs available",
    },
    {
      sku: "PL-WTC-01",
      title: "Ultra-Thin Minimalist Analog Quartz Watch (Steel Mesh)",
      category: "Watches & Horology",
      slug: "analog-quartz-mesh-watch",
      moq: "25 Pieces",
      wholesale: "₹185/pc",
      retail: "₹599/pc",
      margin: "69% Margin",
      status: "Active Batch — 450 pcs",
    },
    {
      sku: "PL-TEX-180",
      title: "180 GSM Bio-Washed Combed Cotton Plain Crewneck T-Shirts",
      category: "Apparel & Textiles",
      slug: "cotton-crewneck-tshirt-180gsm",
      moq: "30 Pieces",
      wholesale: "₹145/pc",
      retail: "₹499/pc",
      margin: "71% Margin",
      status: "In Stock — 2,000 pcs (Assorted)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-10 border border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            High Velocity Merchandise
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trending Wholesale Deals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
            Consistently fast-moving inventory identified by retail re-order frequency. Pre-negotiated factory rates ready for rapid dispatch.
          </p>
        </div>

        {/* Deals Table / Cards */}
        <div className="space-y-4 mb-12">
          {deals.map((item) => (
            <div
              key={item.sku}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white tracking-wider">
                    {item.sku}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <Link href={`/product/${item.slug}`} className="block">
                  <h2 className="text-base font-bold text-slate-950 hover:text-blue-600 transition">
                    {item.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap gap-4 text-xs pt-1 text-slate-600">
                  <span>MOQ: <strong className="text-slate-900">{item.moq}</strong></span>
                  <span>Indicative: <strong className="text-blue-700">{item.wholesale}</strong></span>
                  <span>Retail Target: <strong className="text-slate-900">{item.retail}</strong></span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                    {item.margin}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="flex-1 md:flex-none bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition text-center"
                >
                  Lot Details
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    `Hello PLAYLUME, I want to confirm price and allocation for trending deal: ${item.title} (${item.sku}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
