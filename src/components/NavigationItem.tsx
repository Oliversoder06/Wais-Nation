"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavigationItem = ({
  icon,
  anchor,
  alt,
  label,
  isExpanded,
}: {
  icon: string;
  alt: string;
  anchor?: string;
  label: string;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === anchor;

  return (
    <Link className="flex items-center" href={anchor || "#"}>
      <div className="relative flex justify-center items-center w-[84px]">
        {/* Left Indicator (Only visible when active) */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 w-[3px] h-[24px] bg-primary rounded-tr-[2px] rounded-br-[2px] origin-top"
          />
        )}

        {/* Main Navigation Item with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`cursor-pointer w-[52px] h-[52px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-primary to-[#026F69]" // Active Gradient
              : "hover:bg-[#2A2932]" // Hover Effect
          }`}
        >
          <Image src={icon} alt={`${alt} icon`} width={28} height={28} />
        </motion.div>
      </div>
      <span
        className={`absolute left-[100px] select-none text-xs  px-2 py-1 rounded-full transition-all duration-300 ${
          isExpanded
            ? isActive
              ? "text-primary font-bold"
              : "text-white opacity-80"
            : "hidden"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavigationItem;
