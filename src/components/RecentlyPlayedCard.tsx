import React from "react";

const RecentlyPlayedCard = () => {
  return (
    <div className="md:w-[250px] h-[60px] w-[48%] bg-container hover:bg-hover_container cursor-pointer flex items-center md:gap-[16px] gap-[8px] rounded-[4px]">
      <div className="size-[60px] bg-card_item rounded-[4px]"></div>
      <span className="text-white font-semibold md:text-[16px] text-[14px]">
        Liked Songs
      </span>
    </div>
  );
};

export default RecentlyPlayedCard;
