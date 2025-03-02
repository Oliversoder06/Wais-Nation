"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const spotify_1 = require("@/lib/spotify"); // existing track search
const spotify_2 = require("@/lib/spotify");
// New function to search for artists
async function searchArtists({ query, limit, }) {
    try {
        const token = await (0, spotify_2.getSpotifyToken)();
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
const DesktopSearchbar = () => {
    const [query, setQuery] = (0, react_1.useState)("");
    const [artistResults, setArtistResults] = (0, react_1.useState)([]);
    const [trackResults, setTrackResults] = (0, react_1.useState)([]);
    const [showResults, setShowResults] = (0, react_1.useState)(false);
    // selectedIndex is a combined index for artists then tracks
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(-1);
    const searchRef = (0, react_1.useRef)(null);
    // Create refs for each result item
    const resultsRefs = (0, react_1.useRef)([]);
    const router = (0, navigation_1.useRouter)();
    // Total count for arrow navigation
    const totalResults = artistResults.length + trackResults.length;
    // Handle arrow keys and Enter on the input
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        else if (e.key === "Enter") {
            if (selectedIndex !== -1) {
                // Determine if the selected index is an artist or a track
                if (selectedIndex < artistResults.length) {
                    const selectedArtist = artistResults[selectedIndex];
                    router.push(`/artist/${selectedArtist.id}`);
                }
                else {
                    const trackIndex = selectedIndex - artistResults.length;
                    const selectedTrack = trackResults[trackIndex];
                    router.push(`/track/${selectedTrack.id}`);
                }
                setShowResults(false);
                setQuery("");
            }
        }
    };
    (0, react_1.useEffect)(() => {
        var _a;
        if (selectedIndex !== -1 && resultsRefs.current[selectedIndex]) {
            (_a = resultsRefs.current[selectedIndex]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [selectedIndex]);
    (0, react_1.useEffect)(() => {
        if (query.length > 2) {
            const debounceTimeout = setTimeout(() => {
                (async () => {
                    try {
                        // Run both searches concurrently: top 2 artists and up to 15 tracks
                        const [artistData, trackData] = await Promise.all([
                            searchArtists({ query, limit: 2 }),
                            (0, spotify_1.searchSpotify)({ query, limit: 15 }),
                        ]);
                        setArtistResults(artistData ? artistData.artists.items : []);
                        setTrackResults(trackData ? trackData.tracks.items : []);
                        setShowResults(true);
                        setSelectedIndex(-1);
                    }
                    catch (error) {
                        react_hot_toast_1.default.error("Error during Spotify search");
                        console.error("Error during Spotify search:", error);
                    }
                })();
            }, 200);
            return () => clearTimeout(debounceTimeout);
        }
        else {
            setArtistResults([]);
            setTrackResults([]);
            setShowResults(false);
            setSelectedIndex(-1);
        }
    }, [query]);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current &&
                !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, {
            passive: true,
        });
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    let globalIndex = 0;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed top-0 md:py-[8px] w-full flex justify-center ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] z-50", children: (0, jsx_runtime_1.jsxs)("div", { ref: searchRef, className: "relative hidden md:flex", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search for tracks and artists...", className: "w-[452px] h-[48px] bg-container rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none", onFocus: () => setShowResults(true), onKeyDown: handleKeyDown }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/searchicon.svg", alt: "search", width: 20, height: 20, className: "absolute top-[50%] left-[12px] transform -translate-y-1/2" }), showResults &&
                    (artistResults.length > 0 || trackResults.length > 0) && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-full left-0 right-0 bg-background shadow-lg rounded mt-2 max-h-96 overflow-y-auto scrollbar z-[1000]", children: [artistResults.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "border-b border-container pb-2", children: artistResults.map((artist) => {
                                const currentIndex = globalIndex;
                                globalIndex++;
                                return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/artist/${artist.id}`, passHref: true, children: (0, jsx_runtime_1.jsxs)("div", { ref: (el) => {
                                            resultsRefs.current[currentIndex] = el;
                                        }, className: `p-2 hover:bg-container cursor-pointer flex items-center gap-2 ${selectedIndex === currentIndex ? "bg-container" : ""}`, onClick: () => {
                                            setQuery("");
                                            setShowResults(false);
                                        }, children: [artist.images && artist.images[0] && ((0, jsx_runtime_1.jsx)(image_1.default, { src: artist.images[0].url, alt: artist.name, width: 40, height: 40, className: "rounded-full" })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-white", children: artist.name }) })] }) }, artist.id));
                            }) })), trackResults.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "pt-2", children: trackResults.map((track) => {
                                var _a, _b;
                                const currentIndex = globalIndex;
                                globalIndex++;
                                return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/track/${track.id}`, passHref: true, children: (0, jsx_runtime_1.jsxs)("div", { ref: (el) => {
                                            resultsRefs.current[currentIndex] = el;
                                        }, className: `p-2 hover:bg-container cursor-pointer flex items-center gap-2 ${selectedIndex === currentIndex ? "bg-container" : ""}`, onClick: () => {
                                            setQuery("");
                                            setShowResults(false);
                                        }, children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: ((_b = (_a = track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) ||
                                                    "/images/Playlist.svg", alt: "album cover", width: 40, height: 40, className: "rounded" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-white", children: track.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-nit", children: track.artists
                                                            .map((artist) => artist.name)
                                                            .join(", ") })] })] }) }, track.id));
                            }) }))] }))] }) }));
};
exports.default = DesktopSearchbar;
