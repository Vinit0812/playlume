import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductDetailView from "@/components/product/ProductDetailView";
import {
  findProductByIdOrSlug,
  getRelatedProducts,
  MASTER_PRODUCTS,
} from "@/lib/products-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductByIdOrSlug(slug) || MASTER_PRODUCTS[0];
  return {
    title: `${product.name} (MOQ: ${product.moq} pcs) — V&A Global Sourcing Wholesale`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductByIdOrSlug(slug) || MASTER_PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product.id, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 antialiased">
      <Header />

      <main className="flex-1 py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
