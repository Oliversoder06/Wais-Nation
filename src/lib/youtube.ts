export async function searchYouTube(
  query: string
): Promise<{ videoId: string; duration: number } | null> {
  function parseISO8601Duration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = match[1] ? parseInt(match[1]) || 0 : 0;
    const minutes = match[2] ? parseInt(match[2]) || 0 : 0;
    const seconds = match[3] ? parseInt(match[3]) || 0 : 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}&maxResults=1`
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const videoId = data.items[0].id.videoId;

    // Fetch video details to get duration
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
    );
    if (!videoDetailsResponse.ok) {
      console.log(
        "Error fetching video details:" + videoDetailsResponse.statusText
      );
    }
    const videoDetails = await videoDetailsResponse.json();

    if (!videoDetails.items || videoDetails.items.length === 0) {
      return null;
    }

    const isoDuration = videoDetails.items[0].contentDetails.duration;
    const durationSeconds = parseISO8601Duration(isoDuration);

    return { videoId, duration: durationSeconds };
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return null;
  }
}
