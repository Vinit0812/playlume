"use client";

import { useState, useEffect, useRef } from "react";
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
  Upload,
  Link as LinkIcon,
  Check,
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
  const [imageUrl, setImageUrl] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const [themeStyle, setThemeStyle] = useState<"amber" | "teal" | "navy" | "crimson">("amber");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    let active = true;
    async function init() {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        if (active && data.success && Array.isArray(data.banners)) {
          setBanners(data.banners);
        }
      } catch (err) {
        console.error("Failed to load banners", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    void init();
    return () => {
      active = false;
    };
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
    setDivision("Home & Festive Decor");
    setCtaText("Explore Collection");
    setCtaLink("/products");
    setImageUrl("");
    setPreviewSrc("");
    setThemeStyle("amber");
    setUploadError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (b: StoredBanner) => {
    setEditingBanner(b);
    setTitle(b.title);
    setSubtitle(b.subtitle);
    setBadge(b.badge || "Special Lot");
    setDivision(b.division || "Home & Festive Decor");
    setCtaText(b.ctaText || "Explore Collection");
    setCtaLink(b.ctaLink);
    setImageUrl(b.imageUrl || "");
    setPreviewSrc(b.imageUrl || "");
    setUploadError("");
    if (b.bgColor?.includes("#082220")) setThemeStyle("teal");
    else if (b.bgColor?.includes("#141b26")) setThemeStyle("navy");
    else if (b.bgColor?.includes("#2b0d0e")) setThemeStyle("crimson");
    else setThemeStyle("amber");
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview for smooth user feedback
    const localBlobUrl = URL.createObjectURL(file);
    setPreviewSrc(localBlobUrl);
    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/banners/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
        setNotification("Banner image uploaded successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload network error");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();

    let bgColor = "from-[#141414] via-[#1c1712] to-[#141414]";
    let accentColor = "#f59e0b";
    if (themeStyle === "teal") {
      bgColor = "from-[#141414] via-[#121922] to-[#141414]";
      accentColor = "#38bdf8";
    } else if (themeStyle === "navy") {
      bgColor = "from-[#141414] via-[#191520] to-[#141414]";
      accentColor = "#f43f5e";
    } else if (themeStyle === "crimson") {
      bgColor = "from-[#141414] via-[#201214] to-[#141414]";
      accentColor = "#ef4444";
    }

    const payload = {
      id: editingBanner?.id,
      title,
      subtitle,
      badge,
      division,
      ctaText,
      ctaLink,
      imageUrl: imageUrl.trim() || undefined,
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
            Homepage Hero Advertising Banners
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload custom advertising banner graphics or configure promotional hero slides with live clickable links.
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
            <Plus className="w-4 h-4" /> Add Advertising Banner
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
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-300 transition"
          >
            {/* Visual Preview Box */}
            <div className="w-full md:w-80 h-36 rounded-xl border border-slate-300 shadow-inner shrink-0 relative overflow-hidden bg-neutral-900 flex items-center justify-center">
              {banner.imageUrl ? (
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-r ${banner.bgColor} p-4 text-white flex flex-col justify-between`}
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
                    <span className="text-amber-400 font-bold">Standard Text</span>
                  </div>
                </div>
              )}

              {banner.imageUrl && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Graphic Banner
                </div>
              )}
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
                {banner.imageUrl && (
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Image: {banner.imageUrl}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-slate-900 truncate">
                {banner.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {banner.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
                <span>
                  Target Link: <strong className="text-slate-700">{banner.ctaLink}</strong>
                </span>
                <span>•</span>
                <span>Impressions: {banner.impressionCount?.toLocaleString() || 0}</span>
                <span>•</span>
                <span>Clicks: {banner.clickCount?.toLocaleString() || 0}</span>
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
                title="Edit Banner Details & Image"
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
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingBanner ? `Edit Banner #${editingBanner.id}` : "Create Advertising Banner"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Uploaded banners will be displayed in the homepage hero slider
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
              {/* IMAGE UPLOAD SECTION */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Banner Graphic Image (Recommended ~1024 x 320 px)
                  </label>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                {/* Upload or Drop */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? "Uploading..." : "Upload Banner from PC"}</span>
                  </button>

                  <div className="text-xs text-slate-400 text-center sm:text-left flex-1">
                    or paste image path / URL below
                  </div>
                </div>

                {uploadError && (
                  <p className="text-xs text-rose-600 font-semibold">{uploadError}</p>
                )}

                {/* Image URL Input */}
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewSrc(e.target.value);
                      setUploadError("");
                    }}
                    placeholder="e.g. /banners/christmas-banner.jpg or https://..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                    Or select preloaded banner presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl("/banners/christmas-banner.jpg");
                        setPreviewSrc("/banners/christmas-banner.jpg");
                        setTitle("NIRAL INDUSTRIES • TRENDING CHRISTMAS COLLECTION");
                        setSubtitle("Festive Candle Moulds & Decor Sourcing");
                        setUploadError("");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-blue-500 text-[11px] font-medium text-slate-700 transition"
                    >
                      🎄 Christmas Moulds Banner
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl("/banners/urli-collection-banner.jpg");
                        setPreviewSrc("/banners/urli-collection-banner.jpg");
                        setTitle("NIRAL INDUSTRIES • ELEGANT URLI COLLECTION");
                        setSubtitle("Metal Urlis & Diya Decor Wholesale");
                        setUploadError("");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-blue-500 text-[11px] font-medium text-slate-700 transition"
                    >
                      🪔 Urli Collection Banner
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl("/banners/electronics-wholesale-banner.jpg");
                        setPreviewSrc("/banners/electronics-wholesale-banner.jpg");
                        setTitle("NEXT-GEN GAN 65W ELECTRONICS WHOLESALE");
                        setSubtitle("GaN Chargers, Audio & Gadget Lots");
                        setUploadError("");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-blue-500 text-[11px] font-medium text-slate-700 transition"
                    >
                      ⚡ Electronics Wholesale Banner
                    </button>
                  </div>
                </div>

                {/* Image Live Preview */}
                {(previewSrc || imageUrl) && (
                  <div className="mt-2 border border-slate-300 rounded-xl overflow-hidden bg-neutral-900 relative">
                    <img
                      src={previewSrc || imageUrl}
                      alt="Banner Preview"
                      className="w-full h-32 object-cover"
                      onError={() => {
                        if (!previewSrc?.startsWith("blob:")) {
                          setUploadError("Failed to load image preview from this URL.");
                        }
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white font-medium">
                      Live Preview
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Banner Title / Internal Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Niral Industries • Trending Christmas Collection"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle / Promo Campaign Notes
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Special Festive Season Candle Moulds & Festive Decor Lots"
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
                    placeholder="e.g. Festive Wholesale Sourcing"
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
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Explore Festive Collection"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Destination Link *
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
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm cursor-pointer"
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
