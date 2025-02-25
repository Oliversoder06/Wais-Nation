"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMusicStore } from "@/store/musicStore";
import {
  searchSpotify,
  getArtistDetails,
  SpotifyArtistDetails,
} from "@/lib/spotify";

const Sideplayer = () => {
  const { currentTrack } = useMusicStore();
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [artistId, setArtistId] = useState<string | null>(null);
  const [artistDetails, setArtistDetails] =
    useState<SpotifyArtistDetails | null>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function fetchSpotifyData() {
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
            // Use spotifyTrack.id if needed, otherwise ignore it
            if (spotifyTrack.artists && spotifyTrack.artists.length > 0) {
              setArtistId(spotifyTrack.artists[0].id);
            } else {
              setArtistId(null);
            }
          } else {
            setArtistId(null);
          }
        } catch (error) {
          console.error("Error fetching Spotify track/artist ID:", error);
          setArtistId(null);
        }
      }
    }
    fetchSpotifyData();
  }, [currentTrack]);

  useEffect(() => {
    async function fetchArtistData() {
      if (artistId) {
        try {
          const details = await getArtistDetails(artistId);
          setArtistDetails(details);
        } catch (error) {
          console.error("Error fetching artist details:", error);
          setArtistDetails(null);
        }
      }
    }
    fetchArtistData();
  }, [artistId]);

  const albumCover = currentTrack?.albumCover || "";
  const songTitle = currentTrack?.title || "No Song";
  const artistName = currentTrack?.artist || "Unknown Artist";
  const artistPfp = artistDetails?.images?.[0]?.url;

  const containerStyle = albumCover
    ? {
        backgroundImage: `url(${albumCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // filter: "blur(8px)",
      }
    : {};

  return (
    <div>
      <Image
        src="/icons/open-sidebar.svg"
        alt="open sidebar"
        width={40}
        height={40}
        className="cursor-pointer fixed right-0 top-0 m-[20px] z-[50] hidden md:block xl:hidden"
        onClick={handleOpen}
      />
      {/* Mobile/Open Sidebar */}
      <div>
        {open && (
          <div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={handleOpen}
            ></div>
            <div
              className="w-[364px] right-0 h-[calc(100vh-100px)] flex flex-col justify-end p-[20px] gap-[40px] z-50 fixed rounded-bl-lg"
              style={containerStyle}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col leading-[32px]">
                  <span className="text-white font-semibold text-[32px]">
                    {songTitle}
                  </span>
                  <span className="text-[#ABAABB] font-medium">
                    {artistName}
                  </span>
                </div>
                <Image
                  src={isLiked ? "/icons/heart.svg" : "/icons/empty-heart.svg"}
                  alt="like button"
                  width={28}
                  height={28}
                  onClick={handleLike}
                  className="cursor-pointer hover:opacity-80 relative z-10"
                />
              </div>
              <div className="relative z-10">
                {artistPfp ? (
                  <Image
                    src={artistPfp}
                    alt="Artist Profile"
                    width={364}
                    height={300}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-[300px] w-full bg-[#3a3847] rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className="w-[364px] fixed right-0 h-[calc(100vh-100px)] xl:flex flex-col justify-end p-[20px] gap-[40px] hidden rounded-bl-lg"
        style={containerStyle}
      >
        {/* Dark overlay to darken only the background image */}
        <div className="absolute inset-0 bg-secondary opacity-[0.85]"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col leading-[32px]">
            <span className="text-white font-semibold text-[32px]">
              {songTitle}
            </span>
            <span className="text-[#ABAABB] font-medium">{artistName}</span>
          </div>
          <Image
            src={isLiked ? "/icons/heart.svg" : "/icons/empty-heart.svg"}
            alt="like button"
            width={28}
            height={28}
            onClick={handleLike}
            className="cursor-pointer hover:opacity-80 relative z-10"
          />
        </div>
        <div className="relative z-10">
          {artistPfp ? (
            <Image
              src={artistPfp}
              alt="Artist Profile"
              width={364}
              height={300}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          ) : (
            <div className="h-[300px] w-full bg-container rounded-lg"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sideplayer;
