import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWBranding — Agência de Marketing",
  description:
    "A sua agência de marketing. Social Media, Identidade Visual, Gestão de Tráfego e mais.",
  openGraph: {
    title: "CWBranding — Agência de Marketing",
    description: "A sua agência de marketing.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
