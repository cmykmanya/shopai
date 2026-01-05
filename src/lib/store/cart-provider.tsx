'use client';

import { useCartStore } from './cart-store';
import { ReactNode } from 'react';

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Cart store is already initialized via Zustand
  return <>{children}</>;
}