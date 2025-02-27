"use client";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { searchYouTube, parseDuration } from "@/lib/youtube";
import { useMusicStore } from "@/store/musicStore";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";

interface LongSongCardProps {
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string; // e.g., "3:22"
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
  const { playTrack, currentTrack, isPlaying } = useMusicStore();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("playlists")
        .select("id, name, description, user_id");
      if (error) {
        toast.error("Error fetching playlists");
      } else {
        setPlaylists(data || []);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  const handleCardClick = async () => {
    if (showModal) return;
    setLoading(true);

    const query = `${title} ${artist}`;
    const result = await searchYouTube(query);

    if (!result || !result.videoId) {
      console.error("❌ No video found for:", query);
      setLoading(false);
      return;
    }

    playTrack({
      id: result.videoId,
      title: result.title,
      artist: result.artist,
      albumCover: result.thumbnail || cover || "/default-cover.jpg",
      videoId: result.videoId,
      spotifyTrackId: "",
      duration: parseDuration(result.duration),
      album: "",
    });
    setLoading(false);
  };

  const isCurrentSong = currentTrack?.title === title;

  return (
    <>
      {/* Desktop/Tablet Layout (grid-based) */}
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          hidden md:grid 
          grid-cols-[48px_1fr_1fr_1fr_72px] 
          gap-4 px-4 py-2 items-center 
          rounded-md
          cursor-pointer
          ${
            isCurrentSong
              ? "bg-green-800/20 border-l-2 border-primary hover:bg-green-800/30"
              : "bg-transparent hover:bg-container"
          }
        `}
      >
        {/* 1) Cover Image (48px) */}
        <div className="w-[48px] h-[48px] flex-shrink-0">
          {loading ? (
            <div className="loader" />
          ) : cover ? (
            <Image
              src={cover}
              alt={title}
              width={48}
              height={48}
              className="rounded-sm"
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
        </div>

        {/* 2) Title & Artist (1fr) */}
        <div className="truncate leading-5">
          <span
            className={`block font-semibold overflow-hidden text-ellipsis ${
              isCurrentSong ? "text-[#00FFB8]" : "text-white"
            }`}
          >
            {title}
          </span>
          <span
            className={`block text-[14px] overflow-hidden text-ellipsis ${
              isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
            }`}
          >
            {artist}
          </span>
        </div>

        {/* 3) Album (1fr) */}
        <span
          className={`truncate ${
            isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
          }`}
        >
          {album}
        </span>

        {/* 4) Date (1fr) */}
        <span
          className={`truncate ${
            isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
          }`}
        >
          {date}
        </span>

        {/* 5) Duration & Plus Icon (72px) */}
        <div className="flex items-center justify-end gap-2">
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
              } text-sm`}
            >
              {duration}
            </span>
          )}

          {/* Hover Plus Icon */}
          {isHovered && (
            <div
              className="flex items-center justify-center w-[36px] h-[36px] 
                         rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10"
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

      {/* Mobile Layout (flex-based) */}
      <div
        onClick={handleCardClick}
        className={`
          md:hidden 
          flex items-center gap-4 
          w-full h-[64px] 
          px-4 py-2 
          rounded-md
          cursor-pointer
          ${
            isCurrentSong
              ? "bg-green-800/20 border-l-4 border-green-400"
              : "bg-transparent"
          }
        `}
      >
        <div className="w-[48px] h-[48px] flex-shrink-0">
          {loading ? (
            <div className="loader" />
          ) : cover ? (
            <Image
              src={cover}
              alt={title}
              width={48}
              height={48}
              className="rounded-sm"
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
        </div>
        <div className="flex flex-col truncate leading-5">
          <span
            className={`font-semibold overflow-hidden text-ellipsis ${
              isCurrentSong ? "text-[#00FFB8]" : "text-white"
            }`}
          >
            {title}
          </span>
          <span
            className={`text-sm overflow-hidden text-ellipsis ${
              isCurrentSong ? "text-[#22aa84]" : "text-[#ABAAB8]"
            }`}
          >
            {artist}
          </span>
        </div>
      </div>

      {/* Add To Playlist Modal */}
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

            // Check if the track already exists in any of the selected playlists.
            const { data: existingTracks, error: fetchError } = await supabase
              .from("playlist_tracks")
              .select("id")
              .in("playlist_id", selectedPlaylists)
              .eq("title", title)
              .eq("artist", artist);

            if (fetchError) {
              console.error("Error checking existing tracks:", fetchError);
              toast.error("Failed to check existing tracks.");
              return;
            }

            if (existingTracks && existingTracks.length > 0) {
              toast.error(
                "Track already exists in one of the selected playlists."
              );
              return;
            }

            // Now insert the track into the selected playlists
            const { error } = await supabase.from("playlist_tracks").insert(
              selectedPlaylists.map((playlistId) => ({
                playlist_id: playlistId,
                title,
                artist,
                album,
                duration,
                cover,
                // Include track_id if you have one
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
    </>
  );
}
