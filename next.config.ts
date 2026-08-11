import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ana klasörde duran yabancı bir package-lock.json yüzünden Next.js kökü
  // C:\Users\celik sanıyordu; kökü açıkça bu projeye sabitliyoruz.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
