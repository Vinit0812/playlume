"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import {
  Package,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Plus,
  Minus,
  MessageSquare,
  ClipboardList,
  ArrowRight,
  FileText,
  Boxes,
} from "lucide-react";

export interface ProductDetailProps {
  id: string;
  sku: string;
  name: string;
  category: string;
  categorySlug: string;
  categoryTone?: "toys" | "clothing" | "watches" | "electronics" | "home" | "stationery";
  moq: number;
  price: number;
  mrp: number;
  status: "in_stock" | "limited" | "enquiry";
  description: string;
  specs: Record<string, string>;
  packaging: {
    unitsPerCarton: number;
    cartonDimensions: string;
    grossWeight: string;
  };
}

export default function ProductDetailView({ product }: { product: ProductDetailProps }) {
  const { addItem, items } = useQuoteBasket();
  const [quantity, setQuantity] = useState(product.moq);
  const [added, setAdded] = useState(false);

  // 3 Volume Tiers
  const tier1Qty = product.moq;
  const tier1Price = product.price;

  const tier2Qty = product.moq * 4;
  const tier2Price = Math.round(product.price * 0.96); // 4% off

  const tier3Qty = product.moq * 10;
  const tier3Price = Math.round(product.price * 0.92); // 8% off

  // Current effective price based on quantity selected
  let currentUnitPrice = tier1Price;
  if (quantity >= tier3Qty) {
    currentUnitPrice = tier3Price;
  } else if (quantity >= tier2Qty) {
    currentUnitPrice = tier2Price;
  }

  const lineTotal = currentUnitPrice * quantity;
  const marginPct = Math.round(((product.mrp - currentUnitPrice) / product.mrp) * 100);

  const handleAddToBasket = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: currentUnitPrice,
        moq: product.moq,
        mrp: product.mrp,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PLAYLUME Trade Desk, I would like to place a wholesale inquiry for:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nQuantity: ${quantity} pcs\nEffective Rate: ₹${currentUnitPrice}/pc\nEstimated Subtotal: ₹${lineTotal.toLocaleString()}\n\nPlease share official proforma quotation with GST and freight lead times.`
  );

  const toneClass = `tone-${product.categoryTone || "toys"}`;

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-muted">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-700">Catalogue</Link>
        <span>/</span>
        <span className="text-neutral-text font-bold">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Product Image / Thumbnail Tile */}
        <div className={`rounded-3xl border border-line ${toneClass} p-12 aspect-square flex flex-col items-center justify-center relative shadow-sm`}>
          <Package className="w-32 h-32 opacity-75" />
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-neutral-text border border-line">
            SKU: {product.sku}
          </div>

          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border shadow-xs ${
                product.status === "in_stock"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}
            >
              {product.status === "in_stock" ? "In Stock • Ready Dispatch" : "Limited Master Cartons"}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-line text-xs text-center text-neutral-muted">
            Export-Grade Reinforced 5-Ply Master Carton Packaging
          </div>
        </div>

        {/* Right: Commercial Lot Metrics & Actions */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 block mb-1">
              {product.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-brand-950 tracking-tight leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-muted mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Margin Banner */}
          <div className="bg-surface-2 border border-line rounded-2xl p-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-muted block">Wholesale Rate:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-brand-900">₹{currentUnitPrice}</span>
                  <span className="text-xs text-neutral-muted">/pc (ex-warehouse)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-muted block">Suggested Retail:</span>
                <span className="text-sm font-bold text-neutral-text line-through">₹{product.mrp}</span>
                <span className="ml-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {marginPct}% Margin
                </span>
              </div>
            </div>

            {/* Tier Slabs Table */}
            <div className="pt-3 border-t border-line">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-muted block mb-2">
                Tiered Wholesale Price Slabs:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div
                  className={`p-2.5 rounded-xl border ${
                    quantity < tier2Qty
                      ? "bg-brand-50 border-brand-500 font-bold text-brand-900"
                      : "bg-white border-line text-neutral-muted"
                  }`}
                >
                  <span className="block text-[11px]">MOQ Tier</span>
                  <strong className="block text-sm">₹{tier1Price}</strong>
                  <span className="text-[10px]">{tier1Qty}+ pcs</span>
                </div>

                <div
                  className={`p-2.5 rounded-xl border ${
                    quantity >= tier2Qty && quantity < tier3Qty
                      ? "bg-brand-50 border-brand-500 font-bold text-brand-900"
                      : "bg-white border-line text-neutral-muted"
                  }`}
                >
                  <span className="block text-[11px]">Mid Volume (-4%)</span>
                  <strong className="block text-sm">₹{tier2Price}</strong>
                  <span className="text-[10px]">{tier2Qty}+ pcs</span>
                </div>

                <div
                  className={`p-2.5 rounded-xl border ${
                    quantity >= tier3Qty
                      ? "bg-brand-50 border-brand-500 font-bold text-brand-900"
                      : "bg-white border-line text-neutral-muted"
                  }`}
                >
                  <span className="block text-[11px]">Super Volume (-8%)</span>
                  <strong className="block text-sm">₹{tier3Price}</strong>
                  <span className="text-[10px]">{tier3Qty}+ pcs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-text">
              <span>Order Quantity (Units):</span>
              <span className="text-neutral-muted">Minimum Order: {product.moq} pcs</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-line-strong rounded-xl bg-surface-2 overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(Math.max(product.moq, quantity - product.moq))}
                  disabled={quantity <= product.moq}
                  className="w-12 h-full flex items-center justify-center hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min={product.moq}
                  step={product.moq}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                  className="w-20 text-center font-black text-sm bg-transparent border-0 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + product.moq)}
                  className="w-12 h-full flex items-center justify-center hover:bg-slate-200 text-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-right">
                <span className="text-xs text-neutral-muted block">Estimated Line Total:</span>
                <span className="text-xl font-black text-brand-950">₹{lineTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToBasket}
              className={`inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-700 hover:bg-brand-800 text-white"
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Added to Quote Basket!</span>
                </>
              ) : (
                <>
                  <ClipboardList className="w-4 h-4 text-accent-300" />
                  <span>Add to Quote Basket</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

          {/* Reassurance Features */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-[11px] text-neutral-muted">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Input Tax Credit (GST 18%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-brand-600" />
              <span>Pan-India Commercial Freight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Packaging Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Technical Specifications */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-brand-950 flex items-center gap-2 border-b border-line pb-3">
            <FileText className="w-4 h-4 text-brand-700" /> Product Specifications
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4">
                <span className="font-semibold text-neutral-muted">{key}</span>
                <span className="font-bold text-neutral-text text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Master Carton Packaging */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-brand-950 flex items-center gap-2 border-b border-line pb-3">
            <Boxes className="w-4 h-4 text-brand-700" /> Master Carton Specifications
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="font-semibold text-neutral-muted">Units per Master Carton:</span>
              <strong className="text-neutral-text">{product.packaging.unitsPerCarton} pieces</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-semibold text-neutral-muted">Carton Dimensions:</span>
              <strong className="text-neutral-text">{product.packaging.cartonDimensions}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-semibold text-neutral-muted">Gross Carton Weight:</span>
              <strong className="text-neutral-text">{product.packaging.grossWeight}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-semibold text-neutral-muted">Damage Protection:</span>
              <strong className="text-emerald-700 font-bold">5-Ply Corrugated + Strapping</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
