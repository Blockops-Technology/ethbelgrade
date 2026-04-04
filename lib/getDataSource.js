import connectMongo from "@/lib/mongoose";
import Settings from "@/models/Settings";

const getDataSource = async () => {
  try {
    await connectMongo();
    const setting = await Settings.findOne({ key: "dataSource" });
    return setting?.value ?? "file";
  } catch (e) {
    console.error(e);
    return "file";
  }
};

export default getDataSource;
