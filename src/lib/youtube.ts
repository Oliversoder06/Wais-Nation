// lib/youtube.ts
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // now public
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const searchYouTube = async (query: string) => {
  try {
    // Combine query with "audio" properly:
    const fullQuery = encodeURIComponent(`${query} audio`);

    const response = await fetch(
      `${BASE_URL}?part=snippet&q=${fullQuery}&type=video&key=${API_KEY}&maxResults=1`
    );

    const data = await response.json();
    console.log("YouTube API response:", data);

    if (!data.items || data.items.length === 0) return null;

    // Return the first video's ID
    return data.items[0].id.videoId;
  } catch (error) {
    console.error("YouTube API Error:", error);
    return null;
  }
};
