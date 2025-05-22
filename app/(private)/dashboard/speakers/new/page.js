"use client";

import { useState } from "react";
import { fileToBase64 } from "@/lib/utils";

const NewSpeaker = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !company || !category || !link || !photo) {
      alert("Please fill in all fields");
      return;
    }

    const speakerObject = {
      name,
      company,
      category,
      link,
    };

    if (photo) {
      const base64 = await fileToBase64(photo);
      console.log(base64);
      speakerObject.image = base64;
    }

    const response = await fetch("/api/speaker", {
      method: "POST",
      body: JSON.stringify(speakerObject),
    });

    console.log(response);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Speaker</h1>
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
          <label htmlFor="name">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company">Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" id="company" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" id="category" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="link">Link</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} type="text" id="link" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <button className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm" onClick={handleSubmit}>Add Speaker</button>
      </div>
    </div>
  );
};

export default NewSpeaker;