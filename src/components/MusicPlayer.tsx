import Image from "next/image";
import React from "react";

const MusicPlayer = () => {
  return (
    <div className="h-[100px] bg-background fixed bottom-0 right-0 w-full flex items-center justify-between px-[40px]">
      <div className="flex gap-[20px]">
        <div className="size-[56px] bg-red-500" />
        <div className="flex flex-col justify-center">
          <span className="text-white font-semibold text-[24px]">sEXY</span>
          <span className="text-[#ABAAB8] font-semibold">Wais Music</span>
        </div>
      </div>
      <div className="flex flex-col w-[50%] gap-[20px]">
        <div className="flex gap-[28px] self-center">
          <Image
            src="/icons/prevsong.svg"
            alt="prev song"
            width={24}
            height={24}
          />
          <Image
            src="/icons/pause.svg"
            alt="pause song"
            width={24}
            height={24}
          />
          <Image
            src="/icons/nextsong.svg"
            alt="next song"
            width={24}
            height={24}
          />
        </div>
        <div className="flex">
          <div className="bg-[#2A2A2A] h-[4px] w-full rounded-full"></div>
        </div>
      </div>
      <div className="flex gap-[40px]">
        <Image src="/icons/loop.svg" alt="loop song" width={24} height={24} />
        <Image src="/icons/volume.svg" alt="volume" width={24} height={24} />
      </div>
    </div>
  );
};

export default MusicPlayer;
