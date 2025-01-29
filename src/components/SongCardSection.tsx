import React from "react";
import SongCard from "./SongCard";

const SongCardSection = () => {
  return (
    <div>
      <div className="bg-[#1E1E3F] rounded-[12px] flex overflow-auto max-w-[calc(100vw-336px)] ">
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
      </div>
    </div>
  );
};

export default SongCardSection;
