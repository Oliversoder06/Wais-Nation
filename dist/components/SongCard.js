"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SongCard = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 hover:bg-container p-[14px] rounded-[12px] select-none cursor-pointer", children: [(0, jsx_runtime_1.jsx)("div", { className: "size-[160px] bg-card_item rounded-[4px]" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col leading-[24px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-white text-[20px] font-semibold", children: "sEXY" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[#ABAAB8] md:text-[16px] text-[14px] font-medium", children: "Wais Music" })] })] }));
};
exports.default = SongCard;
