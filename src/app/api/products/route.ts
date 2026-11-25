import { NextRequest, NextResponse } from "next/server";
import { MASTER_PRODUCTS } from "@/lib/products-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const q = searchParams.get("q") || searchParams.get("search");

    let results = [...MASTER_PRODUCTS];

    if (categorySlug && categorySlug !== "all") {
      results = results.filter(
        (p) =>
          p.categorySlug === categorySlug ||
          p.category.toLowerCase().includes(categorySlug.toLowerCase())
      );
    }

    if (q && q.trim()) {
      const term = q.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
