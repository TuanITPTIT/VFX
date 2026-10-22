/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Separate Webpack development, production and any diagnostic output.
  distDir: process.env.WEB_PHIM_BUILD_DIR || (phase === "phase-development-server" ? ".next-dev-webpack" : ".next-production"),
});

export default nextConfig;
