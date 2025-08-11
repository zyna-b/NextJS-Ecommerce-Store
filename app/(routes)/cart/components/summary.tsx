"use client";

import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment successful!");
      removeAll(); // Clear the cart after successful payment
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [removeAll, searchParams]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        // Send the items and their quantities to the backend 
        // to create a checkout session
        cartItems: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          sizeId: item.size?.id,
          colorId: item.color?.id,
        })),
      }
    );

    window.location = response.data.url;
  };

  return (
    console.log("Rendering Summary Component"),
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className="mt-6 w-full">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
