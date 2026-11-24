"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Package, ShieldAlert } from "lucide-react";
import { CATEGORIES_FEATURED } from "@/lib/constants";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    categorySlug: "toys-games",
    moq: 50,
    indicativePrice: "",
    purchasePrice: "", // PRIVATE: Admin only!
    showPrice: true,
    availability: "available",
    status: "published",
    shortDescription: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku,
          categoryId: 1, // mapped to category
          moq: Number(formData.moq),
          indicativePrice: formData.indicativePrice ? Number(formData.indicativePrice) : undefined,
          purchasePrice: formData.purchasePrice ? Number(formData.purchasePrice) : undefined,
          showPrice: formData.showPrice,
          availability: formData.availability,
          status: formData.status,
          shortDescription: formData.shortDescription,
          description: formData.description,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      }
    } catch (err) {
      console.error("Add product error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-950">Add Wholesale Merchandise Lot</h1>
          <p className="text-xs text-slate-500">Create a new product listing with internal cost and public pricing controls.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6 text-xs">
        {/* Core Product Info */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-100">
            1. Core Merchandise Details
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. 8.5 Inch Digital LCD Drawing Tablet"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Internal SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. PL-TAB-85"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Merchandise Division *</label>
              <select
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none font-medium"
              >
                {CATEGORIES_FEATURED.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Minimum Order Quantity (MOQ) *</label>
              <input
                type="number"
                min={1}
                required
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing Strategy & Security */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
              2. Commercial Pricing & Margin Slabs
            </h2>
            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-amber-600 inline" />
              Confidential Supplier Cost
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Public Indicative Wholesale Rate (₹/pc)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.indicativePrice}
                onChange={(e) => setFormData({ ...formData, indicativePrice: e.target.value })}
                placeholder="e.g. 75"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-amber-900 mb-1">
                Private Manufacturer Purchase Cost (₹/pc) — Admin Only
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                placeholder="e.g. 48 (Kept strictly private)"
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-amber-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status & Availability */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-100">
            3. Procurement Status
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stock Availability Status</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              >
                <option value="available">Available to Order (In Stock)</option>
                <option value="enquiry_only">Confirm Availability (Enquiry Only)</option>
                <option value="unavailable">Currently Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Publishing Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              >
                <option value="published">Published Live</option>
                <option value="draft">Internal Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
            <textarea
              rows={3}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Commercial specifications, casing material, master carton packing ratios..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 outline-none resize-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Publishing Lot..." : "Publish Product Lot"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
