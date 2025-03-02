"use strict";
// MainContainer.tsx
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const MainContainer = ({ children }) => {
    const [isElectron, setIsElectron] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined" && window.myElectron) {
            setIsElectron(true);
        }
    }, []);
    // Use different height classes based on the environment.
    const heightClass = isElectron
        ? "h-[calc(100vh-73px)]"
        : "h-[calc(100vh-25px)]";
    return (<main className={`md:ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] ${heightClass} md:pt-[64px] md:px-[8px] pb-[75px]`}>
      <div className="md:bg-secondary rounded-lg h-full w-full md:overflow-y-auto scrollbar">
        {children}
      </div>
    </main>);
};
exports.default = MainContainer;
