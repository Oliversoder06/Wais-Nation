"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = exports.PlayerProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PlayerContext = (0, react_1.createContext)(undefined);
const PlayerProvider = ({ children, }) => {
    const [currentSong, setCurrentSongState] = (0, react_1.useState)(null);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const playerRef = (0, react_1.useRef)(null);
    const setCurrentSong = (song) => {
        setCurrentSongState(song);
        setIsPlaying(true);
    };
    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };
    return ((0, jsx_runtime_1.jsx)(PlayerContext.Provider, { value: { currentSong, isPlaying, setCurrentSong, togglePlay, playerRef }, children: children }));
};
exports.PlayerProvider = PlayerProvider;
const usePlayer = () => {
    const context = (0, react_1.useContext)(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
};
exports.usePlayer = usePlayer;
