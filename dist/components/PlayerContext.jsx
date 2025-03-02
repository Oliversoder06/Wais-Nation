"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = exports.PlayerProvider = void 0;
const react_1 = __importStar(require("react"));
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
    return (<PlayerContext.Provider value={{ currentSong, isPlaying, setCurrentSong, togglePlay, playerRef }}>
      {children}
    </PlayerContext.Provider>);
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
