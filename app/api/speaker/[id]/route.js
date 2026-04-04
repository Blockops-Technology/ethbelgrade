import connectMongo from "@/lib/mongoose";
import Speaker from "@/models/Speaker";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const speaker = await Speaker.findById(params.id);

    if (!speaker) {
      return NextResponse.json({ error: "Speaker not found" }, { status: 404 });
    }

    return NextResponse.json(speaker);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
