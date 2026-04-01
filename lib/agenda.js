import legacyAgendaJson from "@/components/landing/agenda/agenda.json";

export const DEFAULT_AGENDA_SPACES = [
  { id: "danube-stage", name: "Danube stage", order: 1 },
  { id: "sava-stage", name: "Sava stage", order: 2 },
  { id: "rise-stage", name: "Rise stage", order: 3 },
];

const EMPTY_LEGACY_ITEM = {
  category: "",
  title: "",
  speaker: "",
  company: "",
  youtube: "",
};

export const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const isFilledAgendaItem = (item) =>
  Boolean(item?.title || item?.speaker || item?.company || item?.youtube || item?.link || item?.category);

export const sortTimeSlots = (timeSlots = []) =>
  [...timeSlots].sort((a, b) => {
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    return ah * 60 + am - (bh * 60 + bm);
  });

export const ensureAgendaShape = (agenda) => ({
  days: (agenda?.days || []).map((day, index) => ({
    id: day.id || `day-${index + 1}`,
    dayName: day.dayName || `Day ${index + 1}`,
    date: day.date || "",
  })),
  spaces: [...(agenda?.spaces || DEFAULT_AGENDA_SPACES)]
    .map((space, index) => ({
      id: space.id || slugify(space.name) || `space-${index + 1}`,
      name: space.name || `Space ${index + 1}`,
      order: typeof space.order === "number" ? space.order : index + 1,
    }))
    .sort((a, b) => a.order - b.order),
  timeSlots: sortTimeSlots(agenda?.timeSlots || []),
  schedules: (agenda?.schedules || []).map((schedule, index) => ({
    id: schedule.id || `schedule-${index + 1}`,
    dayId: schedule.dayId,
    startTime: schedule.startTime,
    startSpaceId: schedule.startSpaceId,
    spaceSpan: Math.max(1, Number(schedule.spaceSpan) || 1),
    slotSpan: Math.max(1, Number(schedule.slotSpan) || 1),
    title: schedule.title || "",
    speakerId: schedule.speakerId || "",
    speakerName: schedule.speakerName || "",
    company: schedule.company || "",
    category: schedule.category || "",
    link: schedule.link || "",
    youtube: schedule.youtube || "",
  })),
});

export const convertLegacyAgendaToNormalized = (legacyAgenda = legacyAgendaJson) => {
  const timeSlotSet = new Set();

  legacyAgenda.days.forEach((day) => {
    Object.keys(day.programe || {}).forEach((time) => timeSlotSet.add(time));
  });

  const timeSlots = sortTimeSlots([...timeSlotSet]);
  const spaces = [...DEFAULT_AGENDA_SPACES];

  const days = legacyAgenda.days.map((day, dayIndex) => {
    const dayId = slugify(day.dayName) || `day-${dayIndex + 1}`;
    return {
      id: dayId,
      dayName: day.dayName,
      date: day.date,
    };
  });

  const schedules = [];

  legacyAgenda.days.forEach((day, dayIndex) => {
    const dayId = days[dayIndex].id;
    const activeCoverage = Array(spaces.length).fill(0);

    timeSlots.forEach((time) => {
      const rowItems = day.programe?.[time] || [];
      let pointer = 0;

      rowItems.forEach((item, rowIndex) => {
        while (pointer < spaces.length && activeCoverage[pointer] > 0) {
          pointer += 1;
        }

        const startSpaceIndex = pointer;
        const spaceSpan = Math.max(1, Number(item?.spaces) || 1);
        const slotSpan = Math.max(1, Number(item?.slots) || 1);

        if (startSpaceIndex >= spaces.length) {
          return;
        }

        if (isFilledAgendaItem(item)) {
          schedules.push({
            id: `${dayId}-${time}-${startSpaceIndex}-${rowIndex}`,
            dayId,
            startTime: time,
            startSpaceId: spaces[startSpaceIndex].id,
            spaceSpan,
            slotSpan,
            title: item.title || "",
            speakerName: item.speaker || "",
            company: item.company || "",
            category: item.category || "",
            link: item.link || "",
            youtube: item.youtube || "",
          });
        }

        if (slotSpan > 1) {
          for (let offset = 0; offset < spaceSpan; offset += 1) {
            if (startSpaceIndex + offset < activeCoverage.length) {
              activeCoverage[startSpaceIndex + offset] = slotSpan - 1;
            }
          }
        }

        pointer += spaceSpan;
      });

      for (let spaceIndex = 0; spaceIndex < activeCoverage.length; spaceIndex += 1) {
        if (activeCoverage[spaceIndex] > 0) {
          activeCoverage[spaceIndex] -= 1;
        }
      }
    });
  });

  return {
    days,
    spaces,
    timeSlots,
    schedules,
  };
};

