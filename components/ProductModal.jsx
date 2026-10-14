"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { useCart } from "@/components/CartContext";
import { CloseIcon, PlusIcon, MinusIcon } from "@/components/icons";

export default function ProductModal({ product, onClose }) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAromas, setSelectedAromas] = useState([]); // [{ aroma, quantity }]
  const [quantity, setQuantity] = useState(1); // solo se usa cuando el producto no tiene aromas

  useEffect(() => {
    if (!product) return;
    setSelectedSize(product.presentations?.[0]?.size ?? null);
    setSelectedAromas([]);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const presentation = product.presentations?.find((p) => p.size === selectedSize);
  const hasAromas = product.aromas?.length > 0;
  const availableAromas = product.aromas?.filter(
    (aroma) => !selectedAromas.some((s) => s.aroma === aroma)
  );
  const canAdd = Boolean(presentation) && (!hasAromas || selectedAromas.length > 0);

  const addAroma = (aroma) => {
    setSelectedAromas((prev) => [...prev, { aroma, quantity: 1 }]);
  };

  const removeAroma = (aroma) => {
    setSelectedAromas((prev) => prev.filter((s) => s.aroma !== aroma));
  };

  const setAromaQuantity = (aroma, nextQuantity) => {
    setSelectedAromas((prev) =>
      prev.map((s) => (s.aroma === aroma ? { ...s, quantity: Math.max(1, nextQuantity) } : s))
    );
  };

  const handleAddToCart = () => {
    if (!canAdd || !presentation) return;
    const lines = hasAromas
      ? selectedAromas.map((s) => ({ aroma: s.aroma, quantity: s.quantity }))
      : [{ aroma: null, quantity }];

    lines.forEach((line) => {
      addItem({
        categoryId: product.id,
        name: product.name,
        size: presentation.size,
        price: presentation.price,
        aroma: line.aroma,
        quantity: line.quantity,
      });
    });
    onClose();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brown-dark/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-3xl bg-cream shadow-xl sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 rounded-full bg-cream/90 p-2 text-brown-dark shadow-sm transition-colors hover:bg-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="relative aspect-[853/1280] w-full shrink-0 bg-beige sm:w-1/2">
          {product.hasImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <ProductImagePlaceholder icon={product.icon} label={product.name} />
          )}
        </div>

        <div className="flex flex-col px-6 py-8 sm:w-1/2 sm:px-8">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-sage-dark">Caetano</p>
          <h3
            id="product-modal-title"
            className="font-serif text-3xl font-semibold text-brown-dark"
          >
            {product.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-brown">{product.description}</p>

          {product.presentations?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brown/70">
                Presentación
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.presentations.map((p) => (
                  <button
                    key={p.size}
                    type="button"
                    onClick={() => setSelectedSize(p.size)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === p.size
                        ? "bg-brown text-cream"
                        : "bg-beige-light text-brown-dark ring-1 ring-beige-dark/50 hover:bg-beige"
                    }`}
                  >
                    {p.size} — {p.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasAromas && (
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brown/70">
                Aromas{" "}
                <span className="normal-case tracking-normal text-brown/50">
                  (elegí uno o varios, cada uno con su propia cantidad)
                </span>
              </h4>

              {selectedAromas.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {selectedAromas.map((s) => (
                    <li
                      key={s.aroma}
                      className="flex items-center justify-between rounded-xl bg-beige-light px-3 py-2 ring-1 ring-beige-dark/50"
                    >
                      <span className="text-sm font-medium text-brown-dark">{s.aroma}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAromaQuantity(s.aroma, s.quantity - 1)}
                          aria-label={`Restar unidad de ${s.aroma}`}
                          className="rounded-full border border-beige-dark/60 p-1 text-brown-dark transition-colors hover:bg-beige"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-brown-dark">
                          {s.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAromaQuantity(s.aroma, s.quantity + 1)}
                          aria-label={`Sumar unidad de ${s.aroma}`}
                          className="rounded-full border border-beige-dark/60 p-1 text-brown-dark transition-colors hover:bg-beige"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeAroma(s.aroma)}
                          aria-label={`Quitar ${s.aroma}`}
                          className="ml-1 rounded-full p-1 text-brown/50 transition-colors hover:text-brown-dark"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {availableAromas.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {availableAromas.map((aroma) => (
                    <button
                      key={aroma}
                      type="button"
                      onClick={() => addAroma(aroma)}
                      className="rounded-full bg-beige-light px-3 py-1 text-xs font-medium text-brown-dark ring-1 ring-beige-dark/50 transition-colors hover:bg-beige"
                    >
                      + {aroma}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasAromas && (
            <div className="mt-6 flex items-center gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brown/70">
                Cantidad
              </h4>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Restar unidad"
                  className="rounded-full border border-beige-dark/60 p-1.5 text-brown-dark transition-colors hover:bg-beige-light"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-medium text-brown-dark">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Sumar unidad"
                  className="rounded-full border border-beige-dark/60 p-1.5 text-brown-dark transition-colors hover:bg-beige-light"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canAdd}
            className="mt-8 inline-flex w-fit items-center rounded-full bg-brown px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            Agregar al carrito
          </button>
          {hasAromas && selectedAromas.length === 0 && (
            <p className="mt-2 text-xs text-brown/60">Elegí al menos un aroma para continuar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
