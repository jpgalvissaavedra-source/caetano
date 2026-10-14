"use client";

import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";

export default function MobileMenu({ nav }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-brown-dark md:hidden"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-beige-dark/40 bg-cream px-6 pb-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium tracking-wide text-brown transition-colors hover:text-sage-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
