"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fileToBase64 } from "@/lib/utils";
import { toast } from "react-toastify";

const NewSpeaker = () => {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !company || !category || !link || !photo) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const speakerObject = {
        name,
        company,
        category,
        link,
      };

      if (photo) {
        speakerObject.image = await fileToBase64(photo);
      }

      const response = await fetch("/api/speaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(speakerObject),
        signal: controller.signal,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create speaker");
      }

      toast.success("Speaker created");
      router.push("/dashboard/speakers");
      router.refresh();
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Creating the speaker timed out. Check the server and database connection.");
      } else {
        toast.error(error.message);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Speaker</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mt-8 space-y-5">
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm"
        >
          {isSubmitting ? "Adding..." : "Add Speaker"}
        </button>
      </form>
    </div>
  );
};

export default NewSpeaker;
