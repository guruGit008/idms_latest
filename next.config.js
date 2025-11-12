/** @type {import('next').NextConfig} */
const nextConfig = {
    // 👇 Keep this only if you must deploy with ESLint errors
    eslint: {
        ignoreDuringBuilds: true,
    },
    // 👆 END OF ADDED BLOCK

    images: {
        // --- REMOVED DEPRECATED 'domains' ARRAY ---
        
        remotePatterns: [
            // 1. Cloudinary (Where your profile photos are stored)
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Allows all paths on Cloudinary
            },
            // 2. BACKEND API HOSTNAME (CRITICAL FIX)
            // This is required for images served from the 'dev.tirangaidms.com' API.
            {
                protocol: "https",
                hostname: "dev.tirangaidms.com", // CORRECTED to the full backend URL
                pathname: "/**", // Allows all paths (e.g., /uploads, /assets, etc.)
            },
            // 3. Backend API on Port 8080 (Only needed if your API serves images on this port)
            {
                protocol: "https",
                hostname: "dev.tirangaidms.com",
                port: "8080", // Include the port if your images are served on it
                pathname: "/**",
            },
            // 4. Unsplash (External source you had in 'domains')
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            // 5. Localhost (For development testing)
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