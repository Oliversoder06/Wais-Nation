"use client";

import React, { useState, useEffect, useRef } from "react";
import { searchSpotify } from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 2) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            const data = await searchSpotify({ query, limit: 10 });
            setResults(data.tracks.items);
            setShowResults(true);
          } catch (error) {
            toast.error("Error during Spotify search:");
            console.log("Error during Spotify search: ", error);
          }
        })();
      }, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 md:py-[8px] w-full flex justify-center ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] z-50">
      <div ref={searchRef} className="relative hidden md:flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Spotify tracks..."
          className="w-[452px] h-[48px] bg-[#2F2E36] rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
          onFocus={() => setShowResults(true)}
        />
        <Image
          src="/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="absolute top-[50%] left-[12px] transform -translate-y-1/2"
        />
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-[#151418] shadow-lg rounded mt-2 max-h-60 overflow-y-auto scrollbar z-[1000]">
            {results.map((track: any) => (
              <Link href={`/track/${track.id}`} key={track.id} passHref>
                <div
                  className="p-2 hover:bg-[#2a2830] cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setQuery("");
                    setShowResults(false);
                  }}
                >
                  <img
                    src={track.album.images[0].url}
                    alt="album cover"
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <p className="font-semibold text-white">{track.name}</p>
                    <p className="text-sm text-nit">
                      {track.artists
                        .map((artist: any) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
