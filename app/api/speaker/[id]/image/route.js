import connectMongo from "@/lib/mongoose";
import { parseImageData } from "@/lib/imageData";
import Speaker from "@/models/Speaker";

export async function GET(_request, { params }) {
  try {
    await connectMongo();

    const speaker = await Speaker.findById(params.id).select("image name");

    if (!speaker?.image) {
      return new Response("Image not found", { status: 404 });
    }

    if (/^(https?:\/\/|\/)/.test(speaker.image)) {
      return Response.redirect(speaker.image, 307);
    }

    const imageData = parseImageData(speaker.image);

    if (!imageData) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(imageData.buffer, {
      headers: {
        "Content-Type": imageData.contentType,
        "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
        "Content-Disposition": `inline; filename="${speaker.name || "speaker"}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to load image", { status: 500 });
  }
}
