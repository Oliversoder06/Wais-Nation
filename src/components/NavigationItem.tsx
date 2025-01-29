import Image from "next/image";
import Link from "next/link";

const NavigationItem = ({
  icon,
  label,
  anchor,
}: {
  icon: any;
  label: string;
  anchor?: string | "#";
}) => {
  return (
    <Link href={anchor || "#"}>
      <div className="w-full h-14 hover:bg-[#333360] cursor-pointer">
        <div className="flex gap-[20px] pl-[40px] items-center w-full h-full">
          <Image src={icon} alt={`${label} icon`} width={24} height={24} />
          <span className="text-white">{label}</span>
        </div>
      </div>
    </Link>
  );
};

export default NavigationItem;
