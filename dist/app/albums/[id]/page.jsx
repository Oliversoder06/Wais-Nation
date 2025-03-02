"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlbumPage;
const navigation_1 = require("next/navigation");
const spotify_1 = require("@/lib/spotify");
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
const LongSongCard_1 = __importDefault(require("@/components/LongSongCard"));
const link_1 = __importDefault(require("next/link"));
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
async function AlbumPage({ params }) {
    var _a, _b;
    const { id } = await params;
    const album = await (0, spotify_1.getAlbumDetails)(id);
    if (!album) {
        (0, navigation_1.notFound)();
    }
    // Get the artists id so we can put a link to their page
    const artistId = album.artists[0].id;
    return (<div className="bg-secondary text-white min-h-screen">
      {/* Album Header */}
      <div className="flex items-end p-8 bg-gradient-to-t from-secondary to-container">
        <image_1.default src={(_b = (_a = album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url} alt={album.name} width={256} height={256} className="w-48 h-48 object-cover mr-8 rounded-lg"/>
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold">{album.name}</h1>
          <div className="flex">
            <p className="mt-2 text-gray-300 hover:underline">
              <link_1.default href={`/artist/${artistId}`}>{album.artists[0].name}</link_1.default>
            </p>
          </div>
          <p className="text-gray-400">
            {album.release_date} • {album.total_tracks} songs
          </p>
        </div>
      </div>

      {/* Tracks List */}
      <div className="p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end">
            <span className="w-[48px] h-[48px]"/>
            <span className="text-nit font-semibold">Title</span>
            <span className="text-nit font-semibold">Album</span>
            <span className="text-nit font-semibold">Released</span>
            <span className="text-nit font-semibold text-right">Duration</span>
          </div>
          <div className="w-full h-[1px] bg-[#2e2e2e]"/>
        </div>
        <div className="flex flex-col">
          {album.tracks.items.map((track) => {
            var _a, _b, _c, _d, _e;
            return (<LongSongCard_1.default key={track.id} title={track.name} artist={track.artists.map((artist) => artist.name).join(", ")} album={album.name} date={album.release_date || "Unknown"} duration={formatDuration(track.duration_ms)} cover={((_c = (_b = (_a = track.album) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.url) || ((_e = (_d = album.images) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.url)}/>);
        })}
        </div>
      </div>
    </div>);
}
