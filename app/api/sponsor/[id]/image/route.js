import { parseImageData } from "@/lib/imageData";
import connectMongo from "@/lib/mongoose";
import Sponsor from "@/models/Sponsor";

export async function GET(_request, { params }) {
  try {
    await connectMongo();

    const sponsor = await Sponsor.findById(params.id).select("image name alt");

    if (!sponsor?.image) {
      return new Response("Image not found", { status: 404 });
    }

    if (/^(https?:\/\/|\/)/.test(sponsor.image)) {
      return Response.redirect(sponsor.image, 307);
    }

    const imageData = parseImageData(sponsor.image);

    if (!imageData) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(imageData.buffer, {
      headers: {
        "Content-Type": imageData.contentType,
        "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=86400",
        "Content-Disposition": `inline; filename="${sponsor.alt || sponsor.name || "sponsor"}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to load image", { status: 500 });
  }
}
