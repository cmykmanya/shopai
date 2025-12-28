import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address, Order } from '@/lib/mock-data';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      orders: [],

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock login - in real app, validate against backend
        if (email && password) {
          const { users } = await import('@/lib/mock-data');
          const foundUser = users.find((u) => u.email === email);

          if (foundUser) {
            set({ user: foundUser, isAuthenticated: true });
            return true;
          }

          // Create new user for demo purposes
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: email.split('@')[0],
            email,
            addresses: [],
            createdAt: new Date().toISOString()
          };

          set({ user: newUser, isAuthenticated: true });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        set({
          user: get().user ? { ...get().user!, ...data } : null
        });
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        if (!get().user) return;

        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`
        };

        set({
          user: {
            ...get().user!,
            addresses: [...get().user!.addresses, newAddress]
          }
        });
      },

      updateAddress: (id: string, updates: Partial<Address>) => {
        if (!get().user) return;

        set({
          user: {
            ...get().user!,
            addresses: get().user!.addresses.map((addr) =>
              addr.id === id ? { ...addr, ...updates } : addr
            )
          }
        });
      },

      deleteAddress: (id: string) => {
        if (!get().user) return;

        set({
          user: {
            ...get().user!,
            addresses: get().user!.addresses.filter((addr) => addr.id !== id)
          }
        });
      },

      setDefaultAddress: (id: string) => {
        if (!get().user) return;

        set({
          user: {
            ...get().user!,
            addresses: get().user!.addresses.map((addr) => ({
              ...addr,
              isDefault: addr.id === id
            }))
          }
        });
      },

      addOrder: (order: Order) => {
        set({
          orders: [order, ...get().orders]
        });
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        orders: state.orders
      })
    }
  )
);
