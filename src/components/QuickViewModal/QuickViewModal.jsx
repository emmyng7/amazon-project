import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function QuickViewModal({ product, onClose }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999] p-4">

      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        <div className="grid md:grid-cols-2 gap-10 p-8">

          {/* Image */}
          <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-8">

            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[420px] object-contain hover:scale-105 transition duration-300"
            />

          </div>

          {/* Details */}
          <div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h2>

            <p className="text-yellow-500 mt-3 text-lg">
              ⭐ {product.rating}
            </p>

            <h3 className="text-4xl font-bold text-red-600 mt-4">
              ${product.price}
            </h3>

            <p className="mt-6 text-gray-600 dark:text-gray-300 leading-7">
              {product.description}
            </p>

            <div className="mt-8 space-y-4">

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-bold transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-bold transition"
              >
                Add to Wishlist
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
              >
                <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-full font-bold hover:opacity-90 transition">
                  View Full Details
                </button>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickViewModal;