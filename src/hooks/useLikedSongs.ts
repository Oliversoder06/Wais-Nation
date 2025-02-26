"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

// Define a type for liked songs based on your table schema
export interface LikedSong {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  cover?: string;
  added_at: string;
}

export default function useLikedSongs() {
  const { userId } = useAuth();
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        // Cast the returned data to LikedSong[]
        setLikedSongs((data as LikedSong[]) || []);
      }
      setLoading(false);
    }
    fetchLikedSongs();
  }, [userId]);

  return { likedSongs, loading };
}
