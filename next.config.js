/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  i18n: {
    locales: ["ja", "en", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
}

module.exports = nextConfig
