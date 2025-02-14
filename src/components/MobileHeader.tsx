import { UserButton } from "@clerk/nextjs";
import React from "react";
import AuthButtons from "./AuthButtons";

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-between  h-[60px] fixed top-0 left-0 right-0 z-[100] px-[16px]">
      <AuthButtons />
      <UserButton />
    </div>
  );
};

export default MobileHeader;
