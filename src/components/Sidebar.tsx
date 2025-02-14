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
      <div className="h-[calc(100vh-100px)] w-[144px] bg-[#1D1C24] flex items-center justify-between flex-col py-[28px] rounded-br-lg">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={64} height={64} />
        </Link>
        <div className="bg-[#2F2E36] h-[240px] gap-[8px] rounded-[12px] flex flex-col justify-center items-center">
          <NavigationItem icon="/icons/home.svg" alt="home" anchor="/" />
          <NavigationItem
            icon="/icons/heart.svg"
            alt="liked"
            anchor="/collections/liked"
          />
          <NavigationItem
            icon="/icons/playlist.svg"
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
