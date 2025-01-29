"use client";
import React, { useState } from "react";
import NavigationItem from "./NavigationItem";

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  return (
    <div className="fixed">
      <div className="h-screen w-64 bg-gradient-to-b from-[#252449] to-[#161532] ">
        {isAuthenticated ? (
          <div className="pt-[24px] gap-8 flex flex-col">
            <NavigationItem icon="/icons/Home.svg" label="Home" anchor="/" />
            <div>
              <div className="flex flex-col gap-4">
                <span className="text-navlabel font-bold pl-[40px]">
                  Library
                </span>
                <NavigationItem
                  icon="/icons/Heart.svg"
                  label="Liked"
                  anchor="/collections/liked"
                />
                <NavigationItem icon="/icons/Playlist.svg" label="Playlists" />
                <NavigationItem icon="/icons/Playlist.svg" label="Albums" />
                <NavigationItem icon="/icons/Playlist.svg" label="Artists" />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4">
                <span className="text-navlabel font-bold pl-[40px]">
                  Discover
                </span>
                <NavigationItem icon="/icons/Heart.svg" label="Store" />
                <NavigationItem icon="/icons/Playlist.svg" label="Radio" />
                <NavigationItem icon="/icons/Playlist.svg" label="For You" />
                <NavigationItem icon="/icons/Playlist.svg" label="Browse" />
              </div>
            </div>

            <button className="text-white" onClick={handleAuth}>
              Logout
            </button>
          </div>
        ) : (
          <div className="text-white">
            <h1>LOGGED OUT</h1>
            <button onClick={handleAuth}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
