/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
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
    }
  }
  
  module.exports = nextConfig