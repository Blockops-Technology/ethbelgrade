"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fileToBase64 } from "@/lib/utils";
import { toast } from "react-toastify";

const EditSpeaker = () => {
  const params = useParams();
  const router = useRouter();
  const [speaker, setSpeaker] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const response = await fetch(`/api/speaker/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load speaker");
        }

        setSpeaker(data);
        setName(data.name || "");
        setCompany(data.company || "");
        setCategory(data.category || "");
        setLink(data.link || "");
        setImage(data.image || "");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeaker();
  }, [params.id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !company || !category || !link) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const speakerObject = {
        _id: params.id,
        name,
        company,
        category,
        link,
        image,
        order: speaker.order,
      };

      if (photo) {
        speakerObject.image = await fileToBase64(photo);
      }

      const response = await fetch("/api/speaker", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(speakerObject),
        signal: controller.signal,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update speaker");
      }

      toast.success("Speaker updated");
      router.push("/dashboard/speakers");
      router.refresh();
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Updating the speaker timed out. Check the server and database connection.");
      } else {
        toast.error(error.message);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const previewImage = photo ? URL.createObjectURL(photo) : image;

  if (isLoading) {
    return <div>Loading speaker...</div>;
  }

  if (!speaker) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Speaker</h1>
        <p>Speaker not found.</p>
        <Link href="/dashboard/speakers" className="text-[var(--primary-blue)]">
          Back to speakers
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Speaker</h1>
        <Link href="/dashboard/speakers" className="bg-gray-900/50 hover:bg-gray-900/70 cursor-pointer py-2 px-4 rounded-sm">
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl mt-8 space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="photo">Photo</label>
          {previewImage ? (
            <div className="w-[150px] h-[150px]">
              <img className="w-[150px] h-[150px] object-cover" src={previewImage} alt="Photo" />
            </div>
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-sm" />
          )}
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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditSpeaker;
