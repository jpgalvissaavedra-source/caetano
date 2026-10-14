"use client";

import { useCallback, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Reveal from "@/components/Reveal";

export default function ProductsGallery({ categories }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = categories.find((c) => c.id === selectedId) ?? null;
  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={(index % 3) * 120}>
            <button
              type="button"
              onClick={() => setSelectedId(category.id)}
              aria-haspopup="dialog"
              className="w-full rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <ProductCard
                name={category.name}
                description={category.description}
                icon={category.icon}
                image={category.image}
                hasImage={category.hasImage}
              />
            </button>
          </Reveal>
        ))}
      </div>

      <ProductModal product={selected} onClose={closeModal} />
    </>
  );
}
