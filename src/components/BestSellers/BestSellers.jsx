import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import BestSellerCard from "./BestSellerCard";

function BestSellers({ products }) {
  const { t } = useTranslation();

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -1000,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 1000,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1500px] mx-auto mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg transition-all duration-300 p-6 relative">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("home.bestSellers")}
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl rounded-full p-3 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <FaChevronLeft />
      </button>

      {/* Products */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        {products.map((product) => (
          <BestSellerCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl rounded-full p-3 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <FaChevronRight />
      </button>

    </section>
  );
}

export default BestSellers;