import Logo from "@/components/Logo";
import { brand } from "@/lib/site-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige-dark/40 bg-beige-light/60 px-6 py-10 text-center">
      <Logo className="mx-auto h-14 w-auto" />
      <p className="mt-3 text-xs uppercase tracking-widest text-brown/60">
        © {year} {brand.name} — Cosmética natural artesanal
      </p>
    </footer>
  );
}
