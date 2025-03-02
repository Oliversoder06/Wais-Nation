"use client";
import React, { useState, useEffect } from "react";
import NavigationItem from "./NavigationItem";
import AuthButtons from "./AuthButtons";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.myElectron) {
      setIsElectron(true);
    }
  }, []);

  // Set height based on whether it's Electron or not.
  const heightClass = isElectron
    ? "h-[calc(100vh-148px)]"
    : "h-[calc(100vh-100px)]";

  return (
    <div className="fixed hidden md:flex z-[80]">
      <motion.div
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        className={`${heightClass} w-[144px] bg-secondary flex items-start pl-[30px] justify-between flex-col py-[28px] rounded-r-lg transition-colors duration-300`}
      >
        <Link href="/">
          <Image
            src="/images/Logo.svg"
            alt="logo"
            width={64}
            height={64}
            className="w-[64px] h-[26px]"
          />
        </Link>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isExpanded ? 132 : 84 }}
          transition={{ duration: 0.3 }}
          className="bg-container h-[240px] gap-[8px] rounded-[12px] flex flex-col justify-center items-start"
        >
          <NavigationItem
            icon="/icons/Home.svg"
            alt="home"
            anchor="/"
            label="Home"
            isExpanded={isExpanded}
          />
          <NavigationItem
            icon="/icons/Heart.svg"
            alt="liked"
            anchor="/collections/liked"
            label="Liked"
            isExpanded={isExpanded}
          />
          <NavigationItem
            icon="/icons/Playlist.svg"
            alt="playlist"
            anchor="/collections/playlists"
            label="Library"
            isExpanded={isExpanded}
          />
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <UserButton />
          <AuthButtons />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
