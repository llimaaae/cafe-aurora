import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cafe-aurora.vercel.app"),
  title: "Café Aurora | Onde todo amanhecer tem gosto de café",
  description:
    "Cafeteria de cafés especiais com brunch e confeitaria artesanal. Grãos de origem única, torra clara, queques feitos na casa. Curitiba - PR.",
  keywords: ["cafeteria", "café especial", "brunch", "confeitaria", "Curitiba", "coffee shop"],
  authors: [{ name: "Café Aurora" }],
  openGraph: {
    title: "Café Aurora | Cafés Especiais & Brunch",
    description: "Onde todo amanhecer tem gosto de café. Cafés especiais, brunch o dia inteiro, confeitaria artesanal.",
    url: "https://cafe-aurora.vercel.app",
    siteName: "Café Aurora",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Aurora | Cafés Especiais & Brunch",
    description: "Onde todo amanhecer tem gosto de café",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${nunito.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased font-sans text-espresso bg-alva">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
