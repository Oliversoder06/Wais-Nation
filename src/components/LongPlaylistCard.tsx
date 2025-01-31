"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const LongPlaylistCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#151418] w-full h-[140px] rounded-[8px] flex items-center justify-between px-[16px] pr-[32px] relative">
      <div className="flex gap-4 items-center">
        <div className="size-[104px] bg-[#00FF99]" />
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold">
            My Cool Playlist
          </span>
          <span className="text-[#ABAAB8] text-[16px]">Oliver Söderlund</span>
        </div>
      </div>

      {/* Clickable Div Instead of Button to Fix HTML Issue */}
      <div
        ref={menuRef}
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#2A2932] transition cursor-pointer"
      >
        {/* Animated 3-Dots (Morphs into menu) */}
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

        {/* Expanding Menu (Replaces Dots) */}
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
              onClick={() => setIsOpen(false)}
              className="text-white text-sm px-4 py-2 hover:bg-[#2A2932] transition"
            >
              Edit
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-400 text-sm px-4 py-2 hover:bg-[#2A2932] transition"
            >
              Delete
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LongPlaylistCard;
