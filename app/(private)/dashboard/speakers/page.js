"use client";

import { useState, useEffect } from "react";
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import Link from "next/link";
import SpeakerCard from "@/components/dashboard/speaker-card/speaker-card";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);

  const fetchSpeakers = async () => {
    const response = await fetch("/api/speaker");
    const data = await response.json();
    console.log(data);
    setSpeakers(data);
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);
  
  const onSortEnd = (oldIndex, newIndex) => {
    console.log(oldIndex, newIndex);
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