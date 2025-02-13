import RecentlyPlayed from "@/components/RecentlyPlayed";
import SongCardSection from "@/components/SongCardSection";
import React from "react";

const Homepage = () => {
  return (
    <div className="md:mx-[40px] mx-[12px] mb-[40px] flex flex-col gap-16">
      <div className="flex items-center justify-center w-full">
        <RecentlyPlayed />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection />
      </div>
    </div>
  );
};

export default Homepage;
