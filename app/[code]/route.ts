import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Url from "@/models/Url";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    await connectToDatabase();

    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.redirect(urlDoc.originalUrl, 302);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}