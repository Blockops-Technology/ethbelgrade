"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fileToBase64 } from "@/lib/utils";
import { toast } from "react-toastify";

const NewSponsor = () => {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [alt, setAlt] = useState("");
  const [tier, setTier] = useState("");
  const [module, setModule] = useState("Conference");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !link || !alt || !photo) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const sponsorObject = {
        name,
        link,
        alt,
        tier,
        module,
        image: await fileToBase64(photo),
      };

      const response = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponsorObject),
        signal: controller.signal,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to create sponsor");

      toast.success("Sponsor created");
      router.push("/dashboard/sponsors");
      router.refresh();
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Creating the sponsor timed out. Check the server and database connection.");
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
      <h1 className="text-2xl font-bold">Add New Sponsor</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mt-8 space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="photo">Logo</label>
          {photo ? (
            <div className="w-[150px] h-[150px]">
              <img className="w-[150px] h-[150px] object-contain" src={URL.createObjectURL(photo)} alt="Logo preview" />
            </div>
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-sm" />
          )}
          <input type="file" id="photo" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" onChange={handlePhotoChange} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Sponsor Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="alt">Image Alt Text</label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} type="text" id="alt" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="link">Sponsor Link</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} type="text" id="link" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="module">Module</label>
          <select value={module} onChange={(e) => setModule(e.target.value)} id="module" className="!border !border-gray-300 rounded-sm !p-2 !text-sm">
            <option value="Conference">Conference</option>
            <option value="Hackathon">Hackathon</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tier">Tier</label>
          <input value={tier} onChange={(e) => setTier(e.target.value)} type="text" id="tier" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm"
        >
          {isSubmitting ? "Adding..." : "Add Sponsor"}
        </button>
      </form>
    </div>
  );
};

export default NewSponsor;
