"use client";

import { useEffect, useRef, useState } from "react";
import { useCart, parsePrice } from "@/components/CartContext";
import { contact } from "@/lib/site-data";
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon, BagIcon } from "@/components/icons";

function buildWhatsappMessage(items, total, buyer) {
  const lines = items.map((item) => {
    const details = [item.size, item.aroma].filter(Boolean).join(", ");
    const subtotal = parsePrice(item.price) * item.quantity;
    return `• ${item.name} (${details}) x${item.quantity} — ${subtotal} Bs`;
  });

  const buyerLines = [`Cliente: ${buyer.name.trim()}`];
  if (buyer.phone.trim()) buyerLines.push(`Teléfono: ${buyer.phone.trim()}`);

  return [
    "¡Hola! Quiero hacer el siguiente pedido de Caetano:",
    "",
    ...buyerLines,
    "",
    ...lines,
    "",
    `Total: ${total} Bs`,
  ].join("\n");
}

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, itemCount, total, isOpen, closeCart, buyer, setBuyer } =
    useCart();
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const nameValid = buyer.name.trim().length > 0;

  const whatsappHref = `${contact.whatsappUrl}?text=${encodeURIComponent(
    buildWhatsappMessage(items, total, buyer)
  )}`;

  const handleCheckoutClick = (e) => {
    if (!nameValid) {
      e.preventDefault();
      setNameTouched(true);
      nameInputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-brown-dark/70 backdrop-blur-sm"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-cream shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-beige-dark/40 px-6 py-5">
          <h3 id="cart-drawer-title" className="font-serif text-2xl font-semibold text-brown-dark">
            Tu pedido
          </h3>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 text-brown-dark transition-colors hover:bg-beige-light"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-brown/70">
              <BagIcon className="h-10 w-10 text-brown/40" />
              <p>Todavía no agregaste productos.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const subtotal = parsePrice(item.price) * item.quantity;
                return (
                  <li key={item.key} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-lg font-semibold text-brown-dark">
                        {item.name}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-brown/60">
                        {[item.size, item.aroma].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Restar unidad"
                          className="rounded-full border border-beige-dark/60 p-1 text-brown-dark transition-colors hover:bg-beige-light"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-medium text-brown-dark">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Sumar unidad"
                          className="rounded-full border border-beige-dark/60 p-1 text-brown-dark transition-colors hover:bg-beige-light"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-brown-dark">{subtotal} Bs</span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Quitar ${item.name}`}
                        className="text-brown/50 transition-colors hover:text-brown-dark"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-beige-dark/40 px-6 py-5">
            <div className="mb-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brown/70">
                Tus datos
              </h4>
              <div>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={buyer.name}
                  onChange={(e) => setBuyer({ name: e.target.value })}
                  onBlur={() => setNameTouched(true)}
                  placeholder="Nombre y apellido *"
                  className={`w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-sage-dark ${
                    nameTouched && !nameValid ? "border-red-300" : "border-beige-dark/50"
                  }`}
                />
                {nameTouched && !nameValid && (
                  <p className="mt-1 text-xs text-red-500">Ingresá tu nombre para continuar.</p>
                )}
              </div>
              <input
                type="tel"
                value={buyer.phone}
                onChange={(e) => setBuyer({ phone: e.target.value })}
                placeholder="Teléfono (opcional)"
                className="w-full rounded-xl border border-beige-dark/50 bg-white/70 px-4 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-sage-dark"
              />
            </div>

            <div className="flex items-center justify-between text-base">
              <span className="text-brown/70">
                Total ({itemCount} {itemCount === 1 ? "producto" : "productos"})
              </span>
              <span className="font-serif text-2xl font-semibold text-brown-dark">{total} Bs</span>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCheckoutClick}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-brown px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown-dark hover:shadow-lg"
            >
              Enviar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
