import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Sideplayer from "@/components/Sideplayer";
import DesktopSearchbar from "@/components/DesktopSearchbar";
import MusicPlayer from "@/components/MusicPlayer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background flex">
        <Sidebar />
        <main className="ml-[144px] w-[calc(100%-508px)]">
          <nav className="py-[20px]">
            <DesktopSearchbar />
          </nav>
          {children}
        </main>
        <Sideplayer />
        <MusicPlayer />
      </body>
    </html>
  );
}
