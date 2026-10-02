/** @type {import('next').NextConfig} */

// GitHub Pages serves this project from /priyanshu_portfolio. Change BASE_PATH
// here if the site moves (for example to a user site at the domain root).
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/priyanshu_portfolio' : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
};

module.exports = nextConfig;
