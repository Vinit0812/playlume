import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import { CATEGORIES_FEATURED } from "@/lib/constants";
import { CATEGORY_META, MASTER_PRODUCTS } from "@/lib/products-data";
import { ArrowRight, Package, TrendingUp, Percent, Truck, ShieldCheck, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

// Map category slug → banner image path
const CATEGORY_BANNER_MAP: Record<string, string> = {
  "toys-games": "/category-banners/banner-toys.png",
  "clothing-apparel": "/category-banners/banner-clothing.png",
  "artificial-jewellery": "/category-banners/banner-jewellery.png",
  "consumer-electronics": "/category-banners/banner-electronics.png",
  "home-kitchen": "/category-banners/banner-home.png",
  "fashion-accessories": "/category-banners/banner-fashion.png",
};

// Trust badges per category (using Lucide icons, no emojis)
const CATEGORY_TRUST: Record<string, { type: "shield" | "building" | "truck" | "package" | "sparkles" | "check"; text: string }[]> = {
  "toys-games": [
    { type: "shield", text: "BIS / CE Certified" },
    { type: "building", text: "Direct Factory Rates" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "clothing-apparel": [
    { type: "check", text: "Bio-Wash Quality" },
    { type: "package", text: "Bulk Carton Packing" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "artificial-jewellery": [
    { type: "sparkles", text: "Anti-Tarnish Coated" },
    { type: "building", text: "Direct Factory Lots" },
    { type: "package", text: "Gift-Ready Packaging" },
  ],
  "consumer-electronics": [
    { type: "shield", text: "BIS Tested" },
    { type: "package", text: "Master Carton Pack" },
    { type: "truck", text: "Same-Day Dispatch" },
  ],
  "home-kitchen": [
    { type: "check", text: "Food-Grade Material" },
    { type: "building", text: "Factory Direct Lots" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
  "fashion-accessories": [
    { type: "sparkles", text: "Vegan Leather" },
    { type: "check", text: "Premium Finish" },
    { type: "truck", text: "Pan-India Dispatch" },
  ],
};

function renderTrustIcon(type: string) {
  switch (type) {
    case "shield":
      return <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />;
    case "building":
      return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
    case "truck":
      return <Truck className="w-3.5 h-3.5 text-emerald-600" />;
    case "package":
      return <Package className="w-3.5 h-3.5 text-purple-600" />;
    case "sparkles":
      return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category =
    CATEGORY_META.find((c) => c.slug === slug || c.id === slug) ||
    CATEGORIES_FEATURED.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found — V&A Global Sourcing" };
  return {
    title: `${category.name} Wholesale Sourcing & Distribution — V&A Global Sourcing`,
    description: `Direct factory wholesale pricing and verified MOQs for ${category.name}. Sourced for Indian retailers and commercial distributors.`,
  };
}

export default async function CategoryLandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const { slug } = await params;
  const { sub } = await searchParams;

  const categoryMeta = CATEGORY_META.find((c) => c.slug === slug || c.id === slug);
  const featured = CATEGORIES_FEATURED.find((c) => c.slug === slug);

  if (!categoryMeta && !featured) notFound();

  const categoryName = categoryMeta?.name || featured?.name || "Category";
  const categorySlug = categoryMeta?.slug || featured?.slug || slug;
  const subCategories = categoryMeta?.subCategories || [];

  const allCategoryProducts = MASTER_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug || p.categorySlug === slug
  );

  const displayedProducts = sub
    ? allCategoryProducts.filter((p) => p.subCategorySlug === sub)
    : allCategoryProducts;

  const activeSubCategoryName = sub
    ? subCategories.find((s) => s.slug === sub)?.name || sub
    : null;

  const categoryBanner = CATEGORY_BANNER_MAP[categorySlug];
  const trustBadges = CATEGORY_TRUST[categorySlug] || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <Header />

      <main className="flex-1 pb-12 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 py-5 font-medium">
          <Link href="/" className="hover:text-amber-600 transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600 transition">Catalogue</Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-amber-600 transition font-semibold">
            {categoryName}
          </Link>
          {activeSubCategoryName && (
            <>
              <span>/</span>
              <span className="text-amber-600 font-bold">{activeSubCategoryName}</span>
            </>
          )}
        </nav>

        {/* ─── Category Hero Banner ─── */}
        {categoryBanner ? (
          <div className="mb-6 rounded-2xl overflow-hidden shadow-sm border border-neutral-200/70 bg-[#faf6f0]">
            <img
              src={categoryBanner}
              alt={`${categoryName} wholesale category`}
              className="w-full h-auto object-contain block"
              style={{ aspectRatio: "1024 / 222" }}
            />
          </div>
        ) : (
          /* Fallback gradient hero for categories without a banner image */
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-neutral-900 rounded-2xl px-8 py-10 mb-6 border border-amber-200/60 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fbbf24 0%, transparent 60%)" }} />
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="inline-block text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Commercial Merchandise Division
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{categoryName}</h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {categoryMeta?.description || "Wholesale commercial lots"}. Direct factory wholesale rates with pan-India distribution and verified MOQs.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200 text-neutral-700 font-semibold shadow-xs">
                  Starting Rate: <strong className="text-amber-600">{categoryMeta?.from || "₹49+"}</strong>
                </span>
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200 text-neutral-700 font-semibold shadow-xs">
                  Standard MOQ: <strong>{categoryMeta?.moq || "20 pcs"}</strong>
                </span>
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200 text-neutral-700 font-semibold shadow-xs">
                  Available Lots: <strong>{allCategoryProducts.length}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Trust Badges Strip ─── */}
        {trustBadges.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {trustBadges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-neutral-200 text-neutral-700 shadow-xs"
              >
                {renderTrustIcon(b.type)}
                <span>{b.text}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-neutral-200 text-neutral-700 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{allCategoryProducts.length} Products Available</span>
            </span>
          </div>
        )}

        {/* ─── Sub-Category Navigation Pills ─── */}
        {subCategories.length > 0 && (
          <div className="mb-8 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs">
            <div className="text-[11px] font-black text-neutral-500 uppercase tracking-widest mb-3">
              Browse Sub-Categories
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/category/${categorySlug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  !sub
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                All {categoryName} ({allCategoryProducts.length})
              </Link>
              {subCategories.map((sc) => {
                const count = allCategoryProducts.filter((p) => p.subCategorySlug === sc.slug).length;
                const isActive = sub === sc.slug;
                return (
                  <Link
                    key={sc.slug}
                    href={`/category/${categorySlug}?sub=${sc.slug}`}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? "bg-amber-500 text-stone-950 shadow-sm"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {sc.name} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Products Grid ─── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                {activeSubCategoryName ? `${activeSubCategoryName} Lots` : `All ${categoryName} Lots`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Showing {displayedProducts.length} wholesale ready products
              </p>
            </div>
            <Link
              href="/become-a-buyer"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Get Wholesale Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedProducts.map((p) => {
                const productProps: ProductProps = {
                  id: p.id,
                  slug: p.slug,
                  sku: p.sku,
                  name: p.name,
                  category: p.category,
                  categorySlug: p.categorySlug,
                  categoryTone: p.categoryTone,
                  image: p.image,
                  moq: p.moq,
                  price: p.price,
                  mrp: p.mrp,
                  status: p.status,
                  description: p.description,
                  specs: p.specs,
                };
                return <ProductCard key={p.id} product={productProps} />;
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-neutral-200 text-center">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800">No products found in this subcategory</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Check back shortly or request custom wholesale manufacturing quotes.
              </p>
              <Link
                href={`/category/${categorySlug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg"
              >
                View all {categoryName}
              </Link>
            </div>
          )}
        </div>

        {/* ─── Other Wholesale Divisions ─── */}
        <div className="pt-8 border-t border-neutral-200">
          <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4">
            Other Wholesale Divisions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORY_META.filter((c) => c.slug !== categorySlug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="bg-white rounded-xl p-3.5 border border-neutral-200 hover:border-amber-500 hover:-translate-y-0.5 transition shadow-xs text-center group"
              >
                <div className="font-bold text-neutral-900 text-xs group-hover:text-amber-600 transition">
                  {c.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">MOQ {c.moq} • From {c.from}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
