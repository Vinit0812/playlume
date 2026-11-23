import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, categories, productImages } from "@/lib/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { eq, like, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * PRODUCTS_PER_PAGE;

    // Build where conditions
    const conditions = [eq(products.status, "published")];
    if (q) {
      conditions.push(like(products.name, `%${q}%`));
    }

    const allProducts = await db.query.products.findMany({
      where: and(...conditions),
      with: {
        category: true,
        images: {
          where: eq(productImages.isPrimary, true),
          limit: 1,
        },
      },
      orderBy: [desc(products.createdAt)],
      limit: PRODUCTS_PER_PAGE,
      offset,
    });

    return NextResponse.json({ data: allProducts, page, perPage: PRODUCTS_PER_PAGE });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Admin only - will be protected by middleware
  try {
    const body = await request.json();
    const { slug, ...rest } = body;

    const inserted = await db.insert(products).values({
      ...rest,
      slug: slug || body.name.toLowerCase().replace(/\s+/g, "-"),
    });

    return NextResponse.json({ success: true, data: inserted }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
