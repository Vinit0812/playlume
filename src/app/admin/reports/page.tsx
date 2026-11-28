"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  Package,
  FileCheck2,
  Users,
  Building2,
  DollarSign,
} from "lucide-react";

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const divisionBreakdown = [
    { name: "Electronics & Tech", volume: "₹ 48.5 L", percent: 34, growth: "+18.2%", color: "bg-blue-600" },
    { name: "Clothing & Apparel", volume: "₹ 32.1 L", percent: 22, growth: "+12.4%", color: "bg-indigo-600" },
    { name: "Watches & Horology", volume: "₹ 24.8 L", percent: 17, growth: "+8.9%", color: "bg-amber-500" },
    { name: "Toys & Games", volume: "₹ 18.4 L", percent: 13, growth: "+21.5%", color: "bg-emerald-500" },
    { name: "Home & Kitchen", volume: "₹ 12.6 L", percent: 9, growth: "+5.1%", color: "bg-rose-500" },
    { name: "Stationery & Office", volume: "₹ 7.2 L", percent: 5, growth: "+3.8%", color: "bg-slate-600" },
  ];

  const regionalDispatches = [
    { state: "Maharashtra (Mumbai/Pune Hub)", orders: 142, volume: "₹ 44.8 L", share: "31%" },
    { state: "Delhi NCR (Gurugram/Noida)", orders: 118, volume: "₹ 38.2 L", share: "27%" },
    { state: "Gujarat (Surat/Ahmedabad)", orders: 84, volume: "₹ 26.5 L", share: "18%" },
    { state: "Karnataka (Bengaluru Central)", orders: 62, volume: "₹ 19.4 L", share: "14%" },
    { state: "Tamil Nadu (Chennai Distribution)", orders: 45, volume: "₹ 14.7 L", share: "10%" },
  ];

  const exportReport = (format: string) => {
    alert(`Generating commercial wholesale report in ${format.toUpperCase()} format. Downloading...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" /> Institutional BI
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Wholesale Trade Analytics & Financial Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time pipeline volume, category velocity, regional freight dispatches, and quotation conversion ratios.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-sm focus:outline-none"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Q4 Financial Year</option>
            <option>Full Fiscal Year 2026-27</option>
          </select>

          <button
            onClick={() => exportReport("csv")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Quotation Pipeline
          </span>
          <div className="text-2xl font-extrabold text-slate-900">₹ 1.43 Cr</div>
          <div className="mt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.6% vs previous cycle
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Confirmed Wholesale Lots
          </span>
          <div className="text-2xl font-extrabold text-slate-900">451 Lots</div>
          <div className="mt-2 text-[11px] font-semibold text-blue-600">
            Average Lot Size: ₹ 31,800
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Lead-to-Quote Conversion
          </span>
          <div className="text-2xl font-extrabold text-slate-900">42.8%</div>
          <div className="mt-2 text-[11px] font-semibold text-emerald-600">
            182 Proforma Invoices issued
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Verified Buyers
          </span>
          <div className="text-2xl font-extrabold text-slate-900">1,280</div>
          <div className="mt-2 text-[11px] font-semibold text-amber-600">
            +38 onboarded this week
          </div>
        </div>
      </div>

      {/* Grid: Division Breakdown & Regional Dispatches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Merchandise Division Turnover */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" /> Turnover by Merchandise Division
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{dateRange}</span>
          </div>

          <div className="space-y-4">
            {divisionBreakdown.map((div) => (
              <div key={div.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{div.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-900">{div.volume}</span>
                    <span className="text-emerald-600 font-semibold text-[11px]">{div.growth}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`${div.color} h-2 rounded-full`} style={{ width: `${div.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Freight Dispatches */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" /> Regional Freight Dispatches
            </h3>
            <span className="text-xs text-slate-400 font-semibold">By Consignment Value</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                  <th className="pb-3">Destination Hub</th>
                  <th className="pb-3 text-right">Orders</th>
                  <th className="pb-3 text-right">Volume</th>
                  <th className="pb-3 text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {regionalDispatches.map((reg) => (
                  <tr key={reg.state} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-900">{reg.state}</td>
                    <td className="py-3 text-right">{reg.orders}</td>
                    <td className="py-3 text-right font-bold text-slate-900">{reg.volume}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                        {reg.share}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
