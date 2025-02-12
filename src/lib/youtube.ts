import fetch from "node-fetch";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;

export const fetchYouTubeVideos = async (songs: any[]) => {
  const results = await Promise.all(
    songs.map(async (song) => {
      const query = `${song.title} ${song.artist} official audio`;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`
      );
      const data = (await response.json()) as {
        items: { id: { videoId: string } }[];
      };
      return { ...song, youtubeId: data.items[0]?.id?.videoId };
    })
  );

  return results;
};
