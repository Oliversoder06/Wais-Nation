"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SongCard_1 = __importDefault(require("./SongCard"));
const SongCardSection = () => {
    const amount = 10;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-[12px] flex overflow-auto ", children: [...Array(amount)].map((_, index) => ((0, jsx_runtime_1.jsx)(SongCard_1.default, {}, index))) }) }));
};
exports.default = SongCardSection;
