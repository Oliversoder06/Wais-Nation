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
export default function PlaylistPage() {
  const params = useParams();
  const uuid = params?.uuid as string;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const amount = 7;

  useEffect(() => {
    if (!uuid) {
      toast.error("UUID is missing from the URL");
      setLoading(false);
      return;
    }
    const fetchPlaylist = async () => {
      const { data, error } = await supabase
        .from("playlists")
        .select("*")
        .eq("id", uuid)
        .single();
      if (error) {
        toast.error("Error fetching playlist:");
        console.log("Error fetching playlist: ", error.message);
      } else {
        setPlaylist(data);
      }
      setLoading(false);
    };
    fetchPlaylist();
  }, [uuid]);
  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }
  if (!playlist) {
    return <div className="text-white text-center">Playlist not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-4 mx-[40px]">
        {[...Array(amount)].map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-white text-lg font-semibold w-[24px] text-right">
              {index + 1}
            </span>
            <LongSongCard
              title="sEXY"
              artist="Wais Music"
              album="sEXY"
              date="2021-09-17"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
