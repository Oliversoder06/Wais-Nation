"use client";

import { getTrackDetails } from "@/lib/spotify";
import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import LongSongCard from "@/components/LongSongCard";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export default function TrackPage({ params }: TrackPageProps) {
  const { id: trackId } = use(params);
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const data = await getTrackDetails(trackId);
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
            backgroundImage: `url(${track.album.images[0].url})`,
          }}
        />
        <div className="relative flex justify-center items-center gap-[64px] h-full">
          <div className="size-[248px] rounded-[24px]">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center gap-[8px] text-white">
            <h1
              title={track.name}
              className="font-black text-[48px] max-w-[900px]  overflow-hidden text-ellipsis"
            >
              {track.name}
            </h1>
            <h1
              title={track.name}
              className="text-[#ABAABB]  text-[20px] font-medium"
            >
              {track.artists.map((artist: any) => artist.name).join(", ")}
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-[40px]">
        <LongSongCard
          title={track.name}
          artist={track.artists.map((artist: any) => artist.name).join(", ")}
          album={track.album.name}
          date={track.album.release_date}
          duration={formatDuration(track.duration_ms)}
          cover={track.album.images[0].url}
        />
      </div>
    </div>
  );
}
