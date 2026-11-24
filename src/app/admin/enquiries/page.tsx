import type { Metadata } from "next";
import Link from "next/link";
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS, SITE_CONFIG } from "@/lib/constants";
import { Inbox, MessageSquare, Phone, FileCheck2, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Enquiries CRM Pipeline — PLAYLUME Admin" };

export default function AdminEnquiriesPage() {
  const sampleEnquiries = [
    {
      id: "ENQ-101",
      buyerName: "Rajesh Sharma",
      businessName: "Rajesh Wholesalers",
      phone: "+91 98251 23456",
      whatsapp: "919825123456",
      location: "Surat, Gujarat",
      product: "8.5\" Digital LCD Drawing Board (PL-TAB-85)",
      quantity: 100,
      status: "new",
      createdAt: "Today, 14:30",
    },
    {
      id: "ENQ-102",
      buyerName: "Vikram Mehta",
      businessName: "Metro Retail Chain",
      phone: "+91 98111 67890",
      whatsapp: "919811167890",
      location: "Mumbai, Maharashtra",
      product: "180 GSM Bio-Washed Combed Cotton T-Shirt (PL-TEX-180)",
      quantity: 300,
      status: "quotation_sent",
      createdAt: "Yesterday",
    },
    {
      id: "ENQ-103",
      buyerName: "Anand Gupta",
      businessName: "Elite Timepieces",
      phone: "+91 98990 12345",
      whatsapp: "919899012345",
      location: "Delhi, North",
      product: "Ultra-Thin Minimalist Quartz Watch (PL-WTC-01)",
      quantity: 50,
      status: "confirmed",
      createdAt: "Nov 23, 2026",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Buyer Enquiries Pipeline (CRM)</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track and convert wholesale inquiries from initial lead to confirmed consignment dispatch.</p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 flex-wrap text-xs">
        {["all", "new", "contacted", "quotation_sent", "negotiation", "confirmed", "completed"].map((st) => (
          <button
            key={st}
            className={`px-3.5 py-1.5 rounded-xl font-bold border transition ${
              st === "all"
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {st === "all" ? "All Inquiries" : ENQUIRY_STATUS_LABELS[st]}
          </button>
        ))}
      </div>

      {/* CRM Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Ref & Buyer Entity</th>
                <th className="p-4">Merchandise & Volume</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received</th>
                <th className="p-4 text-right">Commercial Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 block">{enq.id}</span>
                    <span className="font-bold text-slate-900 block mt-0.5">{enq.buyerName}</span>
                    <span className="text-slate-500 text-[11px] block">{enq.businessName}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-900 block max-w-xs truncate">{enq.product}</span>
                    <span className="font-bold text-blue-700 block mt-0.5">{enq.quantity} Units</span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{enq.location}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                        ENQUIRY_STATUS_COLORS[enq.status]
                      }`}
                    >
                      {ENQUIRY_STATUS_LABELS[enq.status]}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{enq.createdAt}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`https://wa.me/${enq.whatsapp}?text=${encodeURIComponent(
                          `Hello ${enq.buyerName}, regarding your wholesale enquiry on PLAYLUME for ${enq.product} (${enq.quantity} pcs), here is your quotation update:`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <Link
                        href="/admin/quotations"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800 transition"
                      >
                        <span>Draft Quote</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
