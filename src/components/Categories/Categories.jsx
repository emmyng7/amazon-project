import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";

function Categories() {
  const [categories, setCategories] = useState([]);
  const { products } = useContext(ProductContext);
  const { category, setCategory } = useContext(CategoryContext);

  useEffect(() => {
    if (products && products.length > 0) {
      try {
        const uniqueCategories = [
          ...new Set(
            products
              .filter(product => product && product.category)
              .map((product) => product.category)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error extracting categories:", error);
      }
    }
  }, [products]);

  return (
    <div className="bg-[#232f3e] text-white overflow-x-auto whitespace-nowrap">
      <div className="max-w-[1500px] mx-auto flex gap-6 px-4 py-3">
        <button
          onClick={() => setCategory("all")}
          className={`hover:underline ${
            category === "all" ? "font-bold text-yellow-400" : ""
          }`}
        >
          All
        </button>

        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`capitalize hover:underline ${
              category === item ? "font-bold text-yellow-400" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;