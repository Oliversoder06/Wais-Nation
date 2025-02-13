"use client";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("playlists")
        .select("id, name, description, user_id");

      if (error) {
        toast.error("Error fetching playlists:");
        console.log("Error fetching playlists: ", error);
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
        title: title,
        artist: artist,
        album: album,
        duration: duration,
        cover: cover,
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

  return (
    <div className="w-full">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-[#151418] hover:bg-[#2a2830] cursor-pointer w-full h-[92px] rounded-[8px] flex items-center px-[16px] gap-16"
      >
        <div className="flex items-center gap-4 xl:w-[35%] md:w-[50%] w-full truncate">
          {/* COVER IMAGE */}
          {cover ? (
            <img
              src={cover}
              alt={title}
              width={56}
              height={56}
              className="rounded-[8px]"
            />
          ) : (
            <img
              src="/images/playlist.svg"
              alt="Song Cover"
              width={48}
              height={48}
              className="rounded-md"
            />
          )}

          {/* TRACK AND ARTIST */}
          <div className="flex flex-col leading-[24px] overflow-hidden">
            <span className="text-white font-semibold overflow-hidden text-ellipsis">
              {title}
            </span>
            <span className="text-[#ABAAB8] text-[16px] overflow-hidden text-ellipsis">
              {artist}
            </span>
          </div>
        </div>

        <span className="text-[#ABAABB]  xl:w-[35%] w-[50%] truncate whitespace-nowrap overflow-hidden text-ellipsis hidden md:flex">
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
            <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10">
              <Image
                src="/icons/create-plus.svg"
                alt="Menu"
                width={36}
                height={36}
                onClick={handleAddToPlaylist}
              />
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-[#2b2b2b] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-white text-2xl font-bold">Add to Playlist</h2>
              <Image
                src="/icons/cross.svg"
                alt="cross icon"
                width={28}
                height={28}
                className="cursor-pointer self-end"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="flex flex-col">
              {loading ? (
                <div className="loader flex justify-self-center" />
              ) : playlists.length === 0 ? (
                <p className="text-nit text-center">Looks pretty empty.</p>
              ) : (
                playlists.map((playlist) => (
                  <div key={playlist.id} className="flex flex-col gap-4">
                    <label
                      htmlFor={playlist.id}
                      className="text-white cursor-pointer w-full p-5 flex items-center justify-between bg-[#2b2b2b] rounded-md transition hover:bg-[#3a3a3a]"
                    >
                      <p className="max-w-[90%]">{playlist.name}</p>

                      <input
                        type="checkbox"
                        id={playlist.id}
                        className="hidden peer"
                        checked={selectedPlaylists.includes(playlist.id)}
                        onChange={() => handleCheckboxChange(playlist.id)}
                      />

                      <label
                        htmlFor={playlist.id}
                        className="size-6 border-2 border-[#ABAABB] rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-[#00FF99] peer-checked:border-[#00FF99] transition"
                      >
                        <svg
                          className="hidden"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </label>
                    </label>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={handleAddTracksToPlaylists}
              className="bg-[#00FF99] text-black p-2 rounded-md font-semibold w-full hover:bg-[#00e88f]"
            >
              Add to Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
