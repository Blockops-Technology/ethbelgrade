"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildAgendaGrid,
  ensureAgendaShape,
  getDefaultAgenda,
} from "@/lib/agenda";
import { toast } from "react-toastify";

const createEmptyScheduleForm = () => ({
  id: "",
  dayId: "",
  startTime: "",
  startSpaceId: "",
  slotSpan: 1,
  spaceSpan: 1,
  title: "",
  speakerId: "",
  speakerName: "",
  company: "",
  category: "",
  link: "",
  youtube: "",
});

const overlaps = (first, second) => {
  const rowOverlap =
    first.startRow < second.endRow && second.startRow < first.endRow;
  const colOverlap =
    first.startCol < second.endCol && second.startCol < first.endCol;

  return rowOverlap && colOverlap;
};

const getPlacementBounds = (agenda, scheduleLike) => {
  const startRow = agenda.timeSlots.indexOf(scheduleLike.startTime);
  const startCol = agenda.spaces.findIndex(
    (space) => space.id === scheduleLike.startSpaceId
  );

  if (startRow === -1 || startCol === -1) {
    return null;
  }

  return {
    startRow,
    endRow: startRow + Number(scheduleLike.slotSpan),
    startCol,
    endCol: startCol + Number(scheduleLike.spaceSpan),
  };
};

