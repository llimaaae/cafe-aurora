"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuData, categories, allTags, type MenuItem } from "@/data/menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag));
      return matchesSearch && matchesCategory && matchesTags && item.available;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const groupedMenu = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredMenu.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredMenu]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose/40 via-alva to-sage/20 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center">
              <Breadcrumbs items={[{ name: "Menu" }]} />
            </div>
            <motion.h1
              className="font-display text-5xl font-semibold text-espresso sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Menu
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-xl text-espresso/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Cafés especiais, brunch o dia inteiro e confeitaria feita na madrugada.
            </motion.p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-20 z-40 border-b border-espresso/10 bg-white/95 py-6 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="relative mx-auto max-w-xl">
                <input
                  type="search"
                  placeholder="Buscar por item ou ingrediente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-espresso/15 bg-white px-4 py-3 pl-12 transition-smooth focus:outline-none focus:ring-2 focus:ring-caramel"
                  aria-label="Buscar no menu"
                />
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-espresso/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-smooth ${
                  selectedCategory === null ? "bg-espresso text-alva" : "bg-alva text-espresso hover:bg-rose/40"
                }`}
              >
                Tudo
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-smooth ${
                    selectedCategory === category ? "bg-espresso text-alva" : "bg-alva text-espresso hover:bg-rose/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-smooth ${
                    selectedTags.includes(tag)
                      ? "bg-sage text-alva"
                      : "bg-sage/10 text-espresso hover:bg-sage/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {(searchQuery || selectedCategory || selectedTags.length > 0) && (
              <p className="mt-4 text-center text-sm text-espresso/60">
                {filteredMenu.length} {filteredMenu.length === 1 ? "item encontrado" : "itens encontrados"}
              </p>
            )}
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {Object.keys(groupedMenu).length === 0 ? (
              <div className="py-16 text-center">
                <svg className="mx-auto mb-4 h-16 w-16 text-espresso/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg text-espresso/60">Nada encontrado por aqui</p>
                <p className="mt-2 text-sm text-espresso/40">Tenta ajustar os filtros ou limpar a busca</p>
              </div>
            ) : (
              Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category} className="mb-16">
                  <h2 className="mb-8 text-center font-display text-3xl font-semibold text-espresso sm:text-4xl">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group rounded-3xl bg-white p-3 shadow-md transition-smooth hover:shadow-xl"
                      >
                        <div className="relative h-48 overflow-hidden rounded-2xl">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {item.tags.length > 0 && (
                            <div className="absolute left-3 top-3 space-y-1">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="block rounded-full bg-rose/95 px-2 py-1 text-xs font-bold text-espresso"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <h3 className="font-display text-xl font-semibold text-espresso transition-smooth group-hover:text-caramel">
                              {item.name}
                            </h3>
                            <span className="whitespace-nowrap text-lg font-bold text-caramel">
                              R$ {item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-espresso/70">{item.description}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-rose/40 to-sage/20 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">
              Deu fome lendo o menu?
            </h2>
            <p className="mt-3 text-lg text-espresso/70">
              Reserva está a dois cliques. Mesa quente, pão quente, café quente.
            </p>
            <a
              href="/reservas"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-caramel px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-caramel/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
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
