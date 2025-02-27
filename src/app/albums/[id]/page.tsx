import { notFound } from "next/navigation";
import { getAlbumDetails } from "@/lib/spotify";
import React from "react";
import Image from "next/image";
import LongSongCard from "@/components/LongSongCard";
import Link from "next/link";

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  const album = await getAlbumDetails(id);
  if (!album) {
    notFound();
  }

  // Get the artists id so we can put a link to their page
  const artistId = album.artists[0].id;

  return (
    <div className="bg-secondary text-white min-h-screen">
      {/* Album Header */}
      <div className="flex items-end p-8 bg-gradient-to-t from-secondary to-container">
        <Image
          src={album.images?.[0]?.url}
          alt={album.name}
          width={256}
          height={256}
          className="w-48 h-48 object-cover mr-8 rounded-lg"
        />
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold">{album.name}</h1>
          <div className="flex">
            <p className="mt-2 text-gray-300 hover:underline">
              <Link href={`/artist/${artistId}`}>{album.artists[0].name}</Link>
            </p>
          </div>
          <p className="text-gray-400">
            {album.release_date} • {album.total_tracks} songs
          </p>
        </div>
      </div>

      {/* Tracks List */}
      <div className="p-8">
        <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 text-gray-400 border-b border-gray-700">
          <span className="w-[48px] h-[48px]" />
          <span className="text-nit font-semibold">Title</span>
          <span className="text-nit font-semibold">Album</span>
          <span className="text-nit font-semibold">Released</span>
          <span className="text-nit font-semibold text-right">Duration</span>
        </div>
        <div className="flex flex-col">
          {album.tracks.items.map((track) => (
            <LongSongCard
              key={track.id}
              title={track.name}
              artist={track.artists.map((artist) => artist.name).join(", ")}
              album={album.name}
              date={album.release_date || "Unknown"}
              duration={formatDuration(track.duration_ms)}
              cover={track.album?.images?.[0]?.url || album.images?.[0]?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
