import Image from "next/image";

const DesktopSearchbar = () => {
  return (
    <div className="relative flex justify-self-center">
      <input
        type="text"
        placeholder="Search for your favorite songs..."
        className="w-[452px] h-[48px] bg-[#2F2E36] rounded-full text-white placeholder:text-nit px-[44px] border-none outline-none"
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute top-[50%] left-[12px] transform translate-y-[-50%]"
      />
    </div>
  );
};

export default DesktopSearchbar;
