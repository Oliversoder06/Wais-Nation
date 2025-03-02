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
const link_1 = __importDefault(require("next/link"));
const RecentlyPlayedCard_1 = __importDefault(require("./RecentlyPlayedCard"));
const musicStore_1 = require("@/store/musicStore");
const spotify_1 = require("@/lib/spotify");
async function searchArtists({ query, limit, }) {
    try {
        const token = await (0, spotify_1.getSpotifyToken)();
        const response = await fetch(`https://api.spotify.com/v1/search?offset=0&limit=${limit}&q=${encodeURIComponent(query)}&type=artist`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to search artists: ${errorText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error searching artists:", error);
        return null;
    }
}
const RecentlyPlayed = () => {
    const { history } = (0, musicStore_1.useMusicStore)();
    const [artists, setArtists] = (0, react_1.useState)([]);
    // Memoized unique artist names to avoid re-computation
    const uniqueArtistNames = (0, react_1.useMemo)(() => Array.from(new Set(history.map((track) => track.artist))), [history]);
    (0, react_1.useEffect)(() => {
        const fetchArtists = async () => {
            if (uniqueArtistNames.length === 0)
                return;
            const promises = uniqueArtistNames.map(async (artistName) => {
                const response = await searchArtists({ query: artistName, limit: 1 });
                if (response && response.artists.items.length > 0) {
                    const artistData = response.artists.items[0];
                    return {
                        id: artistData.id,
                        name: artistData.name,
                        image: artistData.images && artistData.images.length > 0
                            ? artistData.images[0].url
                            : "/default-artist.jpg",
                    };
                }
                return null;
            });
            const results = await Promise.all(promises);
            const validArtists = results.filter((artist) => artist !== null);
            setArtists(validArtists.slice(0, 6));
        };
        fetchArtists();
    }, [uniqueArtistNames]); // Depend on `uniqueArtistNames` directly
    return (<div className="flex flex-wrap md:gap-4 gap-[8px] max-w-[1000px] justify-center">
      {artists.map((artist) => (<link_1.default key={artist.id} href={`/artist/${artist.id}`}>
          <RecentlyPlayedCard_1.default id={artist.id} name={artist.name} image={artist.image}/>
        </link_1.default>))}
    </div>);
};
exports.default = RecentlyPlayed;
