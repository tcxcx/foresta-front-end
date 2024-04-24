import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'ipfs.io',
      '*.nectarnode.io',
      '*.ipfs.nectarnode.io',
      'ipfs.nectarnode.io',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false, canvas: false };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);