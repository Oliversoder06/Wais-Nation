"use client";

import React, { useState, useEffect } from "react";
import { searchSpotify } from "@/lib/spotify";
import Image from "next/image";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            const data = await searchSpotify(query);
            setResults(data.tracks.items);
          } catch (error) {
            console.error("Error during Spotify search:", error);
          }
        })();
      }, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative flex justify-self-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Spotify tracks..."
        className="w-[452px] h-[48px] bg-[#2F2E36] rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute top-[50%] left-[12px] transform translate-y-[-50%]"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[#151418] shadow-lg rounded mt-2 max-h-60 overflow-y-auto">
          {results.map((track: any) => (
            <div
              key={track.id}
              className="p-2 border-b last:border-0 border-[#2b3330] hover:bg-[#2a2830] cursor-pointer"
            >
              <p className="font-semibold text-white">{track.name}</p>
              <p className="text-sm text-nit">
                {track.artists.map((artist: any) => artist.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
