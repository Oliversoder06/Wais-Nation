"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SongCard_1 = __importDefault(require("./SongCard"));
const SongCardSection = () => {
    const amount = 10;
    return (<div>
      <div className="rounded-[12px] flex overflow-auto ">
        {[...Array(amount)].map((_, index) => (<SongCard_1.default key={index}/>))}
      </div>
    </div>);
};
exports.default = SongCardSection;
