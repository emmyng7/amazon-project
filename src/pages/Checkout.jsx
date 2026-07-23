import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePaystackPayment } from "react-paystack";

import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { paystackConfig } from "../services/paystack";

function Checkout() {
const { cartItems, clearCart } = useContext(CartContext);
const { addOrder } = useContext(OrderContext);
const { user } = useContext(AuthContext);

const navigate = useNavigate();

const [shippingInfo, setShippingInfo] = useState({
  fullName: "",
  email: user?.email || "",
  phone: "",
  city: "",
  state: "",
  postalCode: "",
  address: "",
});

const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

function handleChange(e) {
  setShippingInfo({
    ...shippingInfo,
    [e.target.name]: e.target.value,
  });
}

const config = paystackConfig(
  shippingInfo.email,
  total
);

const initializePayment = usePaystackPayment(config);

function placeOrder() {
  const {
    fullName,
    email,
    phone,
    city,
    state,
    postalCode,
    address,
  } = shippingInfo;

  if (
    !fullName ||
    !email ||
    !phone ||
    !city ||
    !state ||
    !postalCode ||
    !address
  ) {
    toast.error("Please complete all shipping information.");
    return;
  }

initializePayment({
  onSuccess: (reference) => {
    console.log("Payment Successful");
    console.log(reference);

 const order = {
  id: Date.now(),
  items: cartItems,
  total,
  date: new Date().toLocaleString(),

  paymentStatus: "Paid",

  orderStatus: "Processing",

  shippingInfo,

  trackingNumber:
    "AMZ-" + Math.floor(Math.random() * 900000000 + 100000000),

  estimatedDelivery: new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
};

    addOrder(order);

    clearCart();

    toast.success("Payment Successful 🎉");

    navigate("/success");
  },

  onClose: () => {
    toast.info("Payment Cancelled");
  },
});
}

  return (
  <div className="min-h-screen pt-28 py-10 bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

      {/* Shipping Details */}

      <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-colors duration-300">

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Checkout
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Shipping Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            placeholder="State"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

        </div>

        <div className="mt-5">

          <textarea
            rows="4"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            placeholder="Full Delivery Address"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-yellow-400"
          />

        </div>

      </div>

      {/* Order Summary */}

      <div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 sticky top-32 transition-colors duration-300">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 max-h-80 overflow-y-auto">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <div>

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity}
                  </p>

                </div>

                <span className="font-bold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

              </div>
            ))}

          </div>

          <hr className="my-6 border-gray-300 dark:border-gray-700" />

          <div className="space-y-3">

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Items</span>
              <span>
                {cartItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="flex justify-between text-3xl font-bold text-gray-900 dark:text-white pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

          </div>

          <button
            onClick={placeOrder}
            disabled={cartItems.length === 0}
            className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 py-4 rounded-full text-black font-bold transition duration-300 hover:scale-[1.02]"
          >
            Pay ₦{(total * 1600).toLocaleString()}
          </button>

        </div>

      </div>

    </div>
  </div>
);
}

export default Checkout;