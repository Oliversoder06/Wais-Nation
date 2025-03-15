"use client";

import { getTrackDetails } from "@/lib/spotify";
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import LongSongCard from "@/components/LongSongCard";

interface Artist {
  name: string;
}

interface Album {
  images: { url: string }[];
  name: string;
  release_date: string;
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
}

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export default function TrackPage({ params }: TrackPageProps) {
  const { id: trackId } = use(params);
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const data = (await getTrackDetails(trackId)) as Track | null;
      if (!data) return notFound();
      setTrack(data);
    };

    fetchTrack();
  }, [trackId]);

  function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (!track) return <div className="loader flex justify-self-center" />;

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[calc(30vh)] min-h-[300px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center track-bg"
          style={{
            backgroundImage: `url(${
              track.album.images?.[0]?.url || "/images/Playlist.svg"
            })`,
          }}
        />
        <div className="relative flex justify-center items-center md:gap-[64px] gap-[32px] h-full">
          <div className="md:size-[248px] size-[200px] rounded-[24px] flex items-center justify-center">
            <img
              src={track.album.images?.[0]?.url || "/images/Playlist.svg"}
              alt="album cover"
              width={300}
              height={300}
              className="rounded"
            />
          </div>
          <div className="flex flex-col justify-center gap-[8px] text-white">
            <h1
              title={track.name}
              className="font-black text-[32px] md:text-[48px] max-w-[900px] overflow-hidden text-ellipsis"
            >
              {track.name}
            </h1>
            <h1
              title={track.name}
              className="text-[#ABAABB] md:text-[20px] font-medium"
            >
              {track.artists.map((artist: Artist) => artist.name).join(", ")}
            </h1>
          </div>
        </div>
      </div>
      <div className="md:mx-[40px] mx-[12px] flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end">
            <span className="w-[48px] h-[48px]" />
            <span className="text-nit font-semibold">Track</span>
            <span className="text-nit font-semibold">Album</span>
            <span className="text-nit font-semibold">Released</span>
            <span className="text-nit font-semibold text-right">Duration</span>
          </div>
          <div className="w-full h-[1px] bg-[#2e2e2e]" />
        </div>
        <LongSongCard
          title={track.name}
          artist={track.artists.map((artist: Artist) => artist.name).join(", ")}
          album={track.album.name}
          date={track.album.release_date}
          duration={formatDuration(track.duration_ms)}
          cover={track.album.images?.[0]?.url || "/images/Playlist.svg"}
        />
      </div>
    </div>
  );
}
