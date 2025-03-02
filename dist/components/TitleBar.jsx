"use strict";
// TitleBar.tsx
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
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const react_1 = __importStar(require("react"));
const md_1 = require("react-icons/md");
const TitleBar = () => {
    const [isElectron, setIsElectron] = (0, react_1.useState)(false);
    const pathname = (0, navigation_1.usePathname)();
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined" && window.myElectron) {
            setIsElectron(true);
        }
    }, []);
    // If not in Electron, return null (render nothing)
    if (!isElectron) {
        return null;
    }
    const handleClose = () => {
        if (window.myElectron) {
            window.myElectron.closeWindow();
        }
    };
    const handleMinimize = () => {
        if (window.myElectron) {
            window.myElectron.minimizeWindow();
        }
    };
    const handleToggleMaximize = () => {
        if (window.myElectron) {
            window.myElectron.toggleMaximizeWindow();
        }
    };
    return (<div className={`flex px-4 items-center ${pathname === "/miniplayer" ? "justify-center" : "justify-between"} draggable bg-background text-white h-12`}>
      <div>
        {pathname === "/miniplayer" ? (<div className="w-full flex items-center justify-center">
            <image_1.default src="/icons/dragdots.svg" alt="Drag dots icon" width={40} height={40} className="rotate-90"/>
          </div>) : ("Settings")}
      </div>
      {pathname !== "/miniplayer" && (<div className="flex gap-2 no-drag">
          <button onClick={handleMinimize}>
            <md_1.MdMinimize size={24}/>
          </button>
          <button onClick={handleToggleMaximize}>
            <md_1.MdFullscreen size={24}/>
          </button>
          <button onClick={handleClose}>
            <md_1.MdClose size={24}/>
          </button>
        </div>)}
    </div>);
};
exports.default = TitleBar;
