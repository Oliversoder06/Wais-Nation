"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecentlyPlayed_1 = __importDefault(require("@/components/RecentlyPlayed"));
const SongCardSection_1 = __importDefault(require("@/components/SongCardSection"));
const react_1 = __importDefault(require("react"));
const Homepage = () => {
    return (<div className="md:mx-[40px] mx-[12px] flex flex-col gap-16 mt-[40px] md:pb-[50px] pb-[100px]">
      <div className="flex items-center justify-center w-full">
        <RecentlyPlayed_1.default />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection_1.default />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection_1.default />
      </div>
      <div>
        <h2 className="text-white font-semibold text-[24px] pl-[14px]">
          Recommended
        </h2>
        <SongCardSection_1.default />
      </div>
    </div>);
};
exports.default = Homepage;
