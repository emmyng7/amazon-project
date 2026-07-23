import { createContext, useEffect, useState } from "react";
import { getProducts } from "../services/api";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Loading products...");
        
        // Fetch API products
        let apiProducts = [];
        try {
          apiProducts = await getProducts();
          console.log("API products loaded:", apiProducts.length);
        } catch (apiError) {
          console.error("Error fetching API products:", apiError);
          // Continue with empty API products if it fails
        }
        
        // Get admin products from localStorage
        let adminProducts = [];
        try {
          const stored = localStorage.getItem("adminProducts");
          adminProducts = stored ? JSON.parse(stored) : [];
          console.log("Admin products loaded:", adminProducts.length);
        } catch (e) {
          console.error("Error loading admin products:", e);
        }
        
        // Ensure admin products have proper IDs
        const validAdminProducts = adminProducts.filter(
          (product) => product && product.id && product.id >= 1000000000
        );
        
        // Combine both arrays
        const allProducts = [...apiProducts, ...validAdminProducts];
        
        console.log("Total products loaded:", allProducts.length);
        
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setError(error.message);
        // Try to at least load admin products
        try {
          const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
          setProducts(adminProducts);
        } catch (e) {
          setProducts([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  function addProduct(product) {
    console.log("Adding product:", product);
    
    // Validate product
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return false;
    }

    // Get existing admin products
    let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    
    // Check if product already exists
    const exists = adminProducts.some((p) => p.id === product.id);
    if (exists) {
      console.warn("Product already exists:", product.id);
      return false;
    }

    // Add new product
    const updatedAdminProducts = [...adminProducts, product];
    
    // Save to localStorage
    localStorage.setItem("adminProducts", JSON.stringify(updatedAdminProducts));
    
    // Update state
    setProducts((prevProducts) => {
      const filtered = prevProducts.filter((p) => p.id !== product.id);
      return [...filtered, product];
    });

    console.log("Product added successfully. Total admin products:", updatedAdminProducts.length);
    return true;
  }

  function deleteProduct(id) {
    console.log("Deleting product:", id);
    
    if (!id) {
      console.error("Invalid product ID");
      return false;
    }

    let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const updatedAdminProducts = adminProducts.filter((product) => product.id !== id);
    localStorage.setItem("adminProducts", JSON.stringify(updatedAdminProducts));
    
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });

    console.log("Product deleted successfully. Remaining admin products:", updatedAdminProducts.length);
    return true;
  }

  function updateProduct(updatedProduct) {
    console.log("Updating product:", updatedProduct);
    
    if (!updatedProduct || !updatedProduct.id) {
      console.error("Invalid product:", updatedProduct);
      return false;
    }

    let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const productIndex = adminProducts.findIndex(
      (product) => product.id === updatedProduct.id
    );
    
    if (productIndex === -1) {
      console.warn("Product not found for update:", updatedProduct.id);
      return false;
    }
    
    adminProducts[productIndex] = updatedProduct;
    localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
    
    setProducts((prevProducts) => {
      return prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    });

    console.log("Product updated successfully");
    return true;
  }

  // Helper function to get a single product by ID
  function getProductById(id) {
    if (!id) return null;
    const found = products.find((p) => String(p.id) === String(id));
    console.log("getProductById:", id, "found:", !!found);
    return found || null;
  }

  const value = {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    isLoading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;