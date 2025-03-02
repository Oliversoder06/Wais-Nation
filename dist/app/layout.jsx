"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const Sidebar_1 = __importDefault(require("@/components/Sidebar"));
const Sideplayer_1 = __importDefault(require("@/components/Sideplayer"));
const DesktopSearchbar_1 = __importDefault(require("@/components/DesktopSearchbar"));
const MusicPlayer_1 = __importDefault(require("@/components/MusicPlayer"));
const MainContainer_1 = __importDefault(require("@/components/MainContainer"));
const nextjs_1 = require("@clerk/nextjs");
const react_hot_toast_1 = require("react-hot-toast");
const MobileNav_1 = __importDefault(require("@/components/MobileNav"));
const PlayerContext_1 = require("@/components/PlayerContext");
const ServiceWorkerRegister_1 = __importDefault(require("@/components/ServiceWorkerRegister"));
const TitleBar_1 = __importDefault(require("@/components/TitleBar"));
const MarginPlaceholder_1 = __importDefault(require("@/components/MarginPlaceholder"));
exports.metadata = {
    title: "Wais Nation",
    description: "A better Spotify",
};
function RootLayout({ children, }) {
    return (<nextjs_1.ClerkProvider>
      <PlayerContext_1.PlayerProvider>
        <html lang="en">
          <head>{/* Manifest and meta tags here */}</head>
          <body className="overflow-hidden">
            <div className="fixed top-0 left-0 w-full z-[90] ">
              <TitleBar_1.default />
            </div>
            <MarginPlaceholder_1.default />
            <div className="bg-secondary md:bg-background flex flex-col md:flex-row relative">
              <ServiceWorkerRegister_1.default />

              {/* Mobile Header/Navigation */}
              <div className="hidden md:flex">
                <Sidebar_1.default />
              </div>
              <div className="md:hidden">
                <MobileNav_1.default />
              </div>

              <nav className="">
                <DesktopSearchbar_1.default />
              </nav>

              {/* Wrap the main content with our client component */}
              <MainContainer_1.default>{children}</MainContainer_1.default>

              {/* Sideplayer Area */}
              <div className="overflow-y-auto overscroll-contain fixed top-10 left-0 w-full z-10">
                <Sideplayer_1.default />
              </div>

              <MusicPlayer_1.default />
              <react_hot_toast_1.Toaster />
            </div>
          </body>
        </html>
      </PlayerContext_1.PlayerProvider>
    </nextjs_1.ClerkProvider>);
}
