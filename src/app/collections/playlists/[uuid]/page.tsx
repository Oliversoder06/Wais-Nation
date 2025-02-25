"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import LongSongCard from "@/components/LongSongCard";
import toast from "react-hot-toast";
import { updatePlaylist } from "@/lib/playlists";

interface Playlist {
  id: string;
  name: string;
  description?: string;
  user_id: string;
}

interface Track {
  id: string;
  playlist_id: string;
  added_at: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

export default function PlaylistPage() {
  const params = useParams();
  const uuid = params?.uuid as string;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [track, setTrack] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  // State for the editable fields
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");

  useEffect(() => {
    if (!uuid) {
      toast.error("UUID is missing from the URL");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      // Fetch playlist details
      const { data: playlistData, error: playlistError } = await supabase
        .from("playlists")
        .select("*")
        .eq("id", uuid)
        .single();

      if (playlistError) {
        toast.error("Error fetching playlist.");
        console.error("Error fetching playlist:", playlistError.message);
        setLoading(false);
        return;
      }

      setPlaylist(playlistData);

      // Fetch tracks inside this playlist
      const { data: trackData, error: trackError } = await supabase
        .from("playlist_tracks")
        .select("*")
        .eq("playlist_id", uuid);

      if (trackError) {
        toast.error("Error fetching tracks.");
        console.error("Error fetching tracks:", trackError.message);
      } else {
        setTrack(trackData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!playlist) {
    return (
      <div className="text-white text-center mt-10">Playlist not found</div>
    );
  }

  async function handleUpdatePlaylist(name: string, description: string) {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    const data = await updatePlaylist(uuid, name, description);
    if (!data) {
      toast.error("Error updating playlist");
      return;
    }

    setPlaylist(data);
    setEditing(false);
    toast.success("Playlist updated successfully");
  }

  // When editing, pre-fill the input fields with the current playlist values
  const handleEdit = () => {
    if (playlist) {
      setPlaylistName(playlist.name);
      setPlaylistDescription(playlist.description || "");
    }
    setEditing(true);
  };

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-8 pb-[50px]">
      <div
        className="flex flex-col items-center mt-10 text-white cursor-pointer"
        onClick={handleEdit}
      >
        <Image
          src="/images/Playlist.svg"
          alt="Playlist Image"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold mt-4">{playlist.name}</h1>
        <p className="text-lg text-gray-400 mt-2">
          {playlist.description || "No description available"}
        </p>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-white text-2xl font-bold">Update Playlist</h2>
              <Image
                src="/icons/cross.svg"
                alt="cross icon"
                width={28}
                height={28}
                className="cursor-pointer self-end"
                onClick={() => setEditing(false)}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                maxLength={50}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]"
              />
              {playlistName.length > 0 &&
                (playlistName.length < 50 ? (
                  <span className="text-[#ABAABB] text-sm text-right">
                    {playlistName.length}/50
                  </span>
                ) : (
                  <span className="text-[#ff1616] text-sm text-right">
                    {playlistName.length}/50
                  </span>
                ))}
            </div>
            <div className="flex flex-col">
              <textarea
                placeholder="Playlist Description"
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                maxLength={100}
                className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none"
              ></textarea>
              {/* Character Counter */}
              {playlistDescription.length > 0 &&
                (playlistDescription.length < 100 ? (
                  <span className="text-[#ABAABB] text-sm text-right">
                    {playlistDescription.length}/100
                  </span>
                ) : (
                  <span className="text-[#ff1616] text-sm text-right">
                    {playlistDescription.length}/100
                  </span>
                ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]"
                onClick={() =>
                  handleUpdatePlaylist(playlistName, playlistDescription)
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 mx-[12px] md:mx-[40px]">
        <div className="flex flex-col gap-1">
          <div className="flex px-[16px]">
            <h1 className="text-nit xl:w-[35%] md:w-[50%] w-full">Tracks</h1>
            <h1 className="text-nit xl:w-[35%] md:w-[50%] hidden md:flex">
              Album
            </h1>
            <h1 className=" text-nit xl:w-[20%] xl:block hidden">Date Added</h1>
            <h1 className=" text-nit text-end xl:w-[10%]">Duration</h1>
          </div>
          <div className="w-full h-[1px] bg-[#2e2e2e]" />
        </div>
        {track.length === 0 ? (
          <p className="text-gray-400 text-center">
            No tracks added to this playlist yet.
          </p>
        ) : (
          track.map((track) => (
            <LongSongCard
              key={track.id}
              title={track.title || "Unknown Title"}
              artist={track.artist || "Unknown Title"}
              album={track.album || "Unknown Album"}
              date={formatDate(track.added_at)}
              duration={track.duration || "-:--"}
              cover={track.cover}
            />
          ))
        )}
      </div>
    </div>
  );
}
