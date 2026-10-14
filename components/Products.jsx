import { productCategories } from "@/lib/site-data";
import { publicFileExists } from "@/lib/public-file-exists";
import ProductsGallery from "@/components/ProductsGallery";
import Reveal from "@/components/Reveal";

export default function Products() {
  const categories = productCategories.map((category) => ({
    ...category,
    hasImage: publicFileExists(category.image),
  }));

  return (
    <section id="productos" className="bg-beige-light/60 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sage-dark">Nuestra línea</p>
          <h2 className="font-serif text-4xl font-semibold text-brown-dark sm:text-5xl">
            Productos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brown">
            Cada producto está elaborado con dedicación, pensando en las necesidades de cada
            piel y en el placer de un buen ritual de cuidado. Tocá una tarjeta para ver más
            detalle.
          </p>
        </Reveal>

        <ProductsGallery categories={categories} />
      </div>
    </section>
  );
}
