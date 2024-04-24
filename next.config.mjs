import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'ipfs.io'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        canvas: false, 
      };
    } else {
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
