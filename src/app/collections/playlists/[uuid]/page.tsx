"use client";

import LongSongCard from "@/components/LongSongCard";
import Image from "next/image";

export default function PlaylistPage() {
  return (
    <div className="px-[40px]">
      <div className="flex flex-col items-center mt-10 text-white cursor-pointer">
        <Image
          src="/images/playlist.svg"
          alt="Playlist Image"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold mt-4">Playlist Name</h1>
        <p className="text-lg text-gray-400 mt-2 text-center">
          No description available
        </p>
      </div>
      <div className="flex flex-col gap-4 mx-[40px] mt-8">
        {/* {songs.length > 0 ? (
          songs.map((song, index) => (
            <div key={song.id} className="flex items-center gap-4">
              <span className="text-white text-lg font-semibold w-[24px] text-right">
                {index + 1}
              </span>
              <LongSongCard />
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            No songs found in this playlist.
          </p>
        )} */}
        <LongSongCard />
      </div>
    </div>
  );
}
