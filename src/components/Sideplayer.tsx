"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMusicStore } from "@/store/musicStore";
import {
  searchSpotify,
  getArtistDetails,
  SpotifyArtistDetails,
} from "@/lib/spotify";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const Sideplayer = () => {
  const { currentTrack } = useMusicStore();
  const { userId } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [artistId, setArtistId] = useState<string | null>(null);
  const [artistDetails, setArtistDetails] =
    useState<SpotifyArtistDetails | null>(null);

  // Check if the current track is already liked
  useEffect(() => {
    async function checkLiked() {
      if (currentTrack && userId) {
        const { data, error } = await supabase
          .from("liked_songs")
          .select("*")
          .eq("user_id", userId)
          .eq("title", currentTrack.title)
          .eq("artist", currentTrack.artist)
          .maybeSingle();
        if (!error && data) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
    checkLiked();
  }, [currentTrack, userId]);

  const handleLike = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!userId) {
      toast.error("Please sign in to like songs");
      return;
    }
    if (!currentTrack) return;

    if (isLiked) {
      // Remove the liked song from the table
      const { error } = await supabase.from("liked_songs").delete().match({
        user_id: userId,
        title: currentTrack.title,
        artist: currentTrack.artist,
      });
      if (error) {
        toast.error("Error unliking song");
      } else {
        toast.success("Song unliked");
        setIsLiked(false);
      }
    } else {
      // Insert the liked song into the table
      const { error } = await supabase.from("liked_songs").insert({
        user_id: userId,
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album, // if available
        duration: currentTrack.duration, // if available
        cover: currentTrack.albumCover,
        added_at: new Date().toISOString(),
      });
      if (error) {
        toast.error("Error liking song");
      } else {
        toast.success("Song liked!");
        setIsLiked(true);
      }
    }
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
  const songTitle = currentTrack?.title || "No Title";
  const artistName = currentTrack?.artist || "No Artist";
  const artistPfp = artistDetails?.images?.[0]?.url;

  const containerStyle = albumCover
    ? {
        backgroundImage: `url(${albumCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div className=" ">
      <Image
        src="/icons/open-sidebar.svg"
        alt="open sidebar"
        width={40}
        height={40}
        className="cursor-pointer fixed right-0 top-8 m-[20px] z-[50] hidden md:block xl:hidden"
        onClick={handleOpen}
      />
      {/* Mobile/Open Sidebar */}
      <div>
        {open && (
          <div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[80]"
              onClick={handleOpen}
            ></div>
            <div
              className="w-[300px] right-0 h-[calc(100vh-148px)] flex flex-col justify-end p-[20px] gap-[20px] z-[80] fixed rounded-bl-lg"
              style={containerStyle}
            >
              <div className="absolute inset-0 bg-secondary opacity-[0.90]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col leading-[32px]">
                  <span className="text-white font-bold text-[24px]">
                    {songTitle}
                  </span>
                  <span className="text-[#ABAABB] font-medium">
                    {artistName}
                  </span>
                </div>
                <Image
                  src={isLiked ? "/icons/Heart.svg" : "/icons/emptyheart.svg"}
                  alt="like button"
                  width={28}
                  height={28}
                  onClick={handleLike}
                  className="cursor-pointer hover:opacity-80 relative z-10"
                />
              </div>

              <div className="relative z-10 mx-auto">
                {artistPfp && (
                  <Image
                    src={artistPfp}
                    alt="Artist Profile"
                    width={280}
                    height={280}
                    className="object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className="w-[364px] fixed right-0 h-[calc(100vh-100px)] xl:flex flex-col top-0 justify-end p-[20px] gap-[20px] hidden rounded-l-lg"
        style={containerStyle}
      >
        <div className="absolute inset-0 bg-secondary opacity-[0.90] rounded-l-[6px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col leading-[32px]">
            <span className="text-white font-bold text-[24px]">
              {songTitle}
            </span>
            <span className="text-[#ABAABB] font-medium">{artistName}</span>
          </div>
          <Image
            src={isLiked ? "/icons/Heart.svg" : "/icons/emptyheart.svg"}
            alt="like button"
            width={28}
            height={28}
            onClick={handleLike}
            className="cursor-pointer hover:opacity-80 relative z-10"
          />
        </div>
        <div className="relative z-10 mx-auto">
          {artistPfp && (
            <Image
              src={artistPfp}
              alt="Artist Profile"
              width={280}
              height={280}
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sideplayer;
