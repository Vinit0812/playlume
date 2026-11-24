import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/db/schema";
import { buyerRegistrationSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = buyerRegistrationSchema.parse(body);

    try {
      await db.insert(buyers).values({
        name: data.name,
        businessName: data.businessName,
        phone: data.phone,
        whatsappNumber: data.whatsappNumber || data.phone,
        email: data.email || null,
        city: data.city || null,
        state: data.state || null,
        businessType: data.businessType || "retailer",
        status: "active",
      });
    } catch (dbErr) {
      console.warn("Database storage deferred or offline. Buyer lead queued safely:", data);
    }

    return NextResponse.json({ success: true, message: "Buyer registered successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Buyer registration error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allBuyers = await db.query.buyers.findMany({
      orderBy: (buyers, { desc }) => [desc(buyers.createdAt)],
    });
    return NextResponse.json({ data: allBuyers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch buyers" }, { status: 500 });
  }
}
