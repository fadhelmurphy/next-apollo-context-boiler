/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,	
  webpack5: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['s4.anilist.co', 'via.placeholder.com'],
  },
	webpack: (config, options) => {
    // config.mode = "production";
		config.optimization.minimize = true;
		config.optimization.splitChunks = {
        // include all types of chunks
        chunks: 'all',
    };

		return config;

	},
}

module.exports = nextConfig
