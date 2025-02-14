import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Sideplayer from "@/components/Sideplayer";
import DesktopSearchbar from "@/components/DesktopSearchbar";
import MusicPlayer from "@/components/MusicPlayer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import MobileNav from "@/components/MobileNav";
import MobileHeader from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#1D1C24] md:bg-background flex flex-col md:flex-row">
          {/* Mobile Header/Navigation */}
          {/* <div className="md:hidden w-full">
            <div className="w-full" />
            <MobileHeader />
          </div> */}
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
          <main className="md:ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] h-[calc(100vh-100px)] md:pt-[64px] md:px-[8px] min-h-screen pb-[75px]">
            <div className="md:bg-[#1D1C24] rounded-lg h-full w-full md:overflow-y-auto scrollbar ">
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
    </ClerkProvider>
  );
}
