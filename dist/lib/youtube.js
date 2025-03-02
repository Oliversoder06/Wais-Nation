"use strict";
// src/lib/youtube.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDuration = parseDuration;
exports.searchYouTube = searchYouTube;
/**
 * Parses a duration string in "MM:SS" or "HH:MM:SS" format to seconds.
 */
function parseDuration(duration) {
    const parts = duration.split(":").map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}
/**
 * Searches YouTube using your backend endpoint.
 * Expects your backend to return JSON with these fields:
 * {
 *   "videoId": string,
 *   "duration": string,  // e.g. "3:22"
 *   "artist": string,
 *   "thumbnail": string,
 *   "title": string
 * }
 */
async function searchYouTube(query) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL; // e.g., "https://waisnation-backend.onrender.com"
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.error("Error fetching YouTube search results:" + response.statusText);
            return null;
        }
        const data = await response.json();
        console.log("Backend search data:", data);
        // We assume the backend returns the correct fields.
        if (!data.videoId) {
            return null;
        }
        return {
            videoId: data.videoId,
            duration: data.duration, // "3:22"
            artist: data.artist,
            thumbnail: data.thumbnail,
            title: data.title,
        };
    }
    catch (error) {
        console.error("Error searching YouTube:", error);
        return null;
    }
}
