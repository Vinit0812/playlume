import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// -----------------------------------------------------------------
// BUYERS STORAGE
// -----------------------------------------------------------------
export interface StoredBuyer {
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

const DEFAULT_BUYERS: StoredBuyer[] = [
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

export function getStoredBuyers(): StoredBuyer[] {
  ensureDir();
  const filePath = path.join(DATA_DIR, "buyers.json");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_BUYERS, null, 2), "utf-8");
    return DEFAULT_BUYERS;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_BUYERS;
  }
}

export function saveBuyer(buyerData: {
  name: string;
  businessName?: string;
  phone: string;
  whatsappNumber?: string;
  email?: string;
  city?: string;
  state?: string;
  businessType?: string;
}): StoredBuyer {
  const current = getStoredBuyers();
  const typeMap: Record<string, string> = {
    retailer: "Retail Showroom",
    wholesaler: "Regional Wholesaler",
    distributor: "Commercial Distributor",
    other: "Commercial Buyer",
  };

  const newBuyer: StoredBuyer = {
    id: Date.now(),
    name: buyerData.name,
    businessName: buyerData.businessName || "Individual Commercial Buyer",
    type: typeMap[buyerData.businessType || "retailer"] || "Retail Showroom",
    phone: buyerData.phone.startsWith("+91") ? buyerData.phone : `+91 ${buyerData.phone}`,
    whatsapp: (buyerData.whatsappNumber || buyerData.phone).replace(/[^0-9]/g, ""),
    location: `${buyerData.city || "Commercial Hub"}, ${buyerData.state || "India"}`,
    status: "Active",
    registeredAt: "Just now",
  };

  // Prepend new buyer so it appears at top of dashboard
  const updated = [newBuyer, ...current];
  const filePath = path.join(DATA_DIR, "buyers.json");
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  return newBuyer;
}

// -----------------------------------------------------------------
// ENQUIRIES STORAGE
// -----------------------------------------------------------------
export interface StoredEnquiry {
  id: string;
  buyerName: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  location: string;
  product: string;
  quantity: number;
  status: string;
  createdAt: string;
}

const DEFAULT_ENQUIRIES: StoredEnquiry[] = [
  {
    id: "ENQ-101",
    buyerName: "Rajesh Sharma",
    businessName: "Rajesh Wholesalers",
    phone: "+91 98251 23456",
    whatsapp: "919825123456",
    location: "Surat, Gujarat",
    product: '8.5" Digital LCD Drawing Board (PL-TAB-85)',
    quantity: 100,
    status: "new",
    createdAt: "Today, 14:30",
  },
  {
    id: "ENQ-102",
    buyerName: "Vikram Mehta",
    businessName: "Metro Retail Chain",
    phone: "+91 98111 67890",
    whatsapp: "919811167890",
    location: "Mumbai, Maharashtra",
    product: "180 GSM Bio-Washed Combed Cotton T-Shirt (PL-TEX-180)",
    quantity: 300,
    status: "quotation_sent",
    createdAt: "Yesterday",
  },
];

export function getStoredEnquiries(): StoredEnquiry[] {
  ensureDir();
  const filePath = path.join(DATA_DIR, "enquiries.json");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_ENQUIRIES, null, 2), "utf-8");
    return DEFAULT_ENQUIRIES;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_ENQUIRIES;
  }
}

export function saveEnquiry(data: {
  buyerName: string;
  businessName?: string;
  phone: string;
  whatsappNumber?: string;
  city?: string;
  state?: string;
  productName?: string;
  quantity?: number;
}): StoredEnquiry {
  const current = getStoredEnquiries();
  const newEnq: StoredEnquiry = {
    id: `ENQ-${Math.floor(100 + Math.random() * 900)}`,
    buyerName: data.buyerName,
    businessName: data.businessName || "Trade Buyer",
    phone: data.phone.startsWith("+91") ? data.phone : `+91 ${data.phone}`,
    whatsapp: (data.whatsappNumber || data.phone).replace(/[^0-9]/g, ""),
    location: `${data.city || "Trade Hub"}, ${data.state || "India"}`,
    product: data.productName || "General Merchandise Lot",
    quantity: data.quantity || 50,
    status: "new",
    createdAt: "Just now",
  };

  const updated = [newEnq, ...current];
  const filePath = path.join(DATA_DIR, "enquiries.json");
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  return newEnq;
}

