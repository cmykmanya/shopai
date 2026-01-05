'use client';

import { useWishlistStore } from './wishlist-store';
import { ReactNode } from 'react';

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  // Wishlist store is already initialized via Zustand
  return <>{children}</>;
}