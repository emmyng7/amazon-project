import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen pt-28 py-10 bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-colors duration-300">

          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            My Wishlist
          </h1>

          {wishlistItems.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-2xl text-gray-500 dark:text-gray-400">
                Your wishlist is empty.
              </h2>

              <Link
                to="/products"
                className="inline-block mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full transition duration-300 hover:scale-105"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {wishlistItems.map((product) => (

                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >

                  <Link to={`/product/${product.id}`}>

                    <div className="bg-gray-50 dark:bg-gray-900 h-56 flex items-center justify-center p-6">

                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-44 object-contain transition-transform duration-300 hover:scale-110"
                      />

                    </div>

                    <div className="p-5">

                      <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[48px]">
                        {product.title}
                      </h2>

                      <p className="text-3xl font-bold mt-4 text-black dark:text-white">
                        ${product.price}
                      </p>

                    </div>

                  </Link>

                  <div className="px-5 pb-5">

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-bold transition duration-300 hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold transition duration-300 hover:scale-105"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;