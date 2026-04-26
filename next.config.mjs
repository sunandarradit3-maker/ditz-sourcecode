/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ]
  }
};

export default nextConfig;