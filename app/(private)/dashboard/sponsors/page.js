"use client";

import { useState } from "react";
import Link from "next/link";
import SponsorCard from "@/components/dashboard/sponsor-card/sponsor-card";

const dummySponsors = [
  {
    id: 1,
    name: "EF ESP",
    link: "https://www.efesp.com/",
    image: "/images/partners/EF-ESP-logo.svg",
    tier: "Campion",
    module: "Conference",
  },
  {
    id: 2,
    name: "Tenderly",
    link: "https://tenderly.co/",
    image: "/images/partners/tenderly.svg",
    tier: "Legend",
    module: "Conference",
  },
  {
    id: 3,
    name: "Defi Saver",
    link: "https://www.defisaver.com/",
    image: "/images/partners/defi-saver.png",
    tier: "Legend",
    module: "Conference",
  },
  {
    id: 4,
    name: "Chainlink",
    link: "https://chainlink.com/",
    image: "/images/partners/chainlink-logo.svg",
    tier: "Legend",
    module: "Hackathon",
  },
];

const Sponsors = () => {
  const [sponsors, setSponsors] = useState(dummySponsors);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sponsors</h1>
        <Link href="/dashboard/sponsors/new">
          <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Sponsor</div>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;