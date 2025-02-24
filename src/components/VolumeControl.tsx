"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePlayer } from "./PlayerContext";

const VolumeControl: React.FC = () => {
  const { playerRef } = usePlayer();
  const [volume, setVolume] = useState(50);
  const [lastVolume, setLastVolume] = useState(50);
  const showSlider = true;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(lastVolume);
    } else {
      setLastVolume(volume);
      setVolume(0);
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
        width={36}
        height={36}
        className="cursor-pointer hover:opacity-80"
        onClick={toggleMute}
      />
      {showSlider && (
        <div className="pb-1 pl-2">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{ "--progress": `${volume}%` } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
