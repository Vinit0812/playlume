import { db } from "./index";
import { categories, products } from "./schema";

export async function seedDatabase() {
  console.log("Seeding initial B2B categories and product lots...");

  const defaultCategories = [
    {
      name: "Toys & Games",
      slug: "toys-games",
      description: "Educational STEM kits, die-cast models, RC vehicles, and wholesale early learning games.",
      status: "active" as const,
      sortOrder: 1,
    },
    {
      name: "Clothing & Apparel",
      slug: "clothing-apparel",
      description: "Combed cotton corporate apparel, activewear, knitwear, and bulk retail apparel lots.",
      status: "active" as const,
      sortOrder: 2,
    },
    {
      name: "Watches & Timepieces",
      slug: "watches-timepieces",
      description: "Quartz dress watches, automatic chronographs, and corporate gifting horology.",
      status: "active" as const,
      sortOrder: 3,
    },
    {
      name: "Electronics & Tech",
      slug: "electronics-tech",
      description: "Bluetooth audio peripherals, GaN fast chargers, and commercial accessories.",
      status: "active" as const,
      sortOrder: 4,
    },
    {
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Die-cast non-stick cookware, stainless thermal carafes, and institutional appliances.",
      status: "active" as const,
      sortOrder: 5,
    },
    {
      name: "Stationery & Office",
      slug: "stationery-office",
      description: "Executive journal bundles, archival writing instruments, and paper supplies.",
      status: "active" as const,
      sortOrder: 6,
    },
  ];

  for (const cat of defaultCategories) {
    try {
      await db.insert(categories).values(cat);
      console.log(`Seeded category: ${cat.name}`);
    } catch (e: any) {
      console.log(`Category ${cat.name} already exists or DB offline:`, e?.message || e);
    }
  }

  console.log("Database seed routine complete.");
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
