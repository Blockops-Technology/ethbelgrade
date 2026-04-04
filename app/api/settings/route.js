import connectMongo from "@/lib/mongoose";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const settings = await Settings.find();
    return NextResponse.json(Object.fromEntries(settings.map((s) => [s.key, s.value])));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const entries = Object.entries(body);
    await Promise.all(
      entries.map(([key, value]) =>
        Settings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
      )
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
