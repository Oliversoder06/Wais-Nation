import Image from "next/image";
import React from "react";
interface CollectionsHeaderProps {
  gradient: string;
  image?: string;
  text: string;
  type: string;
}

const CollectionsHeader = ({
  gradient,
  image,
  text,
  type,
}: CollectionsHeaderProps) => {
  return (
    <div>
      <div
        className={`h-[calc(20vh)] bg-gradient-to-t ${gradient} flex flex-col md:flex-row md:justify-center items-center md:gap-[40px] gap-[32px] `}
      >
        <Image
          src={`/icons/${image}Page.svg`}
          alt="heart"
          width={150}
          height={150}
          className="size-[150px] md:size-[150px] rounded-[24px]"
        />
        <div className="flex flex-col justify-center gap-[16px]">
          <h1
            className={`text-white font-black md:text-[48px] text-4xl w-[438px]`}
          >
            {text}
          </h1>
          <h1 className="text-[#ABAABB] font-medium">{type}</h1>
        </div>
      </div>
    </div>
  );
};

export default CollectionsHeader;
