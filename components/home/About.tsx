"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-espresso py-16 text-alva sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-rose">
              Duas baristas, um balcão
            </span>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Feito por pessoas que acordam pensando em café
            </h2>
            <div className="space-y-4 leading-relaxed text-alva/80">
              <p>
                O Café Aurora nasceu em 2019, quando Marina e Sofia deixaram os escritórios e trocaram post-its por um torrador no fundo do salão. A ideia era simples: servir o café que a gente gostaria de beber todas as manhãs — e comida boa sem frescura.
              </p>
              <p>
                O pão fermenta sozinho. O leite atinge a temperatura certa — nem mais quente. E o brunch não tem hora marcada, porque fome não consulta relógio.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 border-t border-alva/15 pt-8">
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-rose">7</div>
                <div className="text-sm text-alva/60">Origens na prateleira</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-rose">72h</div>
                <div className="text-sm text-alva/60">Fermenção do pão</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-semibold text-rose">18h</div>
                <div className="text-sm text-alva/60">Cold brew de espera</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            <Image
              src="/images/barista-1.webp"
              alt="Barista preparando café no balcão da cafeteria"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
