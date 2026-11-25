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
