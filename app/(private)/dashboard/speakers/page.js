"use client";

import { useState, useEffect } from "react";
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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Speakers</h1>
        <Link href="/dashboard/speakers/new">
          <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Speaker</div>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </div>
    </div>
  );
};

export default Speakers;