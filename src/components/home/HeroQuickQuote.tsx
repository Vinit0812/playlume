"use client";

import { useState } from "react";
import { Send, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroQuickQuote() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    category: "Toys & Educational",
    quantity: "",
    destinationState: "",
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
          productName: `${formData.category} (${formData.quantity || "Bulk"} units)`,
          state: formData.destinationState,
          additionalRequirements: `Quick RFQ from Homepage Hero. Destination: ${formData.destinationState || "Not specified"}.`,
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
      <div className="bg-white rounded-2xl p-7 text-slate-900 shadow-2xl border border-slate-200/90 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-950">Commercial RFQ Received</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Our wholesale desk has logged your requirement. An official quotation will be shared via WhatsApp within 30 minutes.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-7 text-slate-900 shadow-2xl border border-slate-200/90 relative">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Commercial Quote Engine</div>
          <h3 className="text-lg font-bold text-slate-950 mt-0.5">Instant Wholesale Enquiry</h3>
        </div>
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
          <FileText className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Company / Trading Entity Name *</label>
          <input
            type="text"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g. Mahavir Enterprises Ltd."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business WhatsApp *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Merchandise Division</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition font-medium"
            >
              <option value="Toys & Educational">Toys & Educational</option>
              <option value="Watches & Horology">Watches & Horology</option>
              <option value="Apparel & Textiles">Apparel & Textiles</option>
              <option value="Consumer Electronics">Consumer Electronics</option>
              <option value="Home & Kitchenware">Home & Kitchenware</option>
              <option value="Office & Stationery">Office & Stationery</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Estimated Quantity</label>
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="e.g. 50, 100, 500 pcs"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Destination State</label>
            <input
              type="text"
              value={formData.destinationState}
              onChange={(e) => setFormData({ ...formData, destinationState: e.target.value })}
              placeholder="e.g. Maharashtra, Delhi"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition text-xs tracking-wide shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
        >
          <span>{loading ? "Transmitting RFQ..." : "Transmit Commercial Enquiry"}</span>
          <Send className="w-4 h-4 text-amber-400" />
        </button>
      </form>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
          Formal Quotation in 30 Mins
        </span>
        <span>Confidential Sourcing</span>
      </div>
    </div>
  );
}
