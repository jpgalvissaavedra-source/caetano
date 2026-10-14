import Image from "next/image";
import { about } from "@/lib/site-data";
import { publicFileExists } from "@/lib/public-file-exists";
import Reveal from "@/components/Reveal";

export default function About() {
  const hasImage = publicFileExists(about.image);

  return (
    <section id="nosotros" className="px-6 py-24 sm:py-28">
      <div
        className={`mx-auto max-w-6xl ${
          hasImage ? "grid items-center gap-12 lg:grid-cols-2" : "max-w-3xl text-center"
        }`}
      >
        {hasImage && (
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[853/1220] w-full overflow-hidden rounded-3xl bg-beige-light shadow-sm">
              <Image
                src={about.image}
                alt="Productos artesanales Caetano"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        )}

        <Reveal
          delay={hasImage ? 150 : 0}
          className={hasImage ? "order-1 text-left lg:order-2" : ""}
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sage-dark">
            Nuestra historia
          </p>
          <h2 className="font-serif text-4xl font-semibold text-brown-dark sm:text-5xl">
            {about.title}
          </h2>

          <div className="mt-8 space-y-6">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-loose text-brown sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
