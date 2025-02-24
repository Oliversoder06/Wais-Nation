const PYTHON_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const searchYouTube = async (query: string) => {
  try {
    const response = await fetch(
      `${PYTHON_API_URL}/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from Flask API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("YouTube Music API response:", data);

    return data.videoId || null;
  } catch (error) {
    console.error("YouTube Music API Error:", error);
    return null;
  }
};
