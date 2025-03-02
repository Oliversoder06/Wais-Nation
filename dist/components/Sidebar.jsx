"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const NavigationItem_1 = __importDefault(require("./NavigationItem"));
const AuthButtons_1 = __importDefault(require("./AuthButtons"));
const nextjs_1 = require("@clerk/nextjs");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const Sidebar = () => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [isElectron, setIsElectron] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined" && window.myElectron) {
            setIsElectron(true);
        }
    }, []);
    // Set height based on whether it's Electron or not.
    const heightClass = isElectron
        ? "h-[calc(100vh-148px)]"
        : "h-[calc(100vh-100px)]";
    return (<div className="fixed hidden md:flex z-[80]">
      <framer_motion_1.motion.div onHoverStart={() => setIsExpanded(true)} onHoverEnd={() => setIsExpanded(false)} className={`${heightClass} w-[144px] bg-secondary flex items-start pl-[30px] justify-between flex-col py-[28px] rounded-r-lg transition-colors duration-300`}>
        <link_1.default href="/">
          <image_1.default src="/images/Logo.svg" alt="logo" width={64} height={64} className="w-[64px] h-[26px]"/>
        </link_1.default>
        <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: isExpanded ? 132 : 84 }} transition={{ duration: 0.3 }} className="bg-container h-[240px] gap-[8px] rounded-[12px] flex flex-col justify-center items-start">
          <NavigationItem_1.default icon="/icons/Home.svg" alt="home" anchor="/" label="Home" isExpanded={isExpanded}/>
          <NavigationItem_1.default icon="/icons/Heart.svg" alt="liked" anchor="/collections/liked" label="Liked" isExpanded={isExpanded}/>
          <NavigationItem_1.default icon="/icons/Playlist.svg" alt="playlist" anchor="/collections/playlists" label="Library" isExpanded={isExpanded}/>
        </framer_motion_1.motion.div>
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <nextjs_1.UserButton />
          <AuthButtons_1.default />
        </div>
      </framer_motion_1.motion.div>
    </div>);
};
exports.default = Sidebar;
