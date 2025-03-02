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
const react_1 = __importStar(require("react"));
const CollectionsHeader_1 = __importDefault(require("@/components/CollectionsHeader"));
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const image_1 = __importDefault(require("next/image"));
const supabase_1 = require("@/lib/supabase");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const nextjs_1 = require("@clerk/nextjs");
function useLikedSongs() {
    const { userId } = (0, nextjs_1.useAuth)();
    const [likedSongs, setLikedSongs] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!userId)
            return;
        async function fetchLikedSongs() {
            setLoading(true);
            const { data, error } = await supabase_1.supabase
                .from("liked_songs")
                .select("*")
                .eq("user_id", userId)
                .order("added_at", { ascending: false });
            if (error) {
                react_hot_toast_1.default.error("Error fetching liked songs");
            }
            else {
                setLikedSongs(data || []);
            }
            setLoading(false);
        }
        fetchLikedSongs();
    }, [userId]);
    return { likedSongs, loading };
}
// Utility function to format ISO timestamp into a user-friendly string
function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}
// Utility function to convert duration (seconds) to "mm:ss"
function formatDuration(durationInSeconds) {
    const seconds = parseInt(durationInSeconds, 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
const Liked = () => {
    const { likedSongs, loading } = useLikedSongs();
    const amount = likedSongs.length;
    return (<div>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-8 md:pb-[50px]">
        <div className="relative">
          <CollectionsHeader_1.default gradient="from-secondary to-[#0E3B2D]" image="LikedTracks" text="Liked Songs" type={`${amount} Songs`}/>
          <image_1.default src="/icons/play.svg" alt="play" width={48} height={48} className="absolute top-1/2 right-[40px]"/>
        </div>

        <div className="flex flex-col gap-4 mx-[12px] md:mx-[40px]">
          <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end">
            <span className="w-[48px] h-[48px]"/>
            <span className="text-nit font-semibold">Title</span>
            <span className="text-nit font-semibold">Album</span>
            <span className="text-nit font-semibold">Date added</span>
            <span className="text-nit font-semibold text-right">Duration</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-full h-[1px] bg-[#2e2e2e]"/>

          <div>
            {loading ? (<p className="text-white">Loading liked songs...</p>) : amount === 0 ? (<p className="text-[#ABAABB] text-lg text-center mt-[40px]">
                No liked songs found.
              </p>) : (likedSongs.map((song) => (<LongSongCard_1.default key={song.id} title={song.title} artist={song.artist} album={song.album || "Album"} date={formatDate(song.added_at)} duration={formatDuration(song.duration)} cover={song.cover}/>)))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden px-[16px] bg-gradient-to-t from-secondary to-[#005E38] h-[150px] gap-16">
        <div className="flex justify-between w-full items-center mt-[48px]">
          <div className="flex flex-col">
            <span className="font-bold text-white text-[24px]">
              Liked Songs
            </span>
            <span className="text-nit">
              {amount} {amount === 1 ? "song" : "songs"}
            </span>
          </div>
          <image_1.default src="/icons/play.svg" alt="play" width={48} height={48}/>
        </div>
        <div className="flex flex-col  pb-[100px]">
          {loading ? (<p className="text-white">Loading...</p>) : amount === 0 ? (<p className="text-[#ABAABB] text-lg text-center">
              No liked songs found.
            </p>) : (likedSongs.map((song) => (<LongSongCard_1.default key={song.id} title={song.title} artist={song.artist} album={song.album || "Album"} date={formatDate(song.added_at)} duration={formatDuration(song.duration)} cover={song.cover}/>)))}
        </div>
      </div>
    </div>);
};
exports.default = Liked;
