import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReviewContext } from "../context/ReviewContext";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";
import { getProduct } from "../services/api";
import { ProductContext } from "../context/ProductContext";

import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import Rating from "../components/Rating/Rating";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { addRecentlyViewed } = useContext(RecentlyViewedContext);
  const { reviews, addReview, getAverageRating, getReviewCount } = useContext(ReviewContext);
  const { user } = useContext(AuthContext);
  const { getProductById } = useContext(ProductContext);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      
      try {
        // First, check if it's an admin product (ID >= 1000000000)
        const isAdminProduct = Number(id) >= 1000000000;
        
        let productData = null;
        
        if (isAdminProduct) {
          // Find admin product from context
          productData = getProductById(id);
          
          if (!productData) {
            // Try to get from localStorage directly as fallback
            const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
            productData = adminProducts.find(p => String(p.id) === String(id));
          }
          
          if (productData) {
            console.log("Found admin product:", productData);
          } else {
            console.log("Admin product not found for ID:", id);
          }
        } else {
          // Fetch from API for regular products
          try {
            productData = await getProduct(id);
            console.log("API product data:", productData);
          } catch (apiError) {
            console.error("API fetch failed:", apiError);
            // If API fails, check admin products as fallback
            const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
            productData = adminProducts.find(p => String(p.id) === String(id));
            
            if (!productData) {
              // If still not found, try to find in context
              productData = getProductById(id);
            }
          }
        }
        
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.thumbnail || productData.images?.[0] || "https://via.placeholder.com/400?text=No+Image");
          addRecentlyViewed(productData);
        } else {
          console.error("Product not found for ID:", id);
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  function handleReview(e) {
    e.preventDefault();

    if (!user) {
      alert("Please sign in first.");
      return;
    }

    addReview(product.id, {
      name: user.name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    });

    setRating(5);
    setComment("");
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaeded] dark:bg-[#111827] pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#eaeded] dark:bg-[#111827] pt-28 flex items-center justify-center">
        <div className="text-center max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full transition hover:scale-105 active:scale-95"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300">
      {/* Product */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 transition-colors duration-300">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {(product.images || [product.thumbnail]).map((image, index) => (
              <img
                key={index}
                src={image || product.thumbnail}
                alt={product.title}
                onClick={() => setSelectedImage(image || product.thumbnail)}
                className={`w-20 h-20 object-contain cursor-pointer rounded-lg p-2 bg-white dark:bg-gray-800 transition border-2 ${
                  selectedImage === (image || product.thumbnail)
                    ? "border-orange-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80?text=No+Image";
                }}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center bg-white dark:bg-gray-800 rounded-xl p-6">
            <img
              src={selectedImage || product.thumbnail || "https://via.placeholder.com/400?text=No+Image"}
              alt={product.title}
              className="w-full max-h-[500px] object-contain transition duration-500 hover:scale-110"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=Image+Not+Available";
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Brand:
            <span className="font-semibold ml-2 text-blue-600">
              {product.brand || "Amazon"}
            </span>
          </p>

          <div className="mt-4">
            <Rating
              rating={
                getReviewCount(product.id) > 0
                  ? Number(getAverageRating(product.id))
                  : product.rating || 5
              }
            />
          </div>

          <p className="text-blue-600 mt-2">
            {getReviewCount(product.id)} Customer Reviews
          </p>

          <hr className="my-6 border-gray-300 dark:border-gray-700" />

          {/* Price */}
          <div className="flex items-center gap-4">
            <h2 className="text-5xl font-bold text-red-600">
              ${product.price}
            </h2>
            {product.discountPercentage > 0 && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">
            {product.description || "No description available for this product."}
          </p>

          {/* Details */}
          <div className="mt-8 space-y-3 text-gray-800 dark:text-gray-300">
            <p>
              <span className="font-bold">Category:</span>{" "}
              {product.category || "Uncategorized"}
            </p>
            <p>
              <span className="font-bold">Availability:</span>{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                In Stock ({product.stock || 50})
              </span>
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <label className="font-semibold text-gray-900 dark:text-white">
              Quantity
            </label>
            <select className="mt-2 block border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2">
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery */}
          <div className="mt-8 space-y-2">
            <p className="text-green-600 dark:text-green-400 font-bold text-lg">
              FREE delivery Tomorrow
            </p>
            <p className="text-blue-600 cursor-pointer hover:underline">
              Deliver to Nigeria
            </p>
          </div>

          {/* Buttons */}
          <button
            onClick={() => addToCart(product)}
            className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-full transition duration-300 hover:scale-[1.02]"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              addToCart(product);
              navigate("/checkout");
            }}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full transition duration-300 hover:scale-[1.02]"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto mt-10">
        <RelatedProducts
          category={product.category}
          currentId={product.id}
        />
      </div>

      {/* Recently Viewed */}
      <div className="mt-10">
        <RecentlyViewed />
      </div>

      {/* Customer Reviews */}
      <div className="max-w-7xl mx-auto mt-10 mb-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <form onSubmit={handleReview} className="space-y-5 mb-10">
          <div>
            <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full md:w-56 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 outline-none"
            >
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={1}>★☆☆☆☆</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              placeholder="Write your review..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-4 outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full transition hover:scale-105 active:scale-95"
          >
            Submit Review
          </button>
        </form>

        {/* Review List */}
        {(reviews[product.id] || []).length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No reviews yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews[product.id].map((review, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {review.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.date}
                  </span>
                </div>
                <div className="mt-2">
                  <Rating rating={review.rating} />
                </div>
                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;