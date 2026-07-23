import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="bg-[#eaeded] min-h-screen pt-28 flex justify-center items-center">

      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-xl">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold">
          Thank you!
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          Your order has been placed successfully.
        </p>

        <p className="mt-2 text-gray-500">
          We've received your order and will begin processing it shortly.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-bold"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;