"use client"; // Required in Next.js 15 for useEffect

import { useEffect, useState } from "react";
import { getPlaylist } from "@/lib/spotify";

export default function Playlist({ playlistId }: { playlistId: string }) {
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const data = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }
    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <p>Loading playlist...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold">{playlist.name}</h2>
      <p>{playlist.description}</p>
      <ul>
        {playlist.tracks.items.map((track: any, index: number) => (
          <li key={index}>
            {track.track.name} - {track.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
}
