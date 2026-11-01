"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/hero-cafe.webp"
        alt="Mão segurando xícara de café com latte art contra luz de amanhecer"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/40 to-rose/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="mb-4 inline-block rounded-full bg-rose/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-espresso">
            Cafés especiais &amp; Brunch
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-alva sm:text-6xl lg:text-7xl">
            Onde todo amanhecer tem gosto de <span className="text-rose">café</span>
          </h1>
          <p className="mt-4 text-lg text-alva/90 sm:text-xl">
            Grãos de origem única, torra clara, confeitaria feita ontem à noite — e brunch o dia inteiro.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/reservas"
              className="inline-flex items-center justify-center rounded-full bg-caramel px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-caramel/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alva"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "cta_click", { location: "hero", action: "reservar_mesa" });
                }
              }}
            >
              Reservar mesa
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-alva bg-alva/10 px-8 py-4 text-base font-bold text-alva backdrop-blur-sm transition-smooth hover:bg-alva hover:text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alva"
            >
              Ver menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
