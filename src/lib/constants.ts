// Application-wide constants for PLAYLUME B2B Wholesale Platform

export const SITE_CONFIG = {
  name: "PLAYLUME",
  tagline: "Your Trusted B2B Wholesale Partner",
  description:
    "PLAYLUME is a multi-category wholesale trading and distribution company supplying Toys, Clothing, Watches, Electronics, Home & Kitchen, and Stationery products.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://playlume.in",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@playlume.in",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91XXXXXXXXXX",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "India",
};

export const CATEGORIES_FEATURED = [
  { name: "Toys & Games", slug: "toys-games", icon: "🧸" },
  { name: "Clothing", slug: "clothing", icon: "👕" },
  { name: "Watches", slug: "watches", icon: "⌚" },
  { name: "Electronics", slug: "electronics", icon: "📱" },
  { name: "Home & Kitchen", slug: "home-kitchen", icon: "🏠" },
  { name: "Stationery", slug: "stationery", icon: "✏️" },
];

export const AVAILABILITY_LABELS: Record<string, string> = {
  available: "Available to Order",
  enquiry_only: "Available on Enquiry",
  unavailable: "Currently Unavailable",
};

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  quotation_sent: "Quotation Sent",
  negotiation: "Negotiation",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const ENQUIRY_STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quotation_sent: "bg-purple-100 text-purple-800",
  negotiation: "bg-orange-100 text-orange-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export const PRODUCTS_PER_PAGE = 12;
export const ADMIN_PRODUCTS_PER_PAGE = 20;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Trending", href: "/trending" },
  { label: "Become a Buyer", href: "/become-a-buyer" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];
