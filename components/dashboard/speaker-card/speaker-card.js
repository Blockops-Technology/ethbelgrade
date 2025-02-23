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

const SpeakerCard = ({ speaker: { name, image, company, category } }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-sm">
      <Image src={image} alt={name} width={100} height={100} />
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{company}</p>
        <p className={`text-sm ${cateogryToColor[category.toLowerCase().replace(/\s+/g, "-")]}`}>{category}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;