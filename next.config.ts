import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Septic was removed as a featured niche; the old URL was live and
      // may be indexed/linked, so send it to the current flagship.
      {
        source: "/industries/septic",
        destination: "/industries/electrical",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
