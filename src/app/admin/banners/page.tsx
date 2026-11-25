"use client";

import { useState, useEffect } from "react";
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
  X,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { StoredBanner } from "@/lib/local-storage";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<StoredBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<StoredBanner | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [division, setDivision] = useState("Home & Festive Decor");
  const [ctaText, setCtaText] = useState("Explore Full Collection");
  const [ctaLink, setCtaLink] = useState("/products");
  const [themeStyle, setThemeStyle] = useState<"amber" | "teal" | "navy" | "crimson">("amber");

  const loadBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/banners");
      const data = await res.json();
      if (data.success && Array.isArray(data.banners)) {
        setBanners(data.banners);
      }
    } catch (err) {
      console.error("Failed to load banners", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const toggleStatus = async (id: number, currentStatus: "active" | "inactive") => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await fetch("/api/banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBanners(data.banners);
        setNotification(`Banner #${id} marked ${nextStatus}. Changes live on homepage.`);
        setTimeout(() => setNotification(""), 3500);
      }
    } catch (err) {
      console.error("Failed to update banner status", err);
    }
  };

  const deleteBannerItem = async (id: number) => {
    if (!confirm("Are you sure you want to remove this banner from the homepage carousel?")) return;
    try {
      const res = await fetch(`/api/banners?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBanners(data.banners);
        setNotification("Banner removed successfully.");
        setTimeout(() => setNotification(""), 3500);
      }
    } catch (err) {
      console.error("Failed to delete banner", err);
    }
  };

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setTitle("");
    setSubtitle("");
    setBadge("Special Wholesale Offer");
    setDivision("All Divisions");
    setCtaText("Explore Catalogue");
    setCtaLink("/products");
    setThemeStyle("amber");
    setModalOpen(true);
  };

  const handleOpenEdit = (b: StoredBanner) => {
    setEditingBanner(b);
    setTitle(b.title);
    setSubtitle(b.subtitle);
    setBadge(b.badge || "Special Lot");
    setDivision(b.division);
    setCtaText(b.ctaText);
    setCtaLink(b.ctaLink);
    if (b.bgColor.includes("#082220")) setThemeStyle("teal");
    else if (b.bgColor.includes("#141b26")) setThemeStyle("navy");
    else if (b.bgColor.includes("#2b0d0e")) setThemeStyle("crimson");
    else setThemeStyle("amber");
    setModalOpen(true);
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();

    let bgColor = "from-[#1a120c] via-[#26180f] to-[#120a05]";
    let accentColor = "#f59e0b";
    if (themeStyle === "teal") {
      bgColor = "from-[#082220] via-[#0d3431] to-[#051615]";
      accentColor = "#10b981";
    } else if (themeStyle === "navy") {
      bgColor = "from-[#141b26] via-[#1c2738] to-[#0c121c]";
      accentColor = "#38bdf8";
    } else if (themeStyle === "crimson") {
      bgColor = "from-[#2b0d0e] via-[#3a1315] to-[#170607]";
      accentColor = "#f43f5e";
    }

    const payload = {
      id: editingBanner?.id,
      title,
      subtitle,
      badge,
      division,
      ctaText,
      ctaLink,
      position: "Hero Main" as const,
      status: editingBanner ? editingBanner.status : ("active" as const),
      bgColor,
      accentColor,
    };

    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setBanners(data.banners);
        setModalOpen(false);
        setNotification(
          editingBanner
            ? "Banner updated successfully! Live on homepage slider."
            : "New banner added! Now appearing in homepage hero slider."
        );
        setTimeout(() => setNotification(""), 3500);
      }
    } catch (err) {
      console.error("Failed to save banner", err);
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
            Configure headline messaging, hero call-to-actions, and divisional promotional spots in the live homepage slider.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadBanners}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
            title="Refresh banners"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Promotional Banner
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider truncate max-w-[170px]">
                  {banner.badge || banner.division}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white font-medium">
                  #{banner.id}
                </span>
              </div>
              <p className="text-xs font-black line-clamp-2 drop-shadow-sm text-neutral-100">
                {banner.title}
              </p>
              <div className="flex items-center justify-between text-[10px] text-neutral-300">
                <span className="truncate max-w-[140px]">{banner.ctaText}</span>
                <span className="text-amber-400 font-bold">Live Slide</span>
              </div>
            </div>

            {/* Banner Metadata */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {banner.division}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500">
                  {banner.position}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    banner.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {banner.status.toUpperCase()}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 truncate">
                {banner.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {banner.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
                <span>
                  CTA: <strong className="text-slate-700">{banner.ctaText}</strong> ({banner.ctaLink})
                </span>
                <span>•</span>
                <span>Impressions: {banner.impressionCount.toLocaleString()}</span>
                <span>•</span>
                <span>Clicks: {banner.clickCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
              <button
                onClick={() => toggleStatus(banner.id, banner.status)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  banner.status === "active"
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title="Toggle Active / Inactive on Homepage"
              >
                {banner.status === "active" ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-emerald-600" /> Active
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4 text-slate-400" /> Inactive
                  </>
                )}
              </button>

              <button
                onClick={() => handleOpenEdit(banner)}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                title="Edit Banner Details"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteBannerItem(banner.id)}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Banner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingBanner ? `Edit Banner #${editingBanner.id}` : "Create Promotional Banner"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes update the live homepage hero carousel automatically
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Banner Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. NIRAL INDUSTRIES • ELEGANT URLI COLLECTION"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle / Trade Specifications
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Original Collection Designs | Metal Urlis & Diya Decor | Direct Factory Sourcing"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Badge Callout
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Festive Lots • From ₹22/- Only"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Merchandise Division
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Home & Festive Decor">Home & Festive Decor</option>
                    <option value="Consumer Electronics">Consumer Electronics</option>
                    <option value="Clothing & Apparel">Clothing & Apparel</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Watches & Horology">Watches & Horology</option>
                    <option value="Office & Stationery">Office & Stationery</option>
                    <option value="All Divisions">All Divisions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    required
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Explore Full Collection"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CTA Target Link
                  </label>
                  <input
                    type="text"
                    required
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="e.g. /products?category=home"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Color Aesthetic & Mood
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setThemeStyle("amber")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                      themeStyle === "amber"
                        ? "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/30"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Warm Amber
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeStyle("teal")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                      themeStyle === "teal"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Deep Teal
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeStyle("navy")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                      themeStyle === "navy"
                        ? "border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-500/30"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Slate Navy
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeStyle("crimson")}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                      themeStyle === "crimson"
                        ? "border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/30"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Crimson Red
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                >
                  {editingBanner ? "Save Changes" : "Publish to Homepage"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
