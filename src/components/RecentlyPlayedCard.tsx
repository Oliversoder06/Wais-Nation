import React from "react";

const RecentlyPlayedCard = () => {
  return (
    <div className="md:w-[250px] h-[60px] w-[48%] bg-[#2F2E36] flex items-center md:gap-[16px] gap-[8px] rounded-[4px]">
      <div className="size-[60px] bg-[#00FF99] rounded-[4px]"></div>
      <span className="text-white font-semibold">Liked Songs</span>
    </div>
  );
};

export default RecentlyPlayedCard;
