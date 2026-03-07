import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [], // This array holds all the food the user adds

  // Action to add food to the cart
  addToCart: (item) =>
    set((state) => {
      // Check if the item is already in the cart
      const existingItem = state.cartItems.find((x) => x._id === item._id);

      if (existingItem) {
        // If it is, just increase the quantity
        return {
          cartItems: state.cartItems.map((x) =>
            x._id === item._id ? { ...x, qty: x.qty + 1 } : x,
          ),
        };
      } else {
        // If it's new, add it with a quantity of 1
        return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
      }
    }),

  // Action to remove food from the cart completely
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((x) => x._id !== id),
    })),

  // Action to empty the cart after checkout
  clearCart: () => set({ cartItems: [] }),
}));
