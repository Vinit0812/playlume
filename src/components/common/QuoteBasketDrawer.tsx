"use client";

import { useQuoteBasket } from "@/context/QuoteBasketContext";
import { X, Trash2, Plus, Minus, ArrowRight, MessageSquare, Package, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function QuoteBasketDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearBasket, estimatedTotal } =
    useQuoteBasket();

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello V&A Global Sourcing Trade Desk, I would like a formal wholesale quotation for the following items:\n\n` +
      items
        .map(
          (i, idx) =>
            `${idx + 1}. ${i.name} (SKU: ${i.sku})\n   Quantity: ${i.quantity} pcs @ ₹${i.price}/pc = ₹${(
              i.price * i.quantity
            ).toLocaleString()}`
        )
        .join("\n\n") +
      `\n\nTotal Estimated Value: ₹${estimatedTotal.toLocaleString()}\nPlease share official proforma quote with GST & freight.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-line flex items-center justify-between bg-surface-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center font-bold text-sm">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-neutral-text">Bulk Quote Basket</h3>
                <span className="text-[11px] text-neutral-muted">
                  {items.length} {items.length === 1 ? "line item" : "line items"} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-neutral-muted space-y-3">
                <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-neutral-text">Your Quote Basket is empty</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Browse products across our 6 wholesale divisions and click &quot;Add to Quote&quot; to build your commercial inquiry.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:underline pt-2"
                >
                  Explore Catalogue →
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-line bg-surface hover:border-line-strong transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block">
                        {item.sku}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-text line-clamp-2">{item.name}</h4>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-neutral-muted text-[11px]">Wholesale Rate: </span>
                      <strong className="text-brand-800">₹{item.price}</strong>
                      <span className="text-[10px] text-neutral-muted"> /pc</span>
                      <div className="text-[10px] text-neutral-muted">
                        Min. Order: {item.moq} pcs
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-line-strong rounded-lg bg-surface overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - item.moq)}
                        disabled={item.quantity <= item.moq}
                        className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center text-xs font-bold text-neutral-text">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + item.moq)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600">
                    <span>Line Total:</span>
                    <strong className="text-neutral-text font-bold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-line bg-surface-2 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-muted font-medium">Est. Wholesale Subtotal:</span>
                  <p className="text-[10px] text-neutral-subtle">Ex-warehouse. GST &amp; freight computed on invoice.</p>
                </div>
                <div className="text-xl font-extrabold text-brand-900">
                  ₹{estimatedTotal.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <Link
                  href={`/enquiry?basket=1&count=${items.length}`}
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>Submit Commercial RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Send Quote to WhatsApp Desk</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
