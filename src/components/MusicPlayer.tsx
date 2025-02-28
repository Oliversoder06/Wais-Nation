"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useMusicStore } from "@/store/musicStore";
import VolumeControl from "./VolumeControl";
import Link from "next/link";
import { searchSpotify } from "@/lib/spotify";

enum YouTubePlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

interface YouTubeOnStateChangeEvent {
  data: number;
}

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

  // When a new track is loaded, wait for the player to be ready and load the video.
  useEffect(() => {
    if (!currentTrack) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const loadVideoWhenReady = () => {
      if (playerRef.current) {
        const iframe =
          playerRef.current.getIframe() as unknown as HTMLIFrameElement;
        if (iframe && iframe.src) {
          console.log("Loading video:", currentTrack.videoId);
          playerRef.current.loadVideoById(currentTrack.videoId);
          return;
        }
      }
      timeoutId = setTimeout(loadVideoWhenReady, 100);
    };
    loadVideoWhenReady();
    return () => clearTimeout(timeoutId);
  }, [currentTrack]);

  useEffect(() => {
    async function fetchSpotifyId() {
      if (currentTrack) {
        try {
          const query = `${currentTrack.title} ${currentTrack.artist}`;
          const searchResults = await searchSpotify({ query, limit: 1 });
          if (
            searchResults &&
            searchResults.tracks.items &&
            searchResults.tracks.items.length > 0
          ) {
            const spotifyTrack = searchResults.tracks.items[0];
            setSpotifyTrackId(spotifyTrack.id);
            if (spotifyTrack.artists && spotifyTrack.artists.length > 0) {
              setArtistId(spotifyTrack.artists[0].id);
            } else {
              setArtistId(null);
            }
          } else {
            setSpotifyTrackId(null);
            setArtistId(null);
          }
        } catch (error) {
          console.error("Error fetching Spotify track/artist ID:", error);
          setSpotifyTrackId(null);
          setArtistId(null);
        }
      }
    }
    fetchSpotifyId();
  }, [currentTrack]);

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

  // Reset currentTime when a new track loads
  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack]);

  const onPlayerStateChange = (event: YouTubeOnStateChangeEvent) => {
    if (event.data === YouTubePlayerState.PLAYING) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const time = Math.floor(
            (playerRef.current as ExtendedYTPlayer).getCurrentTime()
          );
          setCurrentTime(time);
        }
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Helper to format seconds into mm:ss format
  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const handleVideoEnd = () => {
    if (queue.length > 0) {
      playNext();
    } else if (currentTrack) {
      playerRef.current?.seekTo(0, true);
      playerRef.current?.playVideo();
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
              alt={currentTrack.title}
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
              {currentTrack.title || ""}
            </Link>
          )}
          {currentTrack && (
            <Link
              href={`/artist/${artistId || "unknown"}`}
              className="text-[#ABAAB8] font-semibold hover:underline cursor-pointer truncate max-w-[200px]"
            >
              {currentTrack.artist || ""}
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
            } `}
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
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-400 text-nowrap">
            {currentTrack ? formatDuration(currentTime) : "-:--"}
          </p>
          <div
            className={`relative w-full h-[4px] bg-[#2A2A2A] rounded-full ${
              !currentTrack ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (!playerRef.current || !currentTrack) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = clickX / rect.width;
              const newTime = percentage * currentTrack.duration;
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
            {currentTrack ? formatDuration(currentTrack.duration) : "-:--"}
          </p>
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
        <VolumeControl
          volume={volume}
          setVolume={setVolume}
          playerRef={playerRef}
          currentVideoId={currentTrack?.videoId} // Pass the videoId so VolumeControl re-runs on track change
        />
      </div>

      {/* YouTube Player (Hidden) */}
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
              playerRef.current = event.target;
              event.target.setVolume(volume);
              console.log("YouTube Player Ready! Volume set to", volume);
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
