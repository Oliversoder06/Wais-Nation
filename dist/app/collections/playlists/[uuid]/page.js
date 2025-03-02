"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlaylistPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const supabase_1 = require("@/lib/supabase");
const image_1 = __importDefault(require("next/image"));
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const playlists_1 = require("@/lib/playlists");
function PlaylistPage() {
    const params = (0, navigation_1.useParams)();
    const uuid = params === null || params === void 0 ? void 0 : params.uuid;
    const [playlist, setPlaylist] = (0, react_1.useState)(null);
    const [track, setTrack] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [editing, setEditing] = (0, react_1.useState)(false);
    // State for the editable fields
    const [playlistName, setPlaylistName] = (0, react_1.useState)("");
    const [playlistDescription, setPlaylistDescription] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (!uuid) {
            react_hot_toast_1.default.error("UUID is missing from the URL");
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            // Fetch playlist details
            const { data: playlistData, error: playlistError } = await supabase_1.supabase
                .from("playlists")
                .select("*")
                .eq("id", uuid)
                .single();
            if (playlistError) {
                react_hot_toast_1.default.error("Error fetching playlist.");
                console.error("Error fetching playlist:", playlistError.message);
                setLoading(false);
                return;
            }
            setPlaylist(playlistData);
            // Fetch tracks inside this playlist
            const { data: trackData, error: trackError } = await supabase_1.supabase
                .from("playlist_tracks")
                .select("*")
                .eq("playlist_id", uuid);
            if (trackError) {
                react_hot_toast_1.default.error("Error fetching tracks.");
                console.error("Error fetching tracks:", trackError.message);
            }
            else {
                setTrack(trackData || []);
            }
            setLoading(false);
        };
        fetchData();
    }, [uuid]);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "text-white text-center mt-10", children: "Loading..." });
    }
    if (!playlist) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "text-white text-center mt-10", children: "Playlist not found" }));
    }
    async function handleUpdatePlaylist(name, description) {
        if (!name.trim()) {
            react_hot_toast_1.default.error("Name is required");
            return;
        }
        const data = await (0, playlists_1.updatePlaylist)(uuid, name, description);
        if (!data) {
            react_hot_toast_1.default.error("Error updating playlist");
            return;
        }
        setPlaylist(data);
        setEditing(false);
        react_hot_toast_1.default.success("Playlist updated successfully");
    }
    // When editing, pre-fill the input fields with the current playlist values
    const handleEdit = () => {
        if (playlist) {
            setPlaylistName(playlist.name);
            setPlaylistDescription(playlist.description || "");
        }
        setEditing(true);
    };
    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-8 pb-[50px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center mt-10 text-white cursor-pointer", onClick: handleEdit, children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/images/Playlist.svg", alt: "Playlist Image", width: 200, height: 200, className: "md:w-[200px] md:h-[200px] w-[150px] h-[150px] rounded-lg" }), (0, jsx_runtime_1.jsx)("h1", { className: "md:text-4xl text-2xl font-bold mt-4 max-w-full truncate  md:px-[40px] px-[12px] text-center", children: playlist.name }), (0, jsx_runtime_1.jsx)("p", { className: "md:text-lg text-sm text-gray-400 mt-2 truncate md:px-[40px] px-[12px] max-w-full", children: playlist.description || "No description available" })] }), editing && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white text-2xl font-bold", children: "Update Playlist" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/cross.svg", alt: "cross icon", width: 28, height: 28, className: "cursor-pointer self-end", onClick: () => setEditing(false) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Playlist Name", value: playlistName, maxLength: 50, onChange: (e) => setPlaylistName(e.target.value), className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]" }), playlistName.length > 0 &&
                                    (playlistName.length < 50 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistName.length, "/50"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistName.length, "/50"] })))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("textarea", { placeholder: "Playlist Description", value: playlistDescription, onChange: (e) => setPlaylistDescription(e.target.value), maxLength: 100, className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none" }), playlistDescription.length > 0 &&
                                    (playlistDescription.length < 100 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistDescription.length, "/100"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistDescription.length, "/100"] })))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-4", children: (0, jsx_runtime_1.jsx)("button", { className: "px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]", onClick: () => handleUpdatePlaylist(playlistName, playlistDescription), children: "Save" }) })] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 mx-[12px] md:mx-[40px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:flex gap-[20px] items-center md:px-4 px-2 pb-2 hidden", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/play.svg", alt: "play", width: 48, height: 48, className: "cursor-pointer" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/loop.svg", alt: "loop", width: 28, height: 28, className: "opacity-50 hover:opacity-100 hover:scale-110 cursor-pointer transition-all" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-[48px] h-[48px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Title" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Album" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold", children: "Date added" }), (0, jsx_runtime_1.jsx)("span", { className: "text-nit font-semibold text-right", children: "Duration" })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[1px] bg-[#2e2e2e]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:mb-0 mb-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 pb-2 md:hidden", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/play.svg", alt: "play", width: 48, height: 48 }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/loop.svg", alt: "loop", width: 28, height: 28, className: "opacity-50" })] }), track.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-400 text-center", children: "No tracks added to this playlist yet." })) : (track.map((track) => ((0, jsx_runtime_1.jsx)(LongSongCard_1.default, { title: track.title || "Unknown Title", artist: track.artist || "Unknown Title", album: track.album || "Unknown Album", date: formatDate(track.added_at), duration: track.duration || "-:--", cover: track.cover }, track.id))))] })] })] }));
}
