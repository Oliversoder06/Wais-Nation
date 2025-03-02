"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LongPlaylistCard_1 = __importDefault(require("@/components/LongPlaylistCard"));
const image_1 = __importDefault(require("next/image"));
const react_1 = __importStar(require("react"));
const supabase_1 = require("@/lib/supabase");
const nextjs_1 = require("@clerk/nextjs");
const playlists_1 = require("@/lib/playlists");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const CollectionsHeader_1 = __importDefault(require("@/components/CollectionsHeader"));
const Playlists = () => {
    const { userId, isSignedIn } = (0, nextjs_1.useAuth)();
    const [playlists, setPlaylists] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [playlistName, setPlaylistName] = (0, react_1.useState)("");
    const [playlistDescription, setPlaylistDescription] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const fetchPlaylists = async () => {
            setLoading(true);
            const { data, error } = await supabase_1.supabase
                .from("playlists")
                .select("id, name, description, user_id");
            if (error) {
                react_hot_toast_1.default.error("Error fetching playlists:");
            }
            else {
                setPlaylists(data || []);
            }
            setLoading(false);
        };
        fetchPlaylists();
    }, []);
    const handleCreatePlaylist = async () => {
        if (!isSignedIn || !userId || !playlistName || !playlistName.trim()) {
            react_hot_toast_1.default.error("User not logged in or invalid input");
            return;
        }
        const newPlaylist = await (0, playlists_1.createPlaylist)(userId, playlistName, playlistDescription);
        if (newPlaylist) {
            setPlaylists((prev) => [...newPlaylist, ...prev]);
            setShowModal(false);
            setPlaylistName("");
            setPlaylistDescription("");
        }
        react_hot_toast_1.default.success("Playlist created successfully");
    };
    const handleDeletePlaylist = (playlistId) => {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
    };
    const amount = playlists.filter((playlist) => playlist.user_id === userId).length;
    return (<div>
      {/* DEKSTOP VIEW */}
      <div className="flex-col gap-8 hidden md:flex pb-[50px] ">
        {/* Header Section */}

        <CollectionsHeader_1.default gradient="from-secondary to-[#104344]" image="Playlist" text="Your Playlists" type={`${amount} playlists`}/>
        <div className="flex items-center justify-end mr-[40px]">
          {isSignedIn ? (<image_1.default src="/icons/create-plus.svg" alt="Create New Playlist" width={64} height={64} className="cursor-pointer" onClick={() => setShowModal(true)}/>) : (<p className="text-[#ABAABB]">
              <nextjs_1.SignInButton>
                <span className="cursor-pointer hover:underline text-blue-500">
                  Sign in
                </span>
              </nextjs_1.SignInButton>{" "}
              to create playlists
            </p>)}
        </div>
        {/* Create Playlist Button */}

        {/* Modal for Creating Playlist */}
        {showModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
              <div className="flex justify-between">
                <h2 className="text-white text-2xl font-bold">
                  Create New Playlist
                </h2>
                <image_1.default src="/icons/cross.svg" alt="cross icon" width={28} height={28} className="cursor-pointer self-end" onClick={() => setShowModal(false)}/>
              </div>
              <div className="flex flex-col">
                <input type="text" placeholder="Playlist Name" value={playlistName} maxLength={50} onChange={(e) => setPlaylistName(e.target.value)} className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]"/>
                {playlistName.length > 0 &&
                (playlistName.length < 50 ? (<span className="text-[#ABAABB] text-sm text-right">
                      {playlistName.length}/50
                    </span>) : (<span className="text-[#ff1616] text-sm text-right">
                      {playlistName.length}/50
                    </span>))}
              </div>
              <div className="flex flex-col">
                <textarea placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} maxLength={100} className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none"></textarea>
                {/* Character Counter */}
                {playlistDescription.length > 0 &&
                (playlistDescription.length < 100 ? (<span className="text-[#ABAABB] text-sm text-right">
                      {playlistDescription.length}/100
                    </span>) : (<span className="text-[#ff1616] text-sm text-right">
                      {playlistDescription.length}/100
                    </span>))}
              </div>
              <div className="flex justify-center gap-4">
                <button className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]" onClick={handleCreatePlaylist}>
                  Save
                </button>
              </div>
            </div>
          </div>)}

        {/* Playlists Display */}
        {loading ? (<span className="text-[#ABAABB] text-lg text-center mt-[40px]">
            Loading playlists...
          </span>) : playlists.filter((playlist) => playlist.user_id === userId).length <
            1 ? (<span className="text-[#ABAABB] text-lg text-center mt-[40px]">
            Looks pretty empty.
          </span>) : (<div className="flex flex-col gap-4 mx-[40px]">
            {playlists
                .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
                .map((playlist) => (<div key={playlist.id} className="flex items-center gap-4">
                  <LongPlaylistCard_1.default owner="You" name={playlist.name} description={playlist.description} id={playlist.id} onDelete={() => handleDeletePlaylist(playlist.id)}/>
                </div>))}
          </div>)}
      </div>

      {/* MOBILE VIEW */}
      <div className="pb-[100px] flex flex-col md:hidden px-[16px]  bg-gradient-to-t from-secondary to-[#104344] h-[150px] gap-16">
        <div className="flex justify-between w-full items-center mt-[48px]">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col">
              <span className="font-bold text-white text-[24px]">
                Playlists
              </span>
              <span className="text-nit">
                {amount} {amount > 1 ? "playlists" : "playlist"}
              </span>
            </div>
            {isSignedIn ? (<image_1.default src="/icons/create-plus.svg" alt="Create New Playlist" width={48} height={48} className="cursor-pointer" onClick={() => setShowModal(true)}/>) : (<p className="text-[#ABAABB]">
                <nextjs_1.SignInButton>
                  <span className="cursor-pointer hover:underline text-blue-500">
                    Sign in
                  </span>
                </nextjs_1.SignInButton>{" "}
                to create playlists
              </p>)}
          </div>
        </div>

        {/* Playlists Display */}
        <div className="flex flex-col gap-4 mt-4 md:hidden pb-[100px]">
          {loading ? (<span className="text-[#ABAABB] text-lg text-center mt-[40px]">
              Loading playlists...
            </span>) : playlists.filter((playlist) => playlist.user_id === userId)
            .length < 1 ? (<span className="text-[#ABAABB] text-lg text-center mt-[40px]">
              Looks pretty empty.
            </span>) : (<div className="flex flex-col gap-4">
              {playlists
                .filter((playlist) => playlist.user_id === userId) // Filter playlists by userId
                .map((playlist) => (<div key={playlist.id} className="flex items-center gap-2">
                    <LongPlaylistCard_1.default owner="You" name={playlist.name} description={playlist.description} id={playlist.id} onDelete={() => handleDeletePlaylist(playlist.id)}/>
                  </div>))}
            </div>)}

          {/* Create Playlist Button */}
          <div className="flex justify-center">
            {/* Modal for Creating Playlist */}
            {showModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-secondary p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h2 className="text-white text-2xl font-bold">
                      Create New Playlist
                    </h2>
                    <image_1.default src="/icons/cross.svg" alt="cross icon" width={28} height={28} className="cursor-pointer self-end" onClick={() => setShowModal(false)}/>
                  </div>
                  <div className="flex flex-col">
                    <input type="text" placeholder="Playlist Name" value={playlistName} maxLength={50} onChange={(e) => setPlaylistName(e.target.value)} className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731]"/>
                    {playlistName.length > 0 &&
                (playlistName.length < 50 ? (<span className="text-[#ABAABB] text-sm text-right">
                          {playlistName.length}/50
                        </span>) : (<span className="text-[#ff1616] text-sm text-right">
                          {playlistName.length}/50
                        </span>))}
                  </div>
                  <div className="flex flex-col">
                    <textarea placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} maxLength={100} className="p-2 rounded-md bg-[#282731] text-white outline-none focus:border-[#383646] border-[2px] border-[#282731] resize-none"></textarea>
                    {/* Character Counter */}
                    {playlistDescription.length > 0 &&
                (playlistDescription.length < 100 ? (<span className="text-[#ABAABB] text-sm text-right">
                          {playlistDescription.length}/100
                        </span>) : (<span className="text-[#ff1616] text-sm text-right">
                          {playlistDescription.length}/100
                        </span>))}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="px-8 py-2 bg-white text-black font-semibold rounded-md hover:bg-[#E5E5E5]" onClick={handleCreatePlaylist}>
                      Save
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>);
};
exports.default = Playlists;
