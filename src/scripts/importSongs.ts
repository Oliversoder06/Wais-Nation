// import { fetchSpotifyPlaylistSongs } from "../lib/spotify";
// import { fetchYouTubeVideos } from "../lib/youtube";
// import { supabase } from "../lib/supabase";

// const importSpotifySongs = async () => {
//   console.log("📥 Fetching songs from Spotify playlist...");
//   const songs = await fetchSpotifyPlaylistSongs();

//   console.log("🔍 Searching YouTube for matching videos...");
//   const songsWithYouTube = await fetchYouTubeVideos(songs);

//   console.log("💾 Saving to database...");
//   const { error } = await supabase.from("songs").insert(songsWithYouTube);
//   if (error) console.error("❌ Supabase Error:", error);
//   else console.log("✅ Songs saved to Supabase!");

//   console.log("✅ Import complete! 🎵");
// };

// importSpotifySongs();
