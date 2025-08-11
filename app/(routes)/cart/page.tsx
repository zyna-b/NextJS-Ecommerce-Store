"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import React from "react";

import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const cart = useCart();
  return (
    <div className="bg-gradient-to-br from-fashion-light via-fashion-accent to-white min-h-screen rounded-xl shadow-fashion">
      <Container>
        <div className="px-4 py-16 sm:px-8 lg:px-16">
          <h1 className="text-4xl font-bold text-fashion-primary mb-8 tracking-tight">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {/* Cart items will be rendered here */}
              {cart.items.length === 0 && (
                <p className="text-neutral-500">Your cart is empty.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={`${item.id}-${item.size?.id}-${item.color?.id}`} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
