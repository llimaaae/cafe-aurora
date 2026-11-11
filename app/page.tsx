import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import Location from "@/components/home/Location";
import CTASection from "@/components/home/CTASection";

const BASE_URL = "https://cafe-aurora.vercel.app";

export default function Home() {
  const cafeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Café Aurora",
    description:
      "Cafeteria de cafés especiais com brunch e confeitaria artesanal.",
    url: BASE_URL,
    telephone: "+5500000000000",
    email: "ola@cafeaurora.com.br",
    servesCuisine: ["Café especial", "Brunch", "Confeitaria"],
    priceRange: "R$$",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua das Paineiras, 77",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "80240-080",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
    ],
    sameAs: [
      "https://instagram.com/cafeaurora",
      "https://facebook.com/cafeaurora",
      "https://tiktok.com/@cafeaurora",
    ],
    menu: `${BASE_URL}/menu`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Testimonials />
        <Gallery />
        <Location />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
