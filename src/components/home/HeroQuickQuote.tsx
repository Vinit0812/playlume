"use client";

import { useState } from "react";
import { Send, CheckCircle2, FileText, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function HeroQuickQuote() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    category: "Toys & Games",
    quantity: "50",
    destinationState: "Maharashtra",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone) return;
    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: formData.businessName,
          businessName: formData.businessName,
          phone: formData.phone,
          whatsappNumber: formData.phone,
          productName: `${formData.category} Bulk Lot (${formData.quantity} pcs)`,
          quantity: parseInt(formData.quantity) || 50,
          state: formData.destinationState,
          additionalRequirements: `Instant Homepage RFQ. Selected: ${formData.category}, Target: ${formData.destinationState}.`,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Quote submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-7 text-neutral-text shadow-xl border border-line text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-extrabold text-brand-950">Quotation Request Logged</h3>
        <p className="text-xs text-neutral-muted max-w-xs mx-auto leading-relaxed">
          Your requirement has been routed to our trade desk. An official proforma quotation with GST and freight terms will be shared via WhatsApp shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:underline pt-2"
        >
          Submit Another Request →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-line text-neutral-text relative z-10">
      <div className="mb-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 block mb-1">
          Instant Sourcing Estimate
        </span>
        <h2 className="text-lg font-black text-brand-950 tracking-tight">
          Request Wholesale Pricing
        </h2>
        <p className="text-xs text-neutral-muted mt-0.5">
          Select merchandise division and lot volume for fast quotation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-bold text-neutral-text mb-1">
            Merchandise Division
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2.5 font-semibold text-neutral-text focus:outline-none focus:border-brand-500"
          >
            <option>Toys &amp; Games (MOQ 50)</option>
            <option>Clothing &amp; Apparel (MOQ 30)</option>
            <option>Watches &amp; Horology (MOQ 25)</option>
            <option>Consumer Electronics (MOQ 20)</option>
            <option>Home &amp; Kitchen (MOQ 24)</option>
            <option>Office &amp; Stationery (MOQ 100)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-neutral-text mb-1">
              Required Volume
            </label>
            <input
              type="number"
              min="20"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="e.g. 100 pcs"
              className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2 text-neutral-text font-semibold focus:outline-none focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-text mb-1">
              Destination State
            </label>
            <input
              type="text"
              value={formData.destinationState}
              onChange={(e) => setFormData({ ...formData, destinationState: e.target.value })}
              placeholder="e.g. Gujarat"
              className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2 text-neutral-text font-semibold focus:outline-none focus:border-brand-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-neutral-text mb-1">
            Business / Store Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g. Apex Retail Mart"
            className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2 text-neutral-text font-semibold focus:outline-none focus:border-brand-500"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-neutral-text mb-1">
            Mobile / WhatsApp Contact
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit number"
            className="w-full bg-surface-2 border border-line-strong rounded-xl px-3 py-2 text-neutral-text font-semibold focus:outline-none focus:border-brand-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent-400 hover:bg-accent-300 text-brand-950 font-extrabold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50"
        >
          {loading ? (
            <span>Processing Estimate...</span>
          ) : (
            <>
              <span>Get Wholesale Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-neutral-subtle pt-1">
          ✓ Verified factory rates • No consumer retail spam • Fast WhatsApp dispatch
        </p>
      </form>
    </div>
  );
}
