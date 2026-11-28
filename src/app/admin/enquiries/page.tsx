"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS, SITE_CONFIG } from "@/lib/constants";
import { Inbox, MessageSquare, Phone, FileCheck2, ArrowRight, RefreshCw, Search, MapPin } from "lucide-react";

interface Enquiry {
  id: string;
  buyerName: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  location: string;
  product: string;
  quantity: number;
  status: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (e) {
      console.error("Failed to fetch enquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const res = await fetch("/api/enquiries");
        const json = await res.json();
        if (active && json.data && Array.isArray(json.data)) {
          setEnquiries(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch enquiries:", e);
      } finally {
        if (active) setLoading(false);
      }
    }
    void init();
    return () => {
      active = false;
    };
  }, []);

  const filtered = enquiries.filter((enq) => {
    const matchesStatus = selectedStatus === "all" || enq.status === selectedStatus;
    const matchesSearch =
      enq.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      enq.businessName.toLowerCase().includes(search.toLowerCase()) ||
      enq.product.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Inbox className="w-3.5 h-3.5" /> Commercial CRM
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950">Buyer Enquiries Pipeline (CRM)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and convert wholesale inquiries from initial lead to confirmed consignment dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <div className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold">
            {enquiries.length} Active Leads
          </div>
        </div>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by buyer, firm name, SKU, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap text-xs">
          {["all", "new", "quotation_sent", "confirmed"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-2 rounded-xl font-bold uppercase text-[11px] transition ${
                selectedStatus === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Ref ID</th>
                <th className="p-4">Buyer & Commercial Entity</th>
                <th className="p-4">Product Lot & Requested Volume</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((enq) => {
                const statusColor =
                  ENQUIRY_STATUS_COLORS[enq.status as keyof typeof ENQUIRY_STATUS_COLORS] ||
                  "bg-slate-100 text-slate-700 border-slate-200";
                const statusLabel =
                  ENQUIRY_STATUS_LABELS[enq.status as keyof typeof ENQUIRY_STATUS_LABELS] || enq.status;

                return (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-mono font-bold text-slate-900">{enq.id}</td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{enq.buyerName}</span>
                      <span className="text-slate-500 text-[11px] block">{enq.businessName}</span>
                      <span className="text-slate-400 font-mono text-[10px] block">{enq.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-900 block max-w-xs truncate">{enq.product}</span>
                      <span className="text-blue-600 font-bold text-[11px] block mt-0.5">
                        Qty: {enq.quantity.toLocaleString()} pcs
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 flex items-center gap-1.5 pt-4">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{enq.location}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-[11px] font-medium">
                      {enq.createdAt === "Just now" ? (
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-extrabold text-[10px]">
                          NEW
                        </span>
                      ) : (
                        enq.createdAt
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/quotations?enquiryId=${enq.id}&buyer=${encodeURIComponent(
                            enq.buyerName
                          )}&product=${encodeURIComponent(enq.product)}&quantity=${enq.quantity}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-bold hover:bg-blue-100 transition"
                          title="Generate Proforma Quotation"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Quote</span>
                        </Link>
                        <a
                          href={`https://wa.me/${enq.whatsapp}?text=Hello%20${encodeURIComponent(
                            enq.buyerName
                          )}%2C%20regarding%20your%20quotation%20request%20for%20${encodeURIComponent(
                            enq.product
                          )}%20(${enq.quantity}%20pcs)...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hover:bg-emerald-100 transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No enquiries found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
