// src/components/AddTrackButton.tsx
import React from "react";
import { useUser } from "@clerk/nextjs";
import { addTrackToPlaylist } from "@/lib/playlists";

interface AddTrackButtonProps {
  playlistId: string;
  trackId: string;
}

const AddTrackButton: React.FC<AddTrackButtonProps> = ({
  playlistId,
  trackId,
}) => {
  const { user } = useUser();

  const handleAddTrack = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      await addTrackToPlaylist(playlistId, trackId, user.id);
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  return <button onClick={handleAddTrack}>Add Track to Playlist</button>;
};

export default AddTrackButton;
