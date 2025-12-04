/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'a.espncdn.com',
          port: '',
          pathname: '**',
          search: '',
        },
        {
          protocol: 'https',
          hostname: 'brown-family-golf-imgs.s3.us-east-2.amazonaws.com',
          port: '',
          pathname: '**',
          search: '',
        },
      ], 
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: false,
    },
    experimental: {
      ...((() => {
        try {
          require.resolve('critters');
          return { optimizeCss: true };
        } catch {
          return {};
        }
      })()),
      optimizePackageImports: ['lodash', 'date-fns'],
      cssChunking: 'strict',
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        config.optimization.splitChunks.cacheGroups.styles = {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          enforce: true,
        };
      }
      return config;
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://a.espncdn.com https://brown-family-golf-imgs.s3.us-east-2.amazonaws.com; font-src 'self'; connect-src 'self'"
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            }
          ]
        }
      ]
    }
  }
  
  module.exports = nextConfig