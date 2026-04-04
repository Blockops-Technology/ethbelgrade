import connectMongo from "@/lib/mongoose";
import Sponsor from "@/models/Sponsor";
import getDataSource from "@/lib/getDataSource";
import sponsorsJson from "@/components/landing/partners/partners.json";

const mapDbSponsor = (sponsor) => ({
  ...sponsor,
  image: `/api/sponsor/${sponsor._id}/image`,
});

const getSponsors = async (source) => {
  if (!source) source = await getDataSource();

  if (source !== "db") {
    return sponsorsJson;
  }

  try {
    await connectMongo();
    const sponsors = await Sponsor.find({}, "name link alt tier module order").sort({ order: 1 });

    if (!sponsors.length) {
      throw new Error("Sponsors are enabled for database mode, but no sponsor data was found.");
    }

    return JSON.parse(JSON.stringify(sponsors)).map(mapDbSponsor);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load sponsors from the database.");
  }
};

export default getSponsors;
