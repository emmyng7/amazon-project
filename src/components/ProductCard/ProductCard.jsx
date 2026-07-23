import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

import Rating from "../Rating/Rating";
import { CartContext } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative min-w-[230px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">

        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="h-56 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-44 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 min-h-[45px]">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-3">
            <Rating rating={product.rating} />
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">

            <span className="text-2xl font-bold text-black dark:text-white">
              ${product.price}
            </span>

            {product.discountPercentage && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}

          </div>

          {/* Stock */}
          <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
            ✓ In Stock
          </p>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

        </div>

      </div>
    </Link>
  );
}

export default ProductCard;