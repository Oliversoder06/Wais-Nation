"use client";
import Image from "next/image";
import React, { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="h-[100px] bg-background fixed bottom-0 right-0 w-full flex items-center justify-between px-[40px]">
      <div className="flex gap-[20px]">
        <div className="size-[56px] bg-red-500" />
        <div className="flex flex-col justify-center">
          <span className="text-white font-semibold text-[24px] hover:underline cursor-pointer">
            sEXY
          </span>
          <span className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer">
            Wais Music
          </span>
        </div>
      </div>
      <div className="flex flex-col w-[50%] gap-[20px]">
        <div className="flex gap-[28px] self-center">
          <Image
            src="/icons/prevsong.svg"
            alt="prev song"
            width={24}
            height={24}
            className="cursor-pointer hover:opacity-80"
          />
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            alt="pause song"
            width={36}
            height={36}
            onClick={handlePlayPause}
            className="cursor-pointer hover:opacity-80"
          />
          <Image
            src="/icons/nextsong.svg"
            alt="next song"
            width={24}
            height={24}
            className="cursor-pointer hover:opacity-80"
          />
        </div>
        <div className="flex">
          <div className="bg-[#2A2A2A] h-[4px] w-full rounded-full"></div>
        </div>
      </div>
      <div className="flex gap-[40px]">
        <Image
          src="/icons/loop.svg"
          alt="loop song"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80"
        />
        <Image
          src="/icons/volume.svg"
          alt="volume"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
