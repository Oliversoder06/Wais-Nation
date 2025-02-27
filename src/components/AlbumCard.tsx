"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface AlbumCardProps {
  albumCover: string;
  albumTitle: string;
  artistName: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  albumCover,
  albumTitle,
  artistName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="max-w-[240px] rounded-lg hover:bg-container transition p-4 select-none"
    >
      <div className="relative">
        <Image
          src={albumCover}
          alt={albumTitle}
          width={192}
          height={192}
          className="size-52 object-cover rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 0 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black rounded-lg"
        ></motion.div>
      </div>
      <div className="pt-2">
        <h2 className="text-lg font-bold text-white">{albumTitle}</h2>
        <p className="text-sm text-gray-300">{artistName}</p>
      </div>
    </motion.div>
  );
};

export default AlbumCard;
