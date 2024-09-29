/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  env: {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  },
};

export default nextConfig;
