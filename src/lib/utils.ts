import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(price: number | string | null): string {
  if (!price) return "Price on request";
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function generateQuotationNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `PLY-${year}${month}-${random}`;
}

export function getWhatsAppLink(message: string, phone?: string): string {
  const number = phone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getProductWhatsAppMessage(productName: string, moq?: number): string {
  return `Hello, I am interested in wholesale pricing for *${productName}*${
    moq ? ` (MOQ: ${moq} pcs)` : ""
  }. Please share the best price and availability.`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
