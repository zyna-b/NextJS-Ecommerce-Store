"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import QuantitySelector from "./quantity-selector";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, data.size?.id, data.color?.id);
  };

  return (
    <li className="flex flex-row items-center gap-4 py-6 border-b border-gray-300">
      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt={data?.name}
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-black mb-1">{data.name}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
            <span>{data.color?.name}</span>
            <span>{data.size?.name}</span>
          </div>
          <Currency value={data.price} />
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <QuantitySelector
            id={data.id}
            colorId={data.color?.id}
            sizeId={data.size?.id}
          />
          <IconButton onClick={onRemove} icons={<X size={15} />} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
