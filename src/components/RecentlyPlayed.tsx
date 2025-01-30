import React from "react";
import RecentlyPlayedCard from "./RecentlyPlayedCard";

const RecentlyPlayed = () => {
  return (
    <div className="grid grid-cols-3 gap-[16px] justify-center items-center my-[40px]">
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
