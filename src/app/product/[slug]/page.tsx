import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductDetailView, { ProductDetailProps } from "@/components/product/ProductDetailView";

const PRODUCTS_DATABASE: Record<string, ProductDetailProps> = {
  p001: {
    id: "p001",
    sku: "TOY-101",
    name: "8.5-inch Digital LCD Drawing Tablet with Stylus",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 50,
    price: 75,
    mrp: 199,
    status: "in_stock",
    description:
      "Reusable electronic paper LCD writing board designed for educational and office use. Features a pressure-sensitive surface, one-touch instant clearing, and a rear lock switch to preserve drawings.",
    specs: {
      Display: "8.5-inch Reflective Monochrome LCD",
      Battery: "CR2025 Button Cell (3V Replaceable)",
      Housing: "Shatterproof ABS Composite",
      Input: "Stylus Pen Included",
      Weight: "110 grams",
    },
    packaging: {
      unitsPerCarton: 60,
      cartonDimensions: "52cm x 38cm x 30cm",
      grossWeight: "8.5 kg",
    },
  },
  "lcd-writing-tablet-8-5": {
    id: "p001",
    sku: "TOY-101",
    name: "8.5-inch Digital LCD Drawing Tablet with Stylus",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 50,
    price: 75,
    mrp: 199,
    status: "in_stock",
    description:
      "Reusable electronic paper LCD writing board designed for educational and office use. Features a pressure-sensitive surface, one-touch instant clearing, and a rear lock switch to preserve drawings.",
    specs: {
      Display: "8.5-inch Reflective Monochrome LCD",
      Battery: "CR2025 Button Cell (3V Replaceable)",
      Housing: "Shatterproof ABS Composite",
      Input: "Stylus Pen Included",
      Weight: "110 grams",
    },
    packaging: {
      unitsPerCarton: 60,
      cartonDimensions: "52cm x 38cm x 30cm",
      grossWeight: "8.5 kg",
    },
  },
  p007: {
    id: "p007",
    sku: "CLO-106",
    name: "180 GSM Bio-Washed Combed Cotton Plain T-Shirts",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 30,
    price: 145,
    mrp: 399,
    status: "in_stock",
    description:
      "Premium 100% combed cotton blank tees. Pre-shrunk and bio-washed for superior hand feel, color retention, and high-density screen or DTF printing.",
    specs: {
      Fabric: "100% Super Combed Cotton",
      Weight: "180 GSM Single Jersey",
      Sizes: "S, M, L, XL, XXL (Assorted Lot)",
      Treatment: "Bio-Washed & Silicon Softened",
    },
    packaging: {
      unitsPerCarton: 50,
      cartonDimensions: "60cm x 40cm x 35cm",
      grossWeight: "12.0 kg",
    },
  },
  p013: {
    id: "p013",
    sku: "WAT-112",
    name: "Ultra-Thin Minimalist Quartz Chronograph Watch",
    category: "Watches & Horology",
    categorySlug: "watches",
    categoryTone: "watches",
    moq: 25,
    price: 185,
    mrp: 599,
    status: "enquiry",
    description:
      "Contemporary slim-profile formal wrist watch with stainless steel mesh band, hardened mineral crystal glass, and Japanese quartz movement.",
    specs: {
      Movement: "Seiko/Miyota Grade Quartz",
      Case: "40 mm Alloy with Stainless Caseback",
      Thickness: "7.2 mm Ultra-Slim",
      Strap: "20 mm Milanese Stainless Mesh",
    },
    packaging: {
      unitsPerCarton: 40,
      cartonDimensions: "45cm x 35cm x 25cm",
      grossWeight: "6.2 kg",
    },
  },
  p018: {
    id: "p018",
    sku: "ELE-117",
    name: "Portable High-Speed Rechargeable Electric Blender",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 20,
    price: 260,
    mrp: 699,
    status: "in_stock",
    description:
      "Compact 380 ml rechargeable personal blender with 6 stainless steel serrated blades, magnetic safety interlock, and USB-C fast charging.",
    specs: {
      Capacity: "380 ml Food-Grade PCTG",
      Blades: "6-Leaf 304 Stainless Steel",
      Battery: "2000 mAh Rechargeable Li-ion",
      Charging: "Type-C (5V / 1A)",
    },
    packaging: {
      unitsPerCarton: 30,
      cartonDimensions: "50cm x 40cm x 35cm",
      grossWeight: "14.5 kg",
    },
  },
  p023: {
    id: "p023",
    sku: "HOM-122",
    name: "Stainless Steel Insulated Water Bottle 750 ml",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    moq: 40,
    price: 180,
    mrp: 499,
    status: "in_stock",
    description:
      "Double-walled vacuum insulated flask keeping beverages hot for 12 hours or cold for 24 hours. Food-grade 304 inner liner with sweat-free powder coating.",
    specs: {
      Capacity: "750 ml",
      Material: "Inner 304, Outer 201 Stainless Steel",
      Insulation: "Copper-Lined Vacuum Chamber",
      Lid: "Leakproof Silicone Gasket",
    },
    packaging: {
      unitsPerCarton: 36,
      cartonDimensions: "55cm x 40cm x 32cm",
      grossWeight: "13.2 kg",
    },
  },
  p028: {
    id: "p028",
    sku: "STA-127",
    name: "Gel Pens Set of 12 — Pastel Executive Ink",
    category: "Office & Stationery",
    categorySlug: "stationery",
    categoryTone: "stationery",
    moq: 100,
    price: 25,
    mrp: 99,
    status: "in_stock",
    description:
      "0.5 mm extra fine Japanese tip gel rollerball pens with quick-drying smudge-proof ink in frosted pastel barrels.",
    specs: {
      Tip: "0.5 mm Tungsten Carbide Ball",
      Ink: "Quick-Dry Pigment Gel",
      Pack: "12 Pens per Clear Zip Pouch",
    },
    packaging: {
      unitsPerCarton: 120,
      cartonDimensions: "48cm x 36cm x 28cm",
      grossWeight: "11.0 kg",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATABASE[slug] || PRODUCTS_DATABASE["p001"];
  return {
    title: `${product.name} (MOQ: ${product.moq} pcs) — Wholesale Supplier PLAYLUME`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS_DATABASE[slug] || PRODUCTS_DATABASE["p001"];

  return (
    <div className="min-h-screen flex flex-col bg-surface-2 text-neutral-text antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        <ProductDetailView product={product} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
