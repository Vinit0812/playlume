import type { Metadata } from "next";
import Link from "next/link";
import { Users, Phone, MessageSquare, MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Buyers Database — PLAYLUME Admin" };

export default function AdminBuyersPage() {
  const sampleBuyers = [
    {
      id: 1,
      name: "Ramesh Patel",
      businessName: "Patel Retail Enterprises",
      type: "Retail Showroom",
      phone: "+91 98250 11223",
      whatsapp: "919825011223",
      location: "Surat, Gujarat",
      status: "Active",
      registeredAt: "Nov 24, 2026",
    },
    {
      id: 2,
      name: "Harish Iyer",
      businessName: "South India Distributors",
      type: "Commercial Distributor",
      phone: "+91 98400 44556",
      whatsapp: "919840044556",
      location: "Chennai, Tamil Nadu",
      status: "Active",
      registeredAt: "Nov 22, 2026",
    },
    {
      id: 3,
      name: "Mukesh Agarwal",
      businessName: "Agarwal Stationery Mart",
      type: "Regional Wholesaler",
      phone: "+91 98300 77889",
      whatsapp: "919830077889",
      location: "Kolkata, West Bengal",
      status: "Active",
      registeredAt: "Nov 20, 2026",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-950">Commercial Buyers Master Database</h1>
        <p className="text-xs text-slate-500 mt-0.5">Maintain verified commercial retailers, regional stockists, and wholesale distributors.</p>
      </div>

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
              {sampleBuyers.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{b.name}</span>
                    <span className="text-slate-500 text-[11px] block">{b.businessName}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{b.type}</td>
                  <td className="p-4 text-slate-600">{b.location}</td>
                  <td className="p-4 font-mono text-[11px]">{b.phone}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{b.registeredAt}</td>
                  <td className="p-4 text-right">
                    <a
                      href={`https://wa.me/${b.whatsapp}?text=Hello%20${encodeURIComponent(b.name)}%2C%20this%20is%20PLAYLUME%20Wholesale%20Desk.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hover:bg-emerald-100 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
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
