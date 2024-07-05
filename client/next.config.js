/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1048174905,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "85eeaa72af04417438d8b6b8d3408b64",
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
