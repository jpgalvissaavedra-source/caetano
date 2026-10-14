import { brand } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-b from-beige-light via-cream to-cream px-6 text-center"
    >
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sage-light/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-beige-dark/40 blur-3xl"
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sage-dark">
          Cosmética natural artesanal
        </p>
        <h1 className="font-serif text-6xl font-semibold text-brown-dark sm:text-7xl">
          {brand.name}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-brown">
          Cuidado hecho a mano, con ingredientes naturales, para transformar tu rutina diaria
          en un pequeño ritual de bienestar.
        </p>
        <a
          href="#productos"
          className="mt-10 inline-block rounded-full bg-brown px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown-dark hover:shadow-lg"
        >
          Ver productos
        </a>
      </Reveal>
    </section>
  );
}
