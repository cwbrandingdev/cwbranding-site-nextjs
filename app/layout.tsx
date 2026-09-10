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
    default: "CWBranding — A sua estratégia.",
    template: "%s | CWBranding",
  },
  description:
    "A sua agência de estratégia. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
  keywords: [
    "Agência de Branding",
    "Social Media",
    "Identidade Visual",
    "Gestão de Tráfego",
    "Branding",
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
    title: "CWBranding — A sua estratégia.",
    description:
      "A sua agência de estratégia. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
    url: "https://cwbranding.com.br",
    siteName: "CWBranding",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CWBranding — A sua estratégia.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CWBranding — A sua estratégia",
    description:
      "A sua agência de estratégia. Especialistas em Social Media, Identidade Visual, Gestão de Tráfego Pago e Branding.",
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
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PJT9N6ML');
            `}
          </Script>
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
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PJT9N6ML"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  );
}
