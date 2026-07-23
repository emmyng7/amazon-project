import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useTranslation } from "react-i18next";

function FilterSidebar() {
  const { t } = useTranslation();

  const {
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useContext(CategoryContext);

  const prices = [
    {
      label: t("filters.allPrices"),
      value: "all",
    },
    {
      label: t("filters.under50"),
      value: "under50",
    },
    {
      label: t("filters.between"),
      value: "50to100",
    },
    {
      label: t("filters.above100"),
      value: "over100",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 transition-all duration-300">

      {/* Price Filters */}
      <div className="flex flex-wrap items-center gap-3">

        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          {t("filters.price")}
        </h3>

        {prices.map((price) => (
          <button
            key={price.value}
            onClick={() => setPriceRange(price.value)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              priceRange === price.value
                ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {price.label}
          </button>
        ))}

      </div>

      {/* Sort */}
      <div className="flex items-center gap-3">

        <label className="font-bold text-lg text-gray-900 dark:text-white">
          {t("filters.sortBy")}
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
        >
          <option value="default">
            {t("filters.featured")}
          </option>

          <option value="low">
            {t("filters.lowHigh")}
          </option>

          <option value="high">
            {t("filters.highLow")}
          </option>

          <option value="rating">
            {t("filters.highestRated")}
          </option>

        </select>

      </div>

    </div>
  );
}

export default FilterSidebar;