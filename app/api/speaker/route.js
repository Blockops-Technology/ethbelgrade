import connectMongo from "@/lib/mongoose";
import Speaker from "@/models/Speaker";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongo();
    const speakers = await Speaker.find().sort({order: 1});
    return NextResponse.json(speakers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    body.order = await Speaker.countDocuments({}) + 1;
    const speaker = await Speaker.create(body);
    return NextResponse.json(speaker, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const speaker = await Speaker.findByIdAndUpdate(body._id, body, { new: true });
    return NextResponse.json(speaker);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await connectMongo();
    const { speakerIds } = await request.json();

    if (!Array.isArray(speakerIds) || speakerIds.length === 0) {
      return NextResponse.json({ error: "speakerIds must be a non-empty array" }, { status: 400 });
    }

    await Speaker.bulkWrite(
      speakerIds.map((speakerId, index) => ({
        updateOne: {
          filter: { _id: speakerId },
          update: { $set: { order: index + 1 } },
        },
      }))
    );

    const speakers = await Speaker.find().sort({ order: 1 });
    return NextResponse.json(speakers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const speaker = await Speaker.findByIdAndDelete(body._id);
    return NextResponse.json(speaker);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
