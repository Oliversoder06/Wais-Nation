import Image from "next/image";

interface LongSongCardProps {
  title: string;
  artist: string;
  album: string;
  date: string;
}

export default function LongSongCard({
  title,
  artist,
  album,
  date,
}: LongSongCardProps) {
  return (
    <div className="bg-[#151418] w-full h-[92px] rounded-[8px] flex items-center justify-between px-[16px]">
      <div className="flex gap-4 items-center">
        <Image
          src={"/images/playlist.svg"}
          alt="Song Cover"
          width={48}
          height={48}
          className="rounded-md"
        />
        <div className="flex flex-col leading-[24px]">
          <span className="text-white text-[20px] font-semibold">{title}</span>
          <span className="text-[#ABAAB8] text-[16px]">{artist}</span>
        </div>
      </div>
      <span className="text-[#ABAABB]">{album}</span>
      <span className="text-[#ABAABB]">{date}</span>
      <span className="text-[#ABAABB] pr-[16px]">3:45</span>
    </div>
  );
}
