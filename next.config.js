// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // The domain you want to allow
        pathname: "/**", // Match all images from this domain
      },
    ],
  },
};
