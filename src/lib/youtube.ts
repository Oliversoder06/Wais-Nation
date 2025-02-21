const PYTHON_API_URL = "http://localhost:5000/search";

export const searchYouTube = async (query: string) => {
  try {
    const response = await fetch(
      `${PYTHON_API_URL}?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    console.log("YouTube Music API response:", data);

    return data.videoId || null;
  } catch (error) {
    console.error("YouTube Music API Error:", error);
    return null;
  }
};
