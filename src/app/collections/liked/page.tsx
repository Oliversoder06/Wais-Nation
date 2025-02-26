"use client";
import React from "react";
import CollectionsHeader from "@/components/CollectionsHeader";
import LongSongCard from "@/components/LongSongCard";
import Image from "next/image";
import useLikedSongs, { LikedSong } from "@/hooks/useLikedSongs";

// Format ISO timestamp to "YYYY-MM-DD"
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Convert duration (in seconds) to "mm:ss"
function formatDuration(durationInSeconds: string): string {
  const seconds = parseInt(durationInSeconds, 10);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const Liked = () => {
  const { likedSongs, loading } = useLikedSongs();
  const amount = likedSongs.length;

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-8 md:pb-[50px]">
        <CollectionsHeader
          gradient="from-secondary to-[#0E3B2D]"
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
              <h1 className="text-nit xl:w-[20%] xl:block hidden">
                Date Added
              </h1>
              <h1 className="text-nit text-end xl:w-[10%]">Duration</h1>
            </div>
            <div className="w-full h-[1px] bg-[#2e2e2e]" />
          </div>

          {loading ? (
            <p className="text-white">Loading liked songs...</p>
          ) : amount === 0 ? (
            <p className="text-[#ABAABB] text-lg text-center mt-[40px]">
              No liked songs found.
            </p>
          ) : (
            likedSongs.map((song: LikedSong) => (
              <LongSongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                album={song.album || ""}
                date={formatDate(song.added_at)}
                duration={formatDuration(song.duration)}
                cover={song.cover || ""}
              />
            ))
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden px-[16px] bg-gradient-to-t from-secondary to-[#005E38] h-[150px] gap-16">
        <div className="flex justify-between w-full items-center mt-[48px]">
          <div className="flex flex-col">
            <span className="font-bold text-white text-[24px]">
              Liked Songs
            </span>
            <span className="text-nit">
              {amount} {amount === 1 ? "song" : "songs"}
            </span>
          </div>
          <Image src="/icons/play.svg" alt="play" width={48} height={48} />
        </div>
        <div className="flex flex-col gap-[8px] pb-[100px]">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : amount === 0 ? (
            <p className="text-[#ABAABB] text-lg text-center">
              No liked songs found.
            </p>
          ) : (
            likedSongs.map((song: LikedSong) => (
              <LongSongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                album={song.album || ""}
                date={formatDate(song.added_at)}
                duration={formatDuration(song.duration)}
                cover={song.cover || ""}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
