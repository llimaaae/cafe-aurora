import type { Metadata } from "next";
import Header from "@/components/Header";

const BASE_URL = "https://cafe-aurora.vercel.app";

export const metadata: Metadata = {
  title: "Menu | Café Aurora",
  description:
    "Menu do Café Aurora: cafés especiais, brunch o dia inteiro, confeitaria artesanal, bebidas e grãos para levar.",
  alternates: { canonical: `${BASE_URL}/menu` },
  openGraph: {
    title: "Menu | Café Aurora",
    description: "Cafés especiais, brunch e confeitaria artesanal em Curitiba.",
    url: `${BASE_URL}/menu`,
  },
};

export default function MenuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menu Café Aurora",
    url: `${BASE_URL}/menu`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }} />
      {children}
    </>
  );
}
