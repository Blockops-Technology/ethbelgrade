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
  if (source === "db") {
    try {
      await connectMongo();
      const speakers = await Speaker.find().sort({ order: 1 });
      return { speakers: JSON.parse(JSON.stringify(speakers)) };
    } catch (e) {
      console.error(e);
    }
  }

  return { speakers: jsonSpeakers };
};

export default getSpeakers;
