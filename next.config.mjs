/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deployed as a Next.js app on Catalyst (not a static `out/` export)
  trailingSlash: true,
  // Image optimization needs a server; not used by the site, disabled for safety
  images: { unoptimized: true },
};
export default nextConfig;
