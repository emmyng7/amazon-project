import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

function Orders() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="min-h-screen bg-[#eaeded] dark:bg-[#111827] pt-28 pb-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center transition-colors duration-300">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              No Orders Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3 mb-8">
              You haven't placed any orders.
            </p>

            <Link
              to="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-bold transition"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 overflow-hidden transition-colors duration-300"
            >
              {/* Header */}

              <div className="bg-gray-100 dark:bg-gray-700 p-6 flex flex-wrap justify-between gap-6">

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    ORDER NUMBER
                  </p>

                  <h3 className="font-bold text-gray-900 dark:text-white">
                    #{order.id}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    ORDER DATE
                  </p>

                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {order.date}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    PAYMENT
                  </p>

                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {order.paymentStatus}
                  </span>
                </div>

                <div>
  <p className="text-sm text-gray-500 dark:text-gray-300">
    ORDER STATUS
  </p>

  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
    {order.orderStatus}
  </span>
</div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    TOTAL
                  </p>

                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                    ₦{(order.total * 1600).toLocaleString()}
                  </h3>
                </div>

              </div>

              {/* Shipping Details */}

              {order.shippingInfo && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">

                  <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                    Shipping Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        Name:
                      </strong>{" "}
                      {order.shippingInfo.fullName}
                    </p>

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        Email:
                      </strong>{" "}
                      {order.shippingInfo.email}
                    </p>

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        Phone:
                      </strong>{" "}
                      {order.shippingInfo.phone}
                    </p>

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        City:
                      </strong>{" "}
                      {order.shippingInfo.city}
                    </p>

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        State:
                      </strong>{" "}
                      {order.shippingInfo.state}
                    </p>

                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        Postal Code:
                      </strong>{" "}
                      {order.shippingInfo.postalCode}
                    </p>

                    <p className="md:col-span-2">
                      <strong className="text-gray-900 dark:text-white">
                        Address:
                      </strong>{" "}
                      {order.shippingInfo.address}
                    </p>

                  </div>

                </div>
              )}

              <div className="p-6 border-b border-gray-200 dark:border-gray-700">

  <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
    Delivery Information
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <p className="text-gray-500 dark:text-gray-400">
        Tracking Number
      </p>

      <h3 className="font-bold text-gray-900 dark:text-white">
        {order.trackingNumber}
      </h3>
    </div>

    <div>
      <p className="text-gray-500 dark:text-gray-400">
        Estimated Delivery
      </p>

      <h3 className="font-bold text-gray-900 dark:text-white">
        {order.estimatedDelivery}
      </h3>
    </div>

  </div>

</div>

              {/* Products */}

              <div className="p-6">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-5 border-b border-gray-200 dark:border-gray-700 last:border-none py-5"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-28 h-28 object-contain"
                    />

                    <div className="flex-1">

                      <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-xl font-bold text-red-600 mt-2">
                        ₦{(item.price * 1600).toLocaleString()}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

 {/* Footer */}

<div className="bg-gray-50 dark:bg-gray-700 p-6 flex flex-wrap gap-4 justify-end">

  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition">
    Track Package
  </button>

  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition">
    Buy Again
  </button>

  <button className="bg-gray-700 hover:bg-black text-white px-6 py-3 rounded-full transition">
    Download Invoice
  </button>

  <Link
    to="/"
    className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-bold transition"
  >
    Continue Shopping
  </Link>

</div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Orders;