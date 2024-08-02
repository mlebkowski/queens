/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    webpack: (config) => ({
        ...config,
        optimization: {
            ...config.optimization,
            minimize: false,
        },
    }),
};

export default nextConfig;
