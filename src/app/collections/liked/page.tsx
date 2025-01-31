import LongSongCard from "@/components/LongSongCard";
import Image from "next/image";
import React from "react";

const Liked = () => {
  const amount = 7;

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[calc(30vh)] min-h-[300px] bg-gradient-to-t from-[#005E38] to-[#0E0E0E] flex justify-center items-center gap-[64px] mt-[40px]">
        <div className="size-[248px] bg-gradient-to-br from-[#00FF99] to-[#026F69] rounded-[24px] flex items-center justify-center">
          <Image src="/icons/heart.svg" alt="heart" width={84} height={84} />
        </div>
        <div className="flex flex-col justify-center gap-[8px]">
          <h1 className="text-white font-black text-[64px]">Liked Songs</h1>
          <h1 className="text-[#ABAABB] text-[20px] font-medium">
            {amount} songs
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mx-[40px]">
        {[...Array(amount)].map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-white text-lg font-semibold w-[24px] text-right">
              {index + 1}
            </span>
            <LongSongCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liked;
