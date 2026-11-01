"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featured = [
  {
    id: 1,
    name: "Latte Art do Dia",
    description: "Espresso duplo com leite vaporizado: a arte muda a cada tarde, o carinho não.",
    price: "R$ 14,00",
    image: "/images/coffee-2.webp",
    imageAlt: "Xícara branca com latte art delicado",
    tag: "Destaque do Barista",
  },
  {
    id: 2,
    name: "Brunch Aurora",
    description: "Ovos mexidos, bacon artesanal, sourdough, abacate e salada verde. Serve dois (ou um com muita fome).",
    price: "R$ 34,00",
    image: "/images/brunch-1.webp",
    imageAlt: "Prato de brunch com ovos, torradas e salada",
    tag: "Destaque do Chef",
  },
  {
    id: 3,
    name: "Croissant de Manteiga",
    description: "72 horas de fermentação e 27 camadas laminadas à mão. Crocância que se ouve.",
    price: "R$ 12,00",
    image: "/images/bakery-1.webp",
    imageAlt: "Croissant de manteiga fresco sobre mesa clara",
    tag: "Sai quentinho",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Highlights() {
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
            Queridinhos da casa
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-espresso/70">
            O que os clientes pedem duas vezes no mesmo mês.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featured.map((dish) => (
            <motion.article
              key={dish.id}
              variants={item}
              className="group rounded-3xl bg-white p-3 shadow-md transition-smooth hover:shadow-xl"
            >
              <div className="relative h-60 overflow-hidden rounded-2xl">
                <Image
                  src={dish.image}
                  alt={dish.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-rose/95 px-3 py-1 text-xs font-bold text-espresso">
                  {dish.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-espresso transition-smooth group-hover:text-caramel">
                    {dish.name}
                  </h3>
                  <span className="whitespace-nowrap text-lg font-bold text-caramel">{dish.price}</span>
                </div>
                <p className="text-sm leading-relaxed text-espresso/70">{dish.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/menu"
            className="group inline-flex items-center font-bold text-caramel transition-smooth hover:text-espresso"
          >
            Ver menu completo
            <svg
              className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
