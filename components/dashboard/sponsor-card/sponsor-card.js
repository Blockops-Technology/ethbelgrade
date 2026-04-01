import React from "react";
import Link from "next/link";

const SponsorCard = React.forwardRef(({ sponsor: { _id, name, link, image, tier, module }, onDelete, isDeleting = false }, ref) => {
  return (
    <div ref={ref} className="bg-gray-900/50 p-4 rounded-sm">
      <div className="h-[80px] flex items-center justify-center mb-5">
        <img className="!max-h-[50px] !max-w-[150px]" src={image} alt={name} />
      </div>
      <div className="mb-3">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{link}</p>
        {tier && <p className="text-sm text-gray-400">{tier}</p>}
        {module && <p className="text-sm text-gray-400">{module}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {_id && (
          <Link
            href={`/dashboard/sponsors/${_id}`}
            className="block text-center bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm text-sm"
          >
            Edit
          </Link>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete()}
            disabled={isDeleting}
            className="w-full bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm text-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
});

SponsorCard.displayName = "SponsorCard";

export default SponsorCard;
