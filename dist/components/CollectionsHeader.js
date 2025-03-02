"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const CollectionsHeader = ({ gradient, image, text, type, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: `h-[calc(20vh)] bg-gradient-to-t ${gradient} flex flex-col md:flex-row md:justify-center items-center md:gap-[40px] gap-[32px] pt-8`, children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: `/icons/${image}Page.svg`, alt: "heart", width: 150, height: 150, className: "size-[150px] md:size-[150px] rounded-[24px]" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center gap-[16px]", children: [(0, jsx_runtime_1.jsx)("h1", { className: `text-white font-black md:text-[48px] text-4xl w-[438px]`, children: text }), (0, jsx_runtime_1.jsx)("h1", { className: "text-[#ABAABB] font-medium", children: type })] })] }) }));
};
exports.default = CollectionsHeader;
