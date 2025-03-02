"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_youtube_1 = __importDefault(require("react-youtube"));
const musicStore_1 = require("@/store/musicStore");
const VolumeControl_1 = __importDefault(require("./VolumeControl"));
const spotify_1 = require("@/lib/spotify");
var YouTubePlayerState;
(function (YouTubePlayerState) {
    YouTubePlayerState[YouTubePlayerState["UNSTARTED"] = -1] = "UNSTARTED";
    YouTubePlayerState[YouTubePlayerState["ENDED"] = 0] = "ENDED";
    YouTubePlayerState[YouTubePlayerState["PLAYING"] = 1] = "PLAYING";
    YouTubePlayerState[YouTubePlayerState["PAUSED"] = 2] = "PAUSED";
    YouTubePlayerState[YouTubePlayerState["BUFFERING"] = 3] = "BUFFERING";
    YouTubePlayerState[YouTubePlayerState["CUED"] = 5] = "CUED";
})(YouTubePlayerState || (YouTubePlayerState = {}));
const playerRef = (0, react_1.useRef)(null);
const MusicPlayer = () => {
    const { currentTrack, playPrevious, playNext, isPlaying, togglePlay, queue, history, } = (0, musicStore_1.useMusicStore)();
    const playerRef = (0, react_1.useRef)(null);
    const [volume, setVolume] = (0, react_1.useState)(50);
    const [spotifyTrackId, setSpotifyTrackId] = (0, react_1.useState)(null);
    const [artistId, setArtistId] = (0, react_1.useState)(null);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const intervalRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!currentTrack)
            return;
        let timeoutId;
        const loadVideoWhenReady = () => {
            if (playerRef.current) {
                const iframe = playerRef.current.getIframe();
                if (iframe && iframe.src) {
                    console.log("Loading video:", currentTrack.videoId);
                    playerRef.current.loadVideoById(currentTrack.videoId);
                    return;
                }
            }
            timeoutId = setTimeout(loadVideoWhenReady, 100);
        };
        loadVideoWhenReady();
        return () => clearTimeout(timeoutId);
    }, [currentTrack]);
    (0, react_1.useEffect)(() => {
        async function fetchSpotifyId() {
            if (currentTrack) {
                try {
                    const query = `${currentTrack.title} ${currentTrack.artist}`;
                    const searchResults = await (0, spotify_1.searchSpotify)({ query, limit: 1 });
                    if (searchResults &&
                        searchResults.tracks.items &&
                        searchResults.tracks.items.length > 0) {
                        const spotifyTrack = searchResults.tracks.items[0];
                        setSpotifyTrackId(spotifyTrack.id);
                        if (spotifyTrack.artists && spotifyTrack.artists.length > 0) {
                            setArtistId(spotifyTrack.artists[0].id);
                        }
                        else {
                            setArtistId(null);
                        }
                    }
                    else {
                        setSpotifyTrackId(null);
                        setArtistId(null);
                    }
                }
                catch (error) {
                    console.error("Error fetching Spotify track/artist ID:", error);
                    setSpotifyTrackId(null);
                    setArtistId(null);
                }
            }
        }
        fetchSpotifyId();
    }, [currentTrack]);
    const handlePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            }
            else {
                playerRef.current.playVideo();
            }
            togglePlay();
        }
    };
    (0, react_1.useEffect)(() => {
        setCurrentTime(0);
    }, [currentTrack]);
    const onPlayerStateChange = (event) => {
        if (event.data === YouTubePlayerState.PLAYING) {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                if (playerRef.current) {
                    const time = Math.floor(playerRef.current.getCurrentTime());
                    setCurrentTime(time);
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
    (0, react_1.useEffect)(() => {
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, []);
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    const handleVideoEnd = () => {
        var _a, _b;
        if (queue.length > 0) {
            playNext();
        }
        else if (currentTrack) {
            (_a = playerRef.current) === null || _a === void 0 ? void 0 : _a.seekTo(0, true);
            (_b = playerRef.current) === null || _b === void 0 ? void 0 : _b.playVideo();
        }
    };
    const openMiniPlayer = () => {
        if (window.electron) {
            window.electron.openMiniPlayer();
        }
        else {
            window.open("/miniplayer", "Miniplayer", "width=300,height=150,top=50,left=50,resizable=yes");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-[100px] bg-background fixed bottom-0 right-0 w-full items-center justify-between px-[40px] md:flex hidden z-10", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[20px]", children: [(0, jsx_runtime_1.jsx)(VolumeControl_1.default, { volume: volume, setVolume: setVolume, playerRef: playerRef, currentVideoId: currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.videoId }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/miniplayer.svg", alt: "miniplayer", width: 24, height: 24, className: "cursor-pointer hover:opacity-80", onClick: openMiniPlayer })] }), currentTrack && ((0, jsx_runtime_1.jsx)("div", { className: "hidden", children: (0, jsx_runtime_1.jsx)(react_youtube_1.default, { videoId: currentTrack.videoId, opts: {
                        height: "0",
                        width: "0",
                        playerVars: { autoplay: 1, controls: 0, rel: 0, showinfo: 0 },
                    }, onReady: (event) => {
                        playerRef.current = event.target;
                        event.target.setVolume(volume);
                        console.log("YouTube Player Ready! Volume set to", volume);
                        event.target.playVideo();
                    }, onStateChange: onPlayerStateChange, onEnd: handleVideoEnd }) }))] }));
};
exports.default = MusicPlayer;
