const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

// Define interfaces for Spotify API responses

interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

interface SpotifyAlbum {
  release_date: string;
  album_type: string;
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  duration_ms: number;
  // Add other properties if needed
}

export interface SpotifySearchResponse {
  tracks: {
    href: string;
    items: SpotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export async function getSpotifyToken(): Promise<string> {
  try {
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

export async function searchSpotify({
  query,
  limit,
}: {
  query: string;
  limit: number;
}): Promise<SpotifySearchResponse | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?offset=0&limit=${limit}&q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search Spotify: ${response.statusText}`);
    }

    const data: SpotifySearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching Spotify:", error);
    return null;
  }
}

export async function getTrackDetails(
  trackId: string
): Promise<SpotifyTrack | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get track details: ${response.statusText}`);
    }

    const data: SpotifyTrack = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching track details:", error);
    return null;
  }
}

export interface SpotifyArtistDetails {
  id: string;
  name: string;
  genres: string[];
  images: { url: string }[];
  followers: { total: number };
  popularity: number;
}

export async function getArtistDetails(
  artistId: string
): Promise<SpotifyArtistDetails | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get artist details: ${response.statusText}`);
    }

    const data: SpotifyArtistDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist details:", error);
    return null;
  }
}

export async function getArtistTopTracks(
  artistId: string
): Promise<SpotifyTrack[] | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get artist top tracks: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.tracks as SpotifyTrack[];
  } catch (error) {
    console.error("Error fetching artist top tracks:", error);
    return null;
  }
}

export async function getArtistAlbums(
  artistId: string
): Promise<SpotifyAlbum[] | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?market=US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get artist albums: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items as SpotifyAlbum[];
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    return null;
  }
}

export interface SpotifyAlbumDetails {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  tracks: {
    items: SpotifyTrack[];
  };
}

export async function getAlbumDetails(
  albumId: string
): Promise<SpotifyAlbumDetails | null> {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}?market=US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get album details: ${response.statusText}`);
    }

    const data = await response.json();
    return data as SpotifyAlbumDetails;
  } catch (error) {
    console.error("Error fetching album details:", error);
    return null;
  }
}
