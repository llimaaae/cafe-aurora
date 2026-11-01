"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-caramel to-rose py-16 text-espresso sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Amanhã, na primeira xícara?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-espresso/80">
            Reserve agora e a sua mesa vai estar quente — igual ao pão que sai às 7h.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/reservas"
              className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-espresso/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "cta_click", { location: "cta_section", action: "reservar_mesa" });
                }
              }}
            >
              Reservar mesa
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-espresso bg-transparent px-8 py-4 text-base font-bold text-espresso transition-smooth hover:bg-espresso hover:text-alva focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
            >
              Ver menu do dia
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
