// Centralized master products repository for PLAYLUME B2B Wholesale Portal
// Powers autocomplete search, catalogue filtering, product detail views, and related items.

export interface MasterProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  categorySlug: "toys" | "clothing" | "watches" | "electronics" | "home" | "stationery";
  categoryTone: "toys" | "clothing" | "watches" | "electronics" | "home" | "stationery";
  price: number;
  mrp: number;
  moq: number;
  status: "in_stock" | "limited" | "enquiry";
  description: string;
  detailedDescription?: string;
  specs: Record<string, string>;
  packaging: {
    unitsPerCarton: number;
    cartonDimensions: string;
    grossWeight: string;
  };
  pickupHub?: string;
  tags: string[];
}

export const MASTER_PRODUCTS: MasterProduct[] = [
  // -----------------------------------------------------------------
  // HOME & FESTIVE DECOR (Candlemould / Niral Industries Collection)
  // -----------------------------------------------------------------
  {
    id: "p031",
    slug: "urli-golden-touch-up",
    sku: "CD15416",
    name: "Urli Golden Touch up Niral Industries",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 30,
    mrp: 60,
    moq: 50,
    status: "in_stock",
    description:
      "Decorative golden finish metal urli for floating flower arrangements, festive diya decor, and home accents. Precision lacquered for long-lasting luster.",
    detailedDescription:
      "Engineered by Niral Industries for festive, corporate, and institutional gifting. The Golden Touch Up Urli features a traditional hammered floral rim coated with anti-tarnish protective lacquer. Ideal for water displays with fresh flower petals and floating tea-light candles.",
    specs: {
      Material: "High-Grade Iron Alloy with Golden Lacquer",
      Dimensions: "Diameter 12 cm x Height 4 cm",
      Weight: "85 grams per piece",
      Finishing: "Mirror Gold Anodized Touch-Up",
      Usage: "Floating Candles, Flower Decor, Festive Pooja",
      Origin: "Factory Direct (Mulund & Bhiwandi Logistics Hub)",
    },
    packaging: {
      unitsPerCarton: 48,
      cartonDimensions: "45cm x 35cm x 28cm",
      grossWeight: "5.2 kg",
    },
    pickupHub: "Niral Industries / PLAYLUME Hub, Mulund (W) & Bhiwandi, Mumbai",
    tags: ["urli", "candlemould", "niral", "candle", "golden", "diya", "floating", "festive"],
  },
  {
    id: "p032",
    slug: "mandala-petal-urli",
    sku: "CD13804",
    name: "Mandala Petal Urli CD13804 Niral Industries",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 44,
    mrp: 100,
    moq: 50,
    status: "in_stock",
    description:
      "Tri-petal contoured mandala brass-finish bowl with laser-etched motifs. Designed for luxury festive hampers and boutique retail.",
    detailedDescription:
      "Handcrafted three-petal curved urli with laser-engraved traditional mandala motifs along the outer rim. Deep bowl capacity accommodates 3 standard floating candles.",
    specs: {
      Material: "Pressed Spun Metal with Brass Finish",
      Dimensions: "Diameter 14 cm x Height 4.5 cm",
      Weight: "115 grams",
      Finish: "Polished Antique Brass",
    },
    packaging: {
      unitsPerCarton: 40,
      cartonDimensions: "50cm x 40cm x 30cm",
      grossWeight: "6.0 kg",
    },
    pickupHub: "PLAYLUME Logistics Hub, Bhiwandi, Mumbai",
    tags: ["urli", "mandala", "petal", "candle", "niral", "brass"],
  },
  {
    id: "p033",
    slug: "lotus-urli-5-petals",
    sku: "CD13829",
    name: "Lotus Urli 5 Petals 5 inch CD13829 Niral Industries",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 58,
    mrp: 120,
    moq: 30,
    status: "in_stock",
    description:
      "Classic 5-petal wide lotus urli tray. One of the top-selling festive SKUs across India.",
    detailedDescription:
      "Five distinct petal scallops provide structural elegance. High-grade corrosion-resistant coating allows daily water immersion without tarnishing.",
    specs: {
      Material: "Pressed Sheet Metal with Pure Gold Powder Coat",
      Dimensions: "5 Inch Diameter (12.7 cm)",
      Weight: "95 grams",
      Finish: "Warm Saffron Gold",
    },
    packaging: {
      unitsPerCarton: 60,
      cartonDimensions: "55cm x 42cm x 35cm",
      grossWeight: "7.5 kg",
    },
    pickupHub: "Mulund (W) Trade Warehouse, Mumbai",
    tags: ["urli", "lotus", "5 petals", "niral", "candle", "gold"],
  },
  {
    id: "p034",
    slug: "imperial-lotus-urli",
    sku: "CD13802",
    name: "Imperial Lotus Urli (4.5inch) CD13802",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 39,
    mrp: 100,
    moq: 60,
    status: "in_stock",
    description:
      "Compact 4.5-inch imperial lotus bowl. Ideal for retail counter displays, Diwali gift sets, and corporate hampers.",
    detailedDescription:
      "Compact footprint with high perceived retail value. Scalloped floral petals and stable flat base.",
    specs: {
      Material: "Lightweight Metal Alloy",
      Dimensions: "4.5 Inch Diameter x 3.5 cm Depth",
      Weight: "75 grams",
      Finish: "Golden Lustre",
    },
    packaging: {
      unitsPerCarton: 72,
      cartonDimensions: "48cm x 38cm x 32cm",
      grossWeight: "6.8 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["urli", "imperial", "lotus", "candle", "diwali"],
  },
  {
    id: "p035",
    slug: "square-lotus-flower-urli",
    sku: "CD13805",
    name: "Square Lotus Flower Metal Urli CD13805 Niral Industries",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 51,
    mrp: 100,
    moq: 35,
    status: "in_stock",
    description:
      "Geometric square urli featuring 4 integrated lotus-shaped corner wells for diyas or floating flowers.",
    detailedDescription:
      "Modern architectural square contour combined with traditional Indian floral geometry. Fits 4 tea-light candles simultaneously.",
    specs: {
      Material: "Cold Rolled Sheet Brass Plated",
      Dimensions: "15 cm x 15 cm x 4 cm",
      Weight: "130 grams",
      Finish: "Polished Gold",
    },
    packaging: {
      unitsPerCarton: 36,
      cartonDimensions: "52cm x 36cm x 30cm",
      grossWeight: "6.2 kg",
    },
    pickupHub: "Mulund (W) Trade Warehouse, Mumbai",
    tags: ["urli", "square", "lotus", "niral", "candle"],
  },
  {
    id: "p036",
    slug: "lotus-bowl-urli",
    sku: "CD13826",
    name: "Lotus Bowl Urli Niral Industries CD13826",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 66,
    mrp: 130,
    moq: 30,
    status: "in_stock",
    description:
      "Deep fluted bowl urli with vertical rising petals. Heavy gauge metal with premium weighted bottom.",
    detailedDescription:
      "Deep water reservoir allows extended candle floating times. Multi-layered petal stamping creates an authentic blooming lotus visual.",
    specs: {
      Material: "Heavy Gauge Metal Alloy",
      Dimensions: "Diameter 16 cm x Depth 6.5 cm",
      Weight: "185 grams",
      Finish: "Dual-Tone Antique Gold",
    },
    packaging: {
      unitsPerCarton: 24,
      cartonDimensions: "50cm x 38cm x 32cm",
      grossWeight: "5.8 kg",
    },
    pickupHub: "Bhiwandi Central Hub, Mumbai",
    tags: ["urli", "bowl", "lotus", "heavy", "niral"],
  },
  {
    id: "p037",
    slug: "lotus-diya-urli",
    sku: "CD11807",
    name: "Lotus Diya Urli with Center Well",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 22,
    mrp: 65,
    moq: 100,
    status: "in_stock",
    description:
      "Lowest MOQ entry festive lot. Single center diya well surrounded by embossed lotus petals.",
    detailedDescription:
      "High volume clearance lot item. Highly popular for return gifts, temple functions, and bulk retail packaging.",
    specs: {
      Material: "Spun Brass Finish Sheet",
      Dimensions: "Diameter 9 cm x Height 2.5 cm",
      Weight: "45 grams",
      Finish: "Golden Lacquer",
    },
    packaging: {
      unitsPerCarton: 120,
      cartonDimensions: "46cm x 38cm x 26cm",
      grossWeight: "7.0 kg",
    },
    pickupHub: "Mulund (W) & Bhiwandi Hubs",
    tags: ["urli", "diya", "entry", "cheap", "bulk", "lotus"],
  },
  {
    id: "p038",
    slug: "royal-elephant-diya-urli",
    sku: "CD11808",
    name: "Royal Elephant Metal Diya Urli Stand",
    category: "Home & Kitchen",
    categorySlug: "home",
    categoryTone: "home",
    price: 75,
    mrp: 220,
    moq: 25,
    status: "in_stock",
    description:
      "Majestic cast elephant legs supporting an embossed brass bowl. Premium corporate gift lot.",
    detailedDescription:
      "Intricately carved three-elephant tripod pedestal supporting a wide floating flower urli. Heavyweight presentation packaging included.",
    specs: {
      Material: "Cast Alloy Pedestal + Spun Bowl",
      Dimensions: "Height 12 cm x Diameter 15 cm",
      Weight: "260 grams",
      Finish: "Antique Royal Brass",
    },
    packaging: {
      unitsPerCarton: 20,
      cartonDimensions: "58cm x 42cm x 36cm",
      grossWeight: "6.8 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["urli", "elephant", "royal", "stand", "premium", "brass"],
  },
  {
    id: "p023",
    slug: "stainless-steel-water-bottle-750ml",
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
      "Double-wall vacuum insulated flask. 12-hour hot and 24-hour cold retention. 304 food-grade stainless steel interior.",
    detailedDescription:
      "High-grade kitchenware essential. Rust-proof, sweat-free powder coating with leakproof silicone seal cap.",
    specs: {
      Capacity: "750 ml",
      Steel: "SUS 304 Food Grade Interior, 201 Exterior",
      Insulation: "Double-Wall Vacuum (12h hot / 24h cold)",
      Cap: "BPA-Free Polypropylene with Silicone Ring",
    },
    packaging: {
      unitsPerCarton: 40,
      cartonDimensions: "58cm x 38cm x 34cm",
      grossWeight: "14.5 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["bottle", "flask", "insulated", "stainless", "kitchen"],
  },

  // -----------------------------------------------------------------
  // CONSUMER ELECTRONICS
  // -----------------------------------------------------------------
  {
    id: "p017",
    slug: "gan-charger-65w-fast-charging",
    sku: "ELE-117",
    name: "GaN Turbo 65W Triple-Port Fast Wall Charger",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 20,
    price: 220,
    mrp: 699,
    status: "in_stock",
    description:
      "Gallium Nitride (GaN) high-speed charger with dual USB-C and single USB-A ports. Compatible with laptops, tablets, and phones.",
    detailedDescription:
      "Compact GaN semiconductor architecture reduces heat generation by 40% while delivering true 65W PD (Power Delivery). BIS certified.",
    specs: {
      Output: "USB-C1 (65W) + USB-C2 (30W) + USB-A (18W)",
      Certification: "BIS Certified, CE, RoHS",
      Protection: "Over-voltage, Over-heat, Short-circuit Protection",
    },
    packaging: {
      unitsPerCarton: 50,
      cartonDimensions: "45cm x 35cm x 28cm",
      grossWeight: "7.8 kg",
    },
    pickupHub: "Mulund (W) Electronics Hub, Mumbai",
    tags: ["gan", "charger", "fast charging", "65w", "usb-c", "electronics"],
  },
  {
    id: "p018",
    slug: "portable-usb-rechargeable-blender",
    sku: "ELE-118",
    name: "Portable USB-C Rechargeable Blender 380ml",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 24,
    price: 340,
    mrp: 999,
    status: "in_stock",
    description:
      "Personal travel blender with 6 stainless steel serrated blades and 2000mAh rechargeable lithium battery.",
    detailedDescription:
      "Crushes soft fruits, ice cubes, and protein shakes in 30 seconds. Magnetic safety cut-off switch ensures blades only rotate when jar is locked.",
    specs: {
      Motor: "20,000 RPM Copper Wound High-Torque Motor",
      Battery: "2000mAh Rechargeable via USB-C (15 blends/charge)",
      Capacity: "380 ml BPA-Free Food Grade PCTG",
    },
    packaging: {
      unitsPerCarton: 30,
      cartonDimensions: "52cm x 38cm x 32cm",
      grossWeight: "13.2 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["blender", "juicer", "rechargeable", "usb-c", "gadget"],
  },
  {
    id: "p019",
    slug: "wireless-bluetooth-neckband-earphones",
    sku: "ELE-119",
    name: "Wireless Bluetooth Neckband Earphones (30h Playback)",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 30,
    price: 290,
    mrp: 999,
    status: "in_stock",
    description:
      "Magnetic neckband with environmental noise cancellation, deep bass drivers, and 30-hour continuous playback.",
    detailedDescription:
      "Ergonomic silicon neck collar with IPX5 water resistance for gym and commuting. Fast charge gives 10 hours playback from a 15-minute charge.",
    specs: {
      Bluetooth: "Version 5.3 Low Latency",
      Drivers: "10mm Dynamic Titanium Composite Drivers",
      Battery: "250mAh Li-Po (30 Hours Continuous Playback)",
    },
    packaging: {
      unitsPerCarton: 60,
      cartonDimensions: "48cm x 38cm x 30cm",
      grossWeight: "9.5 kg",
    },
    pickupHub: "Mulund (W) Electronics Hub, Mumbai",
    tags: ["bluetooth", "neckband", "earphones", "audio", "wireless"],
  },
  {
    id: "p020",
    slug: "tws-wireless-earbuds-5-3",
    sku: "ELE-120",
    name: "True Wireless TWS Earbuds 5.3 with ENC",
    category: "Consumer Electronics",
    categorySlug: "electronics",
    categoryTone: "electronics",
    moq: 25,
    price: 180,
    mrp: 599,
    status: "in_stock",
    description:
      "Compact charging case with digital LED battery percentage display, instant auto-pairing, and touch controls.",
    detailedDescription:
      "High volume retailer favorite. Crisp dual-mic voice clarity and punchy bass.",
    specs: {
      Battery: "300mAh Case + 35mAh Buds (24h Total Playback)",
      Display: "Dual LED Battery Indicator",
      Range: "10 Meters",
    },
    packaging: {
      unitsPerCarton: 80,
      cartonDimensions: "46cm x 36cm x 28cm",
      grossWeight: "8.2 kg",
    },
    pickupHub: "Mulund (W), Mumbai",
    tags: ["tws", "earbuds", "wireless", "audio", "bluetooth"],
  },

  // -----------------------------------------------------------------
  // CLOTHING & APPAREL
  // -----------------------------------------------------------------
  {
    id: "p007",
    slug: "bio-washed-cotton-plain-tshirts",
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
      "Round-neck plain blank tees, pre-shrunk and bio-washed for superior hand feel, color fastness, and zero shrinkage.",
    detailedDescription:
      "Made from 100% super combed cotton. Silicon softening bath provides velvety drape and flawless print surface for DTF or screen printing.",
    specs: {
      Fabric: "100% Super Combed Cotton Single Jersey",
      Weight: "180 GSM Bio-Washed",
      Sizes: "S, M, L, XL, XXL (Assorted Pack or Custom)",
      Colors: "Black, White, Navy, Maroon, Olive Green, Grey Melange",
    },
    packaging: {
      unitsPerCarton: 50,
      cartonDimensions: "60cm x 40cm x 35cm",
      grossWeight: "12.0 kg",
    },
    pickupHub: "Tirupur / Mumbai Textile Sourcing Hub",
    tags: ["tshirt", "cotton", "combed", "bio-washed", "apparel", "clothing"],
  },
  {
    id: "p008",
    slug: "kids-cotton-hosiery-night-suit",
    sku: "CLO-107",
    name: "Kids Cotton Hosiery Night Suit Set (Ages 2-10)",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 30,
    price: 180,
    mrp: 499,
    status: "in_stock",
    description:
      "Breathable printed top and pyjama set for children. Soft elastic waistband and hypoallergenic dyes.",
    detailedDescription:
      "Vibrant all-over cartoon and geometric prints. 100% combed cotton hosiery fabric tested for skin safety.",
    specs: {
      Material: "100% Combed Hosiery Cotton",
      AgeGroups: "2-4, 4-6, 6-8, 8-10 Years",
      Package: "Individual polybag with hanger hanger-ready header",
    },
    packaging: {
      unitsPerCarton: 48,
      cartonDimensions: "55cm x 38cm x 32cm",
      grossWeight: "9.6 kg",
    },
    pickupHub: "Mumbai Textile Hub",
    tags: ["kids", "nightwear", "cotton", "apparel", "hosiery"],
  },
  {
    id: "p009",
    slug: "mens-combed-cotton-boxer-shorts",
    sku: "CLO-108",
    name: "Men's Combed Cotton Boxer Shorts (Pack of 3)",
    category: "Clothing & Apparel",
    categorySlug: "clothing",
    categoryTone: "clothing",
    moq: 40,
    price: 190,
    mrp: 499,
    status: "in_stock",
    description:
      "Pack of 3 woven combed cotton lounge boxers with elasticated waistband, side pocket, and functional fly.",
    detailedDescription:
      "Pure woven cotton fabric provides relaxed all-day comfort. Assorted plaid, check, and solid patterns per master carton.",
    specs: {
      Material: "100% Woven Combed Cotton",
      Sizes: "M (32), L (34), XL (36), XXL (38)",
      Features: "Concealed button fly, deep side pocket, soft waistband",
    },
    packaging: {
      unitsPerCarton: 40,
      cartonDimensions: "50cm x 38cm x 30cm",
      grossWeight: "8.5 kg",
    },
    pickupHub: "Bhiwandi Logistics Hub, Mumbai",
    tags: ["boxers", "shorts", "cotton", "mens", "underwear"],
  },

  // -----------------------------------------------------------------
  // TOYS & GAMES
  // -----------------------------------------------------------------
  {
    id: "p001",
    slug: "digital-lcd-drawing-tablet-8-5",
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
      "Reusable electronic paper LCD writing board with one-touch erase button and rear screen lock switch.",
    detailedDescription:
      "High volume educational toy and office memo board. Zero radiation, glare-free monochrome LCD display. Battery lasts up to 50,000 erases.",
    specs: {
      Screen: "8.5 Inch Flexible Monochrome LCD",
      Battery: "CR2025 Coin Cell (Included, easily replaceable)",
      Housing: "Shatter-resistant ABS Polycarbonate",
    },
    packaging: {
      unitsPerCarton: 60,
      cartonDimensions: "52cm x 38cm x 30cm",
      grossWeight: "8.5 kg",
    },
    pickupHub: "Bhiwandi Logistics Hub, Mumbai",
    tags: ["lcd", "tablet", "drawing", "toys", "educational", "writing"],
  },
  {
    id: "p002",
    slug: "remote-control-stunt-car",
    sku: "TOY-102",
    name: "Remote Control Stunt Car with Rechargeable Battery",
    category: "Toys & Games",
    categorySlug: "toys",
    categoryTone: "toys",
    moq: 24,
    price: 420,
    mrp: 999,
    status: "in_stock",
    description:
      "2.4GHz high-speed stunt car with 360-degree double-sided rotating flips, all-terrain soft rubber tires, and LED headlights.",
    detailedDescription:
      "Double-sided stunt drive prevents car from stopping when flipped. Includes 3.7V rechargeable lithium pack and USB charging cable.",
    specs: {
      Frequency: "2.4GHz Anti-Interference Radio System (40m range)",
      Battery: "3.7V 500mAh Lithium Rechargeable Pack Included",
      Features: "360° Flips, Double-Sided Driving, LED Headlights",
    },
    packaging: {
      unitsPerCarton: 24,
      cartonDimensions: "62cm x 45cm x 38cm",
      grossWeight: "14.0 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["rc", "car", "remote control", "toys", "stunt"],
  },

  // -----------------------------------------------------------------
  // WATCHES & HOROLOGY
  // -----------------------------------------------------------------
  {
    id: "p013",
    slug: "ultra-thin-minimalist-quartz-watch",
    sku: "WAT-112",
    name: "Ultra-Thin Minimalist Quartz Chronograph Watch",
    category: "Watches & Horology",
    categorySlug: "watches",
    categoryTone: "watches",
    moq: 25,
    price: 185,
    mrp: 599,
    status: "in_stock",
    description:
      "Contemporary slim-profile formal wrist watch with stainless steel mesh band, hardened mineral crystal glass, and Japanese quartz movement.",
    detailedDescription:
      "7mm ultra-thin case thickness. Stainless steel sliding buckle fits any wrist size without sizing tools. Water resistant to 3 ATM.",
    specs: {
      Movement: "Seiko/Miyota Precision Quartz Movement",
      Case: "40 mm Alloy with Stainless Steel Caseback",
      Glass: "Hardened Scratch-Resistant Mineral Crystal",
      Strap: "Stainless Steel Woven Mesh with Adjustable Clasp",
    },
    packaging: {
      unitsPerCarton: 50,
      cartonDimensions: "46cm x 34cm x 26cm",
      grossWeight: "7.0 kg",
    },
    pickupHub: "Mulund (W) Watch Trading Hub, Mumbai",
    tags: ["watch", "quartz", "chronograph", "minimalist", "mesh"],
  },

  // -----------------------------------------------------------------
  // OFFICE & STATIONERY
  // -----------------------------------------------------------------
  {
    id: "p028",
    slug: "pastel-gel-pens-set-12",
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
      "0.5 mm smooth-flow Japanese ink gel pens in a portable zip pouch. Fast-drying, waterproof ink.",
    detailedDescription:
      "Super smooth rollerball tip glides effortlessly on all paper surfaces. Pastel matte barrel casing with soft-touch rubber grip.",
    specs: {
      TipSize: "0.5 mm Micro Precision Stainless Rollerball",
      Ink: "Quick-Dry Smudge-Proof Gel Ink",
      Packing: "12 Pens in PVC Zipper Pouch",
    },
    packaging: {
      unitsPerCarton: 120,
      cartonDimensions: "42cm x 36cm x 28cm",
      grossWeight: "11.5 kg",
    },
    pickupHub: "Bhiwandi Hub, Mumbai",
    tags: ["pens", "gel", "pastel", "stationery", "office"],
  },
];

// Helper to look up product by ID or Slug
export function findProductByIdOrSlug(query: string): MasterProduct | undefined {
  const q = query.toLowerCase().trim();
  return MASTER_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === q ||
      p.slug.toLowerCase() === q ||
      p.sku.toLowerCase() === q
  );
}

// Helper to get related products ("You may also like")
export function getRelatedProducts(currentId: string, limit: number = 5): MasterProduct[] {
  const current = MASTER_PRODUCTS.find((p) => p.id === currentId || p.slug === currentId);
  if (!current) return MASTER_PRODUCTS.slice(0, limit);

  // First pick products in the same category, excluding current
  const sameCat = MASTER_PRODUCTS.filter(
    (p) => p.categorySlug === current.categorySlug && p.id !== current.id && p.slug !== current.slug
  );

  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }

  // Backfill with other top products
  const others = MASTER_PRODUCTS.filter(
    (p) => p.id !== current.id && p.slug !== current.slug && !sameCat.includes(p)
  );
  return [...sameCat, ...others].slice(0, limit);
}
