"use client";

import { useCart } from "@/components/CartContext";
import { BagIcon } from "@/components/icons";

export default function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Ver carrito de pedido"
      className="relative rounded-full p-2 text-brown-dark transition-colors hover:bg-beige-light"
    >
      <BagIcon className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-dark px-1 text-[11px] font-semibold text-cream">
          {itemCount}
        </span>
      )}
    </button>
  );
}
