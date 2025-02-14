import React from "react";

const RecentlyPlayedCard = () => {
  return (
    <div className="md:w-[250px] h-[60px] w-[48%] bg-[#2c2a36] hover:bg-[#32303d] cursor-pointer flex items-center md:gap-[16px] gap-[8px] rounded-[4px]">
      <div className="size-[60px] bg-[#3a3847] rounded-[4px]"></div>
      <span className="text-white font-semibold md:text-[16px] text-[14px]">
        Liked Songs
      </span>
    </div>
  );
};

export default RecentlyPlayedCard;
