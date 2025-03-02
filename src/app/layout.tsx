// RootLayout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Sideplayer from "@/components/Sideplayer";
import DesktopSearchbar from "@/components/DesktopSearchbar";
import MusicPlayer from "@/components/MusicPlayer";
import MainContainer from "@/components/MainContainer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import MobileNav from "@/components/MobileNav";
import { PlayerProvider } from "@/components/PlayerContext";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import TitleBar from "@/components/TitleBar";
import MarginPlaceholder from "@/components/MarginPlaceholder";

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
          <head>{/* Manifest and meta tags here */}</head>
          <body className="overflow-hidden">
            <div className="fixed top-0 left-0 w-full z-[90] ">
              <TitleBar />
            </div>
            <MarginPlaceholder />
            <div className="bg-secondary md:bg-background flex flex-col md:flex-row relative">
              <ServiceWorkerRegister />

              {/* Mobile Header/Navigation */}
              <div className="hidden md:flex">
                <Sidebar />
              </div>
              <div className="md:hidden">
                <MobileNav />
              </div>

              <nav className="">
                <DesktopSearchbar />
              </nav>

              {/* Wrap the main content with our client component */}
              <MainContainer>{children}</MainContainer>

              {/* Sideplayer Area */}
              <div className="overflow-y-auto overscroll-contain fixed top-10 left-0 w-full z-10">
                <Sideplayer />
              </div>

              <MusicPlayer />
              <Toaster />
            </div>
          </body>
        </html>
      </PlayerProvider>
    </ClerkProvider>
  );
}
