"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, src: "/images/cafe-interior-1.webp", alt: "Mesa do café com xícaras e bolo servido", category: "Ambiente" },
  { id: 2, src: "/images/coffee-1.webp", alt: "Cappuccino com polvilho de cacau na xícara branca", category: "Cafés" },
  { id: 3, src: "/images/brunch-2.webp", alt: "Prato de brunch servido na mesa", category: "Brunch" },
  { id: 4, src: "/images/cake-1.webp", alt: "Fatia de bolo fofa na travessa", category: "Confeitaria" },
  { id: 5, src: "/images/barista-1.webp", alt: "Barista trabalhando no balcão de café", category: "Balcão" },
  { id: 6, src: "/images/beans-1.webp", alt: "Café coado na hora com balança e equilíbrio", category: "Balcão" },
  { id: 7, src: "/images/bakery-1.webp", alt: "Croissants frescos na bandeja", category: "Confeitaria" },
  { id: 8, src: "/images/cafe-interior-2.webp", alt: "Cadeiras e plantas dentro da cafeteria", category: "Ambiente" },
  { id: 9, src: "/images/coffee-3.webp", alt: "Xícaras de espresso alinhadas no balcão", category: "Cafés" },
  { id: 10, src: "/images/juice-1.webp", alt: "Suco da estação fresquinho em copo de vidro", category: "Bebidas" },
  { id: 11, src: "/images/bakery-2.webp", alt: "Confeitaria assada com recheio de doce de leite", category: "Confeitaria" },
  { id: 12, src: "/images/hero-cafe.webp", alt: "Xícara com latte art contra a luz da manhã", category: "Cafés" },
];

const categories = ["Todos", "Ambiente", "Cafés", "Brunch", "Confeitaria", "Balcão", "Bebidas"];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filtered = selectedCategory === "Todos" ? galleryImages : galleryImages.filter((g) => g.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-rose/40 via-alva to-sage/20 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center">
              <Breadcrumbs items={[{ name: "Galeria" }]} />
            </div>
            <motion.h1
              className="font-display text-5xl font-semibold text-espresso sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Galeria
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-xl text-espresso/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Luz de manhã, balcão quente e amigos virados para o café.
            </motion.p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-6 py-2 text-sm font-bold transition-smooth ${
                    selectedCategory === cat ? "bg-espresso text-alva" : "bg-white text-espresso shadow-sm hover:bg-rose/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-3xl shadow-md transition-smooth hover:shadow-xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-espresso/10 transition-smooth group-hover:bg-espresso/30" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent p-4">
                    <p className="text-sm text-alva opacity-0 transition-smooth group-hover:opacity-100">
                      {image.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-espresso">
              Melhor do lado de cá do vidro?
            </h2>
            <p className="mt-3 text-lg text-espresso/70">Reserve e venha ver pessoalmente.</p>
            <a
              href="/reservas"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-caramel px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-caramel/90"
            >
              Reservar mesa
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
