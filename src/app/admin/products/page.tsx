import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search, Filter, Package, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { CATEGORIES_FEATURED } from "@/lib/constants";

export const metadata: Metadata = { title: "Wholesale Lots Management — V&A Global Sourcing Admin" };

export default function AdminProductsPage() {
  const sampleAdminLots = [
    {
      sku: "PL-TAB-85",
      name: "8.5\" Digital LCD Drawing Board with Stylus",
      category: "Toys & Educational",
      moq: 50,
      indicativePrice: 75,
      purchasePrice: 48,
      margin: "₹27/pc margin",
      availability: "In Stock",
      status: "Published",
    },
    {
      sku: "PL-WTC-01",
      name: "Ultra-Thin Minimalist Analog Quartz Watch",
      category: "Watches & Horology",
      moq: 25,
      indicativePrice: 185,
      purchasePrice: 110,
      margin: "₹75/pc margin",
      availability: "Enquiry Only",
      status: "Published",
    },
    {
      sku: "PL-TEX-180",
      name: "180 GSM Bio-Washed Combed Cotton T-Shirt",
      category: "Apparel & Textiles",
      moq: 30,
      indicativePrice: 145,
      purchasePrice: 92,
      margin: "₹53/pc margin",
      availability: "In Stock",
      status: "Published",
    },
    {
      sku: "PL-KIT-BLD",
      name: "USB Rechargeable High-Speed Portable Fruit Blender",
      category: "Home & Kitchenware",
      moq: 20,
      indicativePrice: 260,
      purchasePrice: 165,
      margin: "₹95/pc margin",
      availability: "In Stock",
      status: "Published",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Wholesale Merchandise Lots</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage product catalogue, stock availability flags, and private purchase pricing.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Merchandise Lot</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by SKU code or title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>
        <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none">
          <option>All 6 Merchandise Divisions</option>
          {CATEGORIES_FEATURED.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
        </select>
        <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none">
          <option>All Stock Availability</option>
          <option>Available to Order</option>
          <option>Available on Enquiry</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">SKU & Merchandise Title</th>
                <th className="p-4">Division</th>
                <th className="p-4">Standard MOQ</th>
                <th className="p-4">Wholesale Rate</th>
                <th className="p-4">
                  <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold">
                    Private Cost
                  </span>
                </th>
                <th className="p-4">Availability</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleAdminLots.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 block">{item.sku}</span>
                    <span className="font-bold text-slate-900 block mt-0.5">{item.name}</span>
                  </td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4 font-semibold text-slate-900">{item.moq} pcs</td>
                  <td className="p-4 font-black text-slate-950">₹{item.indicativePrice}</td>
                  <td className="p-4 font-mono font-bold text-amber-700">
                    ₹{item.purchasePrice} <span className="text-[10px] font-normal text-slate-400">({item.margin})</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        item.availability === "In Stock"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.availability}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/product/${item.sku.toLowerCase()}`} className="text-blue-600 font-bold hover:underline">
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
