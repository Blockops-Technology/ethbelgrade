import connectMongo from "@/lib/mongoose";
import Settings from "@/models/Settings";
import { ensureAgendaShape, getDefaultAgenda } from "@/lib/agenda";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const setting = await Settings.findOne({ key: "agenda" });
    const agenda = setting?.value ? ensureAgendaShape(JSON.parse(JSON.stringify(setting.value))) : getDefaultAgenda();
    return NextResponse.json(agenda);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const agenda = ensureAgendaShape(body);

    await Settings.findOneAndUpdate(
      { key: "agenda" },
      { value: agenda },
      { upsert: true, new: true }
    );

    return NextResponse.json(agenda);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
