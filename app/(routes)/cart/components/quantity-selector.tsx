"use client";
import React from "react";
import useCart from "@/hooks/use-cart";

interface QuantitySelectorProps {
  id: string;
  sizeId?: string;
  colorId?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ id, sizeId, colorId }) => {
  const cart = useCart();
  // Find the cart item by id, sizeId, colorId
  const cartItem = cart.items.find((item) => item.id === id && item.size?.id === sizeId && item.color?.id === colorId);
  const [quantity, setQuantity] = React.useState(cartItem?.quantity || 1);

  // Sync local state from global state only when cartItem changes
  React.useEffect(() => {
    if (cartItem && cartItem.quantity !== quantity) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const increment = () => {
    if (cartItem) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      cart.updateQuantity(id, newQuantity, sizeId, colorId);
    }
  };
  const decrement = () => {
    if (cartItem && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      cart.updateQuantity(id, newQuantity, sizeId, colorId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button className="px-2 py-1 bg-gray-200 rounded" onClick={decrement}>
        -
      </button>
      <span>{quantity}</span>
      <button className="px-2 py-1 bg-gray-200 rounded" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
