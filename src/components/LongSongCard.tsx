import React from "react";

const LongSongCard = () => {
  return (
    <div className="bg-[#151418] w-full h-[92px] rounded-[8px] flex items-center justify-between px-[16px]">
      <div className="flex gap-4  items-center wf">
        <div className="size-[48px] bg-[#00FF99]" />
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold">sEXY</span>
          <span className="text-[#ABAAB8] text-[16px]">Wais Music</span>
        </div>
      </div>
      <span className="text-[#ABAABB]">ALBUM</span>
      <span className="text-[#ABAABB]">DATE</span>
      <span className="text-[#ABAABB]">2:51</span>
    </div>
  );
};

export default LongSongCard;
