"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const musicStore_1 = require("@/store/musicStore");
const image_1 = __importDefault(require("next/image"));
const MiniPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, playNext, playPrevious } = (0, musicStore_1.useMusicStore)();
    (0, react_1.useEffect)(() => {
        if (currentTrack) {
            document.title = `${currentTrack.title} - ${currentTrack.artist}`;
        }
    }, [currentTrack]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center bg-black text-white p-4 w-[300px] h-[150px] rounded-lg", children: [currentTrack && ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: currentTrack.albumCover, alt: "Album Cover", width: 50, height: 50, className: "rounded" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: currentTrack.title }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-400", children: currentTrack.artist })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 mt-3", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/prevsong.svg", alt: "prev song", width: 20, height: 20, onClick: playPrevious, className: "cursor-pointer" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: isPlaying ? "/icons/pause.svg" : "/icons/play.svg", alt: "play/pause", width: 24, height: 24, onClick: togglePlay, className: "cursor-pointer" }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/nextsong.svg", alt: "next song", width: 20, height: 20, onClick: playNext, className: "cursor-pointer" })] })] }));
};
exports.default = MiniPlayer;
