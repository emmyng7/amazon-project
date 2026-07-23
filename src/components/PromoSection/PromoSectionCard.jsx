function PromoSectionCard({ title, products, link }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-5">

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
        {title}
      </h2>

      {/* Products */}
      <div className="grid grid-cols-2 gap-4">

        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
          >

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden h-32 flex items-center justify-center">

              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

            </div>

            <p className="text-xs mt-3 text-gray-700 dark:text-gray-300 line-clamp-2">
              {product.title}
            </p>

          </div>
        ))}

      </div>

      {/* Link */}
      <button className="mt-6 font-medium text-blue-600 dark:text-yellow-400 hover:text-orange-500 transition-colors">
        {link}
      </button>

    </div>
  );
}

export default PromoSectionCard;