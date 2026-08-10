/** @type {import('next').NextConfig} */
const isGitHubPages =
  process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

const basePath = isGitHubPages ? '/uaminfra-ita-IT-214' : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
