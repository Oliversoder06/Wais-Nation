"use client";
import Image from "next/image";
import React, { useEffect } from "react";

interface VolumeControlProps {
  playerRef: React.MutableRefObject<YT.Player | null>;
  volume: number;
  setVolume: (volume: number) => void;
  currentVideoId?: string; // New prop to signal when the video changes
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  playerRef,
  volume,
  setVolume,
  currentVideoId,
}) => {
  const [lastVolume, setLastVolume] = React.useState(volume);
  const showSlider = true;

  // Poll until the player is fully ready (i.e. the iframe has a valid src)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateVolumeWhenReady = () => {
      const player = playerRef.current;
      if (player) {
        const iframe = player.getIframe() as unknown as HTMLIFrameElement;
        if (iframe && iframe.src) {
          player.setVolume(volume);
          return;
        }
      }
      timeoutId = setTimeout(updateVolumeWhenReady, 100);
    };

    updateVolumeWhenReady();

    return () => clearTimeout(timeoutId);
  }, [volume, currentVideoId, playerRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      const iframe =
        playerRef.current.getIframe() as unknown as HTMLIFrameElement;
      if (iframe && iframe.src) {
        playerRef.current.setVolume(newVolume);
      }
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(lastVolume);
      if (playerRef.current) {
        const iframe =
          playerRef.current.getIframe() as unknown as HTMLIFrameElement;
        if (iframe && iframe.src) {
          playerRef.current.setVolume(lastVolume);
        }
      }
    } else {
      setLastVolume(volume);
      setVolume(0);
      if (playerRef.current) {
        const iframe =
          playerRef.current.getIframe() as unknown as HTMLIFrameElement;
        if (iframe && iframe.src) {
          playerRef.current.setVolume(0);
        }
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <Image
        src={
          volume === 0
            ? "/icons/volumemute.svg"
            : volume > 50
            ? "/icons/volumeup.svg"
            : "/icons/volumedown.svg"
        }
        alt="volume"
        width={24}
        height={24}
        className="cursor-pointer hover:opacity-80"
        onClick={toggleMute}
      />
      {showSlider && (
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider y-2 bg-background flex items-center justify-center"
            style={{ "--progress": `${volume}%` } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
