"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { searchSpotify, getSpotifyToken } from "@/lib/spotify";
import { useUser } from "@clerk/nextjs";

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

// Define an interface for recent search items (cards)
interface RecentSearchItem {
  type: "artist" | "track";
  id: string;
  name: string;
  imageUrl: string;
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
  const { user } = useUser();
  const router = useRouter();

  const [query, setQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isElectron, setIsElectron] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Total results depend on query length.
  const totalResults =
    query === ""
      ? recentSearches.length
      : artistResults.length + trackResults.length;

  // Check if running in Electron.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as Window & { myElectron?: boolean }).myElectron
    ) {
      setIsElectron(true);
    }
  }, []);

  // Handle arrow keys and Enter on the input.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        if (query === "") {
          // Recent searches mode: navigate based on the selected recent search.
          const selectedItem = recentSearches[selectedIndex];
          if (selectedItem.type === "artist") {
            router.push(`/artist/${selectedItem.id}`);
          } else {
            router.push(`/track/${selectedItem.id}`);
          }
          setShowResults(false);
        } else {
          // Live search results mode.
          let selectedItem;
          if (selectedIndex < artistResults.length) {
            selectedItem = artistResults[selectedIndex];
            router.push(`/artist/${selectedItem.id}`);
            saveSearch({
              type: "artist",
              id: selectedItem.id,
              name: selectedItem.name,
              imageUrl:
                selectedItem.images && selectedItem.images[0]
                  ? selectedItem.images[0].url
                  : "/icons/default-artist.svg",
            });
          } else {
            const trackIndex = selectedIndex - artistResults.length;
            selectedItem = trackResults[trackIndex];
            router.push(`/track/${selectedItem.id}`);
            saveSearch({
              type: "track",
              id: selectedItem.id,
              name: selectedItem.name,
              imageUrl:
                selectedItem.album.images?.[0]?.url || "/images/Playlist.svg",
            });
          }
          setShowResults(false);
          setQuery("");
        }
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
    if (query.length > 0) {
      const debounceTimeout = setTimeout(() => {
        (async () => {
          try {
            const [artistData, trackData] = await Promise.all([
              searchArtists({ query, limit: 2 }),
              searchSpotify({ query, limit: 40 }) as Promise<TrackSearchResult>,
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

  // Define a user-specific storage key. If no user is signed in, recent searches won't be persisted.
  const storageKey = user ? `recentSearches_${user.id}` : null;

  // Load recent searches from localStorage when the component mounts or when the user changes.
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      const saved = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      ) as RecentSearchItem[];
      setRecentSearches(saved);
    }
  }, [storageKey]);

  // Save a search item using the user-specific key.
  const saveSearch = (item: RecentSearchItem) => {
    if (!storageKey) return;
    let searches = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    ) as RecentSearchItem[];
    searches = [
      item,
      ...searches.filter((s: RecentSearchItem) => s.id !== item.id),
    ].slice(0, 5);
    localStorage.setItem(storageKey, JSON.stringify(searches));
    setRecentSearches(searches);
  };

  // Remove a recent search item.
  const removeRecentSearch = (id: string) => {
    if (!storageKey) return;
    let searches = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    ) as RecentSearchItem[];
    searches = searches.filter((item) => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(searches));
    setRecentSearches(searches);
  };

  // Set top position: if Electron, top-[48px], else top-0.
  const topClass = isElectron ? "top-[48px]" : "top-0";

  return (
    <div
      className={`fixed ${topClass} left-0 md:py-[8px] w-full flex justify-center ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] z-[1000]`}
    >
      <div ref={searchRef} className="relative hidden md:flex flex-col">
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
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-lg rounded mt-2 max-h-96 overflow-y-auto scrollbar z-[1000]">
            {query === "" ? (
              <div className="flex flex-col">
                {recentSearches.length > 0 ? (
                  recentSearches.map((item, index) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        resultsRefs.current[index] = el;
                      }}
                      className={`p-2 hover:bg-container cursor-pointer flex items-center justify-between gap-2 ${
                        selectedIndex === index ? "bg-container" : ""
                      }`}
                      onClick={() => {
                        if (item.type === "artist") {
                          router.push(`/artist/${item.id}`);
                        } else {
                          router.push(`/track/${item.id}`);
                        }
                        setShowResults(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={40}
                          height={40}
                          className={
                            item.type === "artist" ? "rounded-full" : "rounded"
                          }
                        />
                        <p className="font-semibold text-white">{item.name}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(item.id);
                        }}
                        className="text-white hover:text-red-500"
                      >
                        <Image
                          src="/icons/cross.svg"
                          alt="remove"
                          width={20}
                          height={20}
                          className="cursor-pointer opacity-50 hover:opacity-100"
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-white">No recent searches</div>
                )}
              </div>
            ) : (
              <>
                {artistResults.length > 0 && (
                  <div className="border-b border-container pb-2">
                    {artistResults.map((artist, idx) => {
                      const currentIndex = idx;
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
                              selectedIndex === currentIndex
                                ? "bg-container"
                                : ""
                            }`}
                            onClick={() => {
                              saveSearch({
                                type: "artist",
                                id: artist.id,
                                name: artist.name,
                                imageUrl:
                                  artist.images && artist.images[0]
                                    ? artist.images[0].url
                                    : "/icons/default-artist.svg",
                              });
                              setShowResults(false);
                              setQuery("");
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
                {trackResults.length > 0 && (
                  <div className="pt-2">
                    {trackResults.map((track, idx) => {
                      const currentIndex = artistResults.length + idx;
                      return (
                        <Link
                          href={`/track/${track.id}`}
                          key={track.id}
                          passHref
                        >
                          <div
                            ref={(el) => {
                              resultsRefs.current[currentIndex] = el;
                            }}
                            className={`p-2 hover:bg-container cursor-pointer flex items-center gap-2 ${
                              selectedIndex === currentIndex
                                ? "bg-container"
                                : ""
                            }`}
                            onClick={() => {
                              saveSearch({
                                type: "track",
                                id: track.id,
                                name: track.name,
                                imageUrl:
                                  track.album.images?.[0]?.url ||
                                  "/images/Playlist.svg",
                              });
                              setShowResults(false);
                              setQuery("");
                            }}
                          >
                            <Image
                              src={
                                track.album.images?.[0]?.url ||
                                "/images/Playlist.svg"
                              }
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopSearchbar;
