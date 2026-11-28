import { NextResponse } from "next/server";
import { CATEGORIES_FEATURED, SITE_CONFIG } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CATEGORY_META, MASTER_PRODUCTS } from "@/lib/products-data";

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const flagshipProducts = CATEGORY_META.map((cat) => {
    return (
      MASTER_PRODUCTS.find((p) => p.categorySlug === cat.slug && p.priority === "high") ||
      MASTER_PRODUCTS.find((p) => p.categorySlug === cat.slug)
    );
  }).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const lines: string[] = [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.description} Supplies ${MASTER_PRODUCTS.length} wholesale SKUs across ${CATEGORIES_FEATURED.length} commercial divisions with transparent MOQs, GST invoicing, E-Way bills, and pan-India surface dispatch.`,
    "",
    "## Core Pages",
    `- [Homepage](${baseUrl}/): Multi-category B2B wholesale trading overview and RFQ desk`,
    `- [Full Wholesale Catalogue](${baseUrl}/products): Browse all ${MASTER_PRODUCTS.length} verified wholesale SKUs with MOQs and tiered volume pricing`,
    `- [All Merchandise Divisions](${baseUrl}/categories): Directory of 6 wholesale categories and subcategories`,
    `- [Trending Wholesale Deals](${baseUrl}/trending): Fast-moving wholesale lots with high retail turnover`,
    `- [How Wholesale Ordering Works](${baseUrl}/how-it-works): 5-stage B2B procurement workflow, QC, GST billing & transit timelines`,
    `- [Submit Wholesale RFQ](${baseUrl}/enquiry): Request formal proforma invoices and volume slab quotations`,
    `- [Register as a Trade Buyer](${baseUrl}/become-a-buyer): B2B buyer onboarding for retailers and distributors`,
    `- [Corporate Profile](${baseUrl}/about): Institutional sourcing standards and fulfillment network`,
    `- [Commercial Trade Desk](${baseUrl}/contact): Sales & bulk enquiry contact details`,
    "",
    "## Merchandise Divisions",
    ...CATEGORIES_FEATURED.map(
      (cat) =>
        `- [${cat.name}](${baseUrl}/category/${cat.slug}): ${cat.subhead} (Standard MOQ: ${cat.moq}, Starting: ${cat.startingPrice})`
    ),
    "",
    "## Flagship Wholesale Lots",
    ...flagshipProducts.map(
      (prod) =>
        `- [${prod.name}](${baseUrl}/product/${prod.slug}): SKU ${prod.sku} · Wholesale ₹${prod.price}/pc (MRP ₹${prod.mrp}/pc) · MOQ ${prod.moq} pcs · ${prod.category}`
    ),
    "",
    "## B2B Sourcing Guides & Research",
    ...BLOG_POSTS.map(
      (post) =>
        `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.excerpt}`
    ),
    "",
    "## Policies & Sitemap",
    `- [Commercial Privacy Policy](${baseUrl}/policies/privacy)`,
    `- [Freight, Logistics & Shipping Policy](${baseUrl}/policies/shipping)`,
    `- [Wholesale Terms of Supply](${baseUrl}/policies/terms)`,
    `- [XML Sitemap](${baseUrl}/sitemap.xml)`,
    "",
    "## Commercial Trade Contact",
    `- Email: ${SITE_CONFIG.email}`,
    `- Operations Hub: Trade Tower / Commercial Logistics Network, India (GST Registered B2B Enterprise)`,
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
