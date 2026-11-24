import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, Layers, MessageSquare, Filter, ShieldCheck, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = CATEGORIES_FEATURED.find((c) => c.slug === params.slug);
  if (!category) return { title: "Category Not Found — PLAYLUME" };
  return {
    title: `${category.name} Wholesale Sourcing & Distribution — PLAYLUME`,
    description: `Direct factory wholesale pricing and verified MOQs for ${category.name}. Sourced for Indian retailers and commercial distributors.`,
  };
}

export default function CategoryLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = CATEGORIES_FEATURED.find((c) => c.slug === params.slug);
  if (!category) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-slate-900">Divisions</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header Hero */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-10 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              Commercial Merchandise Division
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {category.subhead}. Sourced through verified manufacturing partnerships with standard MOQs starting at {category.moq}.
            </p>
            <div className="flex flex-wrap gap-4 pt-3 text-xs">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                Starting Rate: <strong className="text-white">{category.startingPrice}</strong>
              </span>
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                Standard MOQ: <strong className="text-white">{category.moq}</strong>
              </span>
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                Pan-India Transit
              </span>
            </div>
          </div>
        </div>

        {/* Catalogue Link Prompt */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-950">Active Lots in {category.name}</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Browse our dedicated product inventory with detailed specifications, master carton packing units, and wholesale quote generator.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            <Link
              href={`/products?category=${category.slug}`}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-blue-600/25 flex items-center gap-2"
            >
              <span>Explore {category.name} Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/enquiry?category=${encodeURIComponent(category.name)}`}
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
            >
              Request Custom Division RFQ
            </Link>
          </div>
        </div>

        {/* Other Merchandise Divisions */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Other Merchandise Divisions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES_FEATURED.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-slate-400 hover:-translate-y-0.5 transition shadow-sm text-center"
              >
                <div className="font-bold text-slate-900 text-xs">{c.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">MOQ {c.moq}</div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
