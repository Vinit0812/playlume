import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/constants";
import { Building2, ShieldCheck, TrendingUp, Layers, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Profile & Institutional Sourcing — PLAYLUME",
  description: "About PLAYLUME: An established multi-category wholesale trading and distribution enterprise supplying verified merchandise to Indian commercial businesses.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-12 px-4 max-w-5xl mx-auto w-full space-y-12">
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Institutional Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            About PLAYLUME
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-3 leading-relaxed">
            Multi-category commercial wholesale trading and distribution enterprise. Bridging manufacturers with Indian retailers, wholesalers, and institutional buyers.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-950">Who We Are</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              PLAYLUME operates as a consolidated B2B wholesale trading company. We eliminate the friction of dealing with multiple unvetted vendors by centralizing verified sourcing across Toys, Apparel, Watches, Consumer Tech, Home & Kitchenware, and Stationery.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our sourcing-first infrastructure enables retail shop owners and regional stockists to procure high-margin merchandise at direct manufacturer rates with consolidated GST billing, batch inspection, and dependable freight tracking.
            </p>
          </div>

          <div className="bg-slate-950 text-white rounded-2xl p-8 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Single-Supplier Advantage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Why deal with 6 different suppliers when you can consolidate multiple product categories under one commercial partner with unified logistics and credit review?
            </p>
            <div className="pt-2 text-xs text-amber-400 font-semibold">
              Toys • Apparel • Watches • Tech • Home • Stationery
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-950 text-sm">Quality Assurance</h3>
            <p className="text-xs text-slate-500 mt-1">Every production run is verified prior to dispatch to protect our retail partners from defects.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-950 text-sm">Tiered Margins</h3>
            <p className="text-xs text-slate-500 mt-1">Our products offer 40% to 70% retail gross margins, structured for commercial business growth.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <Layers className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-slate-950 text-sm">Pan-India Freight</h3>
            <p className="text-xs text-slate-500 mt-1">Integrated with leading transport and express cargo carriers for prompt transit across India.</p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
