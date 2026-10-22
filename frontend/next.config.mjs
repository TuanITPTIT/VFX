/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Vercel requires .next; keep local dev and production output separate.
  distDir:
    process.env.VERCEL === "1"
      ? ".next"
      : process.env.WEB_PHIM_BUILD_DIR ||
        (phase === "phase-development-server" ? ".next-dev-webpack" : ".next-production"),
});

export default nextConfig;
