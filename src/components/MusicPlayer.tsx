"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useMusicStore } from "@/store/musicStore";
import VolumeControl from "./VolumeControl";
import Link from "next/link";
import { searchSpotify } from "@/lib/spotify";

interface ExtendedYTPlayer extends YT.Player {
  getCurrentTime(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
}

const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    playPrevious,
    playNext,
    isPlaying,
    togglePlay,
    queue,
    history,
  } = useMusicStore();
  const playerRef = useRef<YT.Player | null>(null);
  const [volume, setVolume] = useState(50);
  const [spotifyTrackId, setSpotifyTrackId] = useState<string | null>(null);
  const [artistId, setArtistId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Define handlePlayPause with useCallback so it's defined before being used in useEffect
  const handlePlayPause = useCallback(() => {
    if (!playerRef.current) return;
    console.log("[MusicPlayer] Toggling play/pause. isPlaying:", isPlaying);
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    togglePlay();
  }, [isPlaying, togglePlay]);

  // When currentTrack changes, fetch Spotify data.
  useEffect(() => {
    if (!currentTrack) {
      console.log("[MusicPlayer] currentTrack is null");
      return;
    }
    console.log("[MusicPlayer] currentTrack changed:", currentTrack);
    async function fetchSpotifyId() {
      try {
        const query = `${currentTrack?.title ?? ""} ${
          currentTrack?.artist ?? ""
        }`;
        const searchResults = await searchSpotify({ query, limit: 1 });
        if (!searchResults || !searchResults.tracks?.items?.length) return;
        const track = searchResults.tracks.items[0];
        setSpotifyTrackId(track.id);
        setArtistId(track.artists.length > 0 ? track.artists[0].id : null);
      } catch (error) {
        console.error("Error fetching Spotify track:", error);
      }
    }
    fetchSpotifyId();
  }, [currentTrack]);

  // When currentTrack changes, load the new video and update the mini player via IPC.
  useEffect(() => {
    if (!currentTrack) return;
    if (!playerRef.current) {
      console.log("[MusicPlayer] Player not ready yet, delaying loadVideoById");
      return;
    }
    console.log("[MusicPlayer] Loading video with id:", currentTrack.videoId);
    playerRef.current.loadVideoById(currentTrack.videoId);
    if (window.myElectron && window.myElectron.updateTrack) {
      console.log("[MusicPlayer] Sending updateTrack IPC with", currentTrack);
      window.myElectron.updateTrack(currentTrack);
    }
  }, [currentTrack]);

  // Debounce reloading video when currentTrack changes (optional).
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (currentTrack && playerRef.current) {
        console.log(
          "[MusicPlayer] Debounced loading video with id:",
          currentTrack.videoId
        );
        playerRef.current.loadVideoById(currentTrack.videoId);
        if (window.myElectron && window.myElectron.updateTrack) {
          window.myElectron.updateTrack(currentTrack);
        }
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [currentTrack]);

  // Cleanup interval on unmount.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Set up Electron IPC listeners.
  useEffect(() => {
    if (window.myElectron) {
      window.myElectron.on("toggle-play", () => {
        console.log("[MusicPlayer] Received toggle-play IPC");
        handlePlayPause();
      });
      window.myElectron.on("set-volume", (data: unknown) => {
        const newVolume = data as number;
        console.log("[MusicPlayer] Received set-volume IPC with", newVolume);
        if (playerRef.current) {
          playerRef.current.setVolume(newVolume);
          setVolume(newVolume);
        }
      });
    }
  }, [handlePlayPause, isPlaying, currentTrack, volume]);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onPlayerStateChange = (event: { data: number }) => {
    if (event.data === 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const time = Math.floor(playerRef.current.getCurrentTime());
          setCurrentTime(time);
          console.log("[MusicPlayer] Current time:", time);
        }
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleVideoEnd = () => {
    console.log("[MusicPlayer] Video ended");
    if (queue.length > 0) {
      playNext();
    } else {
      playerRef.current?.seekTo(0, true);
    }
  };

  const openMiniPlayer = () => {
    if (window.myElectron && currentTrack) {
      console.log("[MusicPlayer] Opening mini player with", currentTrack);
      window.myElectron.openMiniPlayer({
        title: currentTrack.title,
        artist: currentTrack.artist,
        videoId: currentTrack.videoId,
      });
    } else {
      console.log(
        "[MusicPlayer] Browser fallback: opening mini player with query params"
      );
      if (currentTrack) {
        const queryParams = new URLSearchParams({
          title: currentTrack.title,
          artist: currentTrack.artist,
          videoId: currentTrack.videoId,
        });
        window.open(
          `/miniplayer?${queryParams.toString()}`,
          "Miniplayer",
          "width=400,height=200"
        );
      } else {
        window.open("/miniplayer", "Miniplayer", "width=400,height=200");
      }
    }
  };

  return (
    <div className="h-[100px] bg-background fixed bottom-0 right-0 w-full items-center justify-between px-[40px] md:flex hidden z-10">
      {/* Left Side: Song Info */}
      <div className="flex gap-[20px] items-center">
        {currentTrack?.albumCover ? (
          <div className="w-[56px] h-[56px]">
            <Image
              src={currentTrack.albumCover}
              alt={currentTrack.title ?? ""}
              width={56}
              height={56}
              className="rounded"
            />
          </div>
        ) : (
          <div className="w-[56px] h-[56px] bg-[#3a3847] opacity-0" />
        )}
        <div className="flex flex-col justify-center">
          {currentTrack && (
            <Link
              href={`/track/${spotifyTrackId || "unknown"}`}
              className="text-white font-semibold text-[20px] hover:underline cursor-pointer truncate max-w-[200px]"
            >
              {currentTrack.title}
            </Link>
          )}
          {currentTrack && (
            <Link
              href={`/artist/${artistId || "unknown"}`}
              className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer truncate max-w-[200px]"
            >
              {currentTrack.artist}
            </Link>
          )}
        </div>
      </div>

      {/* Middle: Playback Controls */}
      <div className="flex flex-col w-[50%] gap-[4px] absolute left-1/2 transform -translate-x-1/2">
        <div className="flex gap-[28px] self-center">
          <Image
            src="/icons/prevsong.svg"
            alt="prev song"
            width={24}
            height={24}
            className={`w-auto h-auto ${
              history.length > 0
                ? "opacity-100 hover:opacity-80 cursor-pointer"
                : "opacity-50 hover:opacity-40 cursor-not-allowed"
            }`}
            onClick={playPrevious}
          />
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            alt={isPlaying ? "pause song" : "play song"}
            width={36}
            height={36}
            onClick={handlePlayPause}
            className={`${
              history.length === 0 && queue.length === 0 && !currentTrack
                ? "opacity-50 hover:opacity-40 cursor-not-allowed"
                : "cursor-pointer hover:opacity-80"
            }`}
          />
          <Image
            src="/icons/nextsong.svg"
            alt="next song"
            width={24}
            height={24}
            className={`w-auto h-auto ${
              queue.length === 0
                ? "opacity-50 hover:opacity-40 cursor-not-allowed"
                : "opacity-100 hover:opacity-80 cursor-pointer"
            }`}
            onClick={playNext}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <p className="text-sm text-gray-400 text-nowrap">
            {currentTrack ? formatDuration(currentTime) : "-:--"}
          </p>
          <div
            className={`relative w-[80%] h-[4px] bg-[#2A2A2A] rounded-full ${
              !currentTrack ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (!playerRef.current || !currentTrack) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = clickX / rect.width;
              const newTime = percentage * (currentTrack.duration ?? 0);
              (playerRef.current as ExtendedYTPlayer).seekTo(newTime, true);
              setCurrentTime(newTime);
            }}
          >
            <div
              className="absolute h-full bg-primary rounded-full"
              style={{
                width: `${
                  currentTrack && currentTrack.duration
                    ? (currentTime / currentTrack.duration) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 text-nowrap">
            {currentTrack ? formatDuration(currentTrack.duration ?? 0) : "-:--"}
          </p>
        </div>
      </div>

      {/* Right Side: Extra Controls */}
      <div className="flex gap-[20px]">
        <Image
          src="/icons/loop.svg"
          alt="loop song"
          width={16}
          height={16}
          className="cursor-not-allowed opacity-40"
        />
        <VolumeControl
          volume={volume}
          setVolume={setVolume}
          playerRef={playerRef}
          currentVideoId={currentTrack?.videoId}
        />
        <Image
          src="/icons/miniplayer.svg"
          alt="miniplayer"
          width={24}
          height={24}
          className="cursor-pointer hover:opacity-80"
          onClick={openMiniPlayer}
        />
      </div>

      {/* Hidden YouTube Player */}
      {currentTrack && (
        <div className="hidden">
          <YouTube
            videoId={currentTrack.videoId}
            opts={{
              height: "0",
              width: "0",
              playerVars: { autoplay: 1, controls: 0, rel: 0, showinfo: 0 },
            }}
            onReady={(event) => {
              console.log("[MusicPlayer] YouTube player ready");
              playerRef.current = event.target;
              event.target.setVolume(volume);
              console.log("[MusicPlayer] Setting volume to", volume);
              event.target.playVideo();
            }}
            onStateChange={onPlayerStateChange}
            onEnd={handleVideoEnd}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
