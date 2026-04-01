"use client";

import { useState, useEffect } from "react";
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import Link from "next/link";
import SpeakerCard from "@/components/dashboard/speaker-card/speaker-card";
import { toast } from "react-toastify";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [deletingSpeakerId, setDeletingSpeakerId] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  const fetchSpeakers = async () => {
    try {
      const response = await fetch("/api/speaker");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load speakers");
      }

      setSpeakers(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);
  
  const onSortEnd = async (oldIndex, newIndex) => {
    const reorderedSpeakers = arrayMove([...speakers], oldIndex, newIndex);
    setSpeakers(reorderedSpeakers);
    setIsReordering(true);

    try {
      const response = await fetch("/api/speaker", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          speakerIds: reorderedSpeakers.map(({ _id }) => _id),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reorder speakers");
      }

      setSpeakers(data);
    } catch (error) {
      toast.error(error.message);
      fetchSpeakers();
    } finally {
      setIsReordering(false);
    }
  };

  const handleDelete = async (speaker) => {
    setDeletingSpeakerId(speaker._id);

    try {
      const response = await fetch("/api/speaker", {
        method: "DELETE",
        body: JSON.stringify({ _id: speaker._id }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete speaker");
      }

      setSpeakers((currentSpeakers) => currentSpeakers.filter(({ _id }) => _id !== speaker._id));
      toast.success(`${speaker.name} deleted`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingSpeakerId(null);
    }
  };

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Speakers</h1>
        <div className="flex items-center gap-3">
          {isReordering && <p className="text-sm text-gray-400">Saving order...</p>}
          <Link href="/dashboard/speakers/new">
            <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Speaker</div>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {speakers.map((speaker, index) => (
          <SortableItem key={speaker._id || index}>
            <SpeakerCard
              speaker={speaker}
              onDelete={() => handleDelete(speaker)}
              isDeleting={deletingSpeakerId === speaker._id}
            />
          </SortableItem>
        ))}
      </div>
    </SortableList>
  );
};

export default Speakers;
