import { notFound } from "next/navigation";
import {
  getArtistDetails,
  getArtistTopTracks,
  getArtistAlbums,
} from "@/lib/spotify";
import LongSongCard from "@/components/LongSongCard";
import AlbumCarousel from "@/components/AlbumCarousel";

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  // 1) Await the params object
  const { id } = await params;

  // 2) Fetch artist details
  const artist = await getArtistDetails(id);
  if (!artist) {
    notFound();
  }

  // 3) Fetch artist’s top tracks
  const topTracks = await getArtistTopTracks(id);
  if (!topTracks) {
    notFound();
  }

  // 4) Fetch artist’s albums
  const albums = await getArtistAlbums(id);
  if (!albums) {
    notFound();
  }

  // We'll reuse followers.total as "monthly listeners" for demonstration
  const followers = artist.followers.total.toLocaleString();

  // Cloudinary transformation URL with face detection.
  // Adjust the width (w_1200) and height (h_400) as needed.
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const artistBgImage = artist.images?.[0]?.url
    ? `https://res.cloudinary.com/${cloudName}/image/fetch/w_1200,h_400,c_fill,g_face/${artist.images[0].url}`
    : "none";

  return (
    <div className="flex flex-col text-white bg-secondary min-h-screen">
      {/* Hero / Banner Section */}
      <div
        className="relative w-full h-[400px] bg-center bg-cover flex items-end p-8"
        style={{
          backgroundImage:
            artistBgImage !== "none" ? `url(${artistBgImage})` : "none",
          backgroundPosition: "50% 50%",
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Artist Info */}
        <div className="relative z-10 flex flex-col">
          <span className="text-blue-400 mb-2 text-sm uppercase">
            Verified Artist
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold">{artist.name}</h1>
          <p className="mt-2 text-sm text-gray-200">{followers} followers</p>
          <button className="mt-4 bg-green-500 text-black px-28 py-2 rounded-full font-semibold hover:bg-green-400 transition w-max">
            Follow
          </button>
        </div>
      </div>
      {/* Popular Tracks Section */}
      <div className="p-[40px]">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="hidden md:grid grid-cols-[48px_1fr_1fr_1fr_72px] gap-4 px-4 py-2 items-end">
              <span className="w-[48px] h-[48px]" />
              <span className="text-nit font-semibold">Title</span>
              <span className="text-nit font-semibold">Album</span>
              <span className="text-nit font-semibold">Released</span>
              <span className="text-nit font-semibold text-right">
                Duration
              </span>
            </div>
            <div className="w-full h-[1px] bg-[#2e2e2e]" />
          </div>
          <div className="flex flex-col">
            {topTracks.map((track) => (
              <LongSongCard
                key={track.id}
                title={track.name}
                artist={track.artists.map((a) => a.name).join(", ")}
                album={track.album.name}
                date={track.album.release_date || "Unknown"}
                duration={formatDuration(track.duration_ms)}
                cover={track.album.images?.[0]?.url}
              />
            ))}
          </div>

          <div className="mt-8">
            {/* SHOW ALBUMS */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Albums</h2>
              <AlbumCarousel albums={albums} artistName={artist.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
