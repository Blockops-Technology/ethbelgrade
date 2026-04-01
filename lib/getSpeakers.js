import connectMongo from "@/lib/mongoose";
import Speaker from "@/models/Speaker";
import getDataSource from "@/lib/getDataSource";
import speakersJson from "@/components/landing/speakers/speakers.json";

const jsonSpeakers = speakersJson.list.map((s) => ({
  name: s.name,
  company: s.position,
  link: s.twitter,
  image: `/images/Speakers/${s.photo}`,
  category: s.category,
}));

const getSpeakers = async (source) => {
  if (!source) source = await getDataSource();

  if (source !== "db") {
    return jsonSpeakers;
  }

  try {
    await connectMongo();
    const speakers = await Speaker.find().sort({ order: 1 });

    if (!speakers.length) {
      throw new Error("Speakers are enabled for database mode, but no speaker data was found.");
    }

    return JSON.parse(JSON.stringify(speakers));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load speakers from the database.");
  }
};

export default getSpeakers;
