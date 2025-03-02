"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
const react_1 = __importDefault(require("react"));
const AuthButtons_1 = __importDefault(require("./AuthButtons"));
const MobileHeader = () => {
    return (<div className="flex items-center justify-between  h-[60px] fixed top-0 left-0 right-0 z-[100] px-[16px]">
      <AuthButtons_1.default />
      <nextjs_1.UserButton />
    </div>);
};
exports.default = MobileHeader;
