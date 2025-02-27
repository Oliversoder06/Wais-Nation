"use client";
import React, { useRef } from "react";
import AlbumCard from "@/components/AlbumCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface AlbumCarouselProps {
  albums: Album[];
  artistName: string;
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({
  albums,
  artistName,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -900, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 900, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>

      {/* Album Cards Container */}
      <div ref={carouselRef} className="flex overflow-hidden gap-4  py-2">
        {albums.map((album) => (
          <div key={album.id} className="flex-shrink-0 w-[240px]">
            <AlbumCard
              id={album.id}
              albumCover={album.images?.[0]?.url}
              albumTitle={album.name}
              artistName={artistName}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default AlbumCarousel;
