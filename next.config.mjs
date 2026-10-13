/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = '';
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};
export default nextConfig;
