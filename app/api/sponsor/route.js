import connectMongo from "@/lib/mongoose";
import Sponsor from "@/models/Sponsor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const sponsors = await Sponsor.find().sort({ order: 1 });
    return NextResponse.json(sponsors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    body.order = (await Sponsor.countDocuments({})) + 1;
    const sponsor = await Sponsor.create(body);
    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const sponsor = await Sponsor.findByIdAndUpdate(body._id, body, { new: true });
    return NextResponse.json(sponsor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await connectMongo();
    const { sponsorIds } = await request.json();

    if (!Array.isArray(sponsorIds) || sponsorIds.length === 0) {
      return NextResponse.json({ error: "sponsorIds must be a non-empty array" }, { status: 400 });
    }

    await Sponsor.bulkWrite(
      sponsorIds.map((sponsorId, index) => ({
        updateOne: {
          filter: { _id: sponsorId },
          update: { $set: { order: index + 1 } },
        },
      }))
    );

    const sponsors = await Sponsor.find().sort({ order: 1 });
    return NextResponse.json(sponsors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const sponsor = await Sponsor.findByIdAndDelete(body._id);
    return NextResponse.json(sponsor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
