"use client";
import React, { useEffect, useState } from "react";

interface Review {
  id: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface CustomersReviewsProps {
  productId: string;
}

const CustomersReviews: React.FC<CustomersReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
      setLoading(false);
    };
    fetchReviews();
  }, [productId]);

  // Calculate average rating and counts
  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(2)
      : "0.00";
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  return (
    <section className="bg-white py-10 md:py-16 rounded-2xl shadow max-w-3xl mx-auto my-10">
      <div className="px-6 md:px-10">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(Number(average))
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500 font-medium">
              ({average})
            </span>
            <span className="ml-2 text-sm text-gray-900 underline font-medium">
              {reviews.length} Reviews
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="shrink-0 space-y-2">
            <p className="text-3xl font-bold text-gray-900">{average} out of 5</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div className="flex items-center gap-2" key={star}>
                <span className="w-4 text-sm font-medium text-gray-900">{star}</span>
                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-2 w-56 md:w-80 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-yellow-400"
                    style={{
                      width: reviews.length
                        ? `${(ratingCounts[i] / reviews.length) * 100}%`
                        : "0%",
                    }}
                  ></div>
                </div>
                <span className="text-right text-sm text-gray-700">{ratingCounts[i]}</span>
                <span className="w-12 text-right text-sm text-gray-700">reviews</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 divide-y divide-gray-200">
          {loading ? (
            <p className="py-8 text-center text-gray-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="py-8 text-center text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div
                className="flex flex-col md:flex-row gap-6 py-8"
                key={review.id}
              >
                <div className="shrink-0 space-y-2 md:w-48">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900">
                      {review.userName}
                    </p>
                    <p className="text-xs font-normal text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()} at{" "}
                      {new Date(review.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 min-w-0 flex-1 space-y-2 md:mt-0">
                  <p className="text-base font-normal text-gray-700">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomersReviews;