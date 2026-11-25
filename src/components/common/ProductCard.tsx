"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { Plus, Check, Eye, Package, ShieldCheck, ArrowRight } from "lucide-react";

export interface ProductProps {
  id: string;
  slug?: string;
  sku: string;
  name: string;
  category: string;
  categorySlug: string;
  categoryTone?: "toys" | "clothing" | "watches" | "electronics" | "home" | "stationery" | "jewellery" | "fashion";
  image?: string;
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
      categoryTone: product.categoryTone,
      price: product.price,
      moq: product.moq,
      mrp: product.mrp,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const toneClass = `tone-${product.categoryTone || "toys"}`;
  const productHref = `/product/${product.slug || product.id}`;

  return (
    <article className="bg-surface border border-line rounded-xl overflow-hidden flex flex-col hover:border-line-strong hover:shadow-md transition">
      {/* Product Image / Icon Tile */}
      <Link
        href={productHref}
        className={`relative aspect-4/3 flex items-center justify-center ${toneClass} p-4 group overflow-hidden bg-white`}
      >
        {/* Discount Badge (Candlemould style Save XX%) */}
        {marginPct > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#e03a3a] text-white text-[10px] font-black uppercase tracking-wider shadow-xs z-10">
            Save {marginPct}%
          </span>
        )}

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
          />
        ) : (
          <Package className="w-14 h-14 opacity-80 group-hover:scale-105 transition" />
        )}
        
        {/* SKU Badge */}
        <span className="absolute left-3 bottom-2.5 text-[11px] font-bold tracking-wider opacity-70 font-mono bg-white/80 px-1.5 py-0.5 rounded shadow-xs">
          {product.sku}
        </span>

        {/* Stock Status Badge */}
        <span
          className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shadow-xs z-10 ${
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
          <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">
            {product.category}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-2 mt-0.5">
            <Link href={productHref} className="hover:text-amber-600 transition">
              {product.name}
            </Link>
          </h3>
        </div>

        <div className="pt-3 border-t border-dashed border-slate-200 space-y-1 mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-500">
              MOQ: <strong className="text-neutral-900">{product.moq} pcs</strong>
            </span>
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 line-through mr-1.5 font-semibold">
                ₹{product.mrp}
              </span>
              <strong className="text-base sm:text-lg font-black text-[#e03a3a]">
                ₹{product.price}
              </strong>
              <small className="text-[11px] text-neutral-500"> /pc</small>
            </div>
          </div>

          <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-0.5">
            <span>Retail ₹{product.mrp}</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
              {marginPct}% margin
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-[1fr_auto] gap-2 pt-2">
          <button
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
              justAdded || inBasket
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
            }`}
          >
            {justAdded || inBasket ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-900" />
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
            href={productHref}
            className="p-2 rounded-lg border border-slate-300 hover:border-amber-500 text-neutral-700 hover:text-amber-600 transition flex items-center justify-center cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
