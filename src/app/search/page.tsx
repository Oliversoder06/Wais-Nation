"use client";
import React, { useState, useEffect, useRef } from "react";
import { searchSpotify } from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface Artist {
  name: string;
}

interface Album {
  images: { url: string }[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
}

interface SearchResult {
  tracks: {
    items: Track[];
  };
}

const Page: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Track[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            const data = (await searchSpotify({
              query,
              limit: 20,
            })) as SearchResult;
            setResults(data.tracks.items);
            setShowResults(true);
          } catch (error) {
            toast.error("Error during Spotify search:");
            console.log("Error during Spotify search: ", error);
          }
        })();
      }, 100);

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
    <div className="flex md:hidden">
      <div className="flex justify-center absolute top-8 left-0 right-0 z-[101]">
        <div className="fixed inset-0 bg-background z-[101]"></div>
        <div
          ref={searchRef}
          className="relative justify-self-center z-[101] flex md:hidden w-full px-[16px]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Spotify tracks..."
            className="w-full h-[48px] bg-[#2F2E36] rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
            onFocus={() => setShowResults(true)}
          />
          <Image
            src="/icons/searchicon.svg"
            alt="search"
            width={20}
            height={20}
            className="absolute top-[50%] left-[28px] transform translate-y-[-50%]"
          />
          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0  shadow-lg rounded mt-2 h-auto overflow-y-auto">
              {results.map((track: Track) => (
                <Link href={`/track/${track.id}`} key={track.id} passHref>
                  <div
                    className="p-2 hover:bg-[#2a2830] cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setQuery("");
                      setShowResults(false);
                    }}
                  >
                    <Image
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
                          .map((artist: Artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="w-full h-[100px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
