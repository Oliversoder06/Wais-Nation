"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="bg-[#1D1C24] h-[100px] w-full fixed bottom-0 flex items-center justify-between px-[32px] z-[110]">
      <Link href="/" className="flex flex-col gap-[8px] items-center">
        <Image
          src={
            pathname === "/"
              ? "/icons/mobile/mobile-home-active.svg"
              : "/icons/mobile/mobile-home.svg"
          }
          alt="home"
          width={28}
          height={28}
        />
        <span
          className={`${
            pathname === "/" ? "text-white" : "text-[#ABAAB8]"
          } text-[12px]`}
        >
          Home
        </span>
      </Link>
      <Link href="/search" className="flex flex-col gap-[8px] items-center">
        <Image
          src={
            pathname === "/search"
              ? "/icons/mobile/mobile-search-active.svg"
              : "/icons/mobile/mobile-search.svg"
          }
          alt="library"
          width={28}
          height={28}
        />
        <span
          className={`${
            pathname === "/search" ? "text-white" : "text-[#ABAAB8]"
          } text-[12px]`}
        >
          Search
        </span>
      </Link>
      <Link
        href="/collections/playlists"
        className="flex flex-col gap-[8px] items-center"
      >
        <Image
          src={
            pathname === "/collections/playlists"
              ? "/icons/mobile/mobile-library-active.svg"
              : "/icons/mobile/mobile-library.svg"
          }
          alt="library"
          width={28}
          height={28}
        />
        <span
          className={`${
            pathname === "/collections/playlists"
              ? "text-white"
              : "text-[#ABAAB8]"
          } text-[12px]`}
        >
          Library
        </span>
      </Link>
      <Link
        href="/collections/liked"
        className="flex flex-col gap-[8px] items-center"
      >
        <Image
          src={
            pathname === "/collections/liked"
              ? "/icons/mobile/mobile-liked-active.svg"
              : "/icons/mobile/mobile-liked.svg"
          }
          alt="liked"
          width={28}
          height={28}
        />
        <span
          className={`${
            pathname === "/collections/playlists"
              ? "text-white"
              : "text-[#ABAAB8]"
          } text-[12px]`}
        >
          Liked
        </span>
      </Link>
    </div>
  );
};

export default MobileNav;
