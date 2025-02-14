"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import LongSongCard from "@/components/LongSongCard";
import toast from "react-hot-toast";

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
      <div className="flex flex-col items-center mt-10 text-white">
        <Image
          src="/images/playlist.svg"
          alt="Playlist Image"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold mt-4">{playlist.name}</h1>
        <p className="text-lg text-gray-400 mt-2">
          {playlist.description || "No description available"}
        </p>
      </div>
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
