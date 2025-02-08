"use client";
import Image from "next/image";
import { useRef, useState } from "react";

interface LongSongCardProps {
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
  cover?: string;
}

export default function LongSongCard({
  title,
  artist,
  album,
  date,
  duration,
  cover,
}: LongSongCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#151418] hover:bg-[#2a2830] cursor-pointer w-full h-[92px] rounded-[8px] flex items-center justify-between px-[16px]"
    >
      <div className="flex gap-4 items-center">
        {cover ? (
          <img
            src={cover}
            alt={title}
            width={56}
            height={56}
            className="rounded-[8px]"
          />
        ) : (
          <img
            src="/images/playlist.svg"
            alt="Song Cover"
            width={48}
            height={48}
            className="rounded-md"
          />
        )}
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold max-w-[400px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <span className="text-[#ABAAB8] text-[16px]">{artist}</span>
        </div>
      </div>
      <span className="text-[#ABAABB]">{album}</span>
      <span className="text-[#ABAABB]">{date}</span>
      <div className="flex items-center gap-4 relative">
        <span
          className={`text-[#ABAABB] pr-[16px] ${isHovered && "opacity-0"}`}
        >
          {duration}
        </span>
        {isHovered && (
          <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10">
            <Image
              src="/icons/create-plus.svg"
              alt="Menu"
              width={36}
              height={36}
            />
          </div>
        )}
      </div>
    </div>
  );
}
