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
    return (<div className="relative">
      {/* Left Arrow */}
      <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition">
        <solid_1.ChevronLeftIcon className="w-6 h-6 text-white"/>
      </button>

      {/* Album Cards Container */}
      <div ref={carouselRef} className="flex overflow-hidden gap-4  py-2">
        {albums.map((album) => {
            var _a, _b;
            return (<div key={album.id} className="flex-shrink-0 w-[240px]">
            <AlbumCard_1.default id={album.id} albumCover={(_b = (_a = album.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url} albumTitle={album.name} artistName={artistName}/>
          </div>);
        })}
      </div>

      {/* Right Arrow */}
      <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-[150%] z-10 p-2 bg-black/80 rounded-full hover:bg-black transition">
        <solid_1.ChevronRightIcon className="w-6 h-6 text-white"/>
      </button>
    </div>);
};
exports.default = AlbumCarousel;
