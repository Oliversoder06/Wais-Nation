import React from "react";
import RecentlyPlayedCard from "./RecentlyPlayedCard";

const RecentlyPlayed = () => {
  return (
    <div className="flex flex-wrap md:gap-4 gap-[8px] max-w-[1000px] justify-center">
      <RecentlyPlayedCard />
      <RecentlyPlayedCard />
      <RecentlyPlayedCard />
      <RecentlyPlayedCard />
      <RecentlyPlayedCard />
      <RecentlyPlayedCard />
    </div>
  );
};

export default RecentlyPlayed;
