/** @type {import('next').NextConfig} */
import pkg from './package.json' assert { type: "json" };
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 自定义 output 配置
    config.output = {
      ...config.output,
      library: `${pkg.name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${pkg.name}`,
    };
    return config;
  },
};

export default nextConfig;
