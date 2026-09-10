/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "news.taal.gov.ph" },
      { protocol: "https", hostname: "taal.ph" },
      { protocol: "https", hostname: "shoestringdiary.wordpress.com" },
      { protocol: "https", hostname: "*.r2.dev" }
    ]
  }
};
export default nextConfig;
