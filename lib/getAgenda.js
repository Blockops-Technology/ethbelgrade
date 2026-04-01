import connectMongo from "@/lib/mongoose";
import Settings from "@/models/Settings";
import getDataSource from "@/lib/getDataSource";
import { ensureAgendaShape, getDefaultAgenda } from "@/lib/agenda";

const getAgenda = async () => {
  const source = await getDataSource();

  if (source !== "db") {
    return getDefaultAgenda();
  }

  try {
    await connectMongo();
    const setting = await Settings.findOne({ key: "agenda" });

    if (!setting?.value) {
      throw new Error("Agenda is enabled for database mode, but no agenda data was found.");
    }

    return ensureAgendaShape(JSON.parse(JSON.stringify(setting.value)));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load agenda from the database.");
  }
};

export default getAgenda;
