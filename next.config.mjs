/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net',
      't1.kakaocdn.net',
      't1',
      'contest16-objectstorage-imagebucket.kr.object.ncloudstorage.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // // 개발환경 설정
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  // output: 'standalone',
  // //
};

export default nextConfig;
