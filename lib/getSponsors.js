import connectMongo from "@/lib/mongoose";
import Sponsor from "@/models/Sponsor";
import getDataSource from "@/lib/getDataSource";
import sponsorsJson from "@/components/landing/partners/partners.json";

const getSponsors = async (source) => {
  if (!source) source = await getDataSource();
  if (source === "db") {
    try {
      await connectMongo();
      const sponsors = await Sponsor.find().sort({ order: 1 });
      return { sponsors: JSON.parse(JSON.stringify(sponsors)) };
    } catch (e) {
      console.error(e);
    }
  }

  return { sponsors: sponsorsJson };
};

export default getSponsors;
