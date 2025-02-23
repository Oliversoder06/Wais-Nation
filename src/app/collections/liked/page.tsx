import CollectionsHeader from "@/components/CollectionsHeader";
import LongSongCard from "@/components/LongSongCard";
import Image from "next/image";
import React from "react";

const Liked = () => {
  const amount = 1;

  return (
    <div>
      <div className="hidden md:flex flex-col gap-8 md:pb-[50px] ">
        <CollectionsHeader
          gradient="from-[#1D1C24] to-[#0E3B2D]"
          image="LikedTracks"
          text="Liked Songs"
          type={`${amount} Songs`}
        />

        <div className="flex flex-col gap-4 mx-[12px] md:mx-[40px]">
          <div className="flex flex-col gap-1">
            <div className="flex px-[16px]">
              <h1 className="text-nit xl:w-[35%] md:w-[50%] w-full">Tracks</h1>
              <h1 className="text-nit xl:w-[35%] md:w-[50%] hidden md:flex">
                Album
              </h1>
              <h1 className=" text-nit xl:w-[20%] xl:block hidden">
                Date Added
              </h1>
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
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex flex-col md:hidden px-[16px] bg-gradient-to-t from-[#1D1C24] to-[#005E38] h-[150px] gap-16 ">
        <div className="flex justify-between w-full items-center mt-[48px]">
          <div className="flex flex-col">
            <span className="font-bold text-white text-[24px]">
              Liked Songs
            </span>
            <span className="text-nit">
              {amount} {amount > 1 ? "songs" : "song"}
            </span>
          </div>
          <Image src="/icons/play.svg" alt="play" width={48} height={48} />
        </div>
        <div className="flex flex-col gap-[8px] pb-[100px]">
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
          <LongSongCard
            title="Unknown Title"
            artist="Unknown Title"
            album="Unknown Album"
            date="Unknown Date"
            duration="0:00"
          />
        </div>
      </div>
    </div>
  );
};

export default Liked;
