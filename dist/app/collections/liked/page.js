"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CollectionsHeader_1 = __importDefault(require("@/components/CollectionsHeader"));
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const image_1 = __importDefault(require("next/image"));
const supabase_1 = require("@/lib/supabase");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const nextjs_1 = require("@clerk/nextjs");
function useLikedSongs() {
    const { userId } = (0, nextjs_1.useAuth)();
    const [likedSongs, setLikedSongs] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!userId)
            return;
        async function fetchLikedSongs() {
            setLoading(true);
            const { data, error } = await supabase_1.supabase
                .from("liked_songs")
                .select("*")
                .eq("user_id", userId)
                .order("added_at", { ascending: false });
            if (error) {
                react_hot_toast_1.default.error("Error fetching liked songs");
            }
            else {
                setLikedSongs(data || []);
            }
            setLoading(false);
        }
        fetchLikedSongs();
    }, [userId]);
    return { likedSongs, loading };
}
// Utility function to format ISO timestamp into a user-friendly string
function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
// Utility function to convert duration (seconds) to "mm:ss"
function formatDuration(durationInSeconds) {
    const seconds = parseInt(durationInSeconds, 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
const Liked = () => {
    const { likedSongs, loading } = useLikedSongs();
    const amount = likedSongs.length;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex flex-col gap-8 md:pb-[50px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(CollectionsHeader_1.default, { gradient: "from-secondary to-[#0E3B2D]", image: "LikedTracks", text: "Liked Songs", type: `${amount} Songs` }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/play.svg", alt: "play", width: 48, height: 48, className: "absolute top-1/2 right-[40px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 mx-[12px] md:mx-[40px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-[48px] h-[48px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Title" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Album" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Date added" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold text-right", children: "Duration" })] }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:block w-full h-[1px] bg-[#2e2e2e]" }), (0, jsx_runtime_1.jsx)("div", { children: loading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-white", children: "Loading liked songs..." })) : amount === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-[#ABAABB] text-lg text-center mt-[40px]", children: "No liked songs found." })) : (likedSongs.map((song) => ((0, jsx_runtime_1.jsx)(LongSongCard_1.default, { title: song.title, artist: song.artist, album: song.album || "Album", date: formatDate(song.added_at), duration: formatDuration(song.duration), cover: song.cover }, song.id)))) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:hidden px-[16px] bg-gradient-to-t from-secondary to-[#005E38] h-[150px] gap-16", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between w-full items-center mt-[48px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-white text-[24px]", children: "Liked Songs" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-nit", children: [amount, " ", amount === 1 ? "song" : "songs"] })] }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/play.svg", alt: "play", width: 48, height: 48 })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col  pb-[100px]", children: loading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-white", children: "Loading..." })) : amount === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-[#ABAABB] text-lg text-center", children: "No liked songs found." })) : (likedSongs.map((song) => ((0, jsx_runtime_1.jsx)(LongSongCard_1.default, { title: song.title, artist: song.artist, album: song.album || "Album", date: formatDate(song.added_at), duration: formatDuration(song.duration), cover: song.cover }, song.id)))) })] })] }));
};
exports.default = Liked;
