// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1", "res.cloudinary.com"], // add your domain here
  },
};

export default nextConfig;
