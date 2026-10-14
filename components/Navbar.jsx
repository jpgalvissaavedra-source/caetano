import { nav } from "@/lib/site-data";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import CartButton from "@/components/CartButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-beige-dark/40 bg-cream/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#inicio" aria-label="Caetano — inicio">
          <Logo className="h-12 w-auto sm:h-14" />
        </a>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-brown transition-colors hover:text-sage-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  );
}
