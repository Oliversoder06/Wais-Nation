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
const musicStore_1 = require("@/store/musicStore");
const spotify_1 = require("@/lib/spotify");
const supabase_1 = require("@/lib/supabase");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const nextjs_1 = require("@clerk/nextjs");
const Sideplayer = () => {
    var _a, _b;
    const { currentTrack } = (0, musicStore_1.useMusicStore)();
    const { userId } = (0, nextjs_1.useAuth)();
    const [isLiked, setIsLiked] = (0, react_1.useState)(false);
    const [open, setOpen] = (0, react_1.useState)(false);
    const [artistId, setArtistId] = (0, react_1.useState)(null);
    const [artistDetails, setArtistDetails] = (0, react_1.useState)(null);
    // Check if the current track is already liked
    (0, react_1.useEffect)(() => {
        async function checkLiked() {
            if (currentTrack && userId) {
                const { data, error } = await supabase_1.supabase
                    .from("liked_songs")
                    .select("*")
                    .eq("user_id", userId)
                    .eq("title", currentTrack.title)
                    .eq("artist", currentTrack.artist)
                    .maybeSingle();
                if (!error && data) {
                    setIsLiked(true);
                }
                else {
                    setIsLiked(false);
                }
            }
        }
        checkLiked();
    }, [currentTrack, userId]);
    const handleLike = async (e) => {
        e.stopPropagation();
        if (!userId) {
            react_hot_toast_1.default.error("Please sign in to like songs");
            return;
        }
        if (!currentTrack)
            return;
        if (isLiked) {
            // Remove the liked song from the table
            const { error } = await supabase_1.supabase.from("liked_songs").delete().match({
                user_id: userId,
                title: currentTrack.title,
                artist: currentTrack.artist,
            });
            if (error) {
                react_hot_toast_1.default.error("Error unliking song");
            }
            else {
                react_hot_toast_1.default.success("Song unliked");
                setIsLiked(false);
            }
        }
        else {
            // Insert the liked song into the table
            const { error } = await supabase_1.supabase.from("liked_songs").insert({
                user_id: userId,
                title: currentTrack.title,
                artist: currentTrack.artist,
                album: currentTrack.album, // if available
                duration: currentTrack.duration, // if available
                cover: currentTrack.albumCover,
                added_at: new Date().toISOString(),
            });
            if (error) {
                react_hot_toast_1.default.error("Error liking song");
            }
            else {
                react_hot_toast_1.default.success("Song liked!");
                setIsLiked(true);
            }
        }
    };
    const handleOpen = () => {
        setOpen(!open);
    };
    (0, react_1.useEffect)(() => {
        async function fetchSpotifyData() {
            if (currentTrack) {
                try {
                    const query = `${currentTrack.title} ${currentTrack.artist}`;
                    const searchResults = await (0, spotify_1.searchSpotify)({ query, limit: 1 });
                    if (searchResults &&
                        searchResults.tracks.items &&
                        searchResults.tracks.items.length > 0) {
                        const spotifyTrack = searchResults.tracks.items[0];
                        if (spotifyTrack.artists && spotifyTrack.artists.length > 0) {
                            setArtistId(spotifyTrack.artists[0].id);
                        }
                        else {
                            setArtistId(null);
                        }
                    }
                    else {
                        setArtistId(null);
                    }
                }
                catch (error) {
                    console.error("Error fetching Spotify track/artist ID:", error);
                    setArtistId(null);
                }
            }
        }
        fetchSpotifyData();
    }, [currentTrack]);
    (0, react_1.useEffect)(() => {
        async function fetchArtistData() {
            if (artistId) {
                try {
                    const details = await (0, spotify_1.getArtistDetails)(artistId);
                    setArtistDetails(details);
                }
                catch (error) {
                    console.error("Error fetching artist details:", error);
                    setArtistDetails(null);
                }
            }
        }
        fetchArtistData();
    }, [artistId]);
    const albumCover = (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.albumCover) || "";
    const songTitle = (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.title) || "No Title";
    const artistName = (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.artist) || "No Artist";
    const artistPfp = (_b = (_a = artistDetails === null || artistDetails === void 0 ? void 0 : artistDetails.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    const containerStyle = albumCover
        ? {
            backgroundImage: `url(${albumCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : {};
    return (<div className=" ">
      <image_1.default src="/icons/open-sidebar.svg" alt="open sidebar" width={40} height={40} className="cursor-pointer fixed right-0 top-8 m-[20px] z-[50] hidden md:block xl:hidden" onClick={handleOpen}/>
      {/* Mobile/Open Sidebar */}
      <div>
        {open && (<div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[80]" onClick={handleOpen}></div>
            <div className="w-[300px] right-0 h-[calc(100vh-148px)] flex flex-col justify-end p-[20px] gap-[20px] z-[80] fixed rounded-bl-lg" style={containerStyle}>
              <div className="absolute inset-0 bg-secondary opacity-[0.90]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col leading-[32px]">
                  <span className="text-white font-bold text-[24px]">
                    {songTitle}
                  </span>
                  <span className="text-[#ABAABB] font-medium">
                    {artistName}
                  </span>
                </div>
                <image_1.default src={isLiked ? "/icons/Heart.svg" : "/icons/emptyheart.svg"} alt="like button" width={28} height={28} onClick={handleLike} className="cursor-pointer hover:opacity-80 relative z-10"/>
              </div>

              <div className="relative z-10 mx-auto">
                {artistPfp && (<image_1.default src={artistPfp} alt="Artist Profile" width={280} height={280} className="object-cover rounded-lg"/>)}
              </div>
            </div>
          </div>)}
      </div>

      {/* Desktop Sidebar */}
      <div className="w-[364px] fixed right-0 h-[calc(100vh-100px)] xl:flex flex-col top-0 justify-end p-[20px] gap-[20px] hidden rounded-l-lg" style={containerStyle}>
        <div className="absolute inset-0 bg-secondary opacity-[0.90] rounded-l-[6px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col leading-[32px]">
            <span className="text-white font-bold text-[24px]">
              {songTitle}
            </span>
            <span className="text-[#ABAABB] font-medium">{artistName}</span>
          </div>
          <image_1.default src={isLiked ? "/icons/Heart.svg" : "/icons/emptyheart.svg"} alt="like button" width={28} height={28} onClick={handleLike} className="cursor-pointer hover:opacity-80 relative z-10"/>
        </div>
        <div className="relative z-10 mx-auto">
          {artistPfp && (<image_1.default src={artistPfp} alt="Artist Profile" width={280} height={280} className="object-cover rounded-lg"/>)}
        </div>
      </div>
    </div>);
};
exports.default = Sideplayer;
