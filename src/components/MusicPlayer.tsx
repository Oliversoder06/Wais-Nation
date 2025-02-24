"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useMusicStore } from "@/store/musicStore";
import VolumeControl from "./VolumeControl";

const MusicPlayer: React.FC = () => {
  const { currentTrack, playPrevious, playNext, isPlaying, togglePlay, queue } =
    useMusicStore();

  const playerRef = useRef<YT.Player | null>(null);

  const handlePlayerReady = (event: YT.PlayerEvent) => {
    playerRef.current = event.target;
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      togglePlay();
    }
  };

  useEffect(() => {
    if (playerRef.current && currentTrack) {
      playerRef.current.loadVideoById(currentTrack.videoId);
    }
  }, [currentTrack]);

  return (
    <div className="h-[100px] bg-background fixed bottom-0 right-0 w-full items-center justify-between px-[40px] md:flex hidden z-10">
      {/* Left Side: Song Info */}
      <div className="flex gap-[20px] items-center">
        {currentTrack?.albumCover ? (
          <div className="w-[56px] h-[56px]">
            <Image
              src={currentTrack.albumCover}
              alt={currentTrack.title}
              width={56}
              height={56}
              className="rounded"
            />
          </div>
        ) : (
          <div className="w-[56px] h-[56px] bg-red-500" />
        )}
        <div className="flex flex-col justify-center">
          <span className="text-white font-semibold text-[20px] hover:underline cursor-pointer truncate max-w-[200px]">
            {currentTrack?.title || "No Song"}
          </span>
          <span className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer truncate max-w-[200px]">
            {currentTrack?.artist || "Unknown Artist"}
          </span>
        </div>
      </div>

      {/* Middle: Playback Controls */}
      <div className="flex flex-col w-[50%] gap-[20px] absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-[28px] self-center">
          {/* Previous Song Button */}
          <Image
            src="/icons/prevsong.svg"
            alt="prev song"
            width={24}
            height={24}
            className={` w-auto h-auto ${
              queue.length === 0
                ? "opacity-100 hover:opacity-80 cursor-pointer"
                : "opacity-50 hover:opacity-40"
            }`}
            onClick={playPrevious}
          />
          {/* Play/Pause Button */}
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            alt={isPlaying ? "pause song" : "play song"}
            width={36}
            height={36}
            onClick={handlePlayPause}
            className="cursor-pointer hover:opacity-80"
          />
          {/* Next Song Button */}
          <Image
            src="/icons/nextsong.svg"
            alt="next song"
            width={24}
            height={24}
            className={`w-auto h-auto ${
              queue.length === 0
                ? "opacity-50 hover:opacity-40"
                : "opacity-100 hover:opacity-80 cursor-pointer"
            }`}
            onClick={playNext}
          />
        </div>
        <div className="flex">
          <div className="bg-[#2A2A2A] h-[4px] w-full rounded-full"></div>
        </div>
      </div>

      {/* Right Side: Extra Controls */}
      <div className="flex gap-[40px]">
        <Image
          src="/icons/loop.svg"
          alt="loop song"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 w-auto h-auto"
        />
        {/* Replaced volume icon with VolumeControl */}
        <VolumeControl />
      </div>

      {/* YouTube Player (Hidden) */}
      {currentTrack && (
        <div className="hidden">
          <YouTube
            videoId={currentTrack.videoId}
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
            onReady={handlePlayerReady}
            onEnd={playNext} // Auto play next song when current one ends
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
