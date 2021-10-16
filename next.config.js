const config = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CONSOLA_LEVEL: parseInt(process.env.CONSOLA_LEVEL),
    MF_DATA_EXPIRY_SECONDS: parseInt(process.env.MF_DATA_EXPIRY_SECONDS),
  },
}
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(config)
