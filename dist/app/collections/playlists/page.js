"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const LongPlaylistCard_1 = __importDefault(require("@/components/LongPlaylistCard"));
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const supabase_1 = require("@/lib/supabase");
const nextjs_1 = require("@clerk/nextjs");
const playlists_1 = require("@/lib/playlists");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const CollectionsHeader_1 = __importDefault(require("@/components/CollectionsHeader"));
const Playlists = () => {
    const { userId, isSignedIn } = (0, nextjs_1.useAuth)();
    const [playlists, setPlaylists] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [playlistName, setPlaylistName] = (0, react_1.useState)("");
    const [playlistDescription, setPlaylistDescription] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const fetchPlaylists = async () => {
            setLoading(true);
            const { data, error } = await supabase_1.supabase
                .from("playlists")
                .select("id, name, description, user_id");
            if (error) {
                react_hot_toast_1.default.error("Error fetching playlists:");
            }
            else {
                setPlaylists(data || []);
            }
            setLoading(false);
        };
        fetchPlaylists();
    }, []);
    const handleCreatePlaylist = async () => {
        if (!isSignedIn || !userId || !playlistName || !playlistName.trim()) {
            react_hot_toast_1.default.error("User not logged in or invalid input");
            return;
        }
        const newPlaylist = await (0, playlists_1.createPlaylist)(userId, playlistName, playlistDescription);
        if (newPlaylist) {
            setPlaylists((prev) => [...newPlaylist, ...prev]);
            setShowModal(false);
            setPlaylistName("");
            setPlaylistDescription("");
        }
        react_hot_toast_1.default.success("Playlist created successfully");
    };
    const handleDeletePlaylist = (playlistId) => {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
    };
    const amount = playlists.filter((playlist) => playlist.user_id === userId).length;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-col gap-8 hidden md:flex pb-[50px] ", children: [(0, jsx_runtime_1.jsx)(CollectionsHeader_1.default, { gradient: "from-secondary to-[#104344]", image: "Playlist", text: "Your Playlists", type: `${amount} playlists` }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end mr-[40px]", children: isSignedIn ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/create-plus.svg", alt: "Create New Playlist", width: 64, height: 64, className: "cursor-pointer", onClick: () => setShowModal(true) })) : ((0, jsx_runtime_1.jsxs)("p", { className: "text-[#ABAABB]", children: [(0, jsx_runtime_1.jsx)(nextjs_1.SignInButton, { children: (0, jsx_runtime_1.jsx)("span", { className: "cursor-pointer hover:underline text-blue-500", children: "Sign in" }) }), " ", "to create playlists"] })) }), showModal && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white text-2xl font-bold", children: "Create New Playlist" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/cross.svg", alt: "cross icon", width: 28, height: 28, className: "cursor-pointer self-end", onClick: () => setShowModal(false) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Playlist Name", value: playlistName, maxLength: 50, onChange: (e) => setPlaylistName(e.target.value), className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]" }), playlistName.length > 0 &&
                                            (playlistName.length < 50 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistName.length, "/50"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistName.length, "/50"] })))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("textarea", { placeholder: "Playlist Description", value: playlistDescription, onChange: (e) => setPlaylistDescription(e.target.value), maxLength: 100, className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none" }), playlistDescription.length > 0 &&
                                            (playlistDescription.length < 100 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistDescription.length, "/100"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistDescription.length, "/100"] })))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-4", children: (0, jsx_runtime_1.jsx)("button", { className: "px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]", onClick: handleCreatePlaylist, children: "Save" }) })] }) })), loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-[#ABAABB] text-lg text-center mt-[40px]", children: "Loading playlists..." })) : playlists.filter((playlist) => playlist.user_id === userId).length <
                        1 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-[#ABAABB] text-lg text-center mt-[40px]", children: "Looks pretty empty." })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4 mx-[40px]", children: playlists
                            .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
                            .map((playlist) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: (0, jsx_runtime_1.jsx)(LongPlaylistCard_1.default, { owner: "You", name: playlist.name, description: playlist.description, id: playlist.id, onDelete: () => handleDeletePlaylist(playlist.id) }) }, playlist.id))) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "pb-[100px] flex flex-col md:hidden px-[16px]  bg-gradient-to-t from-secondary to-[#104344] h-[150px] gap-16", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between w-full items-center mt-[48px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between w-full items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-white text-[24px]", children: "Playlists" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-nit", children: [amount, " ", amount > 1 ? "playlists" : "playlist"] })] }), isSignedIn ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/create-plus.svg", alt: "Create New Playlist", width: 48, height: 48, className: "cursor-pointer", onClick: () => setShowModal(true) })) : ((0, jsx_runtime_1.jsxs)("p", { className: "text-[#ABAABB]", children: [(0, jsx_runtime_1.jsx)(nextjs_1.SignInButton, { children: (0, jsx_runtime_1.jsx)("span", { className: "cursor-pointer hover:underline text-blue-500", children: "Sign in" }) }), " ", "to create playlists"] }))] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 mt-4 md:hidden pb-[100px]", children: [loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-[#ABAABB] text-lg text-center mt-[40px]", children: "Loading playlists..." })) : playlists.filter((playlist) => playlist.user_id === userId)
                                .length < 1 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-[#ABAABB] text-lg text-center mt-[40px]", children: "Looks pretty empty." })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4", children: playlists
                                    .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
                                    .map((playlist) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: (0, jsx_runtime_1.jsx)(LongPlaylistCard_1.default, { owner: "You", name: playlist.name, description: playlist.description, id: playlist.id, onDelete: () => handleDeletePlaylist(playlist.id) }) }, playlist.id))) })), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: showModal && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white text-2xl font-bold", children: "Create New Playlist" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/cross.svg", alt: "cross icon", width: 28, height: 28, className: "cursor-pointer self-end", onClick: () => setShowModal(false) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Playlist Name", value: playlistName, maxLength: 50, onChange: (e) => setPlaylistName(e.target.value), className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]" }), playlistName.length > 0 &&
                                                        (playlistName.length < 50 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistName.length, "/50"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistName.length, "/50"] })))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("textarea", { placeholder: "Playlist Description", value: playlistDescription, onChange: (e) => setPlaylistDescription(e.target.value), maxLength: 100, className: "p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none" }), playlistDescription.length > 0 &&
                                                        (playlistDescription.length < 100 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ABAABB] text-sm text-right", children: [playlistDescription.length, "/100"] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#ff1616] text-sm text-right", children: [playlistDescription.length, "/100"] })))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-4", children: (0, jsx_runtime_1.jsx)("button", { className: "px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]", onClick: handleCreatePlaylist, children: "Save" }) })] }) })) })] })] })] }));
};
exports.default = Playlists;
