import { createContext, useState } from "react";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");

  return (
<CategoryContext.Provider
  value={{
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  }}
>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;