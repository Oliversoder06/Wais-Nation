import React from "react";
import SongCard from "./SongCard";

const SongCardSection = () => {
  const amount = 10;
  return (
    <div>
      <div className="rounded-[12px] flex overflow-auto ">
        {[...Array(amount)].map((_, index) => (
          <SongCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SongCardSection;
