import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin vem como pacote "externo" por padrão no Next. Empacotado,
  // o require() de dependências só-ESM (jose, usado por firebase-admin/auth)
  // é resolvido no build e funciona em qualquer versão do Node da Vercel.
  transpilePackages: ["firebase-admin"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
