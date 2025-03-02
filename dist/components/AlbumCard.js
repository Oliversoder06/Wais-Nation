"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const link_1 = __importDefault(require("next/link"));
const AlbumCard = ({ albumCover, albumTitle, artistName, id, }) => {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/albums/${id}`, passHref: true, children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), className: "max-w-[240px] rounded-lg hover:bg-container transition p-4 select-none", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: albumCover, alt: albumTitle, width: 192, height: 192, className: "size-52 object-cover rounded-lg" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0.8 }, animate: { opacity: isHovered ? 0 : 0.8 }, transition: { duration: 0.2 }, className: "absolute inset-0 bg-gradient-to-t from-black rounded-lg" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold text-white", children: albumTitle }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-300", children: artistName })] })] }) }));
};
exports.default = AlbumCard;
