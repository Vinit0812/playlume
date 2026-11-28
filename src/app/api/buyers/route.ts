import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/db/schema";
import { buyerRegistrationSchema } from "@/lib/validations";
import { z } from "zod";
import { saveBuyer, getStoredBuyers } from "@/lib/local-storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = buyerRegistrationSchema.parse(body);

    // Save to local storage cache so it immediately shows up in admin dashboard
    const saved = saveBuyer(data);

    // Try saving to MySQL database if live database is connected
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
      console.warn("MySQL deferred/offline. Saved safely to local persistent JSON store:", data);
    }

    return NextResponse.json(
      { success: true, message: "Buyer registered successfully", buyer: saved },
      { status: 201 }
    );
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
    const dbBuyers = await db.query.buyers.findMany({
      orderBy: (buyers, { desc }) => [desc(buyers.createdAt)],
    });
    if (dbBuyers && dbBuyers.length > 0) {
      return NextResponse.json({ data: dbBuyers });
    }
  } catch (error) {
    // MySQL not reachable - fallback to local storage
  }

  const stored = getStoredBuyers();
  return NextResponse.json({ data: stored });
}
