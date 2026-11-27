import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import {
  FileText,
  Search,
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How Wholesale Ordering Works — V&A Global Sourcing B2B Trade",
  description:
    "Transparent 5-stage procurement workflow for retailers and wholesale distributors. MOQs, proforma invoicing, QC, and nationwide freight.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Browse Catalog & Pick Lots",
      desc: "Explore products across our 6 merchandise lines with transparent MOQs and tiered wholesale pricing clearly listed upfront.",
      icon: Search,
    },
    {
      number: "02",
      title: "Build Quote Basket & Submit RFQ",
      desc: "Add required SKU quantities to your quote basket or submit a quick RFQ with your business name and delivery state/city.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Receive Formal Proforma Invoice",
      desc: "Our trade desk issues an official proforma quotation (PLY-YYMM-XXXX) with exact 18% GST tax breakdown, freight rates, and 7-day price lock.",
      icon: CreditCard,
    },
    {
      number: "04",
      title: "Pre-Dispatch Quality Inspection",
      desc: "Every master carton undergoes rigorous batch inspection, functional checks, and export-grade 5-ply reinforced packing.",
      icon: ShieldCheck,
    },
    {
      number: "05",
      title: "E-Way Bill & Rapid Dispatch",
      desc: "Consignment dispatches via verified commercial surface lines (VRL, TCI, Safexpress) with real-time tracking and tax invoices.",
      icon: Truck,
    },
  ];

  const faqs = [
    {
      q: "What is the Minimum Order Quantity (MOQ)?",
      a: "MOQs are set per SKU, generally starting between 20 to 50 pieces. We also support mixed-category consolidated orders so you can source across toys, apparel, watches, and electronics in one shipment.",
    },
    {
      q: "Can I request product samples before placing a bulk order?",
      a: "Yes. Registered commercial buyers can request single-lot sample approval. Sample costs are credited against your final master carton production order.",
    },
    {
      q: "Are the listed wholesale prices inclusive of GST and freight?",
      a: "Catalogue prices are base wholesale unit rates. Formal proforma invoices detail statutory 18% GST (with Input Tax Credit for registered GSTIN holders) and competitive surface freight charges.",
    },
    {
      q: "What are the standard payment terms?",
      a: "Standard ready-stock lots are settled via 100% advance RTGS/NEFT before warehouse dispatch. Contract or factory sourcing requires 30% production advance and 70% against pre-dispatch quality clearance.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-2 text-neutral-text antialiased">
      <Header />

      <main className="flex-1 py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Transparent Commercial Sourcing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            How Wholesale Ordering Works
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed">
            Built specifically for commercial retailers, resellers, and distributors. A streamlined trade desk experience without the friction of a consumer retail checkout.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.number}
                className="bg-white border border-line rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-brand-500 hover:shadow-md transition relative"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-700 text-white font-black text-sm flex items-center justify-center mb-4">
                    {st.number}
                  </div>
                  <h3 className="text-sm font-bold text-neutral-text mb-2">{st.title}</h3>
                  <p className="text-xs text-neutral-muted leading-relaxed">{st.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Trade Policies Band */}
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-400">
              Institutional Trade Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Direct Sourcing Guarantee &amp; Transit Insurance
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every shipment is packed in export-grade corrugated master cartons with plastic strapping and shrink wrap. Consignments are insured against transit damage with instant claim assistance.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-bold text-xs uppercase tracking-wider transition"
              >
                <span>Browse Wholesale Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/become-a-buyer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
              >
                <span>Become a Registered Buyer</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-neutral-text">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-muted mt-1">Everything you need to know about placing bulk orders with V&amp;A Global Sourcing.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-line rounded-xl p-5 shadow-xs space-y-2">
                <h4 className="text-sm font-bold text-neutral-text flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-neutral-muted leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
