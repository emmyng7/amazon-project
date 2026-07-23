import { createContext, useState } from "react";

export const RecentlyViewedContext = createContext();

function RecentlyViewedProvider({ children }) {
  const [recentProducts, setRecentProducts] = useState(() => {
    const saved = localStorage.getItem("recentProducts");
    return saved ? JSON.parse(saved) : [];
  });

  function addRecentlyViewed(product) {
    let updated = recentProducts.filter(
      (item) => item.id !== product.id
    );

    updated.unshift(product);

    if (updated.length > 8) {
      updated = updated.slice(0, 8);
    }

    setRecentProducts(updated);

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updated)
    );
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentProducts,
        addRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export default RecentlyViewedProvider;