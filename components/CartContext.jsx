"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "caetano-cart";
const BUYER_STORAGE_KEY = "caetano-buyer";

export function parsePrice(price) {
  const match = String(price).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [buyer, setBuyerState] = useState({ name: "", phone: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(STORAGE_KEY);
      if (rawCart) setItems(JSON.parse(rawCart));
      const rawBuyer = localStorage.getItem(BUYER_STORAGE_KEY);
      if (rawBuyer) setBuyerState(JSON.parse(rawBuyer));
    } catch {
      // localStorage no disponible o datos corruptos: seguimos con valores por defecto.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(BUYER_STORAGE_KEY, JSON.stringify(buyer));
  }, [buyer, hydrated]);

  const addItem = useCallback((item) => {
    const key = `${item.categoryId}|${item.size}|${item.aroma ?? ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, key }];
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const setBuyer = useCallback((patch) => {
    setBuyerState((prev) => ({ ...prev, ...patch }));
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total,
      isOpen,
      openCart,
      closeCart,
      buyer,
      setBuyer,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total,
      isOpen,
      openCart,
      closeCart,
      buyer,
      setBuyer,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
