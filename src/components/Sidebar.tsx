"use client";
import React from "react";
import NavigationItem from "./NavigationItem";
import AuthButtons from "./AuthButtons";
import { UserButton, UserProfile } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="fixed">
      <div className="h-[calc(100vh-100px)] w-[144px] bg-[#1D1C24] flex items-center justify-between flex-col py-[28px]">
        <h1 className="text-white text-2xl">LOGO</h1>
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

        <AuthButtons />

        {/* <Image src="/icons/Profile.svg" alt="Profile" width={40} height={40} /> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
