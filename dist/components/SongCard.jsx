"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SongCard = () => {
    return (<div className="flex flex-col gap-2 hover:bg-container p-[14px] rounded-[12px] select-none cursor-pointer">
      <div className="size-[160px] bg-card_item rounded-[4px]"/>
      <div className="flex flex-col leading-[24px]">
        <span className="text-white text-[20px] font-semibold">sEXY</span>
        <span className="text-[#ABAAB8] md:text-[16px] text-[14px] font-medium">
          Wais Music
        </span>
      </div>
    </div>);
};
exports.default = SongCard;
