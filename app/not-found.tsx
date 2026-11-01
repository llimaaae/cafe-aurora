import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl py-16 text-center">
          <p className="font-display text-8xl font-semibold text-rose/60">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-espresso">
            Essa página foi pro torrador
          </h1>
          <p className="mt-4 text-lg text-espresso/70">
            Não achamos o que você procurou. Mas o café está pronto — segue ele.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-caramel px-8 py-4 text-base font-bold text-alva shadow-lg transition-smooth hover:bg-caramel/90"
            >
              Voltar pro início
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-espresso px-8 py-4 text-base font-bold text-espresso transition-smooth hover:bg-espresso hover:text-alva"
            >
              Ver menu
            </Link>
          </div>
          <div className="mt-12 border-t border-espresso/10 pt-8">
            <p className="text-sm text-espresso/60">Procurando algo específico?</p>
            <nav className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/reservas" className="text-caramel hover:underline">Reservas</Link>
              <span className="text-espresso/30">•</span>
              <Link href="/sobre" className="text-caramel hover:underline">Sobre</Link>
              <span className="text-espresso/30">•</span>
              <Link href="/galeria" className="text-caramel hover:underline">Galeria</Link>
              <span className="text-espresso/30">•</span>
              <Link href="/contato" className="text-caramel hover:underline">Contato</Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
