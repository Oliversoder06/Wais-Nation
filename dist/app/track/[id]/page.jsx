"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrackPage;
const spotify_1 = require("@/lib/spotify");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const image_1 = __importDefault(require("next/image"));
function TrackPage({ params }) {
    var _a, _b, _c, _d, _e, _f;
    const { id: trackId } = (0, react_1.use)(params);
    const [track, setTrack] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchTrack = async () => {
            const data = (await (0, spotify_1.getTrackDetails)(trackId));
            if (!data)
                return (0, navigation_1.notFound)();
            setTrack(data);
        };
        fetchTrack();
    }, [trackId]);
    function formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    if (!track)
        return <div className="loader flex justify-self-center"/>;
    return (<div className="flex flex-col gap-8">
      <div className="h-[calc(30vh)] min-h-[300px] relative">
        <div className="absolute inset-0 bg-cover bg-center track-bg" style={{
            backgroundImage: `url(${((_b = (_a = track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || "/images/Playlist.svg"})`,
        }}/>
        <div className="relative flex justify-center items-center md:gap-[64px] gap-[32px] h-full">
          <div className="md:size-[248px] size-[200px] rounded-[24px] flex items-center justify-center">
            <image_1.default src={((_d = (_c = track.album.images) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.url) || "/images/Playlist.svg"} alt="album cover" width={300} height={300} className="rounded"/>
          </div>
          <div className="flex flex-col justify-center gap-[8px] text-white">
            <h1 title={track.name} className="font-black text-[32px] md:text-[48px] max-w-[900px] overflow-hidden text-ellipsis">
              {track.name}
            </h1>
            <h1 title={track.name} className="text-[#ABAABB] md:text-[20px] font-medium">
              {track.artists.map((artist) => artist.name).join(", ")}
            </h1>
          </div>
        </div>
      </div>
      <div className="md:mx-[40px] mx-[12px] flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex px-[16px]">
            <h1 className="text-nit xl:w-[35%] md:w-[50%] w-full">Tracks</h1>
            <h1 className="text-nit xl:w-[35%] md:w-[50%] hidden md:flex">
              Album
            </h1>
            <h1 className="text-nit xl:w-[20%] xl:block hidden">Released</h1>
            <h1 className="text-nit text-end xl:w-[10%]">Duration</h1>
          </div>
          <div className="w-full h-[1px] bg-[#2e2e2e]"/>
        </div>
        <LongSongCard_1.default title={track.name} artist={track.artists.map((artist) => artist.name).join(", ")} album={track.album.name} date={track.album.release_date} duration={formatDuration(track.duration_ms)} cover={((_f = (_e = track.album.images) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.url) || "/images/Playlist.svg"}/>
      </div>
    </div>);
}
