"use client";

import { useState } from "react";
import {
  Settings,
  Building,
  Shield,
  MessageSquare,
  Mail,
  CheckCircle2,
  Save,
  Percent,
  Clock,
  MapPin,
  Phone,
  FileText,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [companyName, setCompanyName] = useState("V&A Global Sourcing Wholesale Trading & Distribution Pvt Ltd");
  const [gstin, setGstin] = useState("27AABCP1234F1Z5");
  const [whatsappNumber, setWhatsappNumber] = useState("+91 98765 43210");
  const [inquiryEmail, setInquiryEmail] = useState("trade@V&A Global Sourcing.in");
  const [quoteValidityDays, setQuoteValidityDays] = useState("7");
  const [defaultGstRate, setDefaultGstRate] = useState("18");
  const [warehouseAddress, setWarehouseAddress] = useState(
    "Plot No. 42-B, Logistics Central Corridor, Bhiwandi, Maharashtra — 421302"
  );
  const [savedNotification, setSavedNotification] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification("Commercial enterprise settings saved successfully.");
    setTimeout(() => setSavedNotification(""), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5" /> Institutional Configuration
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Commercial Operations & Portal Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage legal trade registration, default GST billing parameters, quotation validity, and trade desk routing.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </div>

      {savedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedNotification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Legal Entity Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-blue-600" /> Statutory Business Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Corporate Entity Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State GST Identification Number (GSTIN)
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Central Dispatch Warehouse
              </label>
              <input
                type="text"
                value={warehouseAddress}
                onChange={(e) => setWarehouseAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Trade Desk & Communication Routing */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600" /> Commercial Communications & WhatsApp Desk
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Trade Desk WhatsApp Routing Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                All public "Enquire on WhatsApp" clicks route directly to this trade desk number.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Inbound RFQ Leads Dispatch Email
              </label>
              <input
                type="email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Instant lead notification copy delivered when a buyer completes the quotation form.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Billing & Quotation Parameters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-amber-600" /> Proforma Quotation & Tax Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Standard Goods & Services Tax (GST %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={defaultGstRate}
                  onChange={(e) => setDefaultGstRate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Applied automatically in the Proforma Quotation Engine for tax invoice line items.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Proforma Invoice Validity Window (Days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={quoteValidityDays}
                  onChange={(e) => setQuoteValidityDays(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">Days</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Default validity timestamp stamped on generated PDF & WhatsApp proforma invoices.
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
