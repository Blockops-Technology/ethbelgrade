// const { BLOG_URL } = process.env

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/:path*',
//         destination: `/:path*`,
//       },
//       {
//         source: '/blog',
//         destination: `${BLOG_URL}/blog`,
//       },
//       {
//         source: '/blog/:path*',
//         destination: `${BLOG_URL}/blog/:path*`,
//       },
//     ]
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const BLOG_URL = 'https://mirror-next-nine.vercel.app'

module.exports = {
  // ...nextConfig,
  // async redirects() {
  //   return [
  //     {
  //       source: '/guide',
  //       destination: 'https://belgrade-blockchain-week.notion.site/Manual-69d7a82d41fb4eea8ba7e450ec0f12a8',
  //       permanent: false,
  //     },
  //     {
  //       source: '/agenda',
  //       destination: '/#agenda',
  //       permanent: false,
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/blog',
        destination: `${BLOG_URL}/blog`,
      },
      {
        source: '/blog/:path*',
        destination: `${BLOG_URL}/blog/:path*`,
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
