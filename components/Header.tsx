"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import GlobalSearch from "@/components/GlobalSearch";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Sobre", href: "/sobre" },
  { name: "Galeria", href: "/galeria" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-alva/90 backdrop-blur-md border-b border-rose/40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Principal">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-smooth hover:opacity-80">
              <Image
                src="/logo.svg"
                alt="Café Aurora"
                width={140}
                height={48}
                priority
                className="h-11 w-auto"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href.split("?")[0];
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-smooth ${
                    isActive
                      ? "bg-espresso text-alva"
                      : "text-espresso hover:bg-caramel/10 hover:text-caramel"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <GlobalSearch />
            <div className="hidden md:block">
              <Link
                href="/reservas"
                className="rounded-full bg-caramel px-6 py-2.5 text-sm font-bold text-alva shadow-md hover:bg-caramel/90 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
              >
                Reservar mesa
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-full p-2 text-espresso hover:bg-caramel/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu principal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose/40">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href.split("?")[0];
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-bold rounded-2xl transition-smooth ${
                      isActive
                        ? "bg-espresso text-alva"
                        : "text-espresso hover:bg-caramel/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="px-4 pt-2">
                <Link
                  href="/reservas"
                  className="block w-full rounded-full bg-caramel px-6 py-3 text-center text-base font-bold text-alva shadow-md hover:bg-caramel/90 transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reservar mesa
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
