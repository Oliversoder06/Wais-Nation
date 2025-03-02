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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = __importStar(require("react"));
const react_youtube_1 = __importDefault(require("react-youtube"));
const musicStore_1 = require("@/store/musicStore");
const VolumeControl_1 = __importDefault(require("./VolumeControl"));
const link_1 = __importDefault(require("next/link"));
const spotify_1 = require("@/lib/spotify");
const MusicPlayer = () => {
    var _a, _b;
    const { currentTrack, playPrevious, playNext, isPlaying, togglePlay, queue, history, } = (0, musicStore_1.useMusicStore)();
    const playerRef = (0, react_1.useRef)(null);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [spotifyTrackId, setSpotifyTrackId] = (0, react_1.useState)(null);
    const [artistId, setArtistId] = (0, react_1.useState)(null);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const intervalRef = (0, react_1.useRef)(null);
    // When currentTrack changes, fetch Spotify data
    (0, react_1.useEffect)(() => {
        if (!currentTrack) {
            console.log("[MusicPlayer] currentTrack is null");
            return;
        }
        console.log("[MusicPlayer] currentTrack changed:", currentTrack);
        async function fetchSpotifyId() {
            var _a, _b, _c, _d;
            try {
                const query = `${(_a = currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.title) !== null && _a !== void 0 ? _a : ""} ${(_b = currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.artist) !== null && _b !== void 0 ? _b : ""}`;
                const searchResults = await (0, spotify_1.searchSpotify)({ query, limit: 1 });
                if (!searchResults || !((_d = (_c = searchResults.tracks) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.length))
                    return;
                const track = searchResults.tracks.items[0];
                setSpotifyTrackId(track.id);
                setArtistId(track.artists.length > 0 ? track.artists[0].id : null);
            }
            catch (error) {
                console.error("Error fetching Spotify track:", error);
            }
        }
        fetchSpotifyId();
    }, [currentTrack]);
    // When currentTrack changes, load the video and update mini player via IPC.
    (0, react_1.useEffect)(() => {
        if (!currentTrack)
            return;
        // Ensure playerRef.current exists
        if (!playerRef.current) {
            console.log("[MusicPlayer] Player not ready yet, delaying loadVideoById");
            return;
        }
        console.log("[MusicPlayer] Loading video with id:", currentTrack.videoId);
        playerRef.current.loadVideoById(currentTrack.videoId);
        if (window.myElectron && window.myElectron.updateTrack) {
            console.log("[MusicPlayer] Sending updateTrack IPC with", currentTrack);
            window.myElectron.updateTrack(currentTrack);
        }
    }, [currentTrack]);
    // Cleanup interval on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (window.myElectron) {
            window.myElectron.on("toggle-play", () => {
                console.log("[MusicPlayer] Received toggle-play IPC");
                handlePlayPause();
            });
            window.myElectron.on("set-volume", (newVolume) => {
                console.log("[MusicPlayer] Received set-volume IPC with", newVolume);
                if (playerRef.current) {
                    playerRef.current.setVolume(newVolume);
                    setVolume(newVolume);
                }
            });
        }
    }, [isPlaying, currentTrack, volume]);
    const handlePlayPause = () => {
        if (!playerRef.current)
            return;
        console.log("[MusicPlayer] Toggling play/pause. isPlaying:", isPlaying);
        if (isPlaying) {
            playerRef.current.pauseVideo();
        }
        else {
            playerRef.current.playVideo();
        }
        togglePlay();
    };
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    const onPlayerStateChange = (event) => {
        if (event.data === 1) {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                if (playerRef.current) {
                    const time = Math.floor(playerRef.current.getCurrentTime());
                    setCurrentTime(time);
                    console.log("[MusicPlayer] Current time:", time);
                }
            }, 500);
        }
        else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    };
    const handleVideoEnd = () => {
        var _a;
        console.log("[MusicPlayer] Video ended");
        if (queue.length > 0) {
            playNext();
        }
        else {
            (_a = playerRef.current) === null || _a === void 0 ? void 0 : _a.seekTo(0, true);
        }
    };
    const openMiniPlayer = () => {
        if (window.myElectron && currentTrack) {
            console.log("[MusicPlayer] Opening mini player with", currentTrack);
            window.myElectron.openMiniPlayer({
                title: currentTrack.title,
                artist: currentTrack.artist,
                videoId: currentTrack.videoId,
            });
        }
        else {
            console.log("[MusicPlayer] Browser fallback: opening mini player with query params");
            if (currentTrack) {
                const queryParams = new URLSearchParams({
                    title: currentTrack.title,
                    artist: currentTrack.artist,
                    videoId: currentTrack.videoId,
                });
                window.open(`/miniplayer?${queryParams.toString()}`, "Miniplayer", "width=400,height=200");
            }
            else {
                window.open("/miniplayer", "Miniplayer", "width=400,height=200");
            }
        }
    };
    return (<div className="h-[100px] bg-background fixed bottom-0 right-0 w-full items-center justify-between px-[40px] md:flex hidden z-10">
      {/* Left Side: Song Info */}
      <div className="flex gap-[20px] items-center">
        {(currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.albumCover) ? (<div className="w-[56px] h-[56px]">
            <image_1.default src={currentTrack.albumCover} alt={(_a = currentTrack.title) !== null && _a !== void 0 ? _a : ""} width={56} height={56} className="rounded"/>
          </div>) : (<div className="w-[56px] h-[56px] bg-[#3a3847] opacity-0"/>)}
        <div className="flex flex-col justify-center">
          {currentTrack && (<link_1.default href={`/track/${spotifyTrackId || "unknown"}`} className="text-white font-semibold text-[20px] hover:underline cursor-pointer truncate max-w-[200px]">
              {currentTrack.title}
            </link_1.default>)}
          {currentTrack && (<link_1.default href={`/artist/${artistId || "unknown"}`} className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer truncate max-w-[200px]">
              {currentTrack.artist}
            </link_1.default>)}
        </div>
      </div>

      {/* Middle: Playback Controls */}
      <div className="flex flex-col w-[50%] gap-[4px] absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-[28px] self-center">
          <image_1.default src="/icons/prevsong.svg" alt="prev song" width={24} height={24} className={`w-auto h-auto ${history.length > 0
            ? "opacity-100 hover:opacity-80 cursor-pointer"
            : "opacity-50 hover:opacity-40 cursor-not-allowed"}`} onClick={playPrevious}/>
          <image_1.default src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"} alt={isPlaying ? "pause song" : "play song"} width={36} height={36} onClick={handlePlayPause} className={`${history.length === 0 && queue.length === 0 && !currentTrack
            ? "opacity-50 hover:opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:opacity-80"}`}/>
          <image_1.default src="/icons/nextsong.svg" alt="next song" width={24} height={24} className={`w-auto h-auto ${queue.length === 0
            ? "opacity-50 hover:opacity-40 cursor-not-allowed"
            : "opacity-100 hover:opacity-80 cursor-pointer"}`} onClick={playNext}/>
        </div>
        <div className="flex items-center justify-center gap-4">
          <p className="text-sm text-gray-400 text-nowrap">
            {currentTrack ? formatDuration(currentTime) : "-:--"}
          </p>
          <div className={`relative w-[80%] h-[4px] bg-[#2A2A2A] rounded-full ${!currentTrack ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={(e) => {
            var _a;
            if (!playerRef.current || !currentTrack)
                return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * ((_a = currentTrack.duration) !== null && _a !== void 0 ? _a : 0);
            playerRef.current.seekTo(newTime, true);
            setCurrentTime(newTime);
        }}>
            <div className="absolute h-full bg-primary rounded-full" style={{
            width: `${currentTrack && currentTrack.duration
                ? (currentTime / currentTrack.duration) * 100
                : 0}%`,
        }}></div>
          </div>
          <p className="text-sm text-gray-400 text-nowrap">
            {currentTrack ? formatDuration((_b = currentTrack.duration) !== null && _b !== void 0 ? _b : 0) : "-:--"}
          </p>
        </div>
      </div>

      {/* Right Side: Extra Controls */}
      <div className="flex gap-[20px]">
        <image_1.default src="/icons/loop.svg" alt="loop song" width={16} height={16} className="cursor-not-allowed opacity-40"/>
        <VolumeControl_1.default volume={volume} setVolume={setVolume} playerRef={playerRef} currentVideoId={currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.videoId}/>
        <image_1.default src="/icons/miniplayer.svg" alt="miniplayer" width={24} height={24} className="cursor-pointer hover:opacity-80" onClick={openMiniPlayer}/>
      </div>

      {/* Hidden YouTube Player */}
      {currentTrack && (<div className="hidden">
          <react_youtube_1.default videoId={currentTrack.videoId} opts={{
                height: "0",
                width: "0",
                playerVars: { autoplay: 1, controls: 0, rel: 0, showinfo: 0 },
            }} onReady={(event) => {
                console.log("[MusicPlayer] YouTube player ready");
                playerRef.current = event.target;
                event.target.setVolume(volume);
                console.log("[MusicPlayer] Setting volume to", volume);
                event.target.playVideo();
            }} onStateChange={onPlayerStateChange} onEnd={handleVideoEnd}/>
        </div>)}
    </div>);
};
exports.default = MusicPlayer;
