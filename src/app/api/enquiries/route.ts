import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/validations";
import { z } from "zod";
import { saveEnquiry, getStoredEnquiries } from "@/lib/local-storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = enquirySchema.parse(body);

    // Save to local storage cache so it immediately shows up in admin CRM
    const saved = saveEnquiry(data);

    try {
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
    } catch (dbErr) {
      console.warn("MySQL deferred/offline. RFQ Lead saved safely to local persistent store:", data);
    }

    return NextResponse.json(
      { success: true, message: "RFQ enquiry submitted successfully.", enquiry: saved },
      { status: 201 }
    );
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
  try {
    const dbEnquiries = await db.query.enquiries.findMany({
      orderBy: (enquiries, { desc }) => [desc(enquiries.createdAt)],
    });
    if (dbEnquiries && dbEnquiries.length > 0) {
      return NextResponse.json({ data: dbEnquiries });
    }
  } catch (error) {
    // MySQL not reachable - fallback to local storage
  }

  const stored = getStoredEnquiries();
  return NextResponse.json({ data: stored });
}
