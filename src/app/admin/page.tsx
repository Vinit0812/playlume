import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  Inbox,
  Users,
  FileCheck2,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = { title: "Executive Dashboard — V&A Global Sourcing Admin" };

export default function AdminDashboard() {
  const stats = [
    { label: "Active Products", value: "9 Lots", icon: Package, href: "/admin/products", color: "bg-blue-50 text-blue-700" },
    { label: "Pending Enquiries", value: "3 New", icon: Inbox, href: "/admin/enquiries", color: "bg-amber-50 text-amber-700" },
    { label: "Registered Buyers", value: "14 Accounts", icon: Users, href: "/admin/buyers", color: "bg-emerald-50 text-emerald-700" },
    { label: "Quotations Issued", value: "8 Active", icon: FileCheck2, href: "/admin/quotations", color: "bg-purple-50 text-purple-700" },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Commercial Management Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time overview of product catalogue, buyer leads, and commercial quotations.</p>
        </div>
        <div className="flex gap-2.5">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Wholesale Lot</span>
          </Link>
          <Link
            href="/admin/quotations"
            className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Draft Proforma Quote</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-950">{s.value}</div>
              <div className="text-[11px] font-semibold text-blue-600 mt-2 flex items-center gap-1">
                <span>Manage records</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Middle Grid: Quick Actions + Pipeline Status */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-950">Active Buyer Inquiries Pipeline (CRM)</h2>
              <p className="text-xs text-slate-500">Live leads received from public website & WhatsApp desk.</p>
            </div>
            <Link href="/admin/enquiries" className="text-xs font-bold text-blue-600 hover:underline">
              View All Pipeline
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-950 block">Rajesh Wholesalers (Surat, Gujarat)</span>
                <span className="text-slate-500 text-[11px]">Interested in: LCD Writing Tablet (PL-TAB-85) • 100 pcs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                  New Lead
                </span>
                <Link href="/admin/enquiries" className="text-blue-600 font-bold hover:underline">
                  Respond
                </Link>
              </div>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-950 block">Metro Retail Chain (Mumbai, Maharashtra)</span>
                <span className="text-slate-500 text-[11px]">Interested in: Combed Cotton T-Shirts (PL-TEX-180) • 300 pcs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold">
                  Quotation Sent
                </span>
                <Link href="/admin/enquiries" className="text-blue-600 font-bold hover:underline">
                  Track
                </Link>
              </div>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-950 block">Elite Timepieces (Chandni Chowk, Delhi)</span>
                <span className="text-slate-500 text-[11px]">Interested in: Analog Quartz Mesh Watch (PL-WTC-01) • 50 pcs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                  Confirmed
                </span>
                <Link href="/admin/enquiries" className="text-blue-600 font-bold hover:underline">
                  Dispatch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Operations Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-950">Wholesale Operations</h2>
          <div className="space-y-2.5 text-xs">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-100"
            >
              <span className="font-semibold text-slate-800">Add New Product Lot</span>
              <Plus className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-100"
            >
              <span className="font-semibold text-slate-800">Manage 6 Product Divisions</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/quotations"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-100"
            >
              <span className="font-semibold text-slate-800">Proforma Quotation Generator</span>
              <FileCheck2 className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/buyers"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-100"
            >
              <span className="font-semibold text-slate-800">Buyer Master Database</span>
              <Users className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
