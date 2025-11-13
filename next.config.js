/** @type {import('next').NextConfig} */
const nextConfig = {
    // 👇 Keep this only if you must deploy with ESLint errors
    eslint: {
        ignoreDuringBuilds: true,
    },
    // 👆 END OF ADDED BLOCK

    // *** FIX START: Added 'headers' configuration to prevent redirect loop behind Nginx proxy ***
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/:path*',
                headers: [
                    // HSTS tells the browser to always use HTTPS for this domain.
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },
    // *** FIX END ***

    images: {
        // --- REMOVED DEPRECATED 'domains' ARRAY ---

        remotePatterns: [
            // 1. Cloudinary
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            // 2. BACKEND API HOSTNAME
            {
                protocol: "https",
                hostname: "dev.tirangaidms.com",
                pathname: "/**", 
            },
            // 3. Backend API on Port 8080
            {
                protocol: "https",
                hostname: "dev.tirangaidms.com",
                port: "8080", 
                pathname: "/**",
            },
            // 4. Unsplash
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            // 5. Localhost
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;