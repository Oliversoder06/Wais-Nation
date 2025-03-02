"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NavigationItem_1 = __importDefault(require("./NavigationItem"));
const AuthButtons_1 = __importDefault(require("./AuthButtons"));
const nextjs_1 = require("@clerk/nextjs");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const Sidebar = () => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed hidden md:flex z-[80]", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { onHoverStart: () => setIsExpanded(true), onHoverEnd: () => setIsExpanded(false), className: `h-[calc(100vh-100px)] w-[144px] bg-secondary flex items-start pl-[30px] justify-between flex-col py-[28px] rounded-br-lg transition-colors duration-300`, children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/images/Logo.svg", alt: "logo", width: 64, height: 64, className: "w-[64px] h-[26px]" }) }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { width: 0 }, animate: { width: isExpanded ? 132 : 84 }, transition: { duration: 0.3 }, className: "bg-container h-[240px] gap-[8px] rounded-[12px] flex flex-col justify-center items-start", children: [(0, jsx_runtime_1.jsx)(NavigationItem_1.default, { icon: "/icons/Home.svg", alt: "home", anchor: "/", label: "Home", isExpanded: isExpanded }), (0, jsx_runtime_1.jsx)(NavigationItem_1.default, { icon: "/icons/Heart.svg", alt: "liked", anchor: "/collections/liked", label: "Liked", isExpanded: isExpanded }), (0, jsx_runtime_1.jsx)(NavigationItem_1.default, { icon: "/icons/Playlist.svg", alt: "playlist", anchor: "/collections/playlists", label: "Library", isExpanded: isExpanded })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center gap-[16px]", children: [(0, jsx_runtime_1.jsx)(nextjs_1.UserButton, {}), (0, jsx_runtime_1.jsx)(AuthButtons_1.default, {})] })] }) }));
};
exports.default = Sidebar;
