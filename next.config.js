/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: '/speakerskit',
        destination: 'https://neon-pick-d1c.notion.site/ETH-Belgrade-2024-Speaker-s-Kit-1e07d7cf775c41a89fa7f7f01f8255da',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
