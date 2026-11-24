/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for Zoho Catalyst Slate (generates the `out/` directory)
  output: 'export',
  // Emit /ui-tools/<tool>/index.html so plain static hosts resolve clean URLs
  trailingSlash: true,
  // Image optimization needs a server; not used by the site, disabled for safety
  images: { unoptimized: true },
};
export default nextConfig;
