import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  image: string;
  price: number;
  quantity: number;
  variant: {
    size: string;
    color: string;
    colorHex: string;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  get subtotal(): number;
  get total(): number;
  get itemCount(): number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find(
          (i) =>
            i.productId === item.productId &&
            i.variant.size === item.variant.size &&
            i.variant.color === item.variant.color
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({
            items: [
              ...items,
              { ...item, id: `cart-${Date.now()}-${Math.random()}` }
            ]
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      get subtotal() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      get total() {
        const subtotal = get().subtotal;
        const shipping = subtotal >= 50 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        return subtotal + shipping + tax;
      },

      get itemCount() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);
