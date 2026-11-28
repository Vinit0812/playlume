"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface BasketItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryTone?: string;
  price: number;
  moq: number;
  mrp: number;
  quantity: number;
}

interface QuoteBasketContextType {
  items: BasketItem[];
  addItem: (item: Omit<BasketItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearBasket: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalCount: number;
  estimatedTotal: number;
}

const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined);

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      hasLoadedRef.current = true;
      try {
        const saved = localStorage.getItem("playlume_quote_basket");
        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch {
        // Ignore storage errors
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hasLoadedRef.current) {
      try {
        localStorage.setItem("playlume_quote_basket", JSON.stringify(items));
      } catch {
        // Ignore storage errors
      }
    }
  }, [items]);

  const addItem = (product: Omit<BasketItem, "quantity">, qty?: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const addQty = qty || product.moq;
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + addQty } : i
        );
      }
      return [...prev, { ...product, quantity: addQty }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(i.moq, qty) } : i))
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const estimatedTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        isOpen,
        setIsOpen,
        totalCount,
        estimatedTotal,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
}

export function useQuoteBasket() {
  const ctx = useContext(QuoteBasketContext);
  if (!ctx) {
    throw new Error("useQuoteBasket must be used within a QuoteBasketProvider");
  }
  return ctx;
}
