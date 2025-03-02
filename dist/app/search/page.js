"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex md:hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center absolute top-8 left-0 right-0 z-[101]", children: [(0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-background z-[101]" }), (0, jsx_runtime_1.jsxs)("div", { ref: searchRef, className: "relative justify-self-center z-[101] flex md:hidden w-full px-[16px]", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search Spotify tracks...", className: "w-full h-[48px] bg-container rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none", onFocus: () => setShowResults(true) }), (0, jsx_runtime_1.jsx)(image_1.default, { src: "/icons/searchicon.svg", alt: "search", width: 20, height: 20, className: "absolute top-[50%] left-[28px] transform translate-y-[-50%]" }), showResults && results.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-full left-0 right-0  shadow-lg rounded mt-2 h-auto overflow-y-auto", children: [results.map((track) => {
                                    var _a, _b;
                                    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/track/${track.id}`, passHref: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-2 hover:bg-[#2a2830] cursor-pointer flex items-center gap-2", onClick: () => {
                                                setQuery("");
                                                setShowResults(false);
                                            }, children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: ((_b = (_a = track.album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || "/images/Playlist.svg", alt: "album cover", width: 40, height: 40, className: "rounded" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-white", children: track.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-nit", children: track.artists
                                                                .map((artist) => artist.name)
                                                                .join(", ") })] })] }) }, track.id));
                                }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[100px]" })] }))] })] }) }));
};
exports.default = Page;
