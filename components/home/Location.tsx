"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage">
                Vem tomar um café com a gente
              </span>
              <h2 className="mt-2 font-display text-4xl font-semibold text-espresso sm:text-5xl">
                Batel, onde os grãos encontram as mesas
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-bold text-espresso">Endereço</h3>
                <address className="not-italic text-espresso/70">
                  Rua das Paineiras, 77<br />
                  Batel<br />
                  Curitiba - PR, 80240-080
                </address>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-espresso">Horários</h3>
                <dl className="space-y-2 text-espresso/70">
                  <div className="flex justify-between">
                    <dt className="font-bold">Terça a Sexta:</dt>
                    <dd>8h00 - 19h00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-bold">Sábado:</dt>
                    <dd>9h00 - 20h00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-bold">Domingo:</dt>
                    <dd>9h00 - 14h00 (brunch)</dd>
                  </div>
                  <div className="flex justify-between font-bold text-caramel">
                    <dt>Segunda:</dt>
                    <dd>Fechado</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-espresso">Contato</h3>
                <div className="space-y-2 text-espresso/70">
                  <p>
                    <a href="tel:+554132227788" className="transition-smooth hover:text-caramel">
                      (41) 3222-7788
                    </a>
                  </p>
                  <p>
                    <a href="mailto:ola@cafeaurora.com.br" className="transition-smooth hover:text-caramel">
                      ola@cafeaurora.com.br
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://www.google.com/maps/search/Rua+das+Paineiras,+77+Batel+Curitiba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center font-bold text-caramel transition-smooth hover:text-espresso"
                >
                  Abrir no Google Maps
                  <svg
                    className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] overflow-hidden rounded-[2.5rem] shadow-xl"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose/30 to-sage/20">
              <div className="text-center">
                <svg className="mx-auto mb-4 h-16 w-16 text-espresso/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-espresso/40">Mapa ilustrativo</p>
                <p className="mt-2 text-xs text-espresso/30">Rua das Paineiras, 77 - Batel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
