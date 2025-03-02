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
const framer_motion_1 = require("framer-motion");
const link_1 = __importDefault(require("next/link"));
const AlbumCard = ({ albumCover, albumTitle, artistName, id, }) => {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    return (<link_1.default href={`/albums/${id}`} passHref>
      <framer_motion_1.motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="max-w-[240px] rounded-lg hover:bg-container transition p-4 select-none">
        <div className="relative">
          <image_1.default src={albumCover} alt={albumTitle} width={192} height={192} className="size-52 object-cover rounded-lg"/>
          <framer_motion_1.motion.div initial={{ opacity: 0.8 }} animate={{ opacity: isHovered ? 0 : 0.8 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-gradient-to-t from-black rounded-lg"></framer_motion_1.motion.div>
        </div>
        <div className="pt-2">
          <h2 className="text-lg font-bold text-white">{albumTitle}</h2>
          <p className="text-sm text-gray-300">{artistName}</p>
        </div>
      </framer_motion_1.motion.div>
    </link_1.default>);
};
exports.default = AlbumCard;
