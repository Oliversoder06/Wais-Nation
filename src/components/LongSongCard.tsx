"use client";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { searchYouTube } from "@/lib/youtube";
import { useMusicStore } from "@/store/musicStore"; // ✅ Zustand
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
  const { playTrack, currentTrack, isPlaying } = useMusicStore(); // ✅ Zustand store

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

  const handleCardClick = async () => {
    if (showModal) return;
    const query = `${title} ${artist}`;
    const result = await searchYouTube(query);

    if (result) {
      playTrack({
        id: result.videoId,
        title,
        artist,
        albumCover: cover || "/default-cover.jpg",
        videoId: result.videoId,
        spotifyTrackId: "",
        duration: result.duration, // Store YouTube duration
      });
    }
  };

  const isCurrentSong = currentTrack?.title === title; // ✅ Check if this song is playing

  return (
    <div className="w-full" onClick={handleCardClick}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={` ${
          isCurrentSong
            ? "bg-green-800/20 border-l-4 border-green-400 md:hover:bg-green-800/30"
            : "bg-[#2c2a36] md:hover:bg-[#32303d]"
        }  cursor-pointer w-full md:h-[80px] h-[64px] rounded-[8px] flex items-center md:px-[16px] px-[8px] gap-16
          `} // ✅ Background highlight
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
            <span
              className={`font-semibold overflow-hidden text-ellipsis
                ${isCurrentSong ? "text-[#00FFB8]" : "text-white"}`} // ✅ Change text color
            >
              {title}
            </span>
            <span
              className={`text-[16px] overflow-hidden text-ellipsis
                ${isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"}`} // ✅ Change artist color
            >
              {artist}
            </span>
          </div>
        </div>
        <span
          className={`${
            isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
          } xl:w-[35%] w-[50%] truncate whitespace-nowrap overflow-hidden text-ellipsis hidden md:flex`}
        >
          {album}
        </span>
        <span
          className={`${
            isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
          } xl:w-[20%] hidden xl:block`}
        >
          {date}
        </span>
        <div className="flex items-center gap-4 relative xl:w-[10%] justify-end pr-[16px]">
          {isCurrentSong && isPlaying ? (
            <div className="equalizer w-[24px] h-[24px]">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <span
              className={`${
                isCurrentSong ? "text-[#22aa84]" : "text-white"
              }  text-nowrap`}
            >
              {duration}
            </span>
          )}

          {/* ✅ Keep the "Create Plus" Menu on Hover */}
          {isHovered && (
            <div
              className="absolute top-1/2 right-[10px] transform -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              <Image
                src="/icons/create-plus.svg"
                alt="Menu"
                width={36}
                height={36}
                className={`${
                  isCurrentSong ? "bg-green-900" : "bg-[#32303d]"
                } rounded-full`}
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
          handleCheckboxChange={(playlistId) =>
            setSelectedPlaylists((prev) =>
              prev.includes(playlistId)
                ? prev.filter((id) => id !== playlistId)
                : [...prev, playlistId]
            )
          }
          handleAddTracksToPlaylists={async () => {
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
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
