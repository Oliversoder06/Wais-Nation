"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// RecentlyPlayedCard.tsx
const image_1 = __importDefault(require("next/image"));
const RecentlyPlayedCard = ({ name, image, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "md:w-[250px] h-[60px] w-[48%] bg-container hover:bg-hover_container cursor-pointer flex items-center md:gap-[16px] gap-[8px] rounded-[4px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-[60px] h-[60px] bg-card_item rounded-[4px] overflow-hidden", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: name, width: 24, height: 24, className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white font-semibold md:text-[16px] text-[14px]", children: name })] }));
};
exports.default = RecentlyPlayedCard;
