// src/components/AddToPlaylistModal.tsx
import React from "react";
import Image from "next/image";

interface Playlist {
  id: string;
  name: string;
  description: string;
  user_id: string;
}

interface AddToPlaylistModalProps {
  playlists: Playlist[];
  loading: boolean;
  selectedPlaylists: string[];
  userId: string | null;
  handleCheckboxChange: (playlistId: string) => void;
  handleAddTracksToPlaylists: () => void;
  closeModal: () => void;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  playlists,
  loading,
  selectedPlaylists,
  userId,
  handleCheckboxChange,
  handleAddTracksToPlaylists,
  closeModal,
}) => {
  const userPlaylists = playlists.filter(
    (playlist) => playlist.user_id === userId
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
    >
      <div className="bg-[#2b2b2b] p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-white text-2xl font-bold">Add to Playlist</h2>
          <Image
            src="/icons/cross.svg"
            alt="cross icon"
            width={28}
            height={28}
            className="cursor-pointer self-end"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col">
          {loading ? (
            <div className="loader flex justify-self-center" />
          ) : userPlaylists.length === 0 ? (
            <p className="text-nit text-center">Looks pretty empty.</p>
          ) : (
            userPlaylists.map((playlist) => (
              <div key={playlist.id} className="flex flex-col gap-4">
                <label
                  htmlFor={playlist.id}
                  className="text-white cursor-pointer w-full p-5 flex items-center justify-between bg-[#2b2b2b] rounded-md transition hover:bg-[#3a3a3a]"
                >
                  <p className="max-w-[90%]">{playlist.name}</p>
                  <input
                    type="checkbox"
                    id={playlist.id}
                    className="hidden peer"
                    checked={selectedPlaylists.includes(playlist.id)}
                    onChange={() => handleCheckboxChange(playlist.id)}
                  />
                  <label
                    htmlFor={playlist.id}
                    className="size-6 border-2 border-[#ABAABB] rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-primary peer-checked:border-primary transition"
                  >
                    <svg
                      className="hidden"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </label>
                </label>
              </div>
            ))
          )}
        </div>
        <button
          onClick={handleAddTracksToPlaylists}
          className="bg-primary text-black p-2 rounded-md font-semibold w-full hover:bg-[#00e88f]"
        >
          Add to Playlist
        </button>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
