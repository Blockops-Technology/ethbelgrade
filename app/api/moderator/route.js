import connectMongo from "@/lib/mongoose";
import Moderator from "@/models/Moderator";
import { NextResponse } from "next/server";
import isEmail from "validator/lib/isEmail";

const normalizeEmail = (email = "") => email.trim().toLowerCase();

export async function GET() {
  try {
    await connectMongo();
    const moderators = await Moderator.find().sort({ email: 1 });
    return NextResponse.json(moderators);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const email = normalizeEmail(body.email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const moderator = await Moderator.create({ email });
    return NextResponse.json(moderator, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Moderator already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const moderator = await Moderator.findByIdAndDelete(body._id);
    return NextResponse.json(moderator);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
