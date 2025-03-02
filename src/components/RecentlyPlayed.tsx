"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import RecentlyPlayedCard from "./RecentlyPlayedCard";
import { useMusicStore } from "@/store/musicStore";
import { getSpotifyToken } from "@/lib/spotify";
import { useUser } from "@clerk/nextjs";

// --- Types and helper for searching artists ---
interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistSearchResponse {
  artists: {
    items: Artist[];
  };
}

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

// --- Component code ---
interface ArtistItem {
  id: string;
  name: string;
  image: string;
}

const RecentlyPlayed = () => {
  // Call all hooks unconditionally
  const { user } = useUser();
  const { history } = useMusicStore();
  const [mounted, setMounted] = useState(false);
  const [artists, setArtists] = useState<ArtistItem[]>([]);

  // Mark the component as mounted (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a user-specific key if a user exists, otherwise a default key.
  const storageKey = user
    ? `recentlyPlayedArtists_${user.id}`
    : "recentlyPlayedArtists_default";

  // Load artists from localStorage on mount (if available) when a user exists.
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setArtists(JSON.parse(stored));
      }
    }
  }, [storageKey, user]);

  // Memoize unique artist names to avoid re-computation
  const uniqueArtistNames = useMemo(
    () => Array.from(new Set(history.map((track) => track.artist))),
    [history]
  );

  useEffect(() => {
    if (!user) return; // Only fetch if user is logged in
    const fetchArtists = async () => {
      if (uniqueArtistNames.length === 0) return;

      const promises = uniqueArtistNames.map(async (artistName) => {
        const response = await searchArtists({ query: artistName, limit: 1 });
        if (response && response.artists.items.length > 0) {
          const artistData = response.artists.items[0];
          return {
            id: artistData.id,
            name: artistData.name,
            image:
              artistData.images && artistData.images.length > 0
                ? artistData.images[0].url
                : "/default-artist.jpg",
          } as ArtistItem;
        }
        return null;
      });

      const results = await Promise.all(promises);
      const validArtists = results.filter(
        (artist): artist is ArtistItem => artist !== null
      );
      const slicedArtists = validArtists.slice(0, 6);
      setArtists(slicedArtists);

      // Save the fetched artists into localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(slicedArtists));
      }
    };

    fetchArtists();
  }, [uniqueArtistNames, storageKey, user]);

  // Now decide what to render
  if (!user) {
    return null;
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-wrap md:gap-4 gap-[8px] max-w-[1000px] justify-center">
      {artists.map((artist) => (
        <Link key={artist.id} href={`/artist/${artist.id}`}>
          <RecentlyPlayedCard
            id={artist.id}
            name={artist.name}
            image={artist.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default RecentlyPlayed;
