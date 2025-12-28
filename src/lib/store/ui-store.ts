import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProductId: string | null;
  mobileFilterOpen: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  scrollPosition: number;
  isScrolled: boolean;

  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;

  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;

  openQuickView: (productId: string) => void;
  closeQuickView: () => void;

  toggleMobileFilter: () => void;
  openMobileFilter: () => void;
  closeMobileFilter: () => void;

  showToast: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  hideToast: () => void;

  setScrollPosition: (position: number) => void;
  setScrolled: (isScrolled: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMenuOpen: false,
  isSearchOpen: false,
  isQuickViewOpen: false,
  quickViewProductId: null,
  mobileFilterOpen: false,
  toast: {
    show: false,
    message: '',
    type: 'success'
  },
  scrollPosition: 0,
  isScrolled: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openQuickView: (productId: string) =>
    set({ isQuickViewOpen: true, quickViewProductId: productId }),
  closeQuickView: () =>
    set({ isQuickViewOpen: false, quickViewProductId: null }),

  toggleMobileFilter: () =>
    set((state) => ({ mobileFilterOpen: !state.mobileFilterOpen })),
  openMobileFilter: () => set({ mobileFilterOpen: true }),
  closeMobileFilter: () => set({ mobileFilterOpen: false }),

  showToast: (message, type = 'success') =>
    set({
      toast: { show: true, message, type }
    }),

  hideToast: () =>
    set({
      toast: { show: false, message: '', type: 'success' }
    }),

  setScrollPosition: (position) => set({ scrollPosition: position }),
  setScrolled: (isScrolled) => set({ isScrolled })
}));
