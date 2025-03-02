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
const framer_motion_1 = require("framer-motion");
const NavigationItem = ({ icon, anchor, alt, label, isExpanded, }) => {
    const pathname = (0, navigation_1.usePathname)();
    const isActive = pathname === anchor;
    return ((0, jsx_runtime_1.jsxs)(link_1.default, { className: "flex items-center", href: anchor || "#", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex justify-center items-center w-[84px]", children: [isActive && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, scaleY: 0 }, animate: { opacity: 1, scaleY: 1 }, transition: { duration: 0.3, ease: "easeOut" }, className: "absolute left-0 w-[3px] h-[24px] bg-primary rounded-tr-[2px] rounded-br-[2px] origin-top" })), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, ease: "easeOut" }, className: `cursor-pointer w-[52px] h-[52px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${isActive
                            ? "bg-gradient-to-br from-primary to-[#026F69]" // Active Gradient
                            : "hover:bg-[#2A2932]" // Hover Effect
                        }`, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: icon, alt: `${alt} icon`, width: 28, height: 28 }) })] }), (0, jsx_runtime_1.jsx)("span", { className: `absolute select-none text-xs  px-2 py-1 rounded-full transition-all duration-300 ${isExpanded
                    ? isActive
                        ? "text-primary font-bold left-[100px]"
                        : "text-white opacity-60 left-[90px]"
                    : "hidden"}`, children: label })] }));
};
exports.default = NavigationItem;
