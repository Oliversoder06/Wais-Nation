"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavigationItem = ({
  icon,
  anchor,
  alt,
}: {
  icon: string;
  alt: string;
  anchor?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === anchor;

  return (
    <Link href={anchor || "#"}>
      <div className="relative flex justify-center items-center w-[84px]">
        {/* Left Indicator (Only visible when active) */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 w-[3px] h-[24px] bg-[#00FF99] rounded-tr-[2px] rounded-br-[2px] origin-top"
          />
        )}

        {/* Main Navigation Item with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`cursor-pointer w-[52px] h-[52px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#00FF99] to-[#026F69]" // Active Gradient
              : "hover:bg-[#2A2932]" // Hover Effect
          }`}
        >
          <Image src={icon} alt={`${alt} icon`} width={28} height={28} />
        </motion.div>
      </div>
    </Link>
  );
};

export default NavigationItem;
