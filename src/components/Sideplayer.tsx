"use client";
import Image from "next/image";
import React, { useState } from "react";

const Sideplayer = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Image
        src="/icons/open-sidebar.svg"
        alt="open sidebar"
        width={40}
        height={40}
        className="cursor-pointer fixed right-0 top-0 m-[20px] z-50 hidden md:block xl:hidden"
        onClick={handleOpen}
      />
      <div>
        {open && (
          <div>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={handleOpen}
            ></div>
            <div className="w-[364px] bg-gradient-to-t from-background to-[#17493B] fixed right-0 h-[calc(100vh-100px)] flex flex-col justify-end p-[20px] gap-[40px] z-40">
              <div className="flex items-center justify-between">
                <div className="flex flex-col leading-[32px]">
                  <span className="text-white font-semibold text-[32px]">
                    sEXY
                  </span>
                  <span className="text-[#ABAABB] font-medium ">
                    Wais Music
                  </span>
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
          </div>
        )}
      </div>
      <div className="w-[364px] bg-gradient-to-t from-background to-[#17493B] fixed right-0 h-[calc(100vh-100px)] xl:flex flex-col justify-end p-[20px] gap-[40px] hidden">
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
    </div>
  );
};

export default Sideplayer;
