import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import QuickViewModal from "../QuickViewModal/QuickViewModal";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { t } = useTranslation();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative min-w-[220px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 group">

        <Link to={`/product/${product.id}`}>

          {/* Image */}
          <div className="h-48 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-800 rounded-t-xl">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-44 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="p-4">

            <p className="text-sm font-medium text-gray-800 dark:text-white mt-2 line-clamp-2 min-h-[40px]">
              {product.title}
            </p>

            <p className="text-2xl font-bold mt-3 text-black dark:text-yellow-400">
              ${product.price}
            </p>

          </div>

        </Link>

        {/* Buttons */}
        <div className="px-4 pb-4 space-y-2">

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-full font-semibold transition"
          >
            {t("buttons.addToCart")}
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full font-semibold transition"
          >
            {t("buttons.addToWishlist")}
          </button>

        </div>

        {/* Quick View */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute left-4 right-4 top-44 bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg"
        >
          {t("buttons.quickView")}
        </button>

      </div>

      {showModal && (
        <QuickViewModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default ProductCard;