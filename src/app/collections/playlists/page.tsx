"use client";

import LongPlaylistCard from "@/components/LongPlaylistCard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";

// Define the Playlist type
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
      const { data, error } = await supabase.from("playlists").select("*");
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
            {playlists.length} playlists
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
          <span className="text-[#ABAABB]">Sign in to create playlists</span>
        )}
      </div>

      {/* Modal for Creating Playlist */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#0E0E0E] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
            <h2 className="text-white text-2xl font-bold">
              Create New Playlist
            </h2>
            <input
              type="text"
              placeholder="Playlist Name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-600"
            />
            <textarea
              placeholder="Playlist Description"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-600"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={createPlaylist}
              >
                Create
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
      ) : playlists.length < 1 ? (
        <span className="text-[#ABAABB] text-lg text-center mt-[40px]">
          Looks pretty empty.
        </span>
      ) : (
        <div className="flex flex-col gap-4 mx-[40px]">
          {playlists.map((playlist, index) => (
            <div key={playlist.id} className="flex items-center gap-4">
              <span className="text-white text-lg font-semibold w-[24px] text-right">
                {index + 1}
              </span>
              <LongPlaylistCard
                name={playlist.name}
                description={playlist.description}
                owner={playlist.user_id === userId ? "You" : "Other User"}
                onEdit={() => console.log("Edit Playlist:", playlist.name)}
                onDelete={() => console.log("Delete Playlist:", playlist.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
