import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard, { ProductProps } from "@/components/common/ProductCard";
import { CATEGORIES_FEATURED } from "@/lib/constants";
import { CATEGORY_META, MASTER_PRODUCTS } from "@/lib/products-data";
import { ArrowRight, Layers, Package, Tag, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category =
    CATEGORY_META.find((c) => c.slug === slug || c.id === slug) ||
    CATEGORIES_FEATURED.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found — PLAYLUME" };
  return {
    title: `${category.name} Wholesale Sourcing & Distribution — PLAYLUME`,
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

  return (
    <div className="min-h-screen flex flex-col bg-surface text-neutral-text antialiased">
      <Header />

      <main className="flex-1 py-10 px-4 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600">Catalogue</Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-amber-600">
            {categoryName}
          </Link>
          {activeSubCategoryName && (
            <>
              <span>/</span>
              <span className="text-amber-600 font-bold">{activeSubCategoryName}</span>
            </>
          )}
        </nav>

        {/* Category Header Hero */}
        <div className="bg-[#141414] text-white rounded-3xl p-8 sm:p-12 mb-8 border border-neutral-800 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700">
              Commercial Merchandise Division
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {categoryMeta?.description || featured?.subhead || "Wholesale commercial lots"}. Direct factory wholesale rates with pan-India distribution and verified MOQs.
            </p>
            <div className="flex flex-wrap gap-4 pt-3 text-xs">
              <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300">
                Starting Rate: <strong className="text-amber-400">{categoryMeta?.from || featured?.startingPrice || "₹49+"}</strong>
              </span>
              <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300">
                Standard MOQ: <strong className="text-white">{categoryMeta?.moq || featured?.moq || "20 pcs"}</strong>
              </span>
              <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300">
                Available Lots: <strong className="text-white">{allCategoryProducts.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Category Navigation Pills */}
        {subCategories.length > 0 && (
          <div className="mb-8 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-3">
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

        {/* Product Cards Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                {activeSubCategoryName || `All ${categoryName} Lots`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Showing {displayedProducts.length} wholesale ready products
              </p>
            </div>
            <Link
              href="/become-a-buyer"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Get Wholesale Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Other Merchandise Divisions */}
        <div className="pt-8 border-t border-neutral-200">
          <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-4">
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
