"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%20V%26A%20Global%20Sourcing%2C%20I%20am%20a%20commercial%20buyer%20interested%20in%20wholesale%20rates.`;

  return (
    <aside aria-label="WhatsApp Wholesale Support" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 transition border border-emerald-400/30"
        title="Direct WhatsApp Wholesale Desk"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs tracking-wide hidden sm:inline">Wholesale Desk</span>
      </a>
    </aside>
  );
}
