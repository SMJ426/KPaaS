/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net',
      't1.kakaocdn.net',
      'img1.kakaocdn.net',
      't1',
      'contest16-objectstorage-imagebucket.kr.object.ncloudstorage.com',
      'ssl.pstatic.net',
      'phinf.pstatic.net',
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
  webpack: (config, { dev, isServer }) => {
    // SVG 로더 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    console.log('Running Webpack config', { dev, isServer });

    if (!isServer) {
      config.devtool = 'source-map';
    }

    return config;
  },
  // 개발환경 설정 (필요시 주석 해제)
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  // output: 'standalone',
};

export default nextConfig;
