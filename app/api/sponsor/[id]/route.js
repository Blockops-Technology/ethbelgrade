import connectMongo from "@/lib/mongoose";
import Sponsor from "@/models/Sponsor";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const sponsor = await Sponsor.findById(params.id);

    if (!sponsor) {
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
    }

    return NextResponse.json(sponsor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
