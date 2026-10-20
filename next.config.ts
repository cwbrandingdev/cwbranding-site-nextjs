import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin vem como pacote "externo" por padrão no Next. Empacotado,
  // o require() de dependências só-ESM (jose, usado por firebase-admin/auth)
  // é resolvido no build e funciona em qualquer versão do Node da Vercel.
  transpilePackages: ["firebase-admin"],
  images: {
    unoptimized: true,
  },
  // Cabeçalhos de segurança em todas as páginas.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Ninguém pode colocar o site dentro de um iframe (evita clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          // O navegador não "adivinha" o tipo dos arquivos.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Outros sites só veem o domínio de onde o visitante veio, não a página.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Recursos que o site não usa ficam bloqueados.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  experimental: {
    // Envio de imagens do blog pelo painel (padrão é 1MB). A Vercel aceita até 4.5MB.
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
