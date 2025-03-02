"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const RecentlyPlayedCard_1 = __importDefault(require("./RecentlyPlayedCard"));
const musicStore_1 = require("@/store/musicStore");
const spotify_1 = require("@/lib/spotify");
async function searchArtists({ query, limit, }) {
    try {
        const token = await (0, spotify_1.getSpotifyToken)();
        const response = await fetch(`https://api.spotify.com/v1/search?offset=0&limit=${limit}&q=${encodeURIComponent(query)}&type=artist`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to search artists: ${errorText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error searching artists:", error);
        return null;
    }
}
const RecentlyPlayed = () => {
    const { history } = (0, musicStore_1.useMusicStore)();
    const [artists, setArtists] = (0, react_1.useState)([]);
    // Memoized unique artist names to avoid re-computation
    const uniqueArtistNames = (0, react_1.useMemo)(() => Array.from(new Set(history.map((track) => track.artist))), [history]);
    (0, react_1.useEffect)(() => {
        const fetchArtists = async () => {
            if (uniqueArtistNames.length === 0)
                return;
            const promises = uniqueArtistNames.map(async (artistName) => {
                const response = await searchArtists({ query: artistName, limit: 1 });
                if (response && response.artists.items.length > 0) {
                    const artistData = response.artists.items[0];
                    return {
                        id: artistData.id,
                        name: artistData.name,
                        image: artistData.images && artistData.images.length > 0
                            ? artistData.images[0].url
                            : "/default-artist.jpg",
                    };
                }
                return null;
            });
            const results = await Promise.all(promises);
            const validArtists = results.filter((artist) => artist !== null);
            setArtists(validArtists.slice(0, 6));
        };
        fetchArtists();
    }, [uniqueArtistNames]); // Depend on `uniqueArtistNames` directly
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap md:gap-4 gap-[8px] max-w-[1000px] justify-center", children: artists.map((artist) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/artist/${artist.id}`, children: (0, jsx_runtime_1.jsx)(RecentlyPlayedCard_1.default, { id: artist.id, name: artist.name, image: artist.image }) }, artist.id))) }));
};
exports.default = RecentlyPlayed;
