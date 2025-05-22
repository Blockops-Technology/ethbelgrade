import connectMongo from "@/lib/mongoose";
import Speaker from "@/models/Speaker";
import { NextResponse } from "next/server";

const ORDER_SPACING = 1000000000;

export async function GET(request) {
  await connectMongo();

  try {
    const speakers = await Speaker.find().sort({order: 1});
    console.log(speakers);
    return NextResponse.json(speakers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectMongo();

  try {
    const body = await request.json();
    body.order = await Speaker.find({}).sort({order: -1}).limit(1).then(speaker => speaker && speaker.length ? speaker[0].order : 0) + ORDER_SPACING;
    const speaker = await Speaker.create(body);
    return NextResponse.json(speaker, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectMongo();
  const body = await request.json();
  const speaker = await Speaker.findByIdAndUpdate(body._id, body, { new: true });
  return NextResponse.json(speaker);
}

export async function DELETE(request) {
  await connectMongo();
  const body = await request.json();
  const speaker = await Speaker.findByIdAndDelete(body._id);
  return NextResponse.json(speaker);
}
