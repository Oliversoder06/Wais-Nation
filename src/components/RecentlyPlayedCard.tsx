// RecentlyPlayedCard.tsx
import React from "react";

export interface RecentlyPlayedCardProps {
  id: string;
  name: string;
  image: string;
  type?: "artist" | "playlist";
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({
  name,
  image,
}) => {
  return (
    <div className="md:w-[250px] h-[60px] w-[48%] bg-container hover:bg-hover_container cursor-pointer flex items-center md:gap-[16px] gap-[8px] rounded-[4px]">
      <div className="w-[60px] h-[60px] bg-card_item rounded-[4px] overflow-hidden">
        <img
          src={image}
          alt={name}
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-white font-semibold md:text-[16px] text-[14px]">
        {name}
      </span>
    </div>
  );
};

export default RecentlyPlayedCard;
