import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";

import ProductCard from "../components/ProductCard/ProductCard";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import Footer from "../components/Footer/Footer";

import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";

function Products() {
  const { products, isLoading } = useContext(ProductContext);

  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useContext(SearchContext);

  const {
    category,
    priceRange,
    sortBy,
  } = useContext(CategoryContext);

  const filteredProducts = (products || [])
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      let matchesPrice = true;

      if (priceRange === "under50") {
        matchesPrice = product.price < 50;
      }

      if (priceRange === "50to100") {
        matchesPrice =
          product.price >= 50 &&
          product.price <= 100;
      }

      if (priceRange === "over100") {
        matchesPrice = product.price > 100;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;

      return 0;
    });

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300">

      <div className="max-w-[1500px] mx-auto flex gap-6 px-4">

        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <FilterSidebar />
        </aside>

        {/* Products */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            All Products ({filteredProducts.length})
          </h1>

          {currentProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Products Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mt-12">

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`px-5 py-2 rounded-lg font-semibold transition ${
                      currentPage === index + 1
                        ? "bg-yellow-400 text-black"
                        : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
              >
                Next
              </button>

            </div>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Products;