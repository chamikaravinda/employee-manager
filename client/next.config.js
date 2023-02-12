const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/men/',
      },
    ],
  },
}

module.exports = nextConfig
