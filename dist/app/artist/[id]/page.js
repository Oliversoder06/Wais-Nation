"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArtistPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const spotify_1 = require("@/lib/spotify");
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const AlbumCarousel_1 = __importDefault(require("@/components/AlbumCarousel"));
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
async function ArtistPage({ params }) {
    var _a, _b;
    // 1) Await the params object
    const { id } = await params;
    // 2) Fetch artist details
    const artist = await (0, spotify_1.getArtistDetails)(id);
    if (!artist) {
        (0, navigation_1.notFound)();
    }
    // 3) Fetch artist’s top tracks
    const topTracks = await (0, spotify_1.getArtistTopTracks)(id);
    if (!topTracks) {
        (0, navigation_1.notFound)();
    }
    // 4) Fetch artist’s albums
    const albums = await (0, spotify_1.getArtistAlbums)(id);
    if (!albums) {
        (0, navigation_1.notFound)();
    }
    // We'll reuse followers.total as "monthly listeners" for demonstration
    const followers = artist.followers.total.toLocaleString();
    // Cloudinary transformation URL with face detection.
    // Adjust the width (w_1200) and height (h_400) as needed.
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const artistBgImage = ((_b = (_a = artist.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url)
        ? `https://res.cloudinary.com/${cloudName}/image/fetch/w_1200,h_400,c_fill,g_face/${artist.images[0].url}`
        : "none";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col text-white bg-secondary min-h-screen", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-[400px] bg-center bg-cover flex items-end p-8", style: {
                    backgroundImage: artistBgImage !== "none" ? `url(${artistBgImage})` : "none",
                    backgroundPosition: "50% 50%",
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-black/60" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-blue-400 mb-2 text-sm uppercase", children: "Verified Artist" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-5xl md:text-6xl font-extrabold", children: artist.name }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-2 text-sm text-gray-200", children: [followers, " followers"] }), (0, jsx_runtime_1.jsx)("button", { className: "mt-4 bg-green-500 text-black px-28 py-2 rounded-full font-semibold hover:bg-green-400 transition w-max", children: "Follow" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-[40px]", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold mb-4", children: "Popular" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-[48px] h-[48px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Title" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Album" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Released" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold text-right", children: "Duration" })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[1px] bg-[#2e2e2e]" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col", children: topTracks.map((track) => {
                                    var _a, _b;
                                    return ((0, jsx_runtime_1.jsx)(LongSongCard_1.default, { title: track.name, artist: track.artists.map((a) => a.name).join(", "), album: track.album.name, date: track.album.release_date || "Unknown", duration: formatDuration(track.duration_ms), cover: (_b = (_a = track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url }, track.id));
                                }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "mt-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "Albums" }), (0, jsx_runtime_1.jsx)(AlbumCarousel_1.default, { albums: albums, artistName: artist.name })] }) })] })] })] }));
}
