"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/AddTrackButton.tsx
const react_1 = __importDefault(require("react"));
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
    return <button onClick={handleAddTrack}>Add Track to Playlist</button>;
};
exports.default = AddTrackButton;
