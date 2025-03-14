"use client";
import React, { useState, useEffect } from "react";
import CollectionsHeader from "@/components/CollectionsHeader";
import LongSongCard from "@/components/LongSongCard";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

function useLikedSongs() {
  const { userId } = useAuth();
  interface LikedSong {
    id: string;
    title: string;
    artist: string;
    album?: string;
    added_at: string;
    duration: string;
    cover: string;
  }

  const [likedSongs, setLikedSongs] = useState<LikedSong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    async function fetchLikedSongs() {
      setLoading(true);
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", userId)
        .order("added_at", { ascending: false });
      if (error) {
        toast.error("Error fetching liked songs");
      } else {
        setLikedSongs(data || []);
      }
      setLoading(false);
    }
    fetchLikedSongs();
  }, [userId]);

  return { likedSongs, loading };
}

// Utility function to format ISO timestamp into a user-friendly string
function formatDate(isoString: string | number | Date) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Utility function to convert duration (seconds) to "mm:ss"
function formatDuration(durationInSeconds: string) {
  const seconds = parseInt(durationInSeconds, 10);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const Liked = () => {
  const { likedSongs, loading } = useLikedSongs();
  const amount = likedSongs.length;

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-8 md:pb-[50px]">
        <div className="relative">
          <CollectionsHeader
            gradient="from-secondary to-[#0E3B2D]"
            image="LikedTracks"
            text="Liked Songs"
            type={`${amount} Songs`}
          />
          <img
            src="/icons/play.svg"
            alt="play"
            width={48}
            height={48}
            className="absolute top-1/2 right-[40px]"
          />
        </div>

        <div className="flex flex-col gap-4 mx-[12px] md:mx-[40px]">
          <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end">
            <span className="w-[48px] h-[48px]" />
            <span className="text-nit font-semibold">Title</span>
            <span className="text-nit font-semibold">Album</span>
            <span className="text-nit font-semibold">Date added</span>
            <span className="text-nit font-semibold text-right">Duration</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-full h-[1px] bg-[#2e2e2e]" />

          <div>
            {loading ? (
              <p className="text-white">Loading liked songs...</p>
            ) : amount === 0 ? (
              <p className="text-[#ABAABB] text-lg text-center mt-[40px]">
                No liked songs found.
              </p>
            ) : (
              likedSongs.map((song) => (
                <LongSongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album || "Album"}
                  date={formatDate(song.added_at)}
                  duration={formatDuration(song.duration)}
                  cover={song.cover}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden px-[16px] bg-gradient-to-t from-secondary to-[#005E38] h-[150px] gap-16">
        <div className="flex justify-between w-full items-center mt-[48px]">
          <div className="flex flex-col">
            <span className="font-bold text-white text-[24px]">
              Liked Songs
            </span>
            <span className="text-nit">
              {amount} {amount === 1 ? "song" : "songs"}
            </span>
          </div>
          <img src="/icons/play.svg" alt="play" width={48} height={48} />
        </div>
        <div className="flex flex-col  pb-[100px]">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : amount === 0 ? (
            <p className="text-[#ABAABB] text-lg text-center">
              No liked songs found.
            </p>
          ) : (
            likedSongs.map((song) => (
              <LongSongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                album={song.album || "Album"}
                date={formatDate(song.added_at)}
                duration={formatDuration(song.duration)}
                cover={song.cover}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
