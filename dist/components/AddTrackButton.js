"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const nextjs_1 = require("@clerk/nextjs");
const playlists_1 = require("@/lib/playlists");
const AddTrackButton = ({ playlistId, trackId, }) => {
    const { user } = (0, nextjs_1.useUser)();
    const handleAddTrack = async () => {
        if (!user) {
            console.error("User not logged in");
            return;
        }
        try {
            await (0, playlists_1.addTrackToPlaylist)(playlistId, trackId, user.id);
        }
        catch (error) {
            console.error("Error adding track:", error);
        }
    };
    return (0, jsx_runtime_1.jsx)("button", { onClick: handleAddTrack, children: "Add Track to Playlist" });
};
exports.default = AddTrackButton;
