"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RecentlyPlayed_1 = __importDefault(require("@/components/RecentlyPlayed"));
const SongCardSection_1 = __importDefault(require("@/components/SongCardSection"));
const Homepage = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "md:mx-[40px] mx-[12px] flex flex-col gap-16 mt-[40px] md:pb-[50px] pb-[100px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center w-full", children: (0, jsx_runtime_1.jsx)(RecentlyPlayed_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white font-semibold text-[24px] pl-[14px]", children: "Recommended" }), (0, jsx_runtime_1.jsx)(SongCardSection_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white font-semibold text-[24px] pl-[14px]", children: "Recommended" }), (0, jsx_runtime_1.jsx)(SongCardSection_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white font-semibold text-[24px] pl-[14px]", children: "Recommended" }), (0, jsx_runtime_1.jsx)(SongCardSection_1.default, {})] })] }));
};
exports.default = Homepage;
