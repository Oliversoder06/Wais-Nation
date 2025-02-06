import { NextApiRequest, NextApiResponse } from "next";
import { fetchSpotifyPlaylistSongs } from "@/lib/spotify";
import { fetchYouTubeVideos } from "@/lib/youtube";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch songs from Spotify
    const spotifySongs = await fetchSpotifyPlaylistSongs();

    // Fetch YouTube videos for the songs
    const youtubeResults = await fetchYouTubeVideos(spotifySongs);

    // Return the combined data
    res.status(200).json({ spotifySongs, youtubeResults });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: error.message });
  }
}
