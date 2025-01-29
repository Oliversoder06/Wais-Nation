import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full h-[84px] fixed text-white flex justify-end items-end gap-10 pr-10">
      <Image src="/icons/Search.svg" alt="Search icon" width={40} height={40} />
      <Image src="/icons/Profile.svg" alt="Pfp" width={40} height={40} />
    </div>
  );
};

export default Navbar;
