import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen pt-28 py-10 bg-[#eaeded] dark:bg-gray-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4">

        {/* Left */}
        <div className="flex-1 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow transition-colors duration-300">

          <h1 className="text-3xl font-bold mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <h2 className="text-xl text-gray-500 dark:text-gray-400">
              Your cart is empty.
            </h2>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 border-b border-gray-200 dark:border-gray-700 py-6"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-40 h-40 object-contain mx-auto md:mx-0"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-green-600 dark:text-green-400">
                    In Stock
                  </p>

                  <p className="mt-3 text-2xl font-bold">
                    ${item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-9 h-9 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      -
                    </button>

                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-9 h-9 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-5 text-red-500 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {/* Right */}
        <div className="lg:w-80 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow h-fit transition-colors duration-300">

          <h2 className="text-2xl font-bold">
            Subtotal
          </h2>

          <p className="text-4xl font-bold mt-4">
            ${total.toFixed(2)}
          </p>

          <Link to="/checkout">
            <button className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-semibold transition">
              Proceed to Checkout
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;