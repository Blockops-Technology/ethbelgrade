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
        destination: 'https://rightful-root-4b2.notion.site/ETH-Belgrade-2025-Speaker-s-Kit-5e1bfaa46273453cbf441793427ea7ab',
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
