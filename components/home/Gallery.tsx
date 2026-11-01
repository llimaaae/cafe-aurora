"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/images/cafe-interior-1.webp", alt: "Mesa de café com xícaras e bolo servido", category: "Ambiente" },
  { id: 2, src: "/images/coffee-1.webp", alt: "Cappuccino com polvilho de cacau", category: "Cafés" },
  { id: 3, src: "/images/brunch-2.webp", alt: "Prato de brunch servido no balcão", category: "Brunch" },
  { id: 4, src: "/images/cake-1.webp", alt: "Fatia de bolo com calda de chocolate", category: "Confeitaria" },
  { id: 5, src: "/images/barista-1.webp", alt: "Barista trabalhando no balcão", category: "Balcão" },
  { id: 6, src: "/images/beans-1.webp", alt: "Café sendo coado com balança", category: "Balcão" },
];

export default function Gallery() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-semibold text-espresso sm:text-5xl">
            Um olhar por dentro
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-espresso/70">
            Luz de manhã, balcão quente e amizades viradas para o café.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-3xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-espresso/10 transition-smooth group-hover:bg-espresso/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-alva/90 px-4 py-2 text-sm font-bold text-espresso opacity-0 transition-smooth group-hover:opacity-100">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/galeria"
            className="group inline-flex items-center font-bold text-caramel transition-smooth hover:text-espresso"
          >
            Ver galeria completa
            <svg
              className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
