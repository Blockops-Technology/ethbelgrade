import React from "react";
import Image from "next/image";

const cateogryToColor = {
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
}

const SpeakerCard = React.forwardRef(({ speaker: { name, image, company, category, link } }, ref) => {
  return (
    <div ref={ref} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-sm">
      <Image src={image} alt={name} width={100} height={100} />
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{company}</p>
        <p className={`text-sm ${cateogryToColor[category.toLowerCase().replace(/\s+/g, "-")]}`}>{category}</p>
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm">{link}</a>}
      </div>
    </div>
  );
});

export default SpeakerCard;