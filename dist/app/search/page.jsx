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
const spotify_1 = require("@/lib/spotify");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Page = () => {
    const [query, setQuery] = (0, react_1.useState)("");
    const [results, setResults] = (0, react_1.useState)([]);
    const [showResults, setShowResults] = (0, react_1.useState)(false);
    const searchRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (query.length > 0) {
            const debounceTimeout = setTimeout(() => {
                (async () => {
                    try {
                        const data = (await (0, spotify_1.searchSpotify)({
                            query,
                            limit: 20,
                        }));
                        setResults(data.tracks.items);
                        setShowResults(true);
                    }
                    catch (error) {
                        react_hot_toast_1.default.error(`Error during Spotify search: ${error}`);
                    }
                })();
            }, 100);
            return () => clearTimeout(debounceTimeout);
        }
        else {
            setResults([]);
            setShowResults(false);
        }
    }, [query]);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current &&
                !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, {
            passive: true,
        });
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (<div className="flex md:hidden">
      <div className="flex justify-center absolute top-8 left-0 right-0 z-[101]">
        <div className="fixed inset-0 bg-background z-[101]"></div>
        <div ref={searchRef} className="relative justify-self-center z-[101] flex md:hidden w-full px-[16px]">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Spotify tracks..." className="w-full h-[48px] bg-container rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none" onFocus={() => setShowResults(true)}/>
          <image_1.default src="/icons/searchicon.svg" alt="search" width={20} height={20} className="absolute top-[50%] left-[28px] transform translate-y-[-50%]"/>
          {showResults && results.length > 0 && (<div className="absolute top-full left-0 right-0  shadow-lg rounded mt-2 h-auto overflow-y-auto">
              {results.map((track) => {
                var _a, _b;
                return (<link_1.default href={`/track/${track.id}`} key={track.id} passHref>
                  <div className="p-2 hover:bg-[#2a2830] cursor-pointer flex items-center gap-2" onClick={() => {
                        setQuery("");
                        setShowResults(false);
                    }}>
                    <image_1.default src={((_b = (_a = track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || "/images/Playlist.svg"} alt="album cover" width={40} height={40} className="rounded"/>
                    <div>
                      <p className="font-semibold text-white">{track.name}</p>
                      <p className="text-sm text-nit">
                        {track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                      </p>
                    </div>
                  </div>
                </link_1.default>);
            })}

              <div className="w-full h-[100px]"/>
            </div>)}
        </div>
      </div>
    </div>);
};
exports.default = Page;
