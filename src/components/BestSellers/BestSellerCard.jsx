import { Link } from "react-router-dom";

function BestSellerCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="min-w-[220px] flex-shrink-0 group"
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        {/* Image */}
        <div className="h-56 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6 overflow-hidden">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-44 object-contain transition-transform duration-300 group-hover:scale-110"
          />

        </div>

        {/* Info */}
        <div className="p-5">

          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 min-h-[42px]">
            {product.title}
          </h3>

          <p className="text-2xl font-bold text-[#B12704] mt-4">
            ${product.price}
          </p>

        </div>

      </div>
    </Link>
  );
}

export default BestSellerCard;