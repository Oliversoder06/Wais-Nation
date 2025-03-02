"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotifyToken = getSpotifyToken;
exports.searchSpotify = searchSpotify;
exports.getTrackDetails = getTrackDetails;
exports.getArtistDetails = getArtistDetails;
exports.getArtistTopTracks = getArtistTopTracks;
exports.getArtistAlbums = getArtistAlbums;
exports.getAlbumDetails = getAlbumDetails;
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
async function getSpotifyToken() {
    try {
        if (!clientId || !clientSecret) {
            throw new Error("Missing Spotify API credentials");
        }
        const authBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
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
    }
    catch (error) {
        console.error("Error fetching Spotify token:", error);
        throw error;
    }
}
async function searchSpotify({ query, limit, }) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/search?offset=0&limit=${limit}&q=${encodeURIComponent(query)}&type=track`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to search Spotify: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error searching Spotify:", error);
        return null;
    }
}
async function getTrackDetails(trackId) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get track details: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching track details:", error);
        return null;
    }
}
async function getArtistDetails(artistId) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get artist details: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching artist details:", error);
        return null;
    }
}
async function getArtistTopTracks(artistId) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get artist top tracks: ${response.statusText}`);
        }
        const data = await response.json();
        return data.tracks;
    }
    catch (error) {
        console.error("Error fetching artist top tracks:", error);
        return null;
    }
}
async function getArtistAlbums(artistId) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?market=US`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get artist albums: ${response.statusText}`);
        }
        const data = await response.json();
        return data.items;
    }
    catch (error) {
        console.error("Error fetching artist albums:", error);
        return null;
    }
}
async function getAlbumDetails(albumId) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}?market=US`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to get album details: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching album details:", error);
        return null;
    }
}
