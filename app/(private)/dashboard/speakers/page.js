"use client";

import { useState, useEffect } from "react";
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import Link from "next/link";
import SpeakerCard from "@/components/dashboard/speaker-card/speaker-card";

const ORDER_SPACING = 1000000000;

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);

  const fetchSpeakers = async () => {
    const response = await fetch("/api/speaker");
    const data = await response.json();
    setSpeakers(data);
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);
  
  const onSortEnd = async (oldIndex, newIndex) => {
    if (newIndex === 0) {
      speakers[oldIndex].order = Math.ceil(speakers[newIndex].order / 2);
    } else if (newIndex === speakers.length - 1) {
      speakers[oldIndex].order = speakers[newIndex].order + ORDER_SPACING;
    } else {
      speakers[oldIndex].order = Math.ceil((speakers[newIndex + 1].order - speakers[newIndex].order)  / 2 + speakers[newIndex].order);
    }
    const response = await fetch("/api/speaker", {
      method: "PUT",
      body: JSON.stringify(speakers[oldIndex]),
    });
    setSpeakers((array) => arrayMove(array, oldIndex, newIndex));
  }

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Speakers</h1>
        <Link href="/dashboard/speakers/new">
          <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Speaker</div>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {speakers.map((speaker, index) => (
          <SortableItem key={index}>
            <SpeakerCard speaker={speaker} />
          </SortableItem>
        ))}
      </div>
    </SortableList>
  );
};

export default Speakers;