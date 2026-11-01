"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    content:
      "O melhor flat white de Curitiba, ponto. Vou toda quinta antes do trabalho e já virou tradição com a minha filha (os croissants aprovadíssimos).",
    author: "Bianca Alves",
    role: "Cliente desde 2022",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Cheguei para trabalhar um dia e acabei ficando até fechar. WiFi rápido, café coado no ponto e um ambiente que acolhe sem pressa.",
    author: "Rodrigo Tanaka",
    role: "Vizinho de Batel",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Reservei para o brunch de aniversário e as meninas ainda puseram flores na mesa. Atendimento de quem realmente gosta de receber gente.",
    author: "Camila Restrepo e Serjão",
    role: "Brunch de família",
    rating: 5,
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-semibold text-espresso sm:text-5xl">
            O que dizem por lá
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-espresso/70">
            Cada dia começa diferente. Os elogios, não.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              variants={item}
              className="rounded-3xl border border-rose/40 bg-alva p-8 transition-smooth hover:border-caramel"
            >
              <div className="mb-4 flex" aria-label={`${t.rating} de 5 estrelas`}>
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-caramel" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="mb-6 leading-relaxed text-espresso/85 italic">“{t.content}”</p>
              </blockquote>
              <cite className="not-italic">
                <div className="font-bold text-caramel">{t.author}</div>
                <div className="text-sm text-espresso/60">{t.role}</div>
              </cite>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
