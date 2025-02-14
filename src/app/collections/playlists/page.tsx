"use client";

import LongPlaylistCard from "@/components/LongPlaylistCard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { createPlaylist } from "@/lib/playlists";
import toast from "react-hot-toast";
import CollectionsHeader from "@/components/CollectionsHeader";

interface Playlist {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at?: string;
}

const Playlists: React.FC = () => {
  const { userId, isSignedIn } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("playlists")
        .select("id, name, description, user_id");

      if (error) {
        toast.error("Error fetching playlists:");
        console.log("Error fetching playlists: ", error);
      } else {
        setPlaylists(data || []);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!isSignedIn || !userId || !playlistName || !playlistName.trim()) {
      toast.error("User not logged in or invalid input");
      return;
    }

    const newPlaylist = await createPlaylist(
      userId,
      playlistName,
      playlistDescription
    );

    if (newPlaylist) {
      setPlaylists((prev) => [...prev, ...newPlaylist]);
      setShowModal(false);
      setPlaylistName("");
      setPlaylistDescription("");
    }
    toast.success("Playlist created successfully");
  };

  const handleDeletePlaylist = (playlistId: string) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const amount = playlists.filter(
    (playlist) => playlist.user_id === userId
  ).length;

  return (
    <div>
      {/* DEKSTOP VIEW */}
      <div className="flex-col gap-8 hidden md:flex pb-[50px] ">
        {/* Header Section */}

        <CollectionsHeader
          gradient="from-[#1D1C24] to-[#104344]"
          image="playlist"
          text="Your Playlists"
          type={`${amount} playlists`}
        />
        <div className="flex items-center justify-end mr-[40px]">
          {isSignedIn ? (
            <Image
              src="/icons/create-plus.svg"
              alt="Create New Playlist"
              width={64}
              height={64}
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <p className="text-[#ABAABB]">
              <SignInButton>
                <span className="cursor-pointer hover:underline text-blue-500">
                  Sign in
                </span>
              </SignInButton>{" "}
              to create playlists
            </p>
          )}
        </div>
        {/* Create Playlist Button */}

        {/* Modal for Creating Playlist */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-[#1D1C24] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
              <div className="flex justify-between">
                <h2 className="text-white text-2xl font-bold">
                  Create New Playlist
                </h2>
                <Image
                  src="/icons/cross.svg"
                  alt="cross icon"
                  width={28}
                  height={28}
                  className="cursor-pointer self-end"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Playlist Name"
                  value={playlistName}
                  maxLength={50}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]"
                />
                {playlistName.length > 0 &&
                  (playlistName.length < 50 ? (
                    <span className="text-[#ABAABB] text-sm text-right">
                      {playlistName.length}/50
                    </span>
                  ) : (
                    <span className="text-[#ff1616] text-sm text-right">
                      {playlistName.length}/50
                    </span>
                  ))}
              </div>
              <div className="flex flex-col">
                <textarea
                  placeholder="Playlist Description"
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  maxLength={100}
                  className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none"
                ></textarea>
                {/* Character Counter */}
                {playlistDescription.length > 0 &&
                  (playlistDescription.length < 100 ? (
                    <span className="text-[#ABAABB] text-sm text-right">
                      {playlistDescription.length}/100
                    </span>
                  ) : (
                    <span className="text-[#ff1616] text-sm text-right">
                      {playlistDescription.length}/100
                    </span>
                  ))}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]"
                  onClick={handleCreatePlaylist}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Playlists Display */}
        {loading ? (
          <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
            Loading playlists...
          </span>
        ) : playlists.filter((playlist) => playlist.user_id === userId).length <
          1 ? (
          <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
            Looks pretty empty.
          </span>
        ) : (
          <div className="flex flex-col gap-4 mx-[40px]">
            {playlists
              .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
              .map((playlist, index) => (
                <div key={playlist.id} className="flex items-center gap-4">
                  <LongPlaylistCard
                    owner="You"
                    name={playlist.name}
                    description={playlist.description}
                    id={playlist.id}
                    onDelete={() => handleDeletePlaylist(playlist.id)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* MOBILE VIEW */}
      <div className="pb-[100px] flex flex-col md:hidden px-[16px] mt-[15px]">
        <div className="">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col">
              <span className="font-bold text-white text-[24px]">
                Playlists
              </span>
              <span className="text-nit">
                {amount} {amount > 1 ? "playlists" : "playlist"}
              </span>
            </div>
            {isSignedIn ? (
              <Image
                src="/icons/create-plus.svg"
                alt="Create New Playlist"
                width={48}
                height={48}
                className="cursor-pointer"
                onClick={() => setShowModal(true)}
              />
            ) : (
              <p className="text-[#ABAABB]">
                <SignInButton>
                  <span className="cursor-pointer hover:underline text-blue-500">
                    Sign in
                  </span>
                </SignInButton>{" "}
                to create playlists
              </p>
            )}
          </div>
        </div>

        {/* Playlists Display */}
        <div className="flex flex-col gap-4 px-[16px] mt-4 md:hidden">
          {loading ? (
            <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
              Loading playlists...
            </span>
          ) : playlists.filter((playlist) => playlist.user_id === userId)
              .length < 1 ? (
            <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
              Looks pretty empty.
            </span>
          ) : (
            <div className="flex flex-col gap-4">
              {playlists
                .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
                .map((playlist) => (
                  <div key={playlist.id} className="flex items-center gap-2">
                    <LongPlaylistCard
                      owner="You"
                      name={playlist.name}
                      description={playlist.description}
                      id={playlist.id}
                      onDelete={() => handleDeletePlaylist(playlist.id)}
                    />
                  </div>
                ))}
            </div>
          )}

          {/* Create Playlist Button */}
          <div className="flex justify-center">
            {/* Modal for Creating Playlist */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-[#1D1C24] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h2 className="text-white text-2xl font-bold">
                      Create New Playlist
                    </h2>
                    <Image
                      src="/icons/cross.svg"
                      alt="cross icon"
                      width={28}
                      height={28}
                      className="cursor-pointer self-end"
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Playlist Name"
                      value={playlistName}
                      maxLength={50}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]"
                    />
                    {playlistName.length > 0 &&
                      (playlistName.length < 50 ? (
                        <span className="text-[#ABAABB] text-sm text-right">
                          {playlistName.length}/50
                        </span>
                      ) : (
                        <span className="text-[#ff1616] text-sm text-right">
                          {playlistName.length}/50
                        </span>
                      ))}
                  </div>
                  <div className="flex flex-col">
                    <textarea
                      placeholder="Playlist Description"
                      value={playlistDescription}
                      onChange={(e) => setPlaylistDescription(e.target.value)}
                      maxLength={100}
                      className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none"
                    ></textarea>
                    {/* Character Counter */}
                    {playlistDescription.length > 0 &&
                      (playlistDescription.length < 100 ? (
                        <span className="text-[#ABAABB] text-sm text-right">
                          {playlistDescription.length}/100
                        </span>
                      ) : (
                        <span className="text-[#ff1616] text-sm text-right">
                          {playlistDescription.length}/100
                        </span>
                      ))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]"
                      onClick={handleCreatePlaylist}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
