import React from "react";
import Image from "next/image";
import Link from "next/link";

const categoryToColor = {
  "zero-knowledge": "text-[var(--primary-emerald)]",
  "defi": "text-[lightpink]",
  "nft": "text-[#fdf903]",
  "infrastructure-and-scaling": "text-[lightgreen]",
  "public-goods-and-community": "text-[mediumpurple]",
  "daos-and-governance": "text-[lightskyblue]",
  "security": "text-[var(--primary-red)]",
  "entrepreneurship": "text-[var(--primary-pinkish)]",
  "devtooling": "text-[darkgrey]",
  "ux": "text-[var(--primary-yellow)]",
  "regulations": "text-[dodgerblue]",
};

const SpeakerCard = React.forwardRef(({ speaker: { _id, name, image, company, category, link }, onDelete, isDeleting = false }, ref) => {
  const categoryKey = category?.toLowerCase().replace(/\s+/g, "-");
  const categoryClassName = categoryKey ? categoryToColor[categoryKey] : "";

  return (
    <div ref={ref} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-sm">
      <Image src={image} alt={name} width={100} height={100} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{company}</p>
        {category && <p className={`text-sm ${categoryClassName}`}>{category}</p>}
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm break-all">{link}</a>}
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        {_id && (
          <Link
            href={`/dashboard/speakers/${_id}`}
            className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm text-sm text-center"
          >
            Edit
          </Link>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete()}
            disabled={isDeleting}
            className="bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm text-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
});

SpeakerCard.displayName = "SpeakerCard";

export default SpeakerCard;
