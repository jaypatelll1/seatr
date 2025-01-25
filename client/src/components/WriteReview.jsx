import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const WriteReview = ({ restaurantId, authToken }) => {
  const userId = useSelector((state) => state.user.id);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHover(index);
  };

  const handleStarLeave = () => {
    setHover(0);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews/create-review",
        {
          user_id: userId, // Get userId from Redux
          restaurant_id: restaurantId,
          rating: rating,
          comment: review,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful submission
      alert("Review submitted successfully!");
      setRating(0);
      setReview("");
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg max-w-lg mt-5 md:mt-12">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Write a Review</h2>
      
      {/* Star Rating */}
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={hover >= star || rating >= star ? "orange" : "none"}
            stroke={hover >= star || rating >= star ? "orange" : "gray"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 cursor-pointer"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Review Text Area */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 resize-none"
      />

      {/* Submit Button */}
      <button
        className={`mt-4 w-full text-white font-medium rounded-lg px-4 py-2 
          ${isSubmitting 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"}`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default WriteReview;
