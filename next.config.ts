import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "lh3.googleusercontent.com"],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
