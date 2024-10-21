/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Ensures that React will run in strict mode
    swcMinify: true,        // Uses the faster SWC compiler for minification
    poweredByHeader: false, // Remove the 'X-Powered-By' header for security reasons
    trailingSlash: false,   // Ensures cleaner URLs without trailing slashes
    compiler: {
      styledComponents: true, // Optional: If you're using styled-components for CSS-in-JS
    },
    images: {
      domains: ['example.com'], // Add domains from which you allow images to load
      formats: ['image/avif', 'image/webp'], // Use modern image formats for better performance
    },
    async headers() {
      return [
        {
          // Apply security headers to all routes
          source: "/(.*)",
          headers: [
            // {
            //   key: "Content-Security-Policy",
            //   value: "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' https://trustedcdn.com; style-src 'self' 'unsafe-inline';",
            // },
            // {
            //   key: "Strict-Transport-Security",
            //   value: "max-age=63072000; includeSubDomains; preload", // Enforce HTTPS
            // },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",  // Prevent MIME-sniffing
            },
            {
              key: "X-Frame-Options",
              value: "DENY", // Prevent clickjacking
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block",  // Basic protection against XSS attacks
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",  // Control referrer header
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  