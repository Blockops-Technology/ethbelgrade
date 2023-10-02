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
        source: '/guide',
        destination: 'https://belgrade-blockchain-week.notion.site/Manual-69d7a82d41fb4eea8ba7e450ec0f12a8',
        permanent: false,
      },
      {
        source: '/agenda',
        destination: '/#agenda',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://mirror-next-mmlado.vercel.app/',
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
