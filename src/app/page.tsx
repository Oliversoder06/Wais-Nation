import SongCardSection from "@/components/SongCardSection";
import Image from "next/image";
import React from "react";

const Homepage = () => {
  return (
    <div className="mx-[40px]">
      <h2 className="text-white text-[32px] font-semibold">Home</h2>
      <div className="bg-white w-full max-w-[1440px] h-[220px] justify-self-center flex items-center justify-between px-10 rounded-[20px] mt-8">
        <Image
          src="/images/waismusic.png"
          alt="Liked icon"
          width={200}
          height={200}
        />
        <span className="text-black text-5xl tracking-[1em] text-center font-semibold">
          WAIS
          <br />
          MUSIC
        </span>
        <Image
          src="/images/waismusic.png"
          alt="Liked icon"
          width={200}
          height={200}
        />
      </div>

      <div className="mt-28">
        <h2 className="text-white text-[32px] font-semibold mb-6">
          Recommended
        </h2>
        <div>
          <SongCardSection />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
