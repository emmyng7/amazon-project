import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import PromoGrid from "../components/PromoGrid/PromoGrid";
import TodaysDeals from "../components/TodaysDeals/TodaysDeals";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import PromoSection from "../components/PromoSection/PromoSection";
import BestSellers from "../components/BestSellers/BestSellers";
import Footer from "../components/Footer/Footer";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { CategoryContext } from "../context/CategoryContext";
import { SearchContext } from "../context/SearchContext";

function Home() {
  const { t } = useTranslation();

  const { products } = useContext(ProductContext);
  const productsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useContext(SearchContext);

  const { category, priceRange, sortBy } =
    useContext(CategoryContext);



  const filteredProducts = products
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

  if (products.length === 0) {
    return <LoadingSkeleton />;
  }

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

  return (
    <div className="min-h-screen bg-[#eaeded] dark:bg-[#111827] transition-colors duration-300">

      <Hero />

      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center py-32">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-500 dark:text-gray-300 px-4 transition-colors">
            {t("home.noProducts")}
          </h1>
        </div>
      ) : (
        <>
          <PromoGrid products={filteredProducts} />

          <div className="max-w-[1500px] mx-auto mt-6 px-4">

            <FilterSidebar />

            <div className="mt-6">

              <TodaysDeals
                products={currentProducts}
              />

              <ProductSlider
                title={t("home.topPicks")}
                products={currentProducts.slice(0, 12)}
              />

              <PromoSection
                products={filteredProducts}
              />

              <BestSellers
                products={currentProducts.slice(12, 24)}
              />

              <ProductSlider
                title={t("home.recommended")}
                products={currentProducts.slice(0, 12)}
              />

              <PromoSection
                products={filteredProducts}
              />

              {/* Pagination */}

              <div className="flex flex-wrap justify-center items-center gap-3 my-10">

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition disabled:opacity-50"
                >
                  {t("buttons.previous")}
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === index + 1
                          ? "bg-yellow-400 text-black"
                          : "bg-white dark:bg-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  disabled={
                    currentPage === totalPages
                  }
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition disabled:opacity-50"
                >
                  {t("buttons.next")}
                </button>

              </div>

            </div>

          </div>
        </>
      )}

      <div className="flex justify-center my-10">

        <Link
          to="/products"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {t("buttons.viewAllProducts")}
        </Link>

      </div>

      <Footer />

    </div>
  );
}

export default Home;