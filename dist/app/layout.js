"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./globals.css");
const Sidebar_1 = __importDefault(require("@/components/Sidebar"));
const Sideplayer_1 = __importDefault(require("@/components/Sideplayer"));
const DesktopSearchbar_1 = __importDefault(require("@/components/DesktopSearchbar"));
const MusicPlayer_1 = __importDefault(require("@/components/MusicPlayer"));
const nextjs_1 = require("@clerk/nextjs");
const react_hot_toast_1 = require("react-hot-toast");
const MobileNav_1 = __importDefault(require("@/components/MobileNav"));
const PlayerContext_1 = require("@/components/PlayerContext");
const ServiceWorkerRegister_1 = __importDefault(require("@/components/ServiceWorkerRegister"));
exports.metadata = {
    title: "Wais Nation",
    description: "A better Spotify",
};
function RootLayout({ children, }) {
    return ((0, jsx_runtime_1.jsx)(nextjs_1.ClerkProvider, { children: (0, jsx_runtime_1.jsx)(PlayerContext_1.PlayerProvider, { children: (0, jsx_runtime_1.jsxs)("html", { lang: "en", children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("link", { rel: "manifest", href: "/manifest.json" }), (0, jsx_runtime_1.jsx)("meta", { name: "apple-mobile-web-app-capable", content: "yes" }), (0, jsx_runtime_1.jsx)("meta", { name: "apple-mobile-web-app-status-bar-style", content: "default" }), (0, jsx_runtime_1.jsx)("meta", { name: "apple-mobile-web-app-title", content: "My PWA App" }), (0, jsx_runtime_1.jsx)("link", { rel: "apple-touch-icon", sizes: "180x180", href: "/images/logo180.png" }), (0, jsx_runtime_1.jsx)("link", { rel: "apple-touch-icon", sizes: "152x152", href: "/images/logo152.png" }), (0, jsx_runtime_1.jsx)("link", { rel: "apple-touch-icon", sizes: "167x167", href: "/images/logo167.png" })] }), (0, jsx_runtime_1.jsxs)("body", { className: "bg-secondary md:bg-background flex flex-col md:flex-row", children: [(0, jsx_runtime_1.jsx)(ServiceWorkerRegister_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex", children: (0, jsx_runtime_1.jsx)(Sidebar_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(MobileNav_1.default, {}) }), (0, jsx_runtime_1.jsx)("nav", { children: (0, jsx_runtime_1.jsx)(DesktopSearchbar_1.default, {}) }), (0, jsx_runtime_1.jsx)("main", { className: "md:ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] h-[calc(100vh-25px)] md:pt-[64px] md:px-[8px] pb-[75px]", children: (0, jsx_runtime_1.jsx)("div", { className: "md:bg-secondary rounded-lg h-full w-full md:overflow-y-auto scrollbar", children: children }) }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-y-auto overscroll-contain", children: (0, jsx_runtime_1.jsx)(Sideplayer_1.default, {}) }), (0, jsx_runtime_1.jsx)(MusicPlayer_1.default, {}), (0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, {})] })] }) }) }));
}
