"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LongPlaylistCardProps {
  uuid?: string;
  name: string;
  description?: string;
  owner: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const LongPlaylistCard: React.FC<LongPlaylistCardProps> = ({
  uuid,
  name,
  description,
  owner,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={uuid ? `/collections/playlists/${uuid}` : "#"}
      className="bg-[#151418] hover:bg-[#25242b] cursor-pointer w-full h-[140px] rounded-[8px] flex items-center justify-between px-[16px] pr-[32px] relative"
    >
      <div className="flex gap-4 items-center">
        {/* Playlist Image Placeholder */}
        <Image
          src="/images/playlist.svg"
          alt="Playlist Image"
          width={104}
          height={104}
          unoptimized={true}
        />

        {/* Playlist Info */}
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold">{name}</span>
          <div>
            <span className="text-[#ABAAB8] text-[16px] hover:underline">
              {owner}
            </span>
          </div>
          <span className="text-[#6E6D78] text-[14px]">
            {description || "No description available"}
          </span>
        </div>
      </div>

      {/* Clickable Dots Menu */}
      <div
        ref={menuRef}
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#2A2932] transition cursor-pointer"
      >
        {/* Animated 3-Dots (Morphs into Menu) */}
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="flex gap-[4px]"
        >
          <motion.span
            className="w-[6px] h-[6px] bg-white rounded-full"
            variants={{
              closed: { x: 0, rotate: 0 },
              open: { x: -8, rotate: -90 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="w-[6px] h-[6px] bg-white rounded-full"
            variants={{
              closed: { scale: 1 },
              open: { scale: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="w-[6px] h-[6px] bg-white rounded-full"
            variants={{
              closed: { x: 0, rotate: 0 },
              open: { x: 8, rotate: 90 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Expanding Menu */}
        {isOpen && (
          <motion.div
            variants={{
              closed: { opacity: 0, scale: 0.5, y: -10 },
              open: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 mt-4 w-36 bg-[#1D1C24] rounded-[8px] shadow-lg flex flex-col overflow-hidden"
          >
            <button
              onClick={() => {
                setIsOpen(false);
                onEdit?.();
              }}
              className="text-white text-sm px-4 py-2 hover:bg-[#2A2932] transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onDelete?.();
              }}
              className="text-red-400 text-sm px-4 py-2 hover:bg-[#2A2932] transition"
            >
              Delete
            </button>
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export default LongPlaylistCard;
