"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { MasterProduct } from "@/lib/products-data";
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
  Share2,
  Share,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Flame,
} from "lucide-react";

export interface ProductDetailProps {
  product: MasterProduct;
  relatedProducts: MasterProduct[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const { addItem, setIsOpen } = useQuoteBasket();

  // Wholesale quantity starting at product MOQ
  const [quantity, setQuantity] = useState(product.moq);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "packaging">("desc");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Volume pricing calculation
  const tier1Qty = product.moq;
  const tier1Price = product.price;

  const tier2Qty = product.moq * 4;
  const tier2Price = Math.round(product.price * 0.92); // 8% off

  const tier3Qty = product.moq * 10;
  const tier3Price = Math.round(product.price * 0.85); // 15% off

  let currentUnitPrice = tier1Price;
  if (quantity >= tier3Qty) {
    currentUnitPrice = tier3Price;
  } else if (quantity >= tier2Qty) {
    currentUnitPrice = tier2Price;
  }

  const lineTotal = currentUnitPrice * quantity;
  const discountPercent = Math.round(((product.mrp - currentUnitPrice) / product.mrp) * 100);

  const handleStep = (direction: "up" | "down") => {
    const step = Math.max(10, Math.floor(product.moq / 5));
    if (direction === "up") {
      setQuantity((q) => q + step);
    } else {
      setQuantity((q) => Math.max(product.moq, q - step));
    }
  };

  const handleAddToQuoteBasket = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        categoryTone: product.categoryTone,
        price: currentUnitPrice,
        moq: product.moq,
        mrp: product.mrp,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsOpen(true); // Open drawer so buyer sees lot added
    }, 700);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello PLAYLUME Trade Desk, I would like to inquire about wholesale order:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nQuantity: ${quantity} pcs\nIndicative Rate: ₹${currentUnitPrice}/pc\nSubtotal: ₹${lineTotal.toLocaleString()}\n\nPlease send formal proforma invoice with GST and freight terms.`
  );

  return (
    <div className="space-y-12">
      {/* =========================================================
          1. BREADCRUMBS
          ========================================================= */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <Link href="/" className="hover:text-amber-600 transition">
          Home
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/${product.categorySlug}`}
          className="hover:text-amber-600 transition"
        >
          {product.category}
        </Link>
        {product.subCategory && (
          <>
            <span>&gt;</span>
            <Link
              href={`/category/${product.categorySlug}?sub=${product.subCategorySlug}`}
              className="hover:text-amber-600 transition"
            >
              {product.subCategory}
            </Link>
          </>
        )}
        <span>&gt;</span>
        <span className="text-neutral-900 font-semibold truncate max-w-md">
          {product.name}
        </span>
      </nav>

      {/* =========================================================
          2. MAIN PRODUCT HERO SHOWCASE (Matches Candlemould Image 1)
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: PRODUCT IMAGE GALLERY (7 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 aspect-4/3 flex flex-col items-center justify-center overflow-hidden shadow-sm">
            {/* Direct Factory Tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Factory Lot</span>
            </div>

            {/* In Stock Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-300">
                Ready for Dispatch
              </span>
            </div>

            {/* Product Artwork / Image */}
            {product.image ? (
              <div className="w-full h-full flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-72 sm:max-h-84 w-auto object-contain drop-shadow-md transform hover:scale-105 transition duration-300"
                />
              </div>
            ) : (
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 border-4 border-amber-500/40 shadow-xl flex flex-col items-center justify-center p-6 text-center transform hover:scale-105 transition duration-300">
                <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-amber-600 drop-shadow-[0_0_12px_rgba(217,119,6,0.6)] animate-pulse" />
                <div className="text-xs sm:text-sm font-serif font-black text-amber-950 uppercase tracking-widest mt-2">
                  {product.name.split(" ")[0]} {product.name.split(" ")[1] || "Wholesale"}
                </div>
                <div className="text-[10px] font-mono text-amber-800 font-bold mt-0.5">
                  Itemcode : {product.sku}
                </div>
              </div>
            )}

            {/* Watermark / Brand Credential */}
            <div className="absolute bottom-3 inset-x-0 text-center text-[10px] text-neutral-400 font-medium">
              Verified Wholesale Sourcing by PLAYLUME Enterprise
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  selectedImageIndex === idx
                    ? "border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20"
                    : "border-neutral-200 bg-white hover:bg-neutral-50"
                }`}
              >
                <Package className="w-5 h-5 text-neutral-600" />
                <span className="text-[10.5px] font-bold text-neutral-700">
                  {idx === 0 ? "Lot View" : idx === 1 ? "Water Display" : "Master Carton"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PRICING & WHOLESALE ACTIONS (5 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
              {product.name}
            </h1>
            <p className="text-xs font-mono font-bold text-neutral-500 mt-1 uppercase">
              SKU: {product.sku}
            </p>
          </div>

          {/* Pricing Row (Exact Candlemould Style: Save XX% + Strikethrough + Big Red Price) */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#e03a3a] text-white text-xs font-black tracking-wider uppercase">
                Save {discountPercent}%
              </span>
              <span className="text-base text-neutral-400 line-through font-semibold">
                Rs. {product.mrp.toFixed(2)}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#e03a3a] tracking-tight">
                Rs. {currentUnitPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-neutral-500">/ piece</span>
            </div>
            <p className="text-[11.5px] text-neutral-500">
              * Minimum wholesale order: <strong>{product.moq} pcs</strong>. Price reduces automatically with volume tiers below.
            </p>
          </div>

          {/* Product Variants (from Excel specifications) */}
          {product.variants && product.variants.length > 0 && (
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                Available Lot Options &amp; Variants
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 shadow-2xs flex items-center gap-1.5"
                  >
                    <span className="text-neutral-500 text-[11px]">{v.label}:</span>
                    <span className="font-bold text-amber-700">{v.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wholesale Quantity Stepper (Wholesale focused, not retail cart) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Wholesale Order Quantity (Pcs)
            </label>
            <div className="flex items-stretch gap-3">
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => handleStep("down")}
                  className="px-4 py-3 hover:bg-neutral-100 text-neutral-600 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))
                  }
                  className="w-20 text-center font-black text-sm text-neutral-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleStep("up")}
                  className="px-4 py-3 hover:bg-neutral-100 text-neutral-600 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Subtotal Pill */}
              <div className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                  Estimated Lot Value
                </span>
                <span className="text-base font-black text-neutral-900">
                  ₹{lineTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Preferential Volume Price Slabs */}
          <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white text-xs">
            <div className="bg-neutral-100 px-3.5 py-2 font-bold text-neutral-700 border-b border-neutral-200 flex justify-between">
              <span>Volume Slab</span>
              <span>Wholesale Rate</span>
            </div>
            <div className="divide-y divide-neutral-100">
              <div
                className={`px-3.5 py-2 flex justify-between items-center ${
                  quantity < tier2Qty ? "bg-amber-50/70 font-bold text-amber-900" : ""
                }`}
              >
                <span>{tier1Qty} – {tier2Qty - 1} pcs (Base MOQ)</span>
                <span className="font-black">₹{tier1Price}/pc</span>
              </div>
              <div
                className={`px-3.5 py-2 flex justify-between items-center ${
                  quantity >= tier2Qty && quantity < tier3Qty
                    ? "bg-amber-50/70 font-bold text-amber-900"
                    : ""
                }`}
              >
                <span>{tier2Qty} – {tier3Qty - 1} pcs (Master Carton)</span>
                <span className="font-black text-emerald-700">₹{tier2Price}/pc (8% Off)</span>
              </div>
              <div
                className={`px-3.5 py-2 flex justify-between items-center ${
                  quantity >= tier3Qty ? "bg-amber-50/70 font-bold text-amber-900" : ""
                }`}
              >
                <span>{tier3Qty}+ pcs (Container / Pallet)</span>
                <span className="font-black text-emerald-700">₹{tier3Price}/pc (15% Off)</span>
              </div>
            </div>
          </div>

          {/* Wholesale Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Outline Button: Add to Wholesale Quote Basket */}
            <button
              type="button"
              onClick={handleAddToQuoteBasket}
              className={`w-full py-3.5 px-4 rounded-xl border-2 text-sm font-black tracking-wide uppercase transition flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                added
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-white border-[#e03a3a] text-[#e03a3a] hover:bg-rose-50"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>{added ? "Added to Quote Basket ✓" : "Add to Wholesale Quote Basket"}</span>
            </button>

            {/* Primary Coral/Red Button: Buy Wholesale Lot Now */}
            <Link
              href={`/enquiry?product=${encodeURIComponent(product.name)}&qty=${quantity}`}
              className="w-full py-3.5 px-4 rounded-xl bg-[#e03a3a] hover:bg-[#c92f2f] text-white text-sm font-black tracking-wide uppercase transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Buy Wholesale Lot (Instant Proforma)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* WhatsApp Wholesale Desk Button */}
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Inquire on WhatsApp Desk (Instant Rate Negotiation)</span>
            </a>
          </div>

          {/* Pickup & Commercial Logistics Details (Exact Candlemould Style) */}
          <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span>
                  Pickup available at{" "}
                  <strong className="text-neutral-900">
                    {product.pickupHub || "Niral Industries, Mulund (W), Mumbai"}
                  </strong>
                </span>
                <p className="text-neutral-500 text-[11px] mt-0.5">
                  Usually ready in 2-4 days. Verified GST Invoice and E-Way Bills provided.
                </p>
                <Link
                  href="/policies/shipping"
                  className="text-amber-600 font-bold hover:underline text-[11px]"
                >
                  View store information &amp; logistics policy
                </Link>
              </div>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="pt-4 border-t border-neutral-200 flex items-center gap-3 text-xs text-neutral-500">
            <span className="font-bold text-neutral-700">Share this:</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition text-[11px] font-bold"
                title="Share on Facebook"
              >
                f
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition text-[11px] font-bold"
                title="Share on X"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center hover:opacity-90 transition text-[11px] font-bold"
                title="Share on LinkedIn"
              >
                in
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?description=${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center hover:opacity-90 transition text-[11px] font-bold"
                title="Share on Pinterest"
              >
                P
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          3. PRODUCT SPECIFICATIONS & DESCRIPTION TABS
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-neutral-200 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("desc")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "desc"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Product Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "specs"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("packaging")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "packaging"
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Master Carton &amp; Logistics
          </button>
        </div>

        {activeTab === "desc" && (
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed max-w-4xl">
            <p>{product.detailedDescription || product.description}</p>
            <p>
              All lots are manufactured under rigorous QA standards, inspected for finish consistency, and packed in heavy-duty export master cartons to withstand interstate transit across India.
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div
                key={key}
                className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between"
              >
                <span className="font-bold text-neutral-600">{key}:</span>
                <span className="font-semibold text-neutral-900">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "packaging" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-bold block">Units per Master Carton</span>
              <span className="text-xl font-black text-neutral-900">
                {product.packaging.unitsPerCarton} Pcs
              </span>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-bold block">Carton Dimensions</span>
              <span className="text-base font-black text-neutral-900">
                {product.packaging.cartonDimensions}
              </span>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-bold block">Gross Master Weight</span>
              <span className="text-xl font-black text-neutral-900">
                {product.packaging.grossWeight}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          4. "YOU MAY ALSO LIKE" SECTION (Exact Match Candlemould Image 2)
          ========================================================= */}
      <div className="pt-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            You may also like
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Complementary factory lots with shared freight dispatch
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedProducts.map((rel) => {
            const relDiscount = Math.round(((rel.mrp - rel.price) / rel.mrp) * 100);

            return (
              <div
                key={rel.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between group"
              >
                {/* Visual Thumbnail */}
                <Link
                  href={`/product/${rel.slug}`}
                  className="relative aspect-square bg-white border-b border-neutral-100 p-3 flex flex-col items-center justify-center overflow-hidden"
                >
                  {rel.image ? (
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-amber-400/30 border border-amber-400/50 flex items-center justify-center group-hover:scale-110 transition duration-300">
                      <Flame className="w-8 h-8 text-amber-600" />
                    </div>
                  )}

                  {/* Save XX% Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded bg-[#e03a3a] text-white text-[10px] font-black uppercase tracking-wider">
                      Save {relDiscount}%
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-3 space-y-1.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[11px] text-neutral-400 line-through">
                      Rs. {rel.mrp.toFixed(2)}
                    </div>
                    <div className="text-base font-black text-[#e03a3a]">
                      Rs. {rel.price.toFixed(2)}
                    </div>
                    <Link
                      href={`/product/${rel.slug}`}
                      className="text-xs font-bold text-neutral-800 line-clamp-2 hover:text-amber-600 transition leading-snug mt-1"
                    >
                      {rel.name}
                    </Link>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">
                      {rel.sku}
                    </span>
                  </div>

                  <Link
                    href={`/product/${rel.slug}`}
                    className="w-full mt-2 py-1.5 rounded-lg bg-neutral-100 hover:bg-amber-500 hover:text-stone-950 text-neutral-700 text-xs font-bold text-center transition block"
                  >
                    View Wholesale Lot
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
