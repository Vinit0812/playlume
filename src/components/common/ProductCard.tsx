"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { Plus, Check, Eye, Package, ShieldCheck, ArrowRight } from "lucide-react";

export interface ProductProps {
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
  statusText?: string;
  description?: string;
  specs?: Record<string, string>;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addItem, items } = useQuoteBasket();
  const [justAdded, setJustAdded] = useState(false);

  const inBasket = items.some((i) => i.id === product.id);
  const marginPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      moq: product.moq,
      mrp: product.mrp,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const toneClass = `tone-${product.categoryTone || "toys"}`;

  return (
    <article className="bg-surface border border-line rounded-xl overflow-hidden flex flex-col hover:border-line-strong hover:shadow-md transition">
      {/* Product Image / Icon Tile */}
      <Link
        href={`/product/${product.id}`}
        className={`relative aspect-4/3 flex items-center justify-center ${toneClass} p-6 group`}
      >
        <Package className="w-14 h-14 opacity-80 group-hover:scale-105 transition" />
        
        {/* SKU Badge */}
        <span className="absolute left-3 bottom-2.5 text-[11px] font-bold tracking-wider opacity-70 font-mono">
          {product.sku}
        </span>

        {/* Stock Status Badge */}
        <span
          className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shadow-xs ${
            product.status === "in_stock"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : product.status === "limited"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {product.status === "in_stock"
            ? "In Stock"
            : product.status === "limited"
            ? "Limited Stock"
            : "Enquiry Only"}
        </span>
      </Link>

      {/* Product Body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider block">
            {product.category}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-text line-clamp-2 mt-0.5">
            <Link href={`/product/${product.id}`} className="hover:text-brand-700 transition">
              {product.name}
            </Link>
          </h3>
        </div>

        <div className="pt-3 border-t border-dashed border-line space-y-1 mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-muted">
              MOQ: <strong className="text-neutral-text">{product.moq} pcs</strong>
            </span>
            <div>
              <strong className="text-base sm:text-lg font-extrabold text-brand-800">
                ₹{product.price}
              </strong>
              <small className="text-[11px] text-neutral-muted"> /pc</small>
            </div>
          </div>

          <div className="text-[11px] text-neutral-muted">
            Retail ₹{product.mrp} • <b className="text-emerald-600 font-bold">{marginPct}% margin</b>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-[1fr_auto] gap-2 pt-2">
          <button
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs ${
              justAdded || inBasket
                ? "bg-brand-50 text-brand-800 border border-brand-300"
                : "bg-brand-700 hover:bg-brand-800 text-white"
            }`}
          >
            {justAdded || inBasket ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-700" />
                <span>In Quote ({items.find((i) => i.id === product.id)?.quantity || product.moq})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Quote</span>
              </>
            )}
          </button>

          <Link
            href={`/product/${product.id}`}
            className="p-2 rounded-lg border border-line-strong hover:border-brand-500 text-neutral-text hover:text-brand-700 transition flex items-center justify-center"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
