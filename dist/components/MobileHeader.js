"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const nextjs_1 = require("@clerk/nextjs");
const AuthButtons_1 = __importDefault(require("./AuthButtons"));
const MobileHeader = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between  h-[60px] fixed top-0 left-0 right-0 z-[100] px-[16px]", children: [(0, jsx_runtime_1.jsx)(AuthButtons_1.default, {}), (0, jsx_runtime_1.jsx)(nextjs_1.UserButton, {})] }));
};
exports.default = MobileHeader;
