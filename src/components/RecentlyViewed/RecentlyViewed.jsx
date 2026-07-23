import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../../context/RecentlyViewedContext";

function RecentlyViewed() {
  const { recentProducts } = useContext(RecentlyViewedContext);

  // Return null if no recent products
  if (!recentProducts || recentProducts.length === 0) {
    return null;
  }

  // Filter out any invalid products and ensure we have valid data
  const validProducts = recentProducts.filter(
    (product) => product && product.id && product.title
  );

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {validProducts.slice(0, 12).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="hover:shadow-xl p-3 rounded-lg transition-all duration-300 hover:scale-105 bg-gray-50 dark:bg-gray-800"
          >
            <img
              src={product.thumbnail || "https://via.placeholder.com/150?text=No+Image"}
              alt={product.title || "Product"}
              className="h-36 w-full object-contain mb-2"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />

            <p className="mt-3 text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
              {product.title || "Untitled Product"}
            </p>

            <p className="font-bold mt-2 text-red-600 dark:text-red-400">
              ${product.price || 0}
            </p>

            {product.rating && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500 text-sm">⭐</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating}
                </span>
              </div>
            )}

            {product.stock > 0 && (
              <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                ✓ In Stock
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;