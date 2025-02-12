import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { supabase } from "./supabase";
import { tr } from "framer-motion/client";

// Create a new playlist
export const addTrackToPlaylist = async (
  playlistId: string,
  trackId: string
) => {
  const { user } = useUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("playlist_tracks")
    .insert([{ playlist_id: playlistId, track_id: trackId, user_id: user.id }]);
  if (error) {
    toast.error("Error adding track to playlist");
    toast.error("Error adding track: ");
    console.log("Error adding track: ", error);
    throw error;
  }

  toast.success("Added track to playlist");
  console.log("Added track to playlist: ", data);
  return data;
};

// Get all playlists
export const getPlaylists = async (playlistId: string) => {
  const { data, error } = await supabase
    .from("playlist_tracks")
    .select("spotify_track_id")
    .eq("playlist_id", playlistId);

  if (error) {
    toast.error("Error getting playlists");
    toast.error("Error getting playlists: ");
    console.log("Error getting playlists: ", error);
    throw error;
  }

  toast.success("Fetched playlists successfully");
  console.log("Fetched playlists successfully: ", data);
  return data.map((playlist) => playlist.spotify_track_id);
};

// Remove a track from a playlist
export const removeTrackFromPlaylist = async (
  playlistId: string,
  trackId: string
) => {
  const { data, error } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("spotify_track_id", trackId);

  if (error) {
    toast.error("Error removing track from playlist");
    toast.error("Error removing track: ");
    console.log("Error removing track: ", error);
    throw error;
  }

  toast.success("Removed track from playlist");
  console.log("Removed track from playlist: ", data);
  return true;
};

// Playlist management
export const createPlaylist = async (
  userId: string | null,
  name?: string,
  description?: string
) => {
  if (!userId || !name || !name.trim()) {
    toast.error("User not logged in or invalid input");
    console.log(name, description, userId);
    return null;
  }

  const newPlaylist = {
    name: name.trim(),
    description: description ? description.trim() : "",
    user_id: userId,
  };

  const { data, error } = await supabase
    .from("playlists")
    .insert([newPlaylist])
    .select();

  if (error) {
    toast.error("Error creating playlist:");
    console.log("Error creating playlist: ", error);
    return null;
  }

  return data; // Return created playlist
};

export const deletePlaylist = async (playlistId: string) => {
  if (!playlistId) {
    console.error("Invalid playlist ID");
    return false;
  }

  const { error } = await supabase
    .from("playlists")
    .delete()
    .eq("id", playlistId);

  if (error) {
    console.error("Error deleting playlist:", error.message);
    return false;
  }

  console.log("Playlist deleted successfully");
  return true;
};
