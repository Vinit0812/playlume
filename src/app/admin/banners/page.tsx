"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Eye,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  division: string;
  ctaText: string;
  ctaLink: string;
  position: "Hero Main" | "Category Featured" | "Trending Strip";
  status: "active" | "inactive";
  impressionCount: number;
  clickCount: number;
  bgColor: string;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerItem[]>([
    {
      id: 1,
      title: "Direct Manufacturer Sourcing: Q4 Bulk Import Lots",
      subtitle: "Verified MOQs across Toys, Electronics, Apparel, and Horology.",
      division: "All Divisions",
      ctaText: "Explore Catalogue",
      ctaLink: "/products",
      position: "Hero Main",
      status: "active",
      impressionCount: 14820,
      clickCount: 1940,
      bgColor: "from-blue-900 to-slate-950",
    },
    {
      id: 2,
      title: "Electronic Peripherals & GaN Charging Hubs",
      subtitle: "Master carton factory rates for corporate procurement & super-stockists.",
      division: "Electronics & Tech",
      ctaText: "Request Bulk Quote",
      ctaLink: "/enquiry?category=electronics-tech",
      position: "Category Featured",
      status: "active",
      impressionCount: 8940,
      clickCount: 1220,
      bgColor: "from-indigo-950 to-slate-900",
    },
    {
      id: 3,
      title: "Combed Cotton Corporate & Retail Knitwear",
      subtitle: "Custom branding and packaging available for wholesale orders > 500 pcs.",
      division: "Clothing & Apparel",
      ctaText: "View Apparel Deals",
      ctaLink: "/category/clothing-apparel",
      position: "Trending Strip",
      status: "inactive",
      impressionCount: 4210,
      clickCount: 480,
      bgColor: "from-slate-900 to-slate-950",
    },
  ]);

  const [notification, setNotification] = useState("");

  const toggleStatus = (id: number) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "active" ? "inactive" : "active" }
          : b
      )
    );
    setNotification("Banner publication status updated.");
    setTimeout(() => setNotification(""), 3000);
  };

  const deleteBanner = (id: number) => {
    if (confirm("Are you sure you want to remove this promotional banner?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      setNotification("Banner removed successfully.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <ImageIcon className="w-3.5 h-3.5" /> Promotional Media
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Homepage Banners & Promotional Slots
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure headline messaging, hero call-to-actions, and divisional promotional spots.
          </p>
        </div>

        <button
          onClick={() => {
            alert("New banner upload modal will open with live Cloudinary storage.");
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Promotional Banner
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Banner Grid */}
      <div className="grid grid-cols-1 gap-5">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-300 transition"
          >
            {/* Visual Preview Pill */}
            <div
              className={`w-full md:w-80 h-32 rounded-xl bg-gradient-to-r ${banner.bgColor} p-4 text-white flex flex-col justify-between border border-slate-800 shadow-inner shrink-0 relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/40 border border-white/10">
                {banner.position}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  {banner.division}
                </span>
                <h4 className="text-xs font-bold leading-snug line-clamp-2">
                  {banner.title}
                </h4>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                <span className="text-blue-300 font-semibold">{banner.ctaText} →</span>
                <span className="text-slate-400">{banner.ctaLink}</span>
              </div>
            </div>

            {/* Banner Information */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                    banner.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {banner.status}
                </span>
                <span className="text-xs font-bold text-slate-700">Slot: {banner.position}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 truncate">{banner.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-1">{banner.subtitle}</p>

              {/* Analytics metrics */}
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-500 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-800">
                    {banner.impressionCount.toLocaleString()}
                  </span>{" "}
                  Impressions
                </div>
                <div>
                  <span className="font-semibold text-slate-800">
                    {banner.clickCount.toLocaleString()}
                  </span>{" "}
                  Clicks
                </div>
                <div>
                  <span className="font-semibold text-blue-600">
                    {((banner.clickCount / banner.impressionCount) * 100).toFixed(1)}%
                  </span>{" "}
                  CTR
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => toggleStatus(banner.id)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  banner.status === "active"
                    ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
                title="Toggle Active Status"
              >
                {banner.status === "active" ? (
                  <>
                    <ToggleRight className="w-4 h-4" /> Deactivate
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" /> Activate
                  </>
                )}
              </button>

              <Link
                href={banner.ctaLink}
                target="_blank"
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                title="Preview Target Link"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => deleteBanner(banner.id)}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
