import { notFound } from "next/navigation";
import { getArtistDetails, getArtistTopTracks } from "@/lib/spotify";
import LongSongCard from "@/components/LongSongCard";
// Make sure these are exported from your spotify.ts
// getArtistTopTracks is a function you'll define to fetch popular tracks for an artist

interface ArtistPageProps {
  // Important: declare `params` as a Promise, not an object
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

  // We'll reuse followers.total as "monthly listeners" for demonstration
  const monthlyListeners = artist.followers.total.toLocaleString();

  return (
    <div className="flex flex-col text-white bg-secondary min-h-screen">
      {/* Hero / Banner Section */}
      <div
        className="relative w-full h-80 bg-cover bg-center flex items-end p-8"
        style={{
          backgroundImage: artist.images?.[0]?.url
            ? `url(${artist.images[0].url})`
            : "none",
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
          <p className="mt-2 text-sm text-gray-200">
            {monthlyListeners} monthly listeners
          </p>
          <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-green-400 transition">
            Follow
          </button>
        </div>
      </div>

      {/* Popular Tracks Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="p-8">
          {/* <h2 className="text-2xl font-bold mb-4">Popular</h2> */}
          <div className="flex flex-col gap-2">
            {topTracks.map((track) => (
              <LongSongCard
                key={track.id}
                title={track.name}
                artist={track.artists.map((a) => a.name).join(", ")}
                album={track.album.name}
                date={
                  track.album.release_date
                    ? track.album.release_date
                    : "Unknown"
                }
                duration={formatDuration(track.duration_ms)}
                cover={track.album.images?.[0]?.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
