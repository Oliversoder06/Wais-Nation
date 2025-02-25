"use client";
import React from "react";
import NavigationItem from "./NavigationItem";
import AuthButtons from "./AuthButtons";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed hidden md:flex">
      <div className="h-[calc(100vh-100px)] w-[144px] bg-secondary flex items-center justify-between flex-col py-[28px] rounded-br-lg">
        <Link href="/">
          <Image
            src="/images/Logo.svg"
            alt="logo"
            width={64}
            height={64}
            className="w-[64px] h-[26px]"
          />
        </Link>
        <div className="bg-container h-[240px] gap-[8px] rounded-[12px] flex flex-col justify-center items-center">
          <NavigationItem icon="/icons/Home.svg" alt="home" anchor="/" />
          <NavigationItem
            icon="/icons/Heart.svg"
            alt="liked"
            anchor="/collections/liked"
          />
          <NavigationItem
            icon="/icons/Playlist.svg"
            alt="playlist"
            anchor="/collections/playlists"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-[16px]">
          <UserButton />
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
