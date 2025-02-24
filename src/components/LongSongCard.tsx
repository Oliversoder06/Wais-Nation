// src/components/LongSongCard.tsx
"use client";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { searchYouTube } from "@/lib/youtube";
import { usePlayer } from "./PlayerContext";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";

interface LongSongCardProps {
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
  cover?: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at?: string;
}

export default function LongSongCard({
  title,
  artist,
  album,
  date,
  duration,
  cover,
}: LongSongCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const { userId } = useAuth();

  const { setCurrentSong } = usePlayer();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("playlists")
        .select("id, name, description, user_id");
      if (error) {
        toast.error("Error fetching playlists:");
      } else {
        setPlaylists(data || []);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  const handleAddToPlaylist = async () => {
    setShowModal(true);
  };

  const handleCheckboxChange = (playlistId: string) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleAddTracksToPlaylists = async () => {
    if (selectedPlaylists.length === 0) {
      toast.error("Select at least one playlist.");
      return;
    }
    const { error } = await supabase.from("playlist_tracks").insert(
      selectedPlaylists.map((playlistId) => ({
        playlist_id: playlistId,
        title,
        artist,
        album,
        duration,
        cover,
      }))
    );
    if (error) {
      console.error("Error adding track to playlists:", error);
      toast.error("Failed to add track.");
    } else {
      toast.success("Track added successfully!");
      setShowModal(false);
      setSelectedPlaylists([]);
    }
  };

  const handleCardClick = async () => {
    if (showModal) return;
    const query = `${title} ${artist}`;
    const ytId = await searchYouTube(query);
    if (ytId) {
      setCurrentSong({ title, artist, album, cover, videoId: ytId });
    } else {
    }
  };

  return (
    <div className="w-full" onClick={handleCardClick}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-[#2c2a36] md:hover:bg-[#32303d] cursor-pointer w-full md:h-[92px] h-[64px] rounded-[8px] flex items-center md:px-[16px] px-[8px] gap-16"
      >
        <div className="flex items-center gap-4 xl:w-[35%] md:w-[50%] w-full truncate">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              width={56}
              height={56}
              className="rounded-[8px]"
            />
          ) : (
            <Image
              src="/images/Playlist.svg"
              alt="Song Cover"
              width={48}
              height={48}
              className="rounded-md"
            />
          )}
          <div className="flex flex-col leading-[24px] overflow-hidden">
            <span className="text-white font-semibold overflow-hidden text-ellipsis">
              {title}
            </span>
            <span className="text-[#ABAAB8] text-[16px] overflow-hidden text-ellipsis">
              {artist}
            </span>
          </div>
        </div>
        <span className="text-[#ABAABB] xl:w-[35%] w-[50%] truncate whitespace-nowrap overflow-hidden text-ellipsis hidden md:flex">
          {album}
        </span>
        <span className="text-[#ABAABB] xl:w-[20%] hidden xl:block">
          {date}
        </span>
        <div className="flex items-center gap-4 relative xl:w-[10%] justify-end">
          <span
            className={`text-[#ABAABB] pr-[16px] text-nowrap ${
              isHovered && "opacity-0"
            }`}
          >
            {duration}
          </span>
          {isHovered && (
            <div
              className="absolute top-1/2 right-[10px] transform -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToPlaylist();
              }}
            >
              <Image
                src="/icons/create-plus.svg"
                alt="Menu"
                width={36}
                height={36}
              />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddToPlaylistModal
          playlists={playlists}
          loading={loading}
          selectedPlaylists={selectedPlaylists}
          userId={userId ?? null}
          handleCheckboxChange={handleCheckboxChange}
          handleAddTracksToPlaylists={handleAddTracksToPlaylists}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
