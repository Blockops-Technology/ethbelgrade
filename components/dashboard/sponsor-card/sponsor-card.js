const SponsorCard = ({ sponsor: { id, name, link, image, tier, module } }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-sm">
      <div className="h-[80px] flex items-center justify-center mb-5">
        <img className="!max-h-[50px] !max-w-[150px]" src={image} alt={name} />
      </div>
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{link}</p>
      </div>
    </div>
  );
};

export default SponsorCard;