import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Size, Color, Product } from '@/types';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  size: Size; // selected size
  color: Color; // selected color
  quantity: number; // selected quantity
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, sizeId?: string, colorId?: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, quantity: number, sizeId?: string, colorId?: string) => void;
}

const useCart = create(
  persist<CartState>((set, get) => ({
    // Initialize the cart with an empty array of items
    items: [],

    // Add an item to the cart
    // If the item already exists, show a toast message
    addItem: (data: CartItem) => {
      const currentItems = get().items;
      // Defensive: check for valid size and color
      if (!data.size || !data.color || !data.size.id || !data.color.id) {
        toast.error("Invalid size or color. Cannot add to cart.");
        return;
      }
      const existingItem = currentItems.find(
        (item) => item.id === data.id && item.size.id === data.size.id && item.color.id === data.color.id
      );

      if (existingItem) {
        toast.success("Item with selected size and color already in cart! Please update the quantity if needed.");
        return;
      }

      set({ items: [...currentItems, { ...data, quantity: data.quantity ?? 1 }] });
      toast.success("Item added to cart");
    },

    // Remove an item from the cart by its ID
    // This function filters out the item with the specified ID from the cart
    removeItem: (id: string, sizeId?: string, colorId?: string) => {
      set({
        items: get().items.filter((item) => {
          if (sizeId && colorId) {
            return !(item.id === id && item.size.id === sizeId && item.color.id === colorId);
          }
          return item.id !== id;
        })
      });
      toast.success("Item removed from cart");
    },

    // Remove all items from the cart
    // This function sets the items array to an empty array
    removeAll: () => {
      set({ items: [] });
      toast.success("All items removed from cart");
    },

    // Update the quantity of an item in the cart
    updateQuantity: (id: string, quantity: number, sizeId?: string, colorId?: string) => {
      const currentItems = get().items;
      let updatedItems;
      if (quantity <= 0) {
        updatedItems = currentItems.filter(item => {
          if (sizeId && colorId) {
            return !(item.id === id && item.size.id === sizeId && item.color.id === colorId);
          }
          return item.id !== id;
        });
      } else {
        updatedItems = currentItems.map(item => {
          if (sizeId && colorId) {
            return item.id === id && item.size.id === sizeId && item.color.id === colorId
              ? { ...item, quantity }
              : item;
          }
          return item.id === id ? { ...item, quantity } : item;
        });
      }
      set({ items: updatedItems });
    //   toast.success("Item quantity updated");
    }
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
