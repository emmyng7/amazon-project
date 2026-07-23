import { useEffect, useState, useContext } from "react";
import { getProductsByCategory } from "../../services/api";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../ProductSlider/ProductCard";

function RelatedProducts({ category, currentId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products: allProducts } = useContext(ProductContext);

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true);
      
      try {
        let relatedProducts = [];
        
        // Check if it's an admin product (ID >= 1000000000)
        const isAdminProduct = Number(currentId) >= 1000000000;
        
        if (isAdminProduct) {
          // For admin products, get related from all products context
          relatedProducts = allProducts
            .filter(
              (product) => 
                product.category === category && 
                product.id !== currentId
            )
            .slice(0, 10);
          
          setProducts(relatedProducts);
        } else {
          // For API products, fetch from API
          try {
            const data = await getProductsByCategory(category);
            
            // Filter out the current product
            const filtered = data.filter(
              (product) => product.id !== currentId
            );
            
            // Also check if there are admin products with same category
            const adminProducts = allProducts
              .filter(
                (product) => 
                  product.category === category && 
                  product.id >= 1000000000 &&
                  product.id !== currentId
              );
            
            // Combine API and admin products
            relatedProducts = [...filtered, ...adminProducts];
            setProducts(relatedProducts);
          } catch (error) {
            console.error("Error fetching related products:", error);
            // Fallback to admin products only
            const adminProducts = allProducts
              .filter(
                (product) => 
                  product.category === category && 
                  product.id !== currentId
              )
              .slice(0, 10);
            
            setProducts(adminProducts);
          }
        }
      } catch (error) {
        console.error("Error in RelatedProducts:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (category && currentId) {
      fetchRelated();
    } else {
      setLoading(false);
    }
  }, [category, currentId, allProducts]);

  // Show nothing if no products or loading
  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900 mt-10 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Customers who bought this item also bought
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-48 flex-shrink-0 animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show anything if no related products
  }

  return (
    <section className="bg-white dark:bg-gray-900 mt-10 p-6 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Customers who bought this item also bought
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {products.slice(0, 10).map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              // Ensure all required fields exist
              thumbnail: product.thumbnail || "https://via.placeholder.com/150?text=No+Image",
              price: product.price || 0,
              title: product.title || "Untitled Product",
              rating: product.rating || 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;