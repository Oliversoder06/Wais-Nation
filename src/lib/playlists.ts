import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { supabase } from "./supabase";

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

  return data;
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
export const updatePlaylist = async (
  playlistId: string,
  name: string,
  description: string
) => {
  if (!playlistId || !name.trim()) {
    console.error("Invalid playlist ID or name");
    return false;
  }

  const { data, error } = await supabase
    .from("playlists")
    .update({ name, description })
    .eq("id", playlistId)
    .select(); // Ensure we return the updated record

  if (error) {
    console.error("Error updating playlist:", error.message);
    return false;
  }

  console.log("Playlist updated successfully");
  // Return the first (and likely only) updated record
  return data && data.length ? data[0] : false;
};
