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
const framer_motion_1 = require("framer-motion");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const playlists_1 = require("@/lib/playlists");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const LongPlaylistCard = ({ id, name, description, owner, onDelete, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const menuRef = (0, react_1.useRef)(null);
    const [isDeleting, setIsDeleting] = (0, react_1.useState)(false);
    const handleDelete = async () => {
        if (!id) {
            react_hot_toast_1.default.error("Playlist ID is missing, try refreshing the page");
            return;
        }
        setIsDeleting(true);
    };
    return (<div className="relative w-full">
      <link_1.default href={id ? `/collections/playlists/${id}` : "#"} className="md:bg-container md:hover:bg-hover_container cursor-pointer w-full h-auto md:h-[120px] rounded-[8px] flex items-center justify-between  pr-[32px] ">
        <div className="flex md:gap-4 gap-2 items-center">
          {/* Playlist Image Placeholder */}
          <image_1.default src="/images/Playlist.svg" alt="Playlist Image" width={104} height={104} unoptimized={true} className="md:w-[104px] md:h-[104px] w-[64px] h-[64px]"/>

          {/* Playlist Info */}
          <div className="flex flex-col leading-5 md:leading-[24px] w-full max-w-[calc(100vw-100px)] md:w-[calc(100vw-400px)] xl:w-[calc(100vw-800px)]">
            <span className="text-white text-[16px] md:text-[20px] font-semibold truncate">
              {name}
            </span>
            <div>
              <span className="text-[#ABAAB8] text-[14px] md:text-[16px] hover:underline truncate">
                {owner}
              </span>
            </div>
            <span className="text-[#6E6D78] text-[12px] md:text-[14px] block truncate">
              {description || "No description available"}
            </span>
          </div>
        </div>
      </link_1.default>

      {/* Clickable Dots Menu (Outside Link) */}
      <div ref={menuRef} role="button" tabIndex={0} onClick={() => {
            setIsOpen(!isOpen);
        }} className="absolute top-1/2 right-6 transform -translate-y-1/2 items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10 hidden md:flex">
        {/* Animated 3-Dots (Morphs into Menu) */}
        <framer_motion_1.motion.div initial={false} animate={isOpen ? "open" : "closed"} className="flex gap-[4px]">
          <framer_motion_1.motion.span className="w-[6px] h-[6px] bg-white rounded-full" variants={{
            closed: { x: 0, rotate: 0 },
            open: { x: 0 },
        }} transition={{ duration: 0.3, ease: "easeInOut" }}/>
          <framer_motion_1.motion.span className="w-[6px] h-[6px] bg-white rounded-full" variants={{
            closed: { x: 0, rotate: 0 },
            open: { x: 0, rotate: 90 },
        }} transition={{ duration: 0.3, ease: "easeInOut" }}/>
          <framer_motion_1.motion.span className="w-[6px] h-[6px] bg-white rounded-full" variants={{
            closed: { x: 0, rotate: 0 },
            open: { x: 0 },
        }} transition={{ duration: 0.3, ease: "easeInOut" }}/>
        </framer_motion_1.motion.div>

        {/* Expanding Menu */}
        {isOpen && (<framer_motion_1.motion.div variants={{
                closed: { opacity: 0, scale: 0.5, y: -10 },
                open: { opacity: 1, scale: 1, y: 0 },
            }} transition={{ duration: 0.3, ease: "easeOut" }} className="absolute left-50 top-[50%] mt-4 w-36 bg-secondary rounded-[8px] shadow-lg flex flex-col overflow-hidden select-none">
            <button onClick={handleDelete} className="text-red-400 text-sm px-4 py-2 hover:bg-[#2A2932] transition">
              Delete
            </button>
          </framer_motion_1.motion.div>)}
      </div>
      {isDeleting && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-[#2b2b2b] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[24px]">
                Are you sure you want to delete this playlist?{" "}
                <span className="font-bold text-white">({name})</span>
              </h2>
              <p className="text-[#ABAAB8] text-sm">
                This action cannot be undone. This will permanently delete the
                playlist.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700" onClick={() => {
                setIsDeleting(false);
                onDelete === null || onDelete === void 0 ? void 0 : onDelete();
                react_hot_toast_1.default.success("Playlist deleted successfully");
                if (id) {
                    (0, playlists_1.deletePlaylist)(id);
                }
                else {
                    react_hot_toast_1.default.error("Playlist ID is missing, try refreshing the page");
                }
            }}>
                Yes
              </button>
              <button className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]" onClick={() => setIsDeleting(false)}>
                No
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.default = LongPlaylistCard;
