import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy outreach links used demo.html with query-string personalization.
      // Keep them alive while the new tokenized links use /demo/[token].
      {
        source: "/demo.html",
        destination: "/demo",
        permanent: true,
      },
      // Septic was removed as a featured niche; the old URL was live and
      // may be indexed/linked, so send it to the current flagship.
      {
        source: "/industries/septic",
        destination: "/industries/electrical",
        permanent: true,
      },
      // Tree service, well & pump, and self-storage were retired when the
      // site narrowed to electrical + garage door. Their URLs were live.
      {
        source: "/industries/tree-service",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/industries/well-pump",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/industries/self-storage",
        destination: "/industries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
