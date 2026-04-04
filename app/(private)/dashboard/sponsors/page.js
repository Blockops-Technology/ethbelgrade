"use client";

import { useState, useEffect } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import Link from "next/link";
import SponsorCard from "@/components/dashboard/sponsor-card/sponsor-card";
import { toast } from "react-toastify";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [deletingSponsorId, setDeletingSponsorId] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  const fetchSponsors = async () => {
    try {
      const response = await fetch("/api/sponsor");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load sponsors");
      setSponsors(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const onSortEnd = async (oldIndex, newIndex) => {
    const reordered = arrayMove([...sponsors], oldIndex, newIndex);
    setSponsors(reordered);
    setIsReordering(true);

    try {
      const response = await fetch("/api/sponsor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sponsorIds: reordered.map(({ _id }) => _id) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to reorder sponsors");
      setSponsors(data);
    } catch (error) {
      toast.error(error.message);
      fetchSponsors();
    } finally {
      setIsReordering(false);
    }
  };

  const handleDelete = async (sponsor) => {
    setDeletingSponsorId(sponsor._id);
    try {
      const response = await fetch("/api/sponsor", {
        method: "DELETE",
        body: JSON.stringify({ _id: sponsor._id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete sponsor");
      setSponsors((current) => current.filter(({ _id }) => _id !== sponsor._id));
      toast.success(`${sponsor.name} deleted`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingSponsorId(null);
    }
  };

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sponsors</h1>
        <div className="flex items-center gap-3">
          {isReordering && <p className="text-sm text-gray-400">Saving order...</p>}
          <Link href="/dashboard/sponsors/new">
            <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Sponsor</div>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {sponsors.map((sponsor, index) => (
          <SortableItem key={sponsor._id || index}>
            <SponsorCard
              sponsor={sponsor}
              onDelete={() => handleDelete(sponsor)}
              isDeleting={deletingSponsorId === sponsor._id}
            />
          </SortableItem>
        ))}
      </div>
    </SortableList>
  );
};

export default Sponsors;
