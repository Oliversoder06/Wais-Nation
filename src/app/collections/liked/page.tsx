import LongSongCard from "@/components/LongSongCard";
import Image from "next/image";
import React from "react";

const Liked = () => {
  const amount = 1;

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[calc(30vh)] min-h-[300px] bg-gradient-to-t from-[#005E38] to-[#0E0E0E] flex flex-col md:flex-row justify-center items-center md:gap-[64px] gap-[32px] mt-[40px]">
        <Image
          src="/icons/LikedTracksPage.svg"
          alt="heart"
          width={150}
          height={150}
          className="size-[150px] md:size-[248px] rounded-[24px]"
        />
        <div className="flex flex-col justify-center gap-[16px]">
          <h1 className="text-white font-black md:text-[64px] text-4xl">
            Liked Songs
          </h1>
          <h1 className="text-[#ABAABB] md:text-[20px] font-medium">
            {amount} songs
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 mx-[12px] md:mx-[40px]">
        <div className="flex flex-col gap-1">
          <div className="flex px-[16px]">
            <h1 className="text-nit xl:w-[35%] md:w-[50%] w-full">Tracks</h1>
            <h1 className="text-nit xl:w-[35%] md:w-[50%] hidden md:flex">
              Album
            </h1>
            <h1 className=" text-nit xl:w-[20%] xl:block hidden">Date Added</h1>
            <h1 className=" text-nit text-end xl:w-[10%]">Duration</h1>
          </div>
          <div className="w-full h-[1px] bg-[#2e2e2e]" />
        </div>

        <LongSongCard
          title="Unknown Title"
          artist="Unknown Title"
          album="Unknown Album"
          date="Unknown Date"
          duration="0:00"
        />
      </div>
    </div>
  );
};

export default Liked;
