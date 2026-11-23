import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = enquirySchema.parse(body);

    await db.insert(enquiries).values({
      buyerName: data.buyerName,
      businessName: data.businessName,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      city: data.city,
      state: data.state,
      productName: data.productName,
      quantity: data.quantity,
      additionalRequirements: data.additionalRequirements,
      status: "new",
      source: "website",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Admin only — will add auth middleware
  try {
    const allEnquiries = await db.query.enquiries.findMany({
      orderBy: (enquiries, { desc }) => [desc(enquiries.createdAt)],
    });
    return NextResponse.json({ data: allEnquiries });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
