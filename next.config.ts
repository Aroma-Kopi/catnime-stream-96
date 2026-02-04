import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
