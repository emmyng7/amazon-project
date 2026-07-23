import { Link } from "react-router-dom";

function DealCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group min-w-[220px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">

        {/* Image */}
        <div className="h-52 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-5 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-44 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Discount */}
          <div className="flex items-center gap-2">

            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              -{Math.round(product.discountPercentage)}%
            </span>

            <span className="text-red-600 dark:text-red-400 font-bold text-sm">
              Deal
            </span>

          </div>

          {/* Title */}
          <h3 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 min-h-[42px]">
            {product.title}
          </h3>

          {/* Price */}
          <div className="mt-4 flex items-center gap-2">

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
          <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
            ✓ In Stock
          </p>

        </div>

      </div>
    </Link>
  );
}

export default DealCard;