"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion";

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-rose/40 via-alva to-sage/20 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center">
              <Breadcrumbs items={[{ name: "Sobre" }]} />
            </div>
            <motion.h1
              className="font-display text-5xl font-semibold text-espresso sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossa história
            </motion.h1>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 leading-relaxed text-espresso/80">
              <p className="font-display text-xl font-semibold text-espresso">
                Em 2019, duas baristas decidiram que o café da manhã merecia mais respeito.
              </p>
              <p>
                Marina vinha da torra, Sofia do atendimento em restaurantes. As duas se conheceram num campeonato de baristas — e desistiram das vagas de escritário compradas com horas extras para abrir um espaço onde o espresso fosse levado a sério e o atendimento, engraçadamente, não.
              </p>
              <p>
                O nome veio rápido. <em>Aurora</em> é o momento em que a luz vira dia — e o café é exatamente isso para um monte de gente. Um amanhecer na xícara, todo dia, batizado com a mesma palavra.
              </p>
              <p>
                O pão de fermentação natural demorou mais: 72 horas por fornada, laminado à mão. A confeitaria funciona à madrugada, porque queque fresco às 7h não nasce às 10h. E o brunch foi o primeiro item escrito no quadro, ainda com giz.
              </p>
              <p>
                Hoje o Aurora é modesto no tamanho e imodesto no carinho: pet friendly, com WiFi de verdade, plantas que a Sofia rega com excesso de amor e uma mesa comprida que nunca fica vazia por mais de dez minutos.
              </p>
              <p className="font-display text-xl font-semibold text-espresso">
                Vem. O café já está à temperatura certa.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center font-display text-3xl font-semibold text-espresso sm:text-4xl">
              Quem trabalha aqui
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-44 w-44 overflow-hidden rounded-full shadow-lg">
                  <div className="h-full w-full bg-gradient-to-br from-caramel/40 to-rose/40" />
                </div>
                <h3 className="font-bold text-espresso">Marina Furtado</h3>
                <p className="font-bold text-caramel">Head Barista &amp; Torra</p>
                <p className="mt-1 text-sm text-espresso/70">Campeã regional de filtrados 2022. Fala com os grãos — e eles respondem.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-44 w-44 overflow-hidden rounded-full shadow-lg">
                  <div className="h-full w-full bg-gradient-to-br from-sage/40 to-rose/40" />
                </div>
                <h3 className="font-bold text-espresso">Sofia Kato</h3>
                <p className="font-bold text-caramel">Chef de Confeitaria</p>
                <p className="mt-1 text-sm text-espresso/70">Sourdough de 72 horas, lâmina de ouro e levedura com apelido.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-44 w-44 overflow-hidden rounded-full shadow-lg">
                  <div className="h-full w-full bg-gradient-to-br from-rose/40 to-caramel/40" />
                </div>
                <h3 className="font-bold text-espresso">Theo Andrade</h3>
                <p className="font-bold text-caramel">Cozinha &amp; Brunch</p>
                <p className="mt-1 text-sm text-espresso/70">Mestre dos ovos pochê. O bacon dele já tem fã-clube oficial.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