// -----------------------------------------------------------------
// BANNERS STORAGE (Configurable via Admin Console & Dynamic on Home)
// -----------------------------------------------------------------
export interface StoredBanner {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  division: string;
  ctaText: string;
  ctaLink: string;
  position: "Hero Main" | "Category Featured" | "Trending Strip";
  status: "active" | "inactive";
  imageUrl?: string;
  bgColor?: string;
  accentColor?: string;
  highlightItems?: { name: string; price: string }[];
  impressionCount: number;
  clickCount: number;
}

const DEFAULT_BANNERS: StoredBanner[] = [
  {
    id: 1,
    title: "NIRAL INDUSTRIES • TRENDING CHRISTMAS COLLECTION",
    subtitle: "Original Collection Designs | Festive Candle Moulds & Decor | Direct Factory Sourcing",
    badge: "Festive Wholesale Sourcing • Rapid Dispatch",
    division: "Home & Festive Decor",
    ctaText: "Shop Festive Moulds",
    ctaLink: "/products?category=home",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/christmas-banner.jpg",
    bgColor: "from-[#141414] via-[#1c1712] to-[#141414]",
    accentColor: "#f59e0b",
    impressionCount: 16820,
    clickCount: 2340,
  },
  {
    id: 2,
    title: "NIRAL INDUSTRIES • ELEGANT URLI & FESTIVE COLLECTION",
    subtitle: "Original Collection Designs | Metal Urlis & Diya Decor | Direct Factory Wholesale Sourcing",
    badge: "Festive Wholesale Lots • From ₹22/- Only",
    division: "Home & Festive Decor",
    ctaText: "Explore Urli Collection",
    ctaLink: "/products?category=home",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/urli-collection-banner.jpg",
    bgColor: "from-[#141414] via-[#1c1712] to-[#141414]",
    accentColor: "#f59e0b",
    impressionCount: 14820,
    clickCount: 1940,
  },
  {
    id: 3,
    title: "NEXT-GEN GAN 65W FAST CHARGING & ELECTRONICS WHOLESALE",
    subtitle: "Master Carton Factory Rates for Super-Stockists & Retail Chains | BIS Certified",
    badge: "Direct Factory Lots • MOQ 20 pcs • Rapid Dispatch",
    division: "Consumer Electronics",
    ctaText: "View Electronics Catalogue",
    ctaLink: "/products?category=electronics",
    position: "Hero Main",
    status: "active",
    imageUrl: "/banners/electronics-wholesale-banner.jpg",
    bgColor: "from-[#141414] via-[#121922] to-[#141414]",
    accentColor: "#38bdf8",
    impressionCount: 11420,
    clickCount: 1720,
  },
];

export function getStoredBanners(): StoredBanner[] {
  ensureDir();
  const filePath = path.join(DATA_DIR, "banners.json");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(DEFAULT_BANNERS, null, 2), "utf-8");
    return DEFAULT_BANNERS;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_BANNERS;
  }
}

export function saveStoredBanners(banners: StoredBanner[]): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, "banners.json");
  fs.writeFileSync(filePath, JSON.stringify(banners, null, 2), "utf-8");
}

export function updateBannerStatus(id: number, status: "active" | "inactive"): StoredBanner[] {
  const banners = getStoredBanners();
  const updated = banners.map((b) => (b.id === id ? { ...b, status } : b));
  saveStoredBanners(updated);
  return updated;
}

export function saveBanner(banner: Omit<StoredBanner, "id" | "impressionCount" | "clickCount"> & { id?: number }): StoredBanner[] {
  const banners = getStoredBanners();
  if (banner.id) {
    const updated = banners.map((b) => (b.id === banner.id ? { ...b, ...banner } : b));
    saveStoredBanners(updated);
    return updated;
  } else {
    const nextId = banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1;
    const newBanner: StoredBanner = {
      ...banner,
      id: nextId,
      impressionCount: 0,
      clickCount: 0,
    };
    const updated = [...banners, newBanner];
    saveStoredBanners(updated);
    return updated;
  }
}

export function deleteBanner(id: number): StoredBanner[] {
  const banners = getStoredBanners();
  const updated = banners.filter((b) => b.id !== id);
  saveStoredBanners(updated);
  return updated;
}
