import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Sideplayer from "@/components/Sideplayer";
import DesktopSearchbar from "@/components/DesktopSearchbar";
import MusicPlayer from "@/components/MusicPlayer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import MobileNav from "@/components/MobileNav";
import { PlayerProvider } from "@/components/PlayerContext";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Wais Nation",
  description: "A better Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <PlayerProvider>
        <html lang="en">
          <head>
            {/* Web Manifest (for Android & Desktop PWAs) */}
            <link rel="manifest" href="/manifest.json" />

            {/* iOS PWA Meta Tags */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="default"
            />
            <meta name="apple-mobile-web-app-title" content="My PWA App" />

            {/* iOS Icons */}
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/logo180.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/images/logo152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="167x167"
              href="/images/logo167.png"
            />
          </head>
          <body className="bg-[#1D1C24] md:bg-background flex flex-col md:flex-row">
            <ServiceWorkerRegister />

            {/* Mobile Header/Navigation */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>

            <nav>
              <DesktopSearchbar />
            </nav>

            {/* Main Content Area */}
            <main className="md:ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] h-[calc(100vh-25px)] md:pt-[64px] md:px-[8px] pb-[75px]">
              <div className="md:bg-[#1D1C24] rounded-lg h-full w-full md:overflow-y-auto scrollbar">
                {children}
              </div>
            </main>

            {/* Sideplayer Area */}
            <div className="overflow-y-auto overscroll-contain">
              <Sideplayer />
            </div>

            <MusicPlayer />

            <Toaster />
          </body>
        </html>
      </PlayerProvider>
    </ClerkProvider>
  );
}
