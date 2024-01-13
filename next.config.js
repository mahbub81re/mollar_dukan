/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ocynpzblizvh6eisuwuoca.on.drv.tw',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
