"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLikedSongs;
const react_1 = require("react");
const supabase_1 = require("@/lib/supabase");
const nextjs_1 = require("@clerk/nextjs");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
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
                // Cast the returned data to LikedSong[]
                setLikedSongs(data || []);
            }
            setLoading(false);
        }
        fetchLikedSongs();
    }, [userId]);
    return { likedSongs, loading };
}
