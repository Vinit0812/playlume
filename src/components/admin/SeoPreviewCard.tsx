"use client";

import React, { useState } from "react";
import { Globe, Search, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface SeoPreviewProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
  primaryKeyword?: string;
  baseUrl?: string;
}

export default function SeoPreviewCard({
  title,
  description,
  slug,
  category = "catalogue",
  primaryKeyword = "",
  baseUrl = SITE_CONFIG.url,
}: SeoPreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const titleLength = title.length;
  const descLength = description.length;

  const isTitleOptimal = titleLength >= 45 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  const fullUrl = `${baseUrl}/${category ? `${category}/` : ""}${slug}`;
  const displayUrl = `${baseUrl.replace("https://", "")} > ${category} > ${slug}`;

  const hasKeywordInTitle = primaryKeyword
    ? title.toLowerCase().includes(primaryKeyword.toLowerCase())
    : true;
  const hasKeywordInDesc = primaryKeyword
    ? description.toLowerCase().includes(primaryKeyword.toLowerCase())
    : true;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-neutral-900">
            Search Engine SERP Preview &amp; Audit
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`px-2.5 py-1 rounded-md transition ${
              device === "desktop"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`px-2.5 py-1 rounded-md transition ${
              device === "mobile"
                ? "bg-white text-neutral-900 shadow-xs"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Google Snippet Simulation */}
      <div
        className={`p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 transition-all ${
          device === "mobile" ? "max-w-sm" : "w-full"
        }`}
      >
        <div className="flex items-center gap-2 text-xs text-neutral-600 mb-1">
          <div className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[9px] font-black">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-800 leading-tight">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] text-neutral-400 truncate max-w-xs">
              {displayUrl}
            </span>
          </div>
        </div>

        <h4 className="text-[#1a0dab] hover:underline cursor-pointer font-medium text-base sm:text-lg leading-snug line-clamp-2 mt-1">
          {title || "Default Page Title — V&A Global Sourcing"}
        </h4>

        <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2 mt-1">
          {description ||
            "Please provide a compelling meta description containing primary wholesale keywords and commercial buying incentives."}
        </p>
      </div>

      {/* Audit Checklist & Character Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Title Health */}
        <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-700">Title Length:</span>
            <span
              className={`font-black ${
                isTitleOptimal
                  ? "text-emerald-700"
                  : titleLength > 65
                  ? "text-rose-600"
                  : "text-amber-600"
              }`}
            >
              {titleLength} / 60 chars
            </span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isTitleOptimal
                  ? "bg-emerald-500"
                  : titleLength > 65
                  ? "bg-rose-500"
                  : "bg-amber-400"
              }`}
              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-neutral-500">
            {isTitleOptimal
              ? "Optimal length for Google desktop & mobile display."
              : titleLength > 65
              ? "Warning: Title exceeds 65 chars and may be truncated."
              : "Too short: Expand to 50–60 characters for best CTR."}
          </p>
        </div>

        {/* Description Health */}
        <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-700">Description Length:</span>
            <span
              className={`font-black ${
                isDescOptimal
                  ? "text-emerald-700"
                  : descLength > 165
                  ? "text-rose-600"
                  : "text-amber-600"
              }`}
            >
              {descLength} / 160 chars
            </span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isDescOptimal
                  ? "bg-emerald-500"
                  : descLength > 165
                  ? "bg-rose-500"
                  : "bg-amber-400"
              }`}
              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-neutral-500">
            {isDescOptimal
              ? "Optimal length. Key selling points visible in snippets."
              : descLength > 165
              ? "Warning: Description exceeds 165 chars and will be clipped."
              : "Too short: Add MOQ, wholesale pricing, or dispatch info."}
          </p>
        </div>
      </div>

      {/* Target Keyword Checks */}
      {primaryKeyword && (
        <div className="border-t border-neutral-100 pt-3 flex flex-wrap items-center gap-4 text-xs">
          <span className="text-neutral-500">Target Keyword:</span>
          <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
            {primaryKeyword}
          </span>
          <div className="flex items-center gap-1.5">
            {hasKeywordInTitle ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Title
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> Missing in Title
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {hasKeywordInDesc ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Description
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> Missing in Description
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
