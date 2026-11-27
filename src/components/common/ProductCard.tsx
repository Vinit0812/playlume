"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { Plus, Check, Eye, Package, ArrowRight } from "lucide-react";

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

  // Extract the base product name (before " – VariantName") and the variant part
  const dashIdx = product.name.lastIndexOf(" – ");
  const baseName = dashIdx !== -1 ? product.name.substring(0, dashIdx) : product.name;
  const variantName = dashIdx !== -1 ? product.name.substring(dashIdx + 3) : null;

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col hover:border-amber-400 hover:shadow-lg transition duration-200 group">
      {/* Product Image Tile */}
      <Link
        href={productHref}
        className="relative flex items-center justify-center bg-white overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* Discount Badge */}
        {marginPct > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#e03a3a] text-white text-[10px] font-black uppercase tracking-wider shadow-sm z-10">
            SAVE {marginPct}%
          </span>
        )}

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-300 p-1.5 sm:p-2"
          />
        ) : (
          <Package className="w-16 h-16 opacity-40 group-hover:scale-105 transition" />
        )}

        {/* Stock Status */}
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
            ? "Limited"
            : "Enquiry"}
        </span>

        {/* SKU bottom-left */}
        <span className="absolute left-2.5 bottom-2.5 text-[10px] font-mono font-bold tracking-wider opacity-60 bg-white/80 px-1.5 py-0.5 rounded shadow-xs">
          {product.sku}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
        {/* Category Label */}
        <span className="text-[9.5px] font-extrabold text-amber-700 uppercase tracking-widest block">
          {product.category}
        </span>

        {/* Product Name – base name large, variant name as pill */}
        <div>
          <h3 className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition">
            <Link href={productHref}>{baseName}</Link>
          </h3>
          {variantName && (
            <span className="mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
              {variantName}
            </span>
          )}
        </div>

        {/* Pricing Row */}
        <div className="pt-2.5 border-t border-dashed border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">
              MOQ: <strong className="text-neutral-800">{product.moq} pcs</strong>
            </span>
            <div className="text-right">
              <span className="text-[10.5px] text-neutral-400 line-through mr-1 font-medium">
                ₹{product.mrp}
              </span>
              <strong className="text-base sm:text-lg font-black text-[#e03a3a]">
                ₹{product.price}
              </strong>
              <small className="text-[10px] text-neutral-400">/pc</small>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10.5px] text-neutral-500">Retail ₹{product.mrp}</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] border border-emerald-200">
              {marginPct}% margin
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-[1fr_auto] gap-2 pt-1">
          <button
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition shadow-xs cursor-pointer ${
              justAdded || inBasket
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-amber-500 hover:bg-amber-400 text-stone-950"
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
            className="p-2 rounded-xl border border-slate-200 hover:border-amber-400 text-neutral-500 hover:text-amber-600 transition flex items-center justify-center cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}