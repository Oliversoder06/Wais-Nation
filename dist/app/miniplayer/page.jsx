"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const MiniPlayer = () => {
    const [track, setTrack] = (0, react_1.useState)(null);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        console.log("[MiniPlayer] Component mounted, setting up onUpdateTrack listener");
        if (window.myElectron) {
            window.myElectron.onUpdateTrack((newTrack) => {
                console.log("[MiniPlayer] Received track update:", newTrack);
                setTrack(newTrack);
            });
            // Request current track in case the update was missed
            console.log("[MiniPlayer] Requesting current track");
            window.myElectron.send("get-current-track");
        }
        else {
            console.log("[MiniPlayer] window.myElectron is undefined");
            // If not in Electron, you can parse query parameters:
            const params = new URLSearchParams(window.location.search);
            const title = params.get("title");
            const artist = params.get("artist");
            const videoId = params.get("videoId");
            if (title && artist && videoId) {
                setTrack({ title, artist, videoId });
            }
        }
    }, []);
    const handlePlayPause = () => {
        console.log("[MiniPlayer] Play/Pause clicked");
        if (window.myElectron) {
            window.myElectron.send("toggle-play");
        }
        setIsPlaying(!isPlaying);
    };
    return (<div className="w-full h-[85vh] bg-[#181818] text-white flex flex-col items-center justify-center rounded-lg shadow-lg p-4">
      {track ? (<>
          <div className="flex items-center gap-4">
            <image_1.default src={`https://i.ytimg.com/vi/${track.videoId}/hqdefault.jpg`} alt="Thumbnail" width={60} height={60} className="rounded-lg"/>
            <div className="flex flex-col">
              <p className="text-lg font-bold truncate max-w-[250px]">
                {track.title}
              </p>
              <p className="text-sm text-gray-400 truncate max-w-[250px]">
                {track.artist}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center gap-4 mt-4">
            <button onClick={handlePlayPause}>
              {isPlaying ? (<image_1.default src="/icons/pause.svg" width={40} height={40} alt="Pause"/>) : (<image_1.default src="/icons/play.svg" width={40} height={40} alt="Play"/>)}
            </button>
          </div>
        </>) : (<p className="text-gray-400">No track playing...</p>)}
    </div>);
};
exports.default = MiniPlayer;
