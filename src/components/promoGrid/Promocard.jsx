function PromoCard({ title, products, link }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">

      {/* Title */}
      <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
        {title}
      </h2>

      {/* Products */}
      <div className="grid grid-cols-2 gap-3">

        {products.map((product) => (
          <div key={product.id} className="group">

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden h-28 flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="text-xs mt-2 line-clamp-2 text-gray-700 dark:text-gray-300">
              {product.title}
            </p>

          </div>
        ))}

      </div>

      {/* Link */}
      <button className="mt-5 text-blue-600 dark:text-yellow-400 hover:text-orange-500 transition-colors">
        {link}
      </button>

    </div>
  );
}

export default PromoCard;