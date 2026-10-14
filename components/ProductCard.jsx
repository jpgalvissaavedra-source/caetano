import Image from "next/image";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";

export default function ProductCard({ name, description, icon, image, hasImage }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white/60 p-4 shadow-sm ring-1 ring-beige-dark/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {hasImage ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-beige">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <ProductImagePlaceholder icon={icon} label={name} />
      )}
      <div className="px-2 pb-2 pt-5 text-left">
        <h3 className="font-serif text-2xl font-semibold text-brown-dark">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brown">{description}</p>
      </div>
    </article>
  );
}
