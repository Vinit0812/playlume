// Application-wide constants for PLAYLUME B2B Wholesale Platform
// Executive Wholesale & Global Supply Chain Standards

export const SITE_CONFIG = {
  name: "PLAYLUME",
  tagline: "B2B Wholesale Trading & Distribution Enterprise",
  description:
    "PLAYLUME is a multi-category wholesale trading and distribution company connecting verified manufacturers with retailers, commercial wholesalers, and distributors across India.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://playlume.in",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "corporate@playlume.in",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Trade Tower, Commercial District, India",
  gstin: "GST Registered Enterprise",
};

export interface CategoryDefinition {
  name: string;
  slug: string;
  subhead: string;
  moq: string;
  startingPrice: string;
  iconName: "Gamepad2" | "Shirt" | "Watch" | "Cpu" | "Home" | "PenTool";
}

export const CATEGORIES_FEATURED: CategoryDefinition[] = [
  {
    name: "Toys & Educational",
    slug: "toys-games",
    subhead: "Digital tablets, learning & board games",
    moq: "50 pcs",
    startingPrice: "₹70+",
    iconName: "Gamepad2",
  },
  {
    name: "Apparel & Textiles",
    slug: "clothing",
    subhead: "Combed cotton t-shirts, daily essentials",
    moq: "30 pcs",
    startingPrice: "₹140+",
    iconName: "Shirt",
  },
  {
    name: "Watches & Horology",
    slug: "watches",
    subhead: "Analog quartz, minimalist & mesh straps",
    moq: "25 pcs",
    startingPrice: "₹180+",
    iconName: "Watch",
  },
  {
    name: "Consumer Electronics",
    slug: "electronics",
    subhead: "Audio, charging cables, smart gadgets",
    moq: "20 pcs",
    startingPrice: "₹220+",
    iconName: "Cpu",
  },
  {
    name: "Home & Kitchenware",
    slug: "home-kitchen",
    subhead: "Portable blenders, culinary accessories",
    moq: "40 pcs",
    startingPrice: "₹95+",
    iconName: "Home",
  },
  {
    name: "Office & Stationery",
    slug: "stationery",
    subhead: "Writing instruments, desk accessories",
    moq: "100 pcs",
    startingPrice: "₹25+",
    iconName: "PenTool",
  },
];

export const AVAILABILITY_LABELS: Record<string, string> = {
  available: "In Stock / Ready to Dispatch",
  enquiry_only: "Available on Trade Enquiry",
  unavailable: "Currently Backordered",
};

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: "New Inquiry",
  contacted: "Account Contacted",
  quotation_sent: "Proforma Quotation Sent",
  negotiation: "Price Negotiation",
  confirmed: "Commercial Order Confirmed",
  completed: "Consignment Dispatched",
  cancelled: "Archived / Cancelled",
};

export const ENQUIRY_STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  quotation_sent: "bg-purple-50 text-purple-700 border-purple-200",
  negotiation: "bg-orange-50 text-orange-700 border-orange-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-slate-100 text-slate-700 border-slate-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
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
  { label: "Overview", href: "/" },
  { label: "Product Catalogue", href: "/products" },
  { label: "Merchandise Divisions", href: "/categories" },
  { label: "Trending Lots", href: "/trending" },
  { label: "Commercial RFQ", href: "/enquiry" },
  { label: "Buyer Onboarding", href: "/become-a-buyer" },
  { label: "Corporate Profile", href: "/about" },
  { label: "Trade Desk", href: "/contact" },
];
