import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-espresso/60">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="transition-smooth hover:text-caramel">
            Início
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1">
            <span aria-hidden="true">/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="transition-smooth hover:text-caramel">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold text-espresso">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
