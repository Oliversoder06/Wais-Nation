"use client";

import LongPlaylistCard from "@/components/LongPlaylistCard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SignInButton, useAuth } from "@clerk/nextjs";

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
        console.error("Error fetching playlists:", error.message);
      } else {
        setPlaylists(data || []);
      }
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  const createPlaylist = async () => {
    if (!isSignedIn || !userId || !playlistName.trim()) {
      console.error("User not logged in or invalid input");
      return;
    }

    const newPlaylist = {
      name: playlistName,
      description: playlistDescription,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("playlists")
      .insert([newPlaylist])
      .select();

    if (error) {
      console.error("Error creating playlist:", error.message);
    } else if (data) {
      setPlaylists((prev) => [...prev, ...data]);
      setShowModal(false);
      setPlaylistName("");
      setPlaylistDescription("");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="h-[calc(30vh)] bg-gradient-to-t from-[#026F69] to-[#0E0E0E] flex justify-center gap-[64px] mt-[40px]">
        <div className="size-[248px] bg-gradient-to-br from-[#00FF99] to-[#026F69] rounded-[24px] flex items-center justify-center">
          <Image
            src="/icons/playlist.svg"
            alt="playlist icon"
            width={84}
            height={84}
          />
        </div>
        <div className="flex flex-col justify-center gap-[8px]">
          <h1 className="text-white font-black text-[64px]">Your Playlists</h1>
          <h1 className="text-[#ABAABB] text-[20px] font-medium">
            {playlists.filter((playlist) => playlist.user_id === userId).length}{" "}
            playlists
          </h1>
        </div>
      </div>

      {/* Create Playlist Button */}
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

      {/* Modal for Creating Playlist */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-[#2b2b2b] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
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
                className="p-2 rounded-md bg-[#414141] text-white outline-none focus:border-[#636363] border-[2px] border-[#414141]"
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
                className="p-2 rounded-md bg-[#414141] text-white outline-none focus:border-[#636363] border-[2px] border-[#414141] resize-none"
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
                onClick={createPlaylist}
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
                <span className="text-white text-lg font-semibold w-[24px] text-right">
                  {index + 1}
                </span>
                <LongPlaylistCard playlistId="3cEYpjA9oz9GiPac4AsH4n?locale=en-US%2Cen%3Bq%3D0.9%2Csv%3Bq%3D0.8%2Cen-GB%3Bq%3D0.7" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
