"use client";
import Image from "next/image";
import React, { useState } from "react";

const Sideplayer = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="w-[364px] bg-gradient-to-t from-background to-[#17493B] fixed right-0 h-[calc(100vh-100px)] flex flex-col justify-end p-[20px] gap-[40px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col leading-[32px]">
          <span className="text-white font-semibold text-[32px]">sEXY</span>
          <span className="text-[#ABAABB] font-medium ">Wais Music</span>
        </div>
        <Image
          src={isLiked ? "/icons/heart.svg" : "/icons/empty-heart.svg"}
          alt="empty heart"
          width={28}
          height={28}
          onClick={handleLike}
          className="cursor-pointer hover:opacity-80"
        />
      </div>
      <div className="h-[300px] w-full bg-white rounded-sm"></div>
    </div>
  );
};

export default Sideplayer;
