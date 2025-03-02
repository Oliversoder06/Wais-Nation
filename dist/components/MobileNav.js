"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const MobileNav = () => {
    const pathname = (0, navigation_1.usePathname)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-secondary h-[100px] w-full fixed bottom-0 flex items-center justify-between px-[32px] z-[110]", children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: "/", className: "flex flex-col gap-[8px] items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: pathname === "/"
                            ? "/icons/mobile/mobile-home-active.svg"
                            : "/icons/mobile/mobile-home.svg", alt: "home", width: 28, height: 28 }), (0, jsx_runtime_1.jsx)("span", { className: `${pathname === "/" ? "text-white" : "text-[#ABAAB8]"} text-[12px]`, children: "Home" })] }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/search", className: "flex flex-col gap-[8px] items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: pathname === "/search"
                            ? "/icons/mobile/mobile-search-active.svg"
                            : "/icons/mobile/mobile-search.svg", alt: "library", width: 28, height: 28 }), (0, jsx_runtime_1.jsx)("span", { className: `${pathname === "/search" ? "text-white" : "text-[#ABAAB8]"} text-[12px]`, children: "Search" })] }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/collections/playlists", className: "flex flex-col gap-[8px] items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: pathname === "/collections/playlists"
                            ? "/icons/mobile/mobile-library-active.svg"
                            : "/icons/mobile/mobile-library.svg", alt: "library", width: 28, height: 28 }), (0, jsx_runtime_1.jsx)("span", { className: `${pathname === "/collections/playlists"
                            ? "text-white"
                            : "text-[#ABAAB8]"} text-[12px]`, children: "Library" })] }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/collections/liked", className: "flex flex-col gap-[8px] items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: pathname === "/collections/liked"
                            ? "/icons/mobile/mobile-liked-active.svg"
                            : "/icons/mobile/mobile-liked.svg", alt: "liked", width: 28, height: 28 }), (0, jsx_runtime_1.jsx)("span", { className: `${pathname === "/collections/playlists"
                            ? "text-white"
                            : "text-[#ABAAB8]"} text-[12px]`, children: "Liked" })] })] }));
};
exports.default = MobileNav;
