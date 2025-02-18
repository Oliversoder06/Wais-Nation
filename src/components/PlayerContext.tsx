// PlayerContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface Song {
  title: string;
  artist: string;
  album: string;
  cover?: string;
  videoId: string;
}

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSong, setCurrentSongState] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setCurrentSong = (song: Song) => {
    setCurrentSongState(song);
    setIsPlaying(true); // auto-play when a new song is selected
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <PlayerContext.Provider
      value={{ currentSong, isPlaying, setCurrentSong, togglePlay }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
