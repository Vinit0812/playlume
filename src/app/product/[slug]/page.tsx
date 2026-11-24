import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/constants";
import {
  ShieldCheck,
  Truck,
  Package,
  Layers,
  MessageSquare,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { notFound } from "next/navigation";

interface ProductData {
  slug: string;
  sku: string;
  title: string;
  category: string;
  categorySlug: string;
  moq: number;
  indicativePrice: number;
  retailPrice: number;
  availability: "available" | "enquiry_only" | "unavailable";
  availabilityText: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  packagingDetails: {
    unitsPerMasterCarton: number;
    cartonDimensions: string;
    grossWeight: string;
    customBrandingAvailable: boolean;
  };
}

const CATALOGUE_DATA: Record<string, ProductData> = {
  "lcd-writing-tablet-8-5": {
    slug: "lcd-writing-tablet-8-5",
    sku: "PL-TAB-85",
    title: "8.5\" Digital LCD Drawing & Writing Board with Stylus",
    category: "Toys & Educational",
    categorySlug: "toys-games",
    moq: 50,
    indicativePrice: 75,
    retailPrice: 199,
    availability: "available",
    availabilityText: "Available to Order — Ready Dispatch",
    shortDescription: "Ultra-lightweight pressure-sensitive e-writer tablet with one-touch erase function. Ideal for retail stationery, educational toy stores, and corporate gifting.",
    fullDescription: "Manufactured using high-grade ABS shock-resistant polymer and an eye-protection non-radiation LCD screen. Features a lock switch to prevent accidental deletion, replaceable CR2025 coin battery with up to 12 months lifespan (approx. 50,000 erasures), and an integrated stylus dock.",
    specifications: {
      "Display Size": "8.5 Inch Diagonal",
      "Screen Technology": "Flexible Liquid Crystal Display",
      "Power Source": "1x CR2025 Coin Cell (Included & Replaceable)",
      "Casing Material": "Eco-friendly Shockproof ABS",
      "Weight per Unit": "110 grams",
      "Color Options": "Black, Blue, Pink, Red, Green (Assorted)",
      "Certification": "CE, RoHS, BIS Compliant",
    },
    packagingDetails: {
      unitsPerMasterCarton: 100,
      cartonDimensions: "48cm x 32cm x 30cm",
      grossWeight: "12.5 kg",
      customBrandingAvailable: true,
    },
  },
  "analog-quartz-mesh-watch": {
    slug: "analog-quartz-mesh-watch",
    sku: "PL-WTC-01",
    title: "Ultra-Thin Minimalist Analog Quartz Watch (Steel Mesh Strap)",
    category: "Watches & Horology",
    categorySlug: "watches",
    moq: 25,
    indicativePrice: 185,
    retailPrice: 599,
    availability: "enquiry_only",
    availabilityText: "Available on Trade Enquiry",
    shortDescription: "Executive slim profile analog dress watch featuring precision Japanese quartz movement, Hardlex mineral crystal, and stainless steel mesh strap.",
    fullDescription: "Designed for premium boutique retailers, e-commerce re-sellers, and commercial gift aggregators. Each unit is individually cased with protective dial film and comes with an international standard warranty card sleeve.",
    specifications: {
      "Case Diameter": "40 mm",
      "Case Thickness": "7.5 mm (Ultra-Slim)",
      "Band Material": "Stainless Steel Mesh with Sliding Clasp",
      "Movement": "Japanese Miyota Quartz Movement",
      "Water Resistance": "3 ATM (Daily Splash Proof)",
      "Dial Window": "Scratch-Resistant Hardlex Crystal",
      "Packaging": "Individual Matte Black Gift Box Available",
    },
    packagingDetails: {
      unitsPerMasterCarton: 50,
      cartonDimensions: "38cm x 28cm x 22cm",
      grossWeight: "8.2 kg",
      customBrandingAvailable: true,
    },
  },
  "cotton-crewneck-tshirt-180gsm": {
    slug: "cotton-crewneck-tshirt-180gsm",
    sku: "PL-TEX-180",
    title: "180 GSM Bio-Washed Combed Cotton Plain Crewneck T-Shirts",
    category: "Apparel & Textiles",
    categorySlug: "clothing",
    moq: 30,
    indicativePrice: 145,
    retailPrice: 499,
    availability: "available",
    availabilityText: "Available to Order — Factory Direct",
    shortDescription: "Pre-shrunk, bio-washed 100% super-combed cotton plain t-shirts. Ideal for screen printers, private apparel brands, corporate merchandise, and retail chains.",
    fullDescription: "Knitted on high-gauge circular machines with lycra-ribbed collars to prevent sagging after washes. Double-needle stitched hems and taped neck seams ensure durability under industrial laundering standards.",
    specifications: {
      "Fabric Weight": "180 GSM (+/- 5%)",
      "Composition": "100% Super-Combed Cotton",
      "Treatment": "Bio-Washed & Silicon Softened",
      "Color Fastness": "Grade 4+ Guaranteed",
      "Size Ratio per Master Lot": "S:5, M:10, L:10, XL:5 (Customizable)",
      "Labels": "Tear-away size tag (Re-branding friendly)",
      "Shrinkage": "Less than 3% post-wash",
    },
    packagingDetails: {
      unitsPerMasterCarton: 60,
      cartonDimensions: "55cm x 40cm x 35cm",
      grossWeight: "13.8 kg",
      customBrandingAvailable: true,
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = CATALOGUE_DATA[params.slug];
  if (!product) return { title: "Product Not Found — PLAYLUME" };
  return {
    title: `${product.title} (MOQ: ${product.moq} pcs) — Wholesale | PLAYLUME`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = CATALOGUE_DATA[params.slug] || CATALOGUE_DATA["lcd-writing-tablet-8-5"];

  const whatsappMessage = encodeURIComponent(
    `Hello PLAYLUME, I am requesting a formal wholesale quotation for:
Product: ${product.title}
SKU: ${product.sku}
MOQ: ${product.moq} pcs
Indicative Price: ₹${product.indicativePrice}/pc
Please share delivery timeline and payment terms.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-slate-900">Catalogue</Link>
          <span>/</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-slate-900">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.sku}</span>
        </nav>

        {/* Top Product Showcase Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left: Image / Visual Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 rounded-2xl h-80 sm:h-96 border border-slate-200 flex flex-col items-center justify-center relative p-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400 font-extrabold text-2xl shadow-sm mb-3">
                    {product.sku.split("-")[1]}
                  </div>
                  <span className="text-xs font-bold text-slate-400 tracking-wider">OFFICIAL WHOLESALE LOT</span>
                </div>

                <span className="absolute top-4 left-4 bg-slate-950 text-white text-[11px] font-bold px-3 py-1 rounded-md">
                  {product.sku}
                </span>

                <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-3 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {product.availability === "available" ? "In Stock" : "On Enquiry"}
                </span>
              </div>

              {/* Gallery Thumbnails placeholder */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 cursor-pointer hover:border-blue-600 transition"
                  >
                    View {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Commercial Information & RFQ Triggers */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 mb-2">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Commercial Pricing & MOQ Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Minimum Order Qty</span>
                    <span className="text-xl font-black text-slate-950 mt-0.5 block">{product.moq} Pieces</span>
                    <span className="text-[10px] text-slate-400">Strictly wholesale</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Indicative Wholesale</span>
                    <span className="text-xl font-black text-blue-700 mt-0.5 block">
                      ₹{product.indicativePrice} <span className="text-xs font-normal text-slate-400">/piece</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Ex-Warehouse (GST Extra)</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Suggested Retail Target</span>
                    <span className="text-xl font-black text-emerald-700 mt-0.5 block">₹{product.retailPrice}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">~60%+ Retail Gross Margin</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Availability Status:</strong> {product.availabilityText}</span>
                </div>
              </div>

              {/* Commercial RFQ Buttons */}
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                <Link
                  href={`/enquiry?product=${encodeURIComponent(product.title)}&moq=${product.moq}&sku=${product.sku}`}
                  className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Request Formal Proforma Quote</span>
                </Link>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md shadow-emerald-600/25"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp Desk</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>QC Batch Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Pan-India Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Master Carton Pack</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Tabs: Specifications, Packaging & Sourcing Terms */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* Specifications Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Technical & Commercial Specifications
            </h2>
            <p className="text-xs text-slate-500">
              Verified manufacturer parameters for this wholesale production lot.
            </p>

            <div className="divide-y divide-slate-100 text-xs mt-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="py-2.5 flex justify-between gap-4">
                  <span className="font-semibold text-slate-600">{key}</span>
                  <span className="text-slate-900 text-right font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Master Packaging & Commercial Logistics */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                Master Carton & Packaging Details
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Master Carton Packing:</span>
                  <span className="font-bold text-slate-900">{product.packagingDetails.unitsPerMasterCarton} Units/Box</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Box Dimensions:</span>
                  <span className="font-bold text-slate-900">{product.packagingDetails.cartonDimensions}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Gross Weight:</span>
                  <span className="font-bold text-slate-900">{product.packagingDetails.grossWeight}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Custom Retail Packaging:</span>
                  <span className="font-bold text-emerald-700">Supported on Request</span>
                </div>
              </div>
            </div>

            {/* Sourcing Guarantee Card */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400">PLAYLUME Commercial Assurance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We safeguard wholesale buyers by verifying manufacturer batches before release. Commercial sample evaluation available for authorized business accounts.
              </p>
              <Link
                href="/become-a-buyer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-1"
              >
                <span>Register for Trade Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
