import React from "react";

const SongCard = () => {
  return (
    <div className="flex flex-col gap-2 hover:bg-[#171731] p-[14px] rounded-[12px] select-none cursor-pointer">
      <div className="size-[160px] bg-[#00FF99] rounded-[4px]" />
      <div className="flex flex-col leading-[24px]">
        <span className="text-white text-[20px] font-semibold">sEXY</span>
        <span className="text-[#ABAAB8] text-[16px]">Wais Music</span>
      </div>
    </div>
  );
};

export default SongCard;
