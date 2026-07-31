import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cwbranding.com.br"),
  title: {
    default: "CWBranding — Agência de Marketing Digital",
    template: "%s | CWBranding",
  },
  description:
    "A sua agência de marketing. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
  keywords: [
    "Agência de Marketing",
    "Social Media",
    "Identidade Visual",
    "Gestão de Tráfego",
    "Branding",
    "Marketing Digital",
  ],
  authors: [{ name: "CWBranding" }],
  creator: "CWBranding",
  publisher: "CWBranding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CWBranding — Agência de Marketing Digital",
    description:
      "A sua agência de marketing. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
    url: "https://cwbranding.com.br",
    siteName: "CWBranding",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CWBranding — Agência de Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CWBranding — Agência de Marketing Digital",
    description:
      "A sua agência de marketing. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
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
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-18362264746"
            strategy="afterInteractive"
          />
          <Script id="google-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18362264746');
            `}
          </Script>
        </head>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  );
}