import type { NextConfig } from "next";

// STATIC_EXPORT=true gera a pasta `out/` para o deploy legado via FTP (Hostgator).
// Sem ela, o build é full stack (Vercel) e suporta Server Actions, Proxy etc.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport && { output: "export" }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
