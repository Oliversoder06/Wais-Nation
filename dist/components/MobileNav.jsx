"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = __importDefault(require("react"));
const MobileNav = () => {
    const pathname = (0, navigation_1.usePathname)();
    if (pathname === "/miniplayer")
        return null;
    return (<div className="bg-secondary h-[100px] w-full fixed bottom-0 flex items-center justify-between px-[32px] z-[110]">
      <link_1.default href="/" className="flex flex-col gap-[8px] items-center">
        <image_1.default src={pathname === "/"
            ? "/icons/mobile/mobile-home-active.svg"
            : "/icons/mobile/mobile-home.svg"} alt="home" width={28} height={28}/>
        <span className={`${pathname === "/" ? "text-white" : "text-[#ABAAB8]"} text-[12px]`}>
          Home
        </span>
      </link_1.default>
      <link_1.default href="/search" className="flex flex-col gap-[8px] items-center">
        <image_1.default src={pathname === "/search"
            ? "/icons/mobile/mobile-search-active.svg"
            : "/icons/mobile/mobile-search.svg"} alt="library" width={28} height={28}/>
        <span className={`${pathname === "/search" ? "text-white" : "text-[#ABAAB8]"} text-[12px]`}>
          Search
        </span>
      </link_1.default>
      <link_1.default href="/collections/playlists" className="flex flex-col gap-[8px] items-center">
        <image_1.default src={pathname === "/collections/playlists"
            ? "/icons/mobile/mobile-library-active.svg"
            : "/icons/mobile/mobile-library.svg"} alt="library" width={28} height={28}/>
        <span className={`${pathname === "/collections/playlists"
            ? "text-white"
            : "text-[#ABAAB8]"} text-[12px]`}>
          Library
        </span>
      </link_1.default>
      <link_1.default href="/collections/liked" className="flex flex-col gap-[8px] items-center">
        <image_1.default src={pathname === "/collections/liked"
            ? "/icons/mobile/mobile-liked-active.svg"
            : "/icons/mobile/mobile-liked.svg"} alt="liked" width={28} height={28}/>
        <span className={`${pathname === "/collections/playlists"
            ? "text-white"
            : "text-[#ABAAB8]"} text-[12px]`}>
          Liked
        </span>
      </link_1.default>
    </div>);
};
exports.default = MobileNav;
