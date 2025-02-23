"use client";

import { useState } from "react";
import Link from "next/link";
import SpeakerCard from "@/components/dashboard/speaker-card/speaker-card";

const dummySpeakers = [
  {
    name: "John Doe",
    image: "/images/Speakers/john-lilic.png",
    company: "Company 1",
    category: "Zero Knowledge",
  },
  {
    name: "Defi Nikola",
    image: "/images/Speakers/definikola.png",
    company: "Company 2",
    category: "DeFi",
  },
  {
    name: "Viraz Malhotra",
    image: "/images/Speakers/viraz-malhotra.png",
    company: "Company 3",
    category: "NFT",
  }, {
    name: "John Doe",
    image: "/images/Speakers/john-lilic.png",
    company: "Company 1",
    category: "Zero Knowledge",
  },
  {
    name: "Defi Nikola",
    image: "/images/Speakers/definikola.png",
    company: "Company 2",
    category: "DeFi",
  },
  {
    name: "Viraz Malhotra",
    image: "/images/Speakers/viraz-malhotra.png",
    company: "Company 3",
    category: "NFT",
  }, {
    name: "John Doe",
    image: "/images/Speakers/john-lilic.png",
    company: "Company 1",
    category: "Zero Knowledge",
  },
  {
    name: "Defi Nikola",
    image: "/images/Speakers/definikola.png",
    company: "Company 2",
    category: "DeFi",
  },
  {
    name: "Viraz Malhotra",
    image: "/images/Speakers/viraz-malhotra.png",
    company: "Company 3",
    category: "NFT",
  },
];

const Speakers = () => {
  const [speakers, setSpeakers] = useState(dummySpeakers);

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