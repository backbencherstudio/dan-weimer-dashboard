import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening dev server from LAN IP (HMR/resources).
  allowedDevOrigins: ["192.168.7.56"],
  // Keep Turbopack rooted at this app folder when multiple lockfiles exist.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
