"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

const NewSponsor = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Sponsor</h1>
      <div className="max-w-3xl mt-8 space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="photo">Photo</label>
          {
            photo ? (
              <div className="w-[150px] h-[150px]">
                <img className="w-[150px] h-[150px]" src={URL.createObjectURL(photo)} alt="Photo" />
              </div>
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-300 rounded-sm" />
            )
          }
          <input type="file" id="photo" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" onChange={handlePhotoChange} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Sponsor Name</label>
          <input type="text" id="name" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="link">Sponsor Link</label>
          <input type="text" id="link" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="module">Sponsor Module</label>
          <select id="module" className="!border !border-gray-300 rounded-sm !p-2 !text-sm">
            <option value="Conference">Conference</option>
            <option value="Hackathon">Hackathon</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tier">Sponsor Tier</label>
          <input type="text" id="tier" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <button className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Sponsor</button>
        <Button>Test</Button>
      </div>
    </div>
  );
};

export default NewSponsor;