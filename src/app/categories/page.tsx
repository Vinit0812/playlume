import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, Layers, Gamepad2, Shirt, Watch, Cpu, Home, PenTool } from "lucide-react";

export const metadata: Metadata = {
  title: "Merchandise Divisions & Categories",
  description: "Explore all six wholesale merchandise divisions supported by V&A Global Sourcing: Toys & Games, Clothing & Apparel, Artificial Jewellery, Consumer Electronics, Home & Kitchen, and Fashion Accessories.",
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesPage() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Gamepad2":
        return <Gamepad2 className="w-8 h-8" />;
      case "Shirt":
        return <Shirt className="w-8 h-8" />;
      case "Watch":
        return <Watch className="w-8 h-8" />;
      case "Cpu":
        return <Cpu className="w-8 h-8" />;
      case "Home":
        return <Home className="w-8 h-8" />;
      case "PenTool":
        return <PenTool className="w-8 h-8" />;
      default:
        return <Layers className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-10 border border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Multi-Category Wholesale Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Core Merchandise Divisions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">
            Consolidate your procurement across multiple product lines with unified billing, flexible volume thresholds, and direct factory sourcing.
          </p>
        </div>

        {/* Division Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CATEGORIES_FEATURED.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-blue-700 flex items-center justify-center border border-slate-100 mb-4">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h2 className="text-lg font-bold text-slate-950">{cat.name}</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.subhead}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard MOQ</span>
                    <span className="font-bold text-slate-800">{cat.moq}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Starting Rate</span>
                    <span className="font-bold text-blue-700">{cat.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition text-center"
                >
                  View Products
                </Link>
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Division Specs
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Need a new category? */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Require a Specific Merchandise Category?</h3>
            <p className="text-xs text-slate-400 mt-1">Our flexible sourcing architecture allows us to onboard new manufacturing categories for qualified wholesale volume.</p>
          </div>
          <Link
            href="/enquiry"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shrink-0"
          >
            Custom Category Request
          </Link>
        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
