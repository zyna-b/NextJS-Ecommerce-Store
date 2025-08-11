"use client";
import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

interface ReviewFormProps {
  productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const { user } = useUser();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem("reviewDraft", JSON.stringify({ review, rating }));
      document.getElementById("clerk-signin-btn")?.click();
      return;
    }
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          comment: review,
          rating,
          userEmail: user.primaryEmailAddress?.emailAddress,
          userName: user.fullName || user.firstName || "Anonymous",
          userId: user.id,
        }),
      });
      if (!res.ok) {
        toast.error("Failed to submit review. Please try again.");
        return;
      }
      toast.success("Review submitted successfully!");
      localStorage.removeItem("reviewDraft");
      setReview("");
      setRating(3);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setReview("");
    setRating(3);
  };

  useEffect(() => {
    const draft = localStorage.getItem("reviewDraft");
    if (draft) {
      try {
        const { review, rating } = JSON.parse(draft);
        if (review) setReview(review);
        if (rating) setRating(rating);
      } catch {}
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-xl font-bold mb-6">Add a review</h2>

      <div className="flex items-center mb-6 gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            style={{ background: "transparent", boxShadow: "none" }}
            onClick={() => setRating(star)}
            aria-label={`Rate ${star} stars`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "#facc15" : "#d1d5db"} // yellow-400 or gray-300
              viewBox="0 0 20 20"
              className="w-6 h-6"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          </button>
        ))}
        <p className="ml-4 font-bold">{rating}.0 out of 5</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="review" className="block font-semibold mb-2">
            Your review
          </label>
          <textarea
            name="review"
            id="review"
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus:border-fashion-primary focus:ring-1 focus:ring-fashion-primary transition"
            placeholder="Share your experience..."
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit review
          </Button>
          <Button
            type="reset"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
            onClick={handleReset}
          >
            Reset
          </Button>
          <SignInButton mode="modal">
            <button id="clerk-signin-btn" style={{ display: "none" }} />
          </SignInButton>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
