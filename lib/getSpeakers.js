import connectMongo from "@/lib/mongoose";
import Speaker from "@/models/Speaker";
import Settings from "@/models/Settings";
import speakersJson from "@/components/landing/speakers/speakers.json";

const jsonSpeakers = speakersJson.list.map((s) => ({
  name: s.name,
  company: s.position,
  link: s.twitter,
  image: `/images/Speakers/${s.photo}`,
  category: s.category,
}));

const getSpeakers = async () => {
  try {
    await connectMongo();
    const setting = await Settings.findOne({ key: "speakersSource" });
    if (setting?.value === "db") {
      const speakers = await Speaker.find().sort({ order: 1 });
      return { speakers: JSON.parse(JSON.stringify(speakers)), speakersFromDb: true };
    }
  } catch (e) {
    console.error(e);
  }

  return { speakers: jsonSpeakers, speakersFromDb: false };
};

export default getSpeakers;
