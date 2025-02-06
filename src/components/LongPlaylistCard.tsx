"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getPlaylist } from "@/lib/spotify";

interface PlaylistData {
  name: string;
  description?: string;
  images: { url: string }[];
}

interface LongPlaylistCardProps {
  uuid?: string;
  playlistId: string; // Spotify Playlist ID
  onEdit?: () => void;
  onDelete?: () => void;
}

const LongPlaylistCard: React.FC<LongPlaylistCardProps> = ({
  uuid,
  playlistId,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [playlist, setPlaylist] = useState<PlaylistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        setLoading(true);
        const data = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (err) {
        setError("Error fetching playlist");
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, [playlistId]);

  if (loading)
    return (
      <div className="bg-[#151418] hover:bg-[#25242b] w-full h-[140px] rounded-[8px] flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <Link
      href={`/collections/playlists/${uuid}`}
      className="bg-[#151418] hover:bg-[#25242b] cursor-pointer w-full h-[140px] rounded-[8px] flex items-center justify-between px-[16px] pr-[32px] relative"
    >
      <div className="flex gap-4 items-center">
        {/* Playlist Image */}
        <Image
          src={playlist?.images?.[0]?.url || "/images/playlist.svg"}
          alt={playlist?.name || "Playlist Image"}
          width={104}
          height={104}
          unoptimized={true}
          className="rounded-md"
        />

        {/* Playlist Info */}
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold">
            {playlist?.name || "Unknown Playlist"}
          </span>
          <span className="text-[#6E6D78] text-[14px]">
            {playlist?.description || "No description available"}
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
