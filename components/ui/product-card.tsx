"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { useEffect } from "react";

import { Product, Size, Color } from "@/types";
import IconButton from "./icon-button";
import Currency from "./currency";
import { Expand, ShoppingCart } from "lucide-react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

const Star = ({ filled }: { filled: boolean }) => {
  return (
    <svg
      className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
    </svg>
  );
};

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  // Use the preview modal hook to manage the modal state
  // and to open the modal with the product data when the preview button is clicked
  // This allows the product details to be displayed in a modal
  // without navigating away from the current page
  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    // Open the preview modal with the product data
    previewModal.onOpen(data);
  };

  // Use the cart hook to manage adding items to the cart
  // This allows the user to add the product to their cart directly from the product card

  const cart = useCart();
  // Safely get default size and color
  const defaultSize: Size | undefined = data.productSizes?.[0]?.size;
  const defaultColor: Color | undefined = data.productColors?.[0]?.color;

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    // Check for required options
    if (!defaultSize || !defaultColor) {
      // Optionally show a message to the user
      return;
    }
    cart.addItem({
      ...data,
      size: defaultSize,
      color: defaultColor,
      quantity: 1,
    });
  };

  const getStockStatus = () => {
    if (data.quantity > 0) {
      return "In Stock";
    }
    return "Out of Stock";
  };

  // --- Rating Logic ---
  const [reviews, setReviews] = React.useState<{ rating: number }[]>([]);
  const [average, setAverage] = React.useState(0);

  useEffect(() => {
    fetch(`/api/reviews?productId=${data.id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data || []);
        if (data && data.length > 0) {
          const avg =
            data.reduce(
              (sum: number, r: { rating: number }) => sum + r.rating,
              0
            ) / data.length;
          setAverage(avg);
        } else {
          setAverage(0);
        }
      });
  }, [data.id]);

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border-gray-200 border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          alt={data?.name}
          fill
          className="aspect-square rounded-md object-cover"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-5 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icons={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icons={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg ">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* --- Rating --- */}
      <div className="flex items-center mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={average >= i} />
        ))}
        <span className="ml-2 font-medium text-gray-700">
          {average.toFixed(1)}
        </span>
        <span className="ml-1 text-gray-400 text-sm">({reviews.length})</span>
      </div>
      {/* Price */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-900">
        <div className="flex items-center">
          <Currency value={data?.price} />
        </div>

        {getStockStatus() === "In Stock" ? (
          <div className="p-2 rounded-md border text-gray-500">
            {getStockStatus()}
          </div>
        ) : (
          <div className="bg-red-300 p-2 rounded-md text-gray-600">
            {getStockStatus()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