const KEEP_DEFAULT_TITLES = new Set(["registration", "lunch"]);
const DEFAULT_DAY_LIMIT = 2;

export const getDefaultAgenda = () => {
  const normalizedAgenda = ensureAgendaShape(convertLegacyAgendaToNormalized());
  const allowedDayIds = new Set(
    normalizedAgenda.days.slice(0, DEFAULT_DAY_LIMIT).map((day) => day.id)
  );

  return {
    ...normalizedAgenda,
    days: normalizedAgenda.days.slice(0, DEFAULT_DAY_LIMIT),
    schedules: normalizedAgenda.schedules.filter((schedule) =>
      allowedDayIds.has(schedule.dayId) &&
      KEEP_DEFAULT_TITLES.has(schedule.title.trim().toLowerCase())
    ),
  };
};

export const buildAgendaGrid = (agenda, dayId) => {
  const normalized = ensureAgendaShape(agenda);
  const spaces = normalized.spaces;
  const timeSlots = normalized.timeSlots;
  const schedulesForDay = normalized.schedules.filter((schedule) => schedule.dayId === dayId);
  const scheduleByCell = new Map();
  const coveredCells = new Set();

  schedulesForDay.forEach((schedule) => {
    const startSpaceIndex = spaces.findIndex((space) => space.id === schedule.startSpaceId);
    const startTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot === schedule.startTime);

    if (startSpaceIndex === -1 || startTimeIndex === -1) {
      return;
    }

    scheduleByCell.set(`${startTimeIndex}:${startSpaceIndex}`, schedule);

    for (let rowOffset = 0; rowOffset < schedule.slotSpan; rowOffset += 1) {
      for (let colOffset = 0; colOffset < schedule.spaceSpan; colOffset += 1) {
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        coveredCells.add(`${startTimeIndex + rowOffset}:${startSpaceIndex + colOffset}`);
      }
    }
  });

  return timeSlots.map((timeSlot, timeIndex) => {
    const cells = [];

    for (let spaceIndex = 0; spaceIndex < spaces.length; spaceIndex += 1) {
      const cellKey = `${timeIndex}:${spaceIndex}`;

      if (coveredCells.has(cellKey)) {
        continue;
      }

      const schedule = scheduleByCell.get(cellKey) || null;
      cells.push({
        timeSlot,
        timeIndex,
        space: spaces[spaceIndex],
        spaceIndex,
        schedule,
        slotSpan: schedule?.slotSpan || 1,
        spaceSpan: schedule?.spaceSpan || 1,
      });
    }

    return {
      timeSlot,
      cells,
    };
  });
};

export const toLegacyAgendaShape = (agenda) => {
  const normalized = ensureAgendaShape(agenda);

  return {
    days: normalized.days.map((day) => {
      const rows = buildAgendaGrid(normalized, day.id);

      const programe = Object.fromEntries(
        rows.map(({ timeSlot, cells }) => [
          timeSlot,
          cells.map(({ schedule }) => {
            if (!schedule) {
              return { ...EMPTY_LEGACY_ITEM };
            }

            return {
              category: schedule.category || "",
              title: schedule.title || "",
              speaker: schedule.speakerName || "",
              company: schedule.company || "",
              youtube: schedule.youtube || "",
              link: schedule.link || "",
              spaces: schedule.spaceSpan,
              slots: schedule.slotSpan,
            };
          }),
        ])
      );

      return {
        dayName: day.dayName,
        date: day.date,
        programe,
      };
    }),
  };
};
