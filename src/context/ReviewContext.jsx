import { createContext, useState } from "react";

export const ReviewContext = createContext();

function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  function addReview(productId, review) {
    const updatedReviews = {
      ...reviews,
      [productId]: [
        ...(reviews[productId] || []),
        review,
      ],
    };

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );
  }

  function getAverageRating(productId) {
    const productReviews = reviews[productId] || [];

    if (productReviews.length === 0) {
      return 0;
    }

    const total = productReviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (total / productReviews.length).toFixed(1);
  }

  function getReviewCount(productId) {
    return (reviews[productId] || []).length;
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getAverageRating,
        getReviewCount,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewProvider;