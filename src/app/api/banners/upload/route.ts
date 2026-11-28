import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Verify it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files (JPEG, PNG, WebP) are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/banners directory exists
    const uploadsDir = path.join(process.cwd(), "public", "banners");
    await mkdir(uploadsDir, { recursive: true });

    // Clean filename
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30);
    const fileName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/banners/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error: unknown) {
    console.error("Banner upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload banner image",
      },
      { status: 500 }
    );
  }
}