const AgendaPage = () => {
  const [agenda, setAgenda] = useState(getDefaultAgenda());
  const [speakers, setSpeakers] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [speakerSearchOpen, setSpeakerSearchOpen] = useState(false);
  const [speakerQuery, setSpeakerQuery] = useState("");
  const [scheduleForm, setScheduleForm] = useState(createEmptyScheduleForm());

  useEffect(() => {
    const load = async () => {
      try {
        const [agendaResponse, speakersResponse] = await Promise.all([
          fetch("/api/agenda"),
          fetch("/api/speaker"),
        ]);

        const agendaData = await agendaResponse.json();
        const speakersData = await speakersResponse.json();

        if (!agendaResponse.ok) {
          throw new Error(agendaData.error || "Failed to load agenda");
        }

        if (!speakersResponse.ok) {
          throw new Error(speakersData.error || "Failed to load speakers");
        }

        const nextAgenda = ensureAgendaShape(agendaData);
        setAgenda(nextAgenda);
        setSpeakers(speakersData);
        setSelectedDayId(nextAgenda.days[0]?.id || "");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const selectedDay = useMemo(
    () => agenda.days.find((day) => day.id === selectedDayId) || agenda.days[0] || null,
    [agenda.days, selectedDayId]
  );

  const gridRows = useMemo(
    () => (selectedDay ? buildAgendaGrid(agenda, selectedDay.id) : []),
    [agenda, selectedDay]
  );

  const filteredSpeakers = useMemo(() => {
    const query = speakerQuery.trim().toLowerCase();
    if (!query) {
      return speakers.slice(0, 8);
    }

    return speakers
      .filter((speaker) =>
        `${speaker.name} ${speaker.company}`.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [speakerQuery, speakers]);

  const persistAgenda = async (nextAgenda, successMessage) => {
    setSaving(true);

    try {
      const response = await fetch("/api/agenda", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextAgenda),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save agenda");
      }

      const normalized = ensureAgendaShape(data);
      setAgenda(normalized);
      if (!selectedDayId && normalized.days[0]?.id) {
        setSelectedDayId(normalized.days[0].id);
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      return normalized;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const openNewScheduleModal = (dayId, startTime, startSpaceId) => {
    setScheduleForm({
      ...createEmptyScheduleForm(),
      dayId,
      startTime,
      startSpaceId,
    });
    setSpeakerQuery("");
    setSpeakerSearchOpen(false);
    setShowScheduleModal(true);
  };

  const openEditScheduleModal = (schedule) => {
    setScheduleForm({
      id: schedule.id,
      dayId: schedule.dayId,
      startTime: schedule.startTime,
      startSpaceId: schedule.startSpaceId,
      slotSpan: schedule.slotSpan,
      spaceSpan: schedule.spaceSpan,
      title: schedule.title || "",
      speakerId: schedule.speakerId || "",
      speakerName: schedule.speakerName || "",
      company: schedule.company || "",
      category: schedule.category || "",
      link: schedule.link || "",
      youtube: schedule.youtube || "",
    });
    const selectedSpeaker = speakers.find((speaker) => speaker._id === schedule.speakerId);
    setSpeakerQuery(
      selectedSpeaker
        ? `${selectedSpeaker.name}${selectedSpeaker.company ? ` - ${selectedSpeaker.company}` : ""}`
        : schedule.speakerName || ""
    );
    setSpeakerSearchOpen(false);
    setShowScheduleModal(true);
  };

  const resetScheduleModal = () => {
    setShowScheduleModal(false);
    setSpeakerSearchOpen(false);
    setSpeakerQuery("");
    setScheduleForm(createEmptyScheduleForm());
  };

  const handleScheduleFieldChange = (field, value) => {
    setScheduleForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSelectSpeaker = (speaker) => {
    setScheduleForm((current) => ({
      ...current,
      speakerId: speaker._id,
      speakerName: speaker.name,
      company: current.company || speaker.company || "",
    }));
    setSpeakerQuery(`${speaker.name}${speaker.company ? ` - ${speaker.company}` : ""}`);
    setSpeakerSearchOpen(false);
  };

  const getConflictingSchedules = (scheduleLike, schedulesToCheck, ignoreIds = []) => {
    const candidate = getPlacementBounds(agenda, scheduleLike);

    if (!candidate) {
      return [];
    }

    return schedulesToCheck.filter((schedule) => {
      if (schedule.dayId !== scheduleLike.dayId || ignoreIds.includes(schedule.id)) {
        return false;
      }

      const scheduleBounds = getPlacementBounds(agenda, schedule);

      if (!scheduleBounds) {
        return false;
      }

      return overlaps(candidate, scheduleBounds);
    });
  };

  const validateSchedule = (form, schedulesToCheck = agenda.schedules, ignoreIds = []) => {
    const day = agenda.days.find((item) => item.id === form.dayId);
    if (!day) {
      return { error: "Please choose a day", conflicts: [] };
    }

    const bounds = getPlacementBounds(agenda, form);

    if (!bounds) {
      return { error: "Please choose a valid start time and space", conflicts: [] };
    }

    if (bounds.endRow > agenda.timeSlots.length) {
      return { error: "The selected duration exceeds the available time slots", conflicts: [] };
    }

    if (bounds.endCol > agenda.spaces.length) {
      return { error: "The selected space span exceeds the available spaces", conflicts: [] };
    }

    const conflicts = getConflictingSchedules(form, schedulesToCheck, ignoreIds);
    return { error: null, conflicts };
  };

  const handleSaveSchedule = async (event) => {
    event.preventDefault();

    if (!scheduleForm.title) {
      toast.error("Please add a title");
      return;
    }

    const nextSchedule = {
      id:
        scheduleForm.id ||
        `${scheduleForm.dayId}-${scheduleForm.startTime}-${scheduleForm.startSpaceId}-${Date.now()}`,
      dayId: scheduleForm.dayId,
      startTime: scheduleForm.startTime,
      startSpaceId: scheduleForm.startSpaceId,
      slotSpan: Number(scheduleForm.slotSpan),
      spaceSpan: Number(scheduleForm.spaceSpan),
      title: scheduleForm.title.trim(),
      speakerId: scheduleForm.speakerId || "",
      speakerName: scheduleForm.speakerName.trim(),
      company: scheduleForm.company.trim(),
      category: scheduleForm.category.trim(),
      link: scheduleForm.link.trim(),
      youtube: scheduleForm.youtube.trim(),
    };

    const currentSchedule = agenda.schedules.find(
      (schedule) => schedule.id === nextSchedule.id
    );
    const remainingSchedules = agenda.schedules.filter((schedule) => schedule.id !== nextSchedule.id);

    const { error, conflicts } = validateSchedule(
      nextSchedule,
      remainingSchedules,
      [nextSchedule.id]
    );

    if (error) {
      toast.error(error);
      return;
    }

    let nextSchedules;

    if (conflicts.length === 0) {
      nextSchedules = [...remainingSchedules, nextSchedule];
    } else if (conflicts.length === 1 && currentSchedule) {
      const conflictingSchedule = conflicts[0];
      const swappedSchedule = {
        ...conflictingSchedule,
        dayId: currentSchedule.dayId,
        startTime: currentSchedule.startTime,
        startSpaceId: currentSchedule.startSpaceId,
      };

      const swapValidation = validateSchedule(
        swappedSchedule,
        remainingSchedules.filter((schedule) => schedule.id !== conflictingSchedule.id),
        [swappedSchedule.id, nextSchedule.id]
      );

      if (swapValidation.error || swapValidation.conflicts.length > 0) {
        toast.error("That move would overlap another agenda item");
        return;
      }

      nextSchedules = remainingSchedules
        .filter((schedule) => schedule.id !== conflictingSchedule.id)
        .concat(nextSchedule, swappedSchedule);
    } else {
      toast.error("That move overlaps multiple agenda items");
      return;
    }

    const nextAgenda = {
      ...agenda,
      schedules: nextSchedules,
    };

    await persistAgenda(
      nextAgenda,
      conflicts.length === 1 && currentSchedule
        ? "Schedules swapped"
        : scheduleForm.id
          ? "Schedule updated"
          : "Schedule added"
    );
    resetScheduleModal();
  };

  const handleDeleteSchedule = async () => {
    if (!scheduleForm.id) {
      return;
    }

    const nextAgenda = {
      ...agenda,
      schedules: agenda.schedules.filter((schedule) => schedule.id !== scheduleForm.id),
    };

    await persistAgenda(nextAgenda, "Schedule deleted");
    resetScheduleModal();
  };

  if (loading) {
    return <div>Loading agenda...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <div className="flex items-center gap-3">
          {saving && <p className="text-sm text-gray-400">Saving...</p>}
        </div>
      </div>

      <div className="flex gap-3 mt-8 border-b border-gray-200/10 pb-3">
        {agenda.days.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => setSelectedDayId(day.id)}
            className={`rounded-sm px-4 py-2 text-left transition-colors ${
              selectedDay?.id === day.id
                ? "bg-[var(--primary-blue)] text-white"
                : "bg-gray-900/50 hover:bg-gray-900/70"
            }`}
          >
            <div className="font-semibold">{day.dayName}</div>
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 min-w-[900px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[#09090b] border border-gray-200/10 px-4 py-3 text-left w-[110px]">
                  Time
                </th>
                {agenda.spaces.map((space) => (
                  <th
                    key={space.id}
                    className="border border-gray-200/10 px-4 py-3 text-left min-w-[220px]"
                  >
                    {space.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gridRows.map((row) => (
                <tr key={row.timeSlot}>
                  <td className="sticky left-0 z-10 bg-[#09090b] border border-gray-200/10 px-4 py-4 align-top text-sm font-semibold">
                    {row.timeSlot}
                  </td>
                  {row.cells.map((cell) => (
                    <td
                      key={`${row.timeSlot}-${cell.space.id}`}
                      rowSpan={cell.slotSpan}
                      colSpan={cell.spaceSpan}
                      className="border border-gray-200/10 p-0 align-top"
                    >
                      {cell.schedule ? (
                        <button
                          type="button"
                          onClick={() => openEditScheduleModal(cell.schedule)}
                          className="w-full h-full min-h-[110px] text-left bg-gray-900/60 hover:bg-gray-900/80 p-4"
                        >
                          <div className="text-xs uppercase tracking-wide text-gray-400">
                            {cell.schedule.category || "Schedule"}
                          </div>
                          <div className="font-semibold mt-2">{cell.schedule.title}</div>
                          {cell.schedule.speakerName && (
                            <div className="text-sm text-gray-300 mt-2">
                              {cell.schedule.speakerName}
                              {cell.schedule.company ? `, ${cell.schedule.company}` : ""}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-3">
                            {cell.slotSpan > 1 ? `${cell.slotSpan} slots` : "1 slot"}
                            {cell.spaceSpan > 1 ? ` • ${cell.spaceSpan} spaces` : ""}
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openNewScheduleModal(selectedDay.id, row.timeSlot, cell.space.id)
                          }
                          className="w-full min-h-[110px] text-left bg-transparent hover:bg-gray-900/40 p-4 text-gray-500"
                        >
                          <div className="text-sm">Add schedule</div>
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showScheduleModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={resetScheduleModal}
        >
          <div
            className="bg-[#111114] border border-gray-200/10 rounded-sm w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-bold">
                {scheduleForm.id ? "Edit Schedule" : "Add Schedule"}
              </h2>
              <button
                type="button"
                onClick={resetScheduleModal}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="day">Day</label>
                  <select
                    id="day"
                    value={scheduleForm.dayId}
                    onChange={(event) => handleScheduleFieldChange("dayId", event.target.value)}
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm bg-transparent"
                  >
                    {agenda.days.map((day) => (
                      <option key={day.id} value={day.id}>
                        {day.dayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="startTime">Time slot</label>
                  <select
                    id="startTime"
                    value={scheduleForm.startTime}
                    onChange={(event) => handleScheduleFieldChange("startTime", event.target.value)}
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm bg-transparent"
                  >
                    {agenda.timeSlots.map((timeSlot) => (
                      <option key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="space">Start space</label>
                  <select
                    id="space"
                    value={scheduleForm.startSpaceId}
                    onChange={(event) =>
                      handleScheduleFieldChange("startSpaceId", event.target.value)
                    }
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm bg-transparent"
                  >
                    {agenda.spaces.map((space) => (
                      <option key={space.id} value={space.id}>
                        {space.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="slotSpan">Slot span</label>
                    <input
                      id="slotSpan"
                      type="number"
                      min="1"
                      value={scheduleForm.slotSpan}
                      onChange={(event) =>
                        handleScheduleFieldChange("slotSpan", Number(event.target.value) || 1)
                      }
                      className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="spaceSpan">Space span</label>
                    <input
                      id="spaceSpan"
                      type="number"
                      min="1"
                      value={scheduleForm.spaceSpan}
                      onChange={(event) =>
                        handleScheduleFieldChange("spaceSpan", Number(event.target.value) || 1)
                      }
                      className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={scheduleForm.title}
                  onChange={(event) => handleScheduleFieldChange("title", event.target.value)}
                  className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                />
              </div>

              <div className="relative">
                <div className="flex flex-col gap-2">
                  <label htmlFor="speakerSearch">Speaker</label>
                  <input
                    id="speakerSearch"
                    type="text"
                    value={speakerQuery}
                    onFocus={() => setSpeakerSearchOpen(true)}
                    onChange={(event) => {
                      setSpeakerQuery(event.target.value);
                      setSpeakerSearchOpen(true);
                      setScheduleForm((current) => ({
                        ...current,
                        speakerId: "",
                      }));
                    }}
                    placeholder="Search existing speakers"
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                  />
                </div>
                {speakerSearchOpen && filteredSpeakers.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-[#18181b] border border-gray-200/10 rounded-sm shadow-lg z-20 overflow-hidden">
                    {filteredSpeakers.map((speaker) => (
                      <button
                        key={speaker._id}
                        type="button"
                        onClick={() => handleSelectSpeaker(speaker)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-900/80"
                      >
                        <div className="font-medium">{speaker.name}</div>
                        <div className="text-sm text-gray-400">{speaker.company}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="speakerName">Display speaker name</label>
                  <input
                    id="speakerName"
                    type="text"
                    value={scheduleForm.speakerName}
                    onChange={(event) =>
                      handleScheduleFieldChange("speakerName", event.target.value)
                    }
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    value={scheduleForm.company}
                    onChange={(event) =>
                      handleScheduleFieldChange("company", event.target.value)
                    }
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    type="text"
                    value={scheduleForm.category}
                    onChange={(event) =>
                      handleScheduleFieldChange("category", event.target.value)
                    }
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="link">Link</label>
                  <input
                    id="link"
                    type="text"
                    value={scheduleForm.link}
                    onChange={(event) => handleScheduleFieldChange("link", event.target.value)}
                    className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="youtube">YouTube</label>
                <input
                  id="youtube"
                  type="text"
                  value={scheduleForm.youtube}
                  onChange={(event) =>
                    handleScheduleFieldChange("youtube", event.target.value)
                  }
                  className="!border !border-gray-300 rounded-sm !p-2 !text-sm"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  {scheduleForm.id && (
                    <button
                      type="button"
                      onClick={handleDeleteSchedule}
                      className="bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetScheduleModal}
                    className="bg-gray-900/50 hover:bg-gray-900/70 cursor-pointer py-2 px-4 rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white disabled:opacity-50 cursor-pointer py-2 px-4 rounded-sm"
                  >
                    {saving ? "Saving..." : scheduleForm.id ? "Save Changes" : "Add Schedule"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaPage;
