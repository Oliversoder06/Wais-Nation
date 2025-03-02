"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaylist = exports.deletePlaylist = exports.createPlaylist = exports.addTrackToPlaylist = void 0;
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const supabase_1 = require("./supabase");
// Create a new playlist track association
const addTrackToPlaylist = async (playlistId, trackId, userId) => {
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await supabase_1.supabase
        .from("playlist_tracks")
        .insert([{ playlist_id: playlistId, track_id: trackId, user_id: userId }]);
    if (error) {
        react_hot_toast_1.default.error("Error adding track to playlist");
        console.error("Error adding track: ", error);
        throw error;
    }
    react_hot_toast_1.default.success("Added track to playlist");
    return data;
};
exports.addTrackToPlaylist = addTrackToPlaylist;
// Create a new playlist
const createPlaylist = async (userId, name, description) => {
    if (!userId || !name || !name.trim()) {
        react_hot_toast_1.default.error("User not logged in or invalid input");
        return null;
    }
    const newPlaylist = {
        name: name.trim(),
        description: description ? description.trim() : "",
        user_id: userId,
    };
    const { data, error } = await supabase_1.supabase
        .from("playlists")
        .insert([newPlaylist])
        .select();
    if (error) {
        react_hot_toast_1.default.error("Error creating playlist:");
        console.error("Error creating playlist: ", error);
        return null;
    }
    return data;
};
exports.createPlaylist = createPlaylist;
// Delete a playlist by its ID
const deletePlaylist = async (playlistId) => {
    if (!playlistId) {
        console.error("Invalid playlist ID");
        return false;
    }
    const { error } = await supabase_1.supabase
        .from("playlists")
        .delete()
        .eq("id", playlistId);
    if (error) {
        console.error("Error deleting playlist:", error.message);
        return false;
    }
    return true;
};
exports.deletePlaylist = deletePlaylist;
// Update a playlist's name and description
const updatePlaylist = async (playlistId, name, description) => {
    if (!playlistId || !name.trim()) {
        console.error("Invalid playlist ID or name");
        return false;
    }
    const { data, error } = await supabase_1.supabase
        .from("playlists")
        .update({ name, description })
        .eq("id", playlistId)
        .select(); // Return the updated record
    if (error) {
        console.error("Error updating playlist:", error.message);
        return false;
    }
    // Return the first (and likely only) updated record
    return data && data.length ? data[0] : false;
};
exports.updatePlaylist = updatePlaylist;
