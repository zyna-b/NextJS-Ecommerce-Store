"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/Button";
import { ShoppingCart } from "lucide-react";
import React from "react";
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

interface ProductInfoProps {
  data: Product;
}

const Info: React.FC<ProductInfoProps> = ({ data }) => {
  // Top-level guard for missing/invalid product data
  const hasSizes = Array.isArray(data.productSizes) && data.productSizes.length > 0;
  const hasColors = Array.isArray(data.productColors) && data.productColors.length > 0;
  const cart = useCart();
  // Defensive: Only set default if valid and id is a string
  const [selectedSize, setSelectedSize] = React.useState(
    hasSizes && data.productSizes[0]?.size && typeof data.productSizes[0].size.id === 'string'
      ? data.productSizes[0].size
      : undefined
  );
  const [selectedColor, setSelectedColor] = React.useState(
    hasColors && data.productColors[0]?.color && typeof data.productColors[0].color.id === 'string'
      ? data.productColors[0].color
      : undefined
  );
  const [error, setError] = React.useState<string | null>(null);
  // --- Rating Logic ---
  const [reviews, setReviews] = React.useState<{ rating: number }[]>([]);
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
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

  if (!hasSizes || !hasColors) {
    return (
      <div className="text-red-500 font-bold text-center py-10">
        Product is missing size or color options. Please contact support or try another product.
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || typeof selectedSize.id !== 'string' || typeof selectedColor.id !== 'string') {
      setError("Please select both a valid size and color before adding to cart.");
      return;
    }
    setError(null);
    cart.addItem({
      ...data,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
};

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="mt-3 text-lg text-gray-500">{data.description}</p>


{/* --- Rating --- */}
      <div className="flex items-center mt-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={average >= i} />
        ))}
        <span className="ml-2 font-medium text-gray-700">
          {average.toFixed(1)}
        </span>
        <span className="ml-1 text-gray-400 text-sm">({reviews.length})</span>
      </div>



      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
    <hr className="my-4 border-gray-300" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-500">Size:</h3>
          <div className="flex gap-2">
            {hasSizes ? (
              data.productSizes.map((ps) => (
                <button
                  key={ps.size.id}
                  className={`px-2 py-1 border border-gray-500 rounded ${
                    selectedSize?.id === ps.size.id ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSelectedSize(ps.size)}
                >
                  {ps.size.name}
                </button>
              ))
            ) : (
              <span className="text-red-500">No sizes available</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-gray-500">Color:</h3>
          <div className="flex gap-2">
            {hasColors ? (
              data.productColors.map((pc) => (
                <button
                  key={pc.color.id}
                  className={`h-8 w-8 rounded-full border-2 transition-all duration-150 cursor-pointer focus:outline-none
                    ${selectedColor?.id === pc.color.id ? "border-fashion-primary ring-2 ring-fashion-primary" : "border-gray-300"}
                    hover:scale-110 hover:border-fashion-primary`
                  }
                  style={{ backgroundColor: pc.color.value }}
                  onClick={() => setSelectedColor(pc.color)}
                  aria-label={pc.color.name}
                />
              ))
            ) : (
              <span className="text-red-500">No colors available</span>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 font-semibold mb-2">{error}</div>
      )}
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-3"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
        >
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
