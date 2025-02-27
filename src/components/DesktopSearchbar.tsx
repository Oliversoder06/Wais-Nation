"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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
  // selectedIndex is a combined index for artists then tracks
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  // Create refs for each result item
  const resultsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  // Total count for arrow navigation
  const totalResults = artistResults.length + trackResults.length;

  // Handle arrow keys and Enter on the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        // Determine if the selected index is an artist or a track
        if (selectedIndex < artistResults.length) {
          const selectedArtist = artistResults[selectedIndex];
          router.push(`/artist/${selectedArtist.id}`);
        } else {
          const trackIndex = selectedIndex - artistResults.length;
          const selectedTrack = trackResults[trackIndex];
          router.push(`/track/${selectedTrack.id}`);
        }
        setShowResults(false);
        setQuery("");
      }
    }
  };

  useEffect(() => {
    if (selectedIndex !== -1 && resultsRefs.current[selectedIndex]) {
      resultsRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (query.length > 2) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            // Run both searches concurrently: top 2 artists and up to 15 tracks
            const [artistData, trackData] = await Promise.all([
              searchArtists({ query, limit: 2 }),
              searchSpotify({ query, limit: 15 }) as Promise<TrackSearchResult>,
            ]);
            setArtistResults(artistData ? artistData.artists.items : []);
            setTrackResults(trackData ? trackData.tracks.items : []);
            setShowResults(true);
            setSelectedIndex(-1);
          } catch (error) {
            toast.error("Error during Spotify search");
            console.error("Error during Spotify search:", error);
          }
        })();
      }, 200);

      return () => clearTimeout(debounceTimeout);
    } else {
      setArtistResults([]);
      setTrackResults([]);
      setShowResults(false);
      setSelectedIndex(-1);
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

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let globalIndex = 0;

  return (
    <div className="fixed top-0 md:py-[8px] w-full flex justify-center ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] z-50">
      <div ref={searchRef} className="relative hidden md:flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks and artists..."
          className="w-[452px] h-[48px] bg-container rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
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
                  {artistResults.map((artist) => {
                    const currentIndex = globalIndex;
                    globalIndex++;
                    return (
                      <Link
                        href={`/artist/${artist.id}`}
                        key={artist.id}
                        passHref
                      >
                        <div
                          ref={(el) => {
                            resultsRefs.current[currentIndex] = el;
                          }}
                          className={`p-2 hover:bg-container cursor-pointer flex items-center gap-2 ${
                            selectedIndex === currentIndex ? "bg-container" : ""
                          }`}
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
                    );
                  })}
                </div>
              )}
              {/* Track Results Section */}
              {trackResults.length > 0 && (
                <div className="pt-2">
                  {trackResults.map((track) => {
                    const currentIndex = globalIndex;
                    globalIndex++;
                    return (
                      <Link href={`/track/${track.id}`} key={track.id} passHref>
                        <div
                          ref={(el) => {
                            resultsRefs.current[currentIndex] = el;
                          }}
                          className={`p-2 hover:bg-container cursor-pointer flex items-center gap-2 ${
                            selectedIndex === currentIndex ? "bg-container" : ""
                          }`}
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
                    );
                  })}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DesktopSearchbar;
