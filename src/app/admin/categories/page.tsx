import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES_FEATURED } from "@/lib/constants";
import { Layers, Plus, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Merchandise Divisions — PLAYLUME Admin" };

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Merchandise Divisions Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure product divisions, standard MOQ thresholds, and category routing.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES_FEATURED.map((c) => (
          <div key={c.slug} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-950 text-sm">{c.name}</span>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                Active
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">{c.subhead}</p>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-600 font-semibold">
              <span>Standard MOQ: {c.moq}</span>
              <span className="text-blue-700 font-bold">{c.startingPrice}</span>
            </div>
            <div className="pt-2 flex justify-between items-center text-[11px]">
              <Link href={`/category/${c.slug}`} target="_blank" className="text-slate-400 hover:text-slate-900 flex items-center gap-1">
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href={`/admin/products?category=${c.slug}`} className="text-blue-600 font-bold hover:underline">
                View Lots
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
