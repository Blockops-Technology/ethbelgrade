"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fileToBase64 } from "@/lib/utils";
import { toast } from "react-toastify";

const EditSponsor = () => {
  const params = useParams();
  const router = useRouter();
  const [sponsor, setSponsor] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [alt, setAlt] = useState("");
  const [tier, setTier] = useState("");
  const [module, setModule] = useState("Conference");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await fetch(`/api/sponsor/${params.id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to load sponsor");
        setSponsor(data);
        setName(data.name || "");
        setLink(data.link || "");
        setAlt(data.alt || "");
        setTier(data.tier || "");
        setModule(data.module || "Conference");
        setImage(data.image || "");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsor();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !link || !alt) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const sponsorObject = {
        _id: params.id,
        name,
        link,
        alt,
        tier,
        module,
        image,
        order: sponsor.order,
      };

      if (photo) {
        sponsorObject.image = await fileToBase64(photo);
      }

      const response = await fetch("/api/sponsor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponsorObject),
        signal: controller.signal,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to update sponsor");

      toast.success("Sponsor updated");
      router.push("/dashboard/sponsors");
      router.refresh();
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Updating the sponsor timed out. Check the server and database connection.");
      } else {
        toast.error(error.message);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const previewImage = photo ? URL.createObjectURL(photo) : image;

  if (isLoading) return <div>Loading sponsor...</div>;

  if (!sponsor) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Sponsor</h1>
        <p>Sponsor not found.</p>
        <Link href="/dashboard/sponsors" className="text-[var(--primary-blue)]">Back to sponsors</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Sponsor</h1>
        <Link href="/dashboard/sponsors" className="bg-gray-900/50 hover:bg-gray-900/70 cursor-pointer py-2 px-4 rounded-sm">
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl mt-8 space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="photo">Logo</label>
          {previewImage ? (
            <div className="w-[150px] h-[150px]">
              <img className="w-[150px] h-[150px] object-contain" src={previewImage} alt="Logo preview" />
            </div>
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-sm" />
          )}
          <input type="file" id="photo" className="!border !border-gray-300 rounded-sm !p-2 !text-sm" onChange={(e) => setPhoto(e.target.files[0])} />
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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditSponsor;
