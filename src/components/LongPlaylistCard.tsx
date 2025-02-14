"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { deletePlaylist } from "@/lib/playlists";
import toast from "react-hot-toast";

interface LongPlaylistCardProps {
  id?: string;
  name: string;
  description?: string;
  owner: string;
  onDelete?: () => void;
}

const LongPlaylistCard: React.FC<LongPlaylistCardProps> = ({
  id,
  name,
  description,
  owner,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      toast.error("Playlist ID is missing, try refreshing the page");
      console.log("Playlist ID is missing");
      return;
    }

    setIsDeleting(true);
  };

  return (
    <div className="relative w-full">
      <Link
        href={id ? `/collections/playlists/${id}` : "#"}
        className="bg-[#2c2a36] hover:bg-[#32303d] cursor-pointer w-full h-[96px] md:h-[120px] rounded-[8px] flex items-center justify-between px-[8px] pr-[32px] "
      >
        <div className="flex gap-4 items-center">
          {/* Playlist Image Placeholder */}
          <Image
            src="/images/playlist.svg"
            alt="Playlist Image"
            width={104}
            height={104}
            unoptimized={true}
            className="md:w-[104px] md:h-[104px] w-[64px] h-[64px]"
          />

          {/* Playlist Info */}
          <div className="flex flex-col leading-[24px]">
            <span className="text-white text-[20px] font-semibold">{name}</span>
            <div>
              <span className="text-[#ABAAB8] text-[16px] hover:underline">
                {owner}
              </span>
            </div>
            <span className="text-[#6E6D78] text-[14px] hidden md:flex">
              {description || "No description available"}
            </span>
          </div>
        </div>
      </Link>

      {/* Clickable Dots Menu (Outside Link) */}
      <div
        ref={menuRef}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#5e5c6b] transition cursor-pointer z-10"
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
              open: { x: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="w-[6px] h-[6px] bg-white rounded-full"
            variants={{
              closed: { x: 0, rotate: 0 },
              open: { x: 0, rotate: 90 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="w-[6px] h-[6px] bg-white rounded-full"
            variants={{
              closed: { x: 0, rotate: 0 },
              open: { x: 0 },
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
            className="absolute left-50 top-[50%] mt-4 w-36 bg-[#1D1C24] rounded-[8px] shadow-lg flex flex-col overflow-hidden select-none"
          >
            <button
              onClick={handleDelete}
              className="text-red-400 text-sm px-4 py-2 hover:bg-[#2A2932] transition"
            >
              Delete
            </button>
          </motion.div>
        )}
      </div>
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-[#2b2b2b] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[24px]">
                Are you sure you want to delete this playlist?{" "}
                <span className="font-bold text-white">({name})</span>
              </h2>
              <p className="text-[#ABAAB8] text-sm">
                This action cannot be undone. This will permanently delete the
                playlist.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                onClick={() => {
                  setIsDeleting(false);
                  onDelete?.();
                  toast.success("Playlist deleted successfully");

                  if (id) {
                    deletePlaylist(id);
                  } else {
                    toast.error(
                      "Playlist ID is missing, try refreshing the page"
                    );
                  }
                }}
              >
                Yes
              </button>
              <button
                className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]"
                onClick={() => setIsDeleting(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LongPlaylistCard;
