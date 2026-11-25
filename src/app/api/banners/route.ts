import { NextRequest, NextResponse } from "next/server";
import {
  getStoredBanners,
  saveBanner,
  updateBannerStatus,
  deleteBanner,
} from "@/lib/local-storage";

export async function GET(request: NextRequest) {
  try {
    const banners = getStoredBanners();
    return NextResponse.json({ success: true, banners });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = saveBanner(body);
    return NextResponse.json({ success: true, banners: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save banner" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.id && body.status) {
      const updated = updateBannerStatus(body.id, body.status);
      return NextResponse.json({ success: true, banners: updated });
    }
    const updated = saveBanner(body);
    return NextResponse.json({ success: true, banners: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    if (!idParam) {
      return NextResponse.json(
        { success: false, error: "Banner ID is required" },
        { status: 400 }
      );
    }
    const updated = deleteBanner(parseInt(idParam, 10));
    return NextResponse.json({ success: true, banners: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
