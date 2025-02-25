"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { searchSpotify } from "@/lib/spotify"; // existing track search
import { getSpotifyToken } from "@/lib/spotify";

// Define interfaces for Artists and Tracks
interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: { name: string }[];
}

// Define responses for track and artist searches
interface TrackSearchResult {
  tracks: {
    items: Track[];
  };
}

interface ArtistSearchResponse {
  artists: {
    items: Artist[];
  };
}

// New function to search for artists
async function searchArtists({
  query,
  limit,
}: {
  query: string;
  limit: number;
}): Promise<ArtistSearchResponse | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?offset=0&limit=${limit}&q=${encodeURIComponent(
        query
      )}&type=artist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search artists: ${errorText}`);
    }
    const data: ArtistSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching artists:", error);
    return null;
  }
}

const DesktopSearchbar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 2) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            // Run both searches concurrently: top 2 artists and up to 10 tracks
            const [artistData, trackData] = await Promise.all([
              searchArtists({ query, limit: 2 }),
              searchSpotify({ query, limit: 10 }) as Promise<TrackSearchResult>,
            ]);
            setArtistResults(artistData ? artistData.artists.items : []);
            setTrackResults(trackData ? trackData.tracks.items : []);
            setShowResults(true);
          } catch (error) {
            toast.error("Error during Spotify search");
            console.error("Error during Spotify search:", error);
          }
        })();
      }, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setArtistResults([]);
      setTrackResults([]);
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
          placeholder="Search Spotify tracks and artists..."
          className="w-[452px] h-[48px] bg-container rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
          onFocus={() => setShowResults(true)}
        />
        <Image
          src="/icons/searchicon.svg"
          alt="search"
          width={20}
          height={20}
          className="absolute top-[50%] left-[12px] transform -translate-y-1/2"
        />
        {showResults &&
          (artistResults.length > 0 || trackResults.length > 0) && (
            <div className="absolute top-full left-0 right-0 bg-background shadow-lg rounded mt-2 max-h-96 overflow-y-auto scrollbar z-[1000]">
              {/* Top 2 Artists Section */}
              {artistResults.length > 0 && (
                <div className="border-b border-container pb-2">
                  {artistResults.map((artist) => (
                    <Link
                      href={`/artist/${artist.id}`}
                      key={artist.id}
                      passHref
                    >
                      <div
                        className="p-2 hover:bg-container cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          setQuery("");
                          setShowResults(false);
                        }}
                      >
                        {artist.images && artist.images[0] && (
                          <Image
                            src={artist.images[0].url}
                            alt={artist.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-white">
                            {artist.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {/* Track Results Section */}
              {trackResults.length > 0 && (
                <div className="pt-2">
                  {trackResults.map((track) => (
                    <Link href={`/track/${track.id}`} key={track.id} passHref>
                      <div
                        className="p-2 hover:bg-container cursor-pointer flex items-center gap-2"
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
                          <p className="font-semibold text-white">
                            {track.name}
                          </p>
                          <p className="text-sm text-nit">
                            {track.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DesktopSearchbar;
