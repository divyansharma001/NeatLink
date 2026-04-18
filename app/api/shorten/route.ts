import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Url from "@/models/Url";
import Counter from "@/models/Counter";
import { encode } from "@/lib/base62";

export async function POST(request: NextRequest) {
  try {
   
    const { longUrl } = await request.json();

    if (!longUrl) {
      return NextResponse.json(
        { error: "longUrl is required" },
        { status: 400 }
      );
    }

  
    await connectToDatabase();

    
    const existing = await Url.findOne({ originalUrl: longUrl });

    if (existing) {
      return NextResponse.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`,
        shortCode: existing.shortCode,
      });
    }

   
    const counter = await Counter.findOneAndUpdate(
      { name: "urlId" },           
      { $inc: { seq: 1 } },        
      { new: true, upsert: true }  
    );

    const newId = counter.seq;

    
    const shortCode = encode(newId);

   
    await Url.create({
      urlID: newId,
      shortCode,
      originalUrl: longUrl,
    });

    
    return NextResponse.json(
      {
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
        shortCode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}