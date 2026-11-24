"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { INDIAN_STATES, SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import {
  FileText,
  Send,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

function EnquiryForm() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";
  const prefillMoq = searchParams.get("moq") || "";
  const prefillSku = searchParams.get("sku") || "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      productName: prefillProduct ? `${prefillProduct} (${prefillSku})` : "",
      quantity: prefillMoq ? parseInt(prefillMoq) : undefined,
    },
  });

  async function onSubmit(data: EnquiryFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Enquiry submission failed:", error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-950">Commercial RFQ Transmitted</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Your inquiry has been routed to our commercial sourcing desk. A formal proforma quotation detailing volume brackets, GST, and dispatch schedules will be delivered within 30 minutes.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20PLAYLUME%2C%20I%20have%20just%20submitted%20a%20commercial%20RFQ%20on%20your%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-emerald-600/25"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirm over WhatsApp Commercial Desk</span>
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Submit another wholesale requirement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Direct Trade Desk
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2">
            Request Commercial Quotation (RFQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Submit your required merchandise specifications, volume quantities, and delivery pin code. We provide GST compliant proforma pricing.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl shrink-0 text-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/40">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">Direct Factory Supply</div>
            <div className="text-[10px] text-slate-400">Strictly for business buyers</div>
          </div>
        </div>
      </div>

      {/* Form & Sidebar Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Entity Information */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                1. Buyer & Trading Entity Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    {...register("buyerName")}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                  {errors.buyerName && (
                    <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.buyerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Firm / Trade Entity Name
                  </label>
                  <input
                    {...register("businessName")}
                    placeholder="e.g. Apex Wholesalers LLP"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Mobile Number *
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                  {errors.phone && (
                    <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business WhatsApp (For RFQ Delivery)
                  </label>
                  <input
                    {...register("whatsappNumber")}
                    placeholder="Same as mobile or different"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Email (Optional)
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="procurement@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                2. Destination Logistics Location
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Destination State
                  </label>
                  <select
                    {...register("state")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition font-medium"
                  >
                    <option value="">Select Indian State / UT</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination City / Pin Code
                  </label>
                  <input
                    {...register("city")}
                    placeholder="e.g. Mumbai, 400001"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Merchandise Requirements */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                3. Merchandise & Volume Requirement
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product / SKU Description
                  </label>
                  <input
                    {...register("productName")}
                    placeholder="e.g. LCD Writing Tablet (PL-TAB-85)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Order Quantity (Units)
                  </label>
                  <input
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g. 50, 100, 500 pcs"
                    min={1}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Commercial Instructions / Packaging Needs
                </label>
                <textarea
                  {...register("additionalRequirements")}
                  rows={3}
                  placeholder="Mention required color breakdowns, delivery target dates, custom branding specifications, or target price point..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 outline-none transition resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-4 rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Transmitting RFQ..." : "Submit Commercial RFQ"}</span>
              <Send className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-950 text-sm">Wholesale Sourcing Desk</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900">Commercial Sales</span>
                  <span>{SITE_CONFIG.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-slate-900">Email RFQ Desk</span>
                  <span>{SITE_CONFIG.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-3 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Trading Policy</span>
            <h4 className="font-bold text-sm text-white">Commercial Trade Terms</h4>
            <ul className="space-y-2 text-slate-400 text-[11px] leading-relaxed">
              <li>• Orders are fulfilled in standard master carton ratios.</li>
              <li>• GST tax invoices provided with every consignment.</li>
              <li>• Transportation charges confirmed prior to final dispatch.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main className="flex-1 py-12 px-4 max-w-5xl mx-auto w-full">
        <Suspense fallback={<div className="text-center py-20 text-xs font-semibold text-slate-400">Loading Commercial RFQ Form...</div>}>
          <EnquiryForm />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
