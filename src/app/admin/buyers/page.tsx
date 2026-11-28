"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Phone, MessageSquare, MapPin, Search, RefreshCw, UserCheck } from "lucide-react";

interface Buyer {
  id: number;
  name: string;
  businessName: string;
  type: string;
  phone: string;
  whatsapp: string;
  location: string;
  status: string;
  registeredAt: string;
}

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchBuyers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/buyers");
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setBuyers(json.data);
      }
    } catch (e) {
      console.error("Failed to fetch buyers:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const res = await fetch("/api/buyers");
        const json = await res.json();
        if (active && json.data && Array.isArray(json.data)) {
          setBuyers(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch buyers:", e);
      } finally {
        if (active) setLoading(false);
      }
    }
    void init();
    return () => {
      active = false;
    };
  }, []);

  const filtered = buyers.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.businessName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || b.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" /> Buyer Master CRM
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950">Commercial Buyers Master Database</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time feed of registered retailers, regional stockists, wholesalers, and institutional distributors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBuyers}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            title="Refresh List"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <div className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold">
            {buyers.length} Total Registered
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by buyer name, firm, phone number, or state/city..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-sm focus:outline-none"
        >
          <option value="all">All Trade Classifications</option>
          <option value="retailer">Retail Showroom</option>
          <option value="wholesaler">Regional Wholesaler</option>
          <option value="distributor">Commercial Distributor</option>
        </select>
      </div>

      {/* Buyers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Buyer & Commercial Entity</th>
                <th className="p-4">Trade Classification</th>
                <th className="p-4">Location</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Enrolled</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{b.name}</span>
                    <span className="text-slate-500 text-[11px] block">{b.businessName}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-slate-700 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px]">
                      {b.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 flex items-center gap-1.5 pt-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{b.location}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px]">{b.phone}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-[11px] font-medium">
                    {b.registeredAt === "Just now" ? (
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-extrabold text-[10px]">
                        NEW
                      </span>
                    ) : (
                      b.registeredAt
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={`https://wa.me/${b.whatsapp}?text=Hello%20${encodeURIComponent(
                        b.name
                      )}%2C%20this%20is%20V&A Global Sourcing%20Wholesale%20Desk.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hover:bg-emerald-100 transition shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No buyers found matching your search.
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
