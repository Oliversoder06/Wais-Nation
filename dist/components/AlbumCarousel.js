"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AlbumCard_1 = __importDefault(require("@/components/AlbumCard"));
const solid_1 = require("@heroicons/react/24/solid");
const AlbumCarousel = ({ albums, artistName, }) => {
    const carouselRef = (0, react_1.useRef)(null);
    const scrollLeft = () => {
        var _a;
        (_a = carouselRef.current) === null || _a === void 0 ? void 0 : _a.scrollBy({ left: -900, behavior: "smooth" });
    };
    const scrollRight = () => {
        var _a;
        (_a = carouselRef.current) === null || _a === void 0 ? void 0 : _a.scrollBy({ left: 900, behavior: "smooth" });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("button", { onClick: scrollLeft, className: "absolute left-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition", children: (0, jsx_runtime_1.jsx)(solid_1.ChevronLeftIcon, { className: "w-6 h-6 text-white" }) }), (0, jsx_runtime_1.jsx)("div", { ref: carouselRef, className: "flex overflow-hidden gap-4  py-2", children: albums.map((album) => {
                    var _a, _b;
                    return ((0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-[240px]", children: (0, jsx_runtime_1.jsx)(AlbumCard_1.default, { id: album.id, albumCover: (_b = (_a = album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url, albumTitle: album.name, artistName: artistName }) }, album.id));
                }) }), (0, jsx_runtime_1.jsx)("button", { onClick: scrollRight, className: "absolute right-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition", children: (0, jsx_runtime_1.jsx)(solid_1.ChevronRightIcon, { className: "w-6 h-6 text-white" }) })] }));
};
exports.default = AlbumCarousel;
