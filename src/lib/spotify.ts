export async function getSpotifyToken(): Promise<string> {
  try {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify API credentials");
    }

    const authBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authBase64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spotify Token Error: ${response.status} - ${errorText}`);
      throw new Error("Failed to get Spotify access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw error;
  }
}

export async function getPlaylist(playlistId: string) {
  try {
    const token = await getSpotifyToken();
    console.log("Fetching playlist with ID:", playlistId);

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("token:", token);

    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
}

export async function getPlaylistTracks(playlistId: string) {
  try {
    const token = await getSpotifyToken();
    console.log("Fetching playlist tracks with ID:", playlistId);

    const limit = 3;
    const offset = 0;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
  }
}
