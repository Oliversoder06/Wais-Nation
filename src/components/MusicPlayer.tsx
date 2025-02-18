"use client";
import Image from "next/image";
import React, { useRef } from "react";
import YouTube from "react-youtube";
import { usePlayer } from "./PlayerContext";

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const playerRef = useRef<any>(null);

  const handlePlayerReady = (event: any) => {
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

  return (
    <div className="h-[100px] bg-background fixed bottom-0 right-0 w-full items-center justify-between px-[40px] md:flex hidden z-10">
      {/* Left Side: Song Info */}
      <div className="flex gap-[20px] items-center">
        {currentSong?.cover ? (
          <div className="w-[56px] h-[56px]">
            <Image
              src={currentSong.cover}
              alt={currentSong.title}
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
            {currentSong?.title || "No Song"}
          </span>
          <span className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer truncate max-w-[200px]">
            {currentSong?.artist || "Unknown Artist"}
          </span>
        </div>
      </div>

      {/* Middle: Playback Controls */}
      <div className="flex flex-col w-[50%] gap-[20px] absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-[28px] self-center">
          <Image
            src="/icons/prevsong.svg"
            alt="prev song"
            width={24}
            height={24}
            className="cursor-pointer hover:opacity-80 w-auto h-auto"
          />
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            alt={isPlaying ? "pause song" : "play song"}
            width={36}
            height={36}
            onClick={handlePlayPause}
            className="cursor-pointer hover:opacity-80"
          />
          <Image
            src="/icons/prevsong.svg"
            alt="next song"
            width={24}
            height={24}
            className="cursor-pointer hover:opacity-80 w-auto h-auto rotate-180"
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
        <Image
          src="/icons/volume.svg"
          alt="volume"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80 w-auto h-auto"
        />
      </div>

      {/* YouTube Player (hidden) */}
      {currentSong && (
        <div className="hidden">
          <YouTube
            videoId={currentSong.videoId}
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
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
