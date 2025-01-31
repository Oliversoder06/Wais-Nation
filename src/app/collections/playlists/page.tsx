"use client";
import LongPlaylistCard from "@/components/LongPlaylistCard";
import Image from "next/image";
import React from "react";

const Playlists = () => {
  const [amount, setAmount] = React.useState(0);

  const amountIncrease = () => {
    setAmount(amount + 1);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[calc(30vh)] min-h-[300px] bg-gradient-to-t from-[#026F69] to-[#0E0E0E] flex items-center justify-center gap-[64px] mt-[40px]">
        <div className="size-[248px] bg-gradient-to-br from-[#00FF99] to-[#026F69] rounded-[24px] flex items-center justify-center">
          <Image
            src="/icons/playlist.svg"
            alt="playlist icon"
            width={84}
            height={84}
          />
        </div>
        <div className="flex flex-col justify-center gap-[8px]">
          <h1 className="text-white font-black text-[64px]">Your Playlists</h1>
          <h1 className="text-[#ABAABB] text-[20px] font-medium">
            {amount} playlists
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-end mr-[40px]">
        <Image
          src="/icons/create-plus.svg"
          alt="empty"
          width={64}
          height={64}
          className="cursor-pointer fill-white"
          onClick={amountIncrease}
        />
      </div>

      {amount < 1 ? (
        <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
          Looks pretty empty.
        </span>
      ) : (
        <div className="flex flex-col gap-4 mx-[40px]">
          {[...Array(amount)].map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-white text-lg font-semibold w-[24px] text-right">
                {index + 1}
              </span>
              <LongPlaylistCard />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
