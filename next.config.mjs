/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Aetherion Vercel project sets SITE=aetherion so its root URL serves
  // /aetherion; the HODINKEE project leaves it unset.
  async rewrites() {
    return {
      beforeFiles: process.env.SITE === "aetherion" ? [{ source: "/", destination: "/aetherion" }] : [],
    };
  },
  async headers() {
    return [
      {
        // The frame sequence never changes between deploys of the same name,
        // so let browsers and Vercel's edge cache it aggressively.
        source: "/video-split/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
